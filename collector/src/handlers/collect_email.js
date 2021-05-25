'use strict';

/**
 * Request handler for collect Email endpoint.
 * Responsible for everything http request payload and response oriented.
 * Will surface errors from the contact collector with the appropriate
 * http status codes, should they occur.
 */
module.exports.collectEmail = async function (context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');

  if (req.query.name || (req.body && req.body.email)) {
    context.res = {
      // status: 200, /* Defaults to 200 */
      body: 'Hello ' + (req.query.email|| req.body.email),
    };
  } else {
    context.res = {
      status: 400,
      body: 'Please pass email address on the query string or in the request body',
    };
  }
};
