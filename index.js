// Import neccessary node modules
const express = require('express'); // Server middleware
var AWS = require('aws-sdk'); // Load the AWS SDK for Node.js
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
require("dotenv").config(); // Fetch environment variables

// Express configurations
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// Set AWS Configurations
AWS.config.update({
    region: "localhost",
    endpoint: "http://localhost:8000",
  });

//Connect to DynamoDB
const dynamoDB = new AWS.DynamoDB.DocumentClient({apiVersion: "2012-08-10",});
//const dynamoDB = new AWS.DynamoDB({region: "region", credentials});

// Transactions API
const transactions = (req) => {

    // Capture any parameters passed
    var currency = req.cur; // Get currency
    var country = req.cc; // Get country code
    var limit = req.lm; // Get page result limit
    var topic = req.s; // Get search topic
    var page = req.pg; // Get search topic

    // Create result store
    var resultStore = {
        page:`${page}`,
        currency:`${currency}`,
        country:`${country}`,
        limit:`${limit}`,
        search:`${topic}`,
        transactions:[]
    };

    // Define parameters
    const params = {
        TableName:'transactions',
        FilterExpression:'attribute_not_exists(deletedAt) AND currency = :cr AND contains (customerName, :topic)',
        ExpressionAttributeValues: {
            ':cr':currency,
            ':cc' :country,
            ':topic' :topic,
            ':rangeKey':20150101
          },
        Limit:1000,
        IndexName:"country_created_at_index",
        KeyConditionExpression:'country = :cc AND createdAt > :rangeKey',
        ScanIndexForward:false, // Sort by descending time
        ProjectionExpression:'id, amount, currency, country, createdAt, updatedAt, bitcoinAddress, customerName, customerEmail, customerId',
    };

    // Create table slice indices
    let first_index = ((page-1)*limit); // Slice array from
    let second_index = (page*limit); // Slice array to

    // Query through dynamodb
    let ready =dynamoDB
    .query(params)
    .promise()
    .then(data => {

        // Iterate through data results
        data.Items.slice(first_index,second_index).forEach((item) => {

            // Create transaction object
            let tObject = {
                'Transaction_Id':item.id, 
                'By':item.customerName, 
                'Amount':item.amount, 
                'Country':item.country, 
                'Currency':item.currency, 
                'Created_At':item.createdAt,
                'Bitcoin_Address':item.bitcoinAddress, 
                'Updated_At':item.updatedAt,
                'Customer_Email':item.customerEmail, 
                'Customer_Id':item.customerId     
            };
                
            // Save singleton transaction data into store            
            resultStore.transactions.push(tObject);
          }); 
          
          // Return RESTful JSON API      
          return resultStore;        
    })
    .catch(console.error); // Catch any problems processing data      
    
    // Send if data is ready
    return ready;
}

// Export to serverless engine
export {
    transactions
};

