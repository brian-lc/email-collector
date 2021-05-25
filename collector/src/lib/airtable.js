const axios = require('axios');

module.exports = class Airtable {

  constructor(appKey, apiKey) {
    this.appKey = appKey;
    this.apiKey = apiKey;
  }
 
  /**
   * Responsible for formatting the POST request to write an email address
   * to the emails table and handling the response. Just care about success/fail 
   */
  async writeEmail(emailAddress) {
    const tableName = 'emails';
    const url = `https://api.airtable.com/v0/${this.appKey}/${tableName}`;
    const fields = { Email: emailAddress };

    try {
      const resp = await axios({
        method: 'post',
        url: url,
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        data: {
          records: [
            {
              fields
            }
          ]
        }
      });
      return true;
    }
    catch (error) {
      if (error.response) {
        console.error('Failed write:', error.response.status, error.response.statusText );
      } else {
        console.error('ERROR', error);
      }
      return false
    }
  }

}
