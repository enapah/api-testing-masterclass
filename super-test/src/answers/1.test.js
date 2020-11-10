const request = require('supertest');
const assert = require('chai').assert;
const setupApi = require('../setup-api');

const api = setupApi();

describe('Exercises 1', () => {
  /*******************************************************
   * Send a GET request to /us/90210
   * and check that the response has HTTP status code 200
   ******************************************************/
  it('Request US zip code 90210 - Check response code - Expect 200', () =>
    request(api).get('/us/90210').expect(200));

  /*******************************************************
   * Send a GET request to /us/99999
   * and check that the answer has HTTP status code 404
   ******************************************************/
  it('Request US zip code 99999 - Check response code - Expect 404', () =>
    request(api).get('/us/99999').expect(404));

  /*******************************************************
   * Send a GET request to /us/90210
   * and check that the response is in JSON format
   ******************************************************/
  it('Request US zip code 90210 - Check content type - Expect JSON', () =>
    request(api).get('/us/90210').expect('Content-Type', /json/));

  /***********************************************
   * Send a GET request to /us/90210 and check
   * that the state associated with the first place
   * in the list returned is equal to 'California'
   *
   * Use the GPath expression "places[0].state" to
   * extract the required response body element
   **********************************************/
  it('Request US zip code 90210 - Check state for first place - Expect California', () =>
    request(api)
      .get('/us/90210')
      .expect((response) =>
        assert(
          response.body.places.some((place) => place.state === 'California')
        )
      ));

  /***********************************************
   * Send a GET request to /de/24848 and check that
   * the list of place names returned contains the
   * value 'Kropp'
   *
   * Use the GPath expression "places.'place name'" to
   * extract the required response body elements
   **********************************************/
  it('Request DE zip code 24848 - Check list of place names - Expect contains Kropp', () =>
    request(api)
      .get('/de/24848')
      .expect((response) =>
        assert(
          response.body.places.some((place) => place['place name'] === 'Kropp')
        )
      ));

  /***********************************************
   * Send a GET request to /de/24848 and check that
   * the list of place names returned does not
   * contain the value 'Frankfurt'
   *
   * Use the GPath expression "places.'place name'" to
   * extract the required response body elements
   **********************************************/
  it('Request DE zip code 24848 - Check list of place names - Expect does not contain Frankfurt', () =>
    request(api)
      .get('/de/24848')
      .expect((response) =>
        assert(
          response.body.places.every((place) => place.name !== 'Frankfurt')
        )
      ));

  /***********************************************
   * Send a GET request to /de/24848 and check that
   * the list of place names returned is a
   * collection of size 4
   *
   * Use the GPath expression "places.'place name'" to
   * extract the required response body elements
   **********************************************/
  it('Request DE zip code 24848 - Check number of places - Expect 4', () =>
    request(api)
      .get('/de/24848')
      .expect((response) => assert.lengthOf(response.body.places, 4)));
});
