
const collectEmail = require('./collect_email').collectEmail;
const Airtable = require('../lib/airtable');
jest.mock('../lib/airtable');

const context = {
  log: (opts) => {
    console.log(opts);
  }
}

describe('collectEmail', () => {
  
  beforeEach(() => {
    
  });
  
  it('returns an invalid request for an empty body', async () => {
    const req = {
      body: ''
    }
    return collectEmail(context, req).then(() => {
      expect(context.res).toBeDefined();
      expect(context.res.status).toBe(400);
      expect(context.res.body.error).toEqual('Invalid request');
    });
  });

  it('returns an invalid request if email key is missing', async () => {
    const req = {
      body: { foo: 'bar' }
    }
    return collectEmail(context, req).then(() => {
      expect(context.res).toBeDefined();
      expect(context.res.status).toBe(400);
      expect(context.res.body.error).toEqual('Invalid request');
    });
  });

  it('returns an invalid email message if email address is invalid', async () => {
    const req = {
      body: { email: 'bar' }
    }
    return collectEmail(context, req).then(() => {
      expect(context.res).toBeDefined();
      expect(context.res.status).toBe(400);
      expect(context.res.body.error).toEqual('Invalid email address');
    });
  });

  it('returns a 200 if email address is valid and has been stored', async () => {
    const req = {
      body: { email: 'bar@fooz.com' }
    }
    Airtable.mockImplementation(() => {
      return {
        writeEmail: () => {
          return true; 
        },
      };
    });
    return collectEmail(context, req).then(() => {
      expect(Airtable).toHaveBeenCalledTimes(1)
      expect(context.res).toBeDefined();
      expect(context.res.status).toBe(200);
      expect(context.res.body.message).toEqual('Thanks!');
    });
  });

  it('returns a 500 if email address is valid but has NOT been stored', async () => {
    const req = {
      body: { email: 'bar@fooz.com' }
    }
    Airtable.mockImplementation(() => {
      return {
        writeEmail: () => {
          return false; 
        },
      };
    });
    return collectEmail(context, req).then(() => {
      expect(context.res).toBeDefined();
      expect(context.res.status).toBe(500);
      expect(context.res.body.error).toEqual('Unable to store email');
    });
  });

});
