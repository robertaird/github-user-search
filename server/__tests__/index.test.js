const request = require('supertest');

// mocking the proxy return function for validation
jest.mock('express-http-proxy', () => {
  const actualProxy = jest.requireActual('express-http-proxy');
  return jest.fn().mockImplementation((...args) => {
    const p = actualProxy(...args);
    return jest.fn().mockImplementation(p);
  });
});
let server;

const proxy = require('express-http-proxy');
describe('Proxy Endpoints', () => {
  beforeEach(function () {
    delete require.cache[require.resolve('../index')];
    server = require('../index');
  });

  afterAll(function (done) {
    server.close(done);
  });

  it('should proxy /graphql requests to github', async () => {
    const res = await request(server).post('/graphql').send({
      query: `query($after: String) {
                    search(query: "rob", type: USER, first: 20, after: $after) {
                      userCount
                      edges {
                        node {
                          ... on User {
                            login
                            name
                          }
                        }
                      }
                    }
                  }
          `,
      variables: {},
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('data');
    expect(typeof res.body.data.search.userCount).toBe('number');
  });

  it('should proxy other requests to react app', async () => {
    const otherReqs = proxy.mock.results[1].value;
    expect(otherReqs).toHaveBeenCalledTimes(0);
    await request(server).get('/');
    expect(otherReqs).toHaveBeenCalledTimes(1);
  });
});
