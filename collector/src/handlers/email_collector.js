'use strict';


const Airtable = require('../lib/airtable');
const Isemail = require('isemail'); 

const air = new Airtable(process.env.AIR_APPKEY, process.env.AIR_APIKEY);

/**
 * Request handler for collect Email endpoint.
 * Responsible for everything http request payload and response oriented.
 * Will surface errors from the contact collector with the appropriate
 * http status codes, should they occur.
 */

 module.exports.collectEmail = async function (context, req) {
   context.log('Email capture HTTP trigger function processed a request.', req.body );
 
   if (req.body && req.body.email) {
     const email = req.body.email;
     if (Isemail.validate(email)) {
       const isCaptured = await air.writeEmail(email);
       context.log('Capture status:', isCaptured);
       if (isCaptured) {
         context.res = {
           status: 200,
           body: { message: 'Thanks!' }
          };
        } else {
          context.res = {
            status: 500,
            body: { message: 'Unable to store email' }
          }
        }
      } else {
        context.log('Invalid email', email);
        context.res = {
          status: 400,
          body: { 'error': 'Invalid email address' }
        }
      }
    } else {
    context.log('Invalid Request')
     context.res = {
       status: 400,
       body: { 'error': 'Invalid request' }
     };
   }
 };