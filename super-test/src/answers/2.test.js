const request = require('supertest');
const assert = require('chai').assert;
const setupApi = require('../setup-api');

const api = setupApi();

describe('Exercises 2', () => {
  /*******************************************************
   * Create a DataProvider with three test data rows:
   * ------------------------------------
   * country code | zip code | state
   * ------------------------------------
   * us           | 90210    | California
   * us           | 12345    | New York
   * ca           | Y1A      | Yukon
   ******************************************************/
  const data = [
    ['us', '90210', 'California'],
    ['us', '12345', 'New York'],
    ['ca', 'Y1A', 'Yukon'],
  ];

  /*******************************************************
   * Request zip code data for the given country / zip
   * combinations by sending a GET to /<countryCode>/<zipCode>.
   *
   * Use the test data collection created
   * above. Check that the state returned by the API
   * matches the expected value.
   *
   * Use the GPath expression "places[0].state" to
   * extract the required response body element
   ******************************************************/
  data.forEach(([countryCode, zipCode, state]) =>
    it('Check state for country code and zip code', () =>
      request(api)
        .get(`/${countryCode}/${zipCode}`)
        .expect(({ body }) =>
          assert(body.places.some((place) => place.state === state))
        ))
  );
});
