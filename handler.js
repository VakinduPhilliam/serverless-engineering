import {transactions, ui} from './index.js';

// Paginated API
export async function GetPaginatedTransactions(event){

  // Capture data event
  const e = event.queryStringParameters;

  // Fetch data
  let result = await transactions(e);

  return {
    statusCode: 200,
    body: JSON.stringify(result),
    };

};

