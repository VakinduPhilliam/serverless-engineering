
# DynamoDB RESTful API with Pagination and a Serverless Architecture 

This project demonstrates how to create an Amazon DynamoDB based RESTful API with pagination and a serverless framework Architecture.

## FEATURES IMPLEMENTED:

> README: Describes how to setup the project, run the app and consume the API.

> THE API: A 'GET' URL to fetch transactions. A RESTful API endpoint.
After running the app, you can check out the API here:
http://localhost:3000/dev/transactions?cur=BTC&cc=NG&lm=10&s=&pg=1

> QUERYING RESULTS: The API can retrieve transactions by Country and Currency, with the most recent transactions appearing first. In addition, one can also retrieve transactions by CustomerName. Incase for example one wants to know a specific customer's transactions in a country by currency.

> POSTMAN SCREENSHOTS: Under the 'screenshots' folder are postman screenshots of the API at work.

## INSTALLATION:

> Install Serverless Framework:

  npm i -g serverless

> Install local modules

  npm i

> Install local Dynamodb Instance

  serverless dynamodb install

> Start local service

  sls offline start

## THE API URLs:

> The RESTful URLs have the following parameters.

GET/ -  dev/transactions?cur=BTC&cc=BW&lm=10&s=Vakindu&pg=1

Parameter definitions:

> "cur" - crypto currency type. Eligible currency codes: "ETH", "BTC", "LTC", "USDT" 
> "cc" - country code. Eligible codes: "US", "NG", "SA", "BW", "GH
> "lm" - page size limit. Integer only. Setting it to '10' means you want only 10 results per page.
> "s" - customer Name. String text only.
> "pg" - page number. Integer only.

REMEMBER: 

ALL URL PARAMETERS MUST BE DEFINED. 

Leave the parameter empty if it's unneccessary, but you MUST define and pass it to the endpoint.


Consuming the API:

The API consumer sends a GET Request to the 'transactions' endpoint as demonstrated below;

For example, the request below retrieves all the latest "BTC" transactions in "NG".


To get page 1 of the API, send a GET request like;

GET/ - http://localhost:3000/dev/transactions?cur=BTC&cc=NG&lm=10&s=&pg=1


To get page 2 of the API, send a GET request like;

GET/ - http://localhost:3000/dev/transactions?cur=BTC&cc=NG&lm=10&s=&pg=2


To get page 3 of the API, send a GET request like;

GET/ - http://localhost:3000/dev/transactions?cur=BTC&cc=NG&lm=10&s=&pg=3


To get page 4 of the API, send a GET request like;

GET/ - http://localhost:3000/dev/transactions?cur=BTC&cc=NG&lm=10&s=&pg=4


## THE RESTFUL API.

> The API Presentation:
The API you call will look something like below;

{

    "page":"",
    
    "currency":"",
    
    "country":"",
    
    "limit":"",
    
    "search":"",
    
    "transactions":[
    
        {
        
            "Transaction_Id": "", 
            
            "By": "", 
            
            "Amount": "", 
            
            "Country": "", 
            
            'Currency': "", 
            
            "Created_At": "",
            
            "Bitcoin_Address": "", 
            
            "Updated_At": "",
            
            "Customer_Email": "", 
            
            "Customer_Id": ""
            
        },
        
        {
        
            "Transaction_Id": "", 
            
            "By": "", 
            
            "Amount": "", 
            
            "Country": "", 
            
            'Currency': "", 
            
            "Created_At": "",
            
            "Bitcoin_Address": "", 
            
            "Updated_At": "",
            
            "Customer_Email": "", 
            
            "Customer_Id": ""
            
        }]
        
}


The API Parameter Definitions:

> "page" - the current number of the page fetched,
> "currency"- the crypto transaction currency,
> "country"- the country transaction took place,
> "limit" - the number of items per page,
> "search" - the topic (usually name of the customer) search for,
> "transactions" - the actual transactions list.


HINT: The API consumer can track page navigations using the "page" attribute.

Like this;

next_page = page+1

previous_page = page-1

A page count starts at 1 (a page cannot be 0). Therefore make sure to have an exception for the first page while creating navigation. 

