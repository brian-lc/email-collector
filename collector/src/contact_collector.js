/**
 * Processes the contact email address
 */

module.exports = class ContactCollector {

  constructor(db){
    this.db = db;
  }

   /**
    * Responsible for processing an emailAddress string.
    * This includes verifying it is an email address formated string
    * Writing that string to a datastore, 
    */
  processEntry(emailAddress){
    try {
      // write the contact to a database
      this.db.write(emailAddress).then((result) => {
        return result; 
      })
    } catch (err) {
      console.log(err);
      return (false);
    }
  }
}
