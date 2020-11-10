const request = require('supertest');
const assert = require('chai').assert;
const setupApi = require('../setup-api');

const api = setupApi();

describe('Exercises 5', () => {
  /*******************************************************
   * Create a new Car object that represents a 2012 Ford Focus
   * by passing these values to the POJO constructor
   *
   * POST this object to /car/postcar
   *
   * Verify that the response HTTP status code is equal to 200
   * (note that this will only work if you use these exact values!)
   ******************************************************/
  it('Post car object - check response http status code - expect 200', () => {
    const myCar = { make: 'Ford', model: 'Focus', modelYear: 2012 };

    return request(api).post('/car/postcar').send(myCar).expect(200);
  });

  /*******************************************************
   * Perform a GET to /car/getcar/alfaromeogiulia
   *
   * Store the response in a Car object using deserialization
   *
   * Verify, using that object, that the model year = 2016
   *
   * Use the standard Assert.assertEquals(expected,actual)
   * as provided by JUnit for the assertion, and the
   * getModelYear() method to retrieve the actual model year
   ******************************************************/
  it('Get car object - check model year - expect 2016', () =>
    request(api)
      .get('/car/getcar/alfaromeogiulia')
      .expect((response) => assert.equal(response.body.modelYear, 2016)));
});
