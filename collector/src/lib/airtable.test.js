const Airtable = require('./airtable.js');
const axios = require('axios');

jest.mock('axios');

describe('Using the airtable REST API', () => {

  const air = new Airtable('X','X');

  beforeEach(() => {
    axios.mockClear();
  });

  describe('it gets a successful response', () => {

    beforeEach(() => {
      axios.mockImplementation(() => {
        return true
      });
    });

    test('it returns true', async () => {
      expect(await air.writeEmail('test@test.com')).toBe(true);
    });
  });

  describe('it gets an unsuccessful response', () => {

    beforeEach(() => {
      axios.mockImplementation(() => {
        throw new Error('Nothing to see here! This error is a test');
      });
    });

    test('it returns false', async () => {
      expect(await air.writeEmail('test@test.com')).toBe(false);
    });
  });

});