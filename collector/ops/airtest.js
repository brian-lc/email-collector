require('dotenv').config()

// Example http request
// curl -v -X POST https://api.airtable.com/v0/APP_ID/emails \
//   -H "Authorization: Bearer API_ID" \
//   -H "Content-Type: application/json" \
//   --data '{
//   "records": [
//     {
//       "fields": {"Email": "bob@foo.com"}
//     },
//     {
//       "fields": {"Email": "sally@bar.com"}
//     }
//     ]
//   }'

const Airtable = require('../src/lib/airtable');

const emailTable = new Airtable(process.env.AIR_APPKEY, process.env.AIR_APIKEY);

emailTable.write('nft4me@hotmail.com').then( (resp) => {
  console.log('resp status:', resp.status, resp.statusText);
});
