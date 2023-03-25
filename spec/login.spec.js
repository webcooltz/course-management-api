const OAuth2Server = require('oauth2-mock-server');
const oauthServer = new OAuth2Server({ /* configuration */ });
const dotenv = require("dotenv");
dotenv.config();

describe('OAuth2 authentication', () => {
  beforeAll(async () => {
    // Start the mock server
    await oauthServer.start();
  });

  afterAll(async () => {
    // Stop the mock server
    await oauthServer.stop();
  });

  it('should authenticate with OAuth2', async () => {
    // Make a request to the mock server to authenticate
    const response = await request(oauthServer.url)
      .post('/oauth2/token')
      .send({
        grant_type: process.env.BASE_URL,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.SECRET
      });
    
    // Assert that the response is successful
    expect(response.status).toBe(200);
    expect(response.body.access_token).toBeDefined();
  });
});
