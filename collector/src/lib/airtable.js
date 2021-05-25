const axios = require('axios');

module.exports = class Airtable {

  constructor(appKey, apiKey) {
    this.appKey = appKey;
    this.apiKey = apiKey;
  }
  
  // Returns the promise from the axios request
  async write(emailAddress) {
    const tableName = 'emails';
    const url = `https://api.airtable.com/v0/${this.appKey}/${tableName}`
    console.log('Calling ',url);
    return axios({
      method: 'post',
      url: url,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      data: {
        records: [
          {
            fields: { Email: emailAddress }
          }
        ]
      }
    });
  }

}
