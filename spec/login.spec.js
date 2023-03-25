const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2-mock').Strategy;
const dotenv = require("dotenv");
dotenv.config();

// Configure the mock OAuth provider
passport.use(new OAuth2Strategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.SECRET,
  callbackURL: 'http://localhost:3000/auth/callback'
}, (accessToken, refreshToken, profile, done) => {
  // Define the expected responses from the OAuth provider
  const user = { id: 'testuser', name: 'Test User' };
  done(null, user);
}));

fdescribe('OAuth authentication', () => {
  it('should authenticate successfully with mock OAuth provider', (done) => {
    // Simulate the authentication process with the mock OAuth provider
    const req = { query: { code: 'testcode' } };
    const res = {};
    passport.authenticate('oauth2-mock', { session: false })(req, res, () => {
      // Test that the user is authenticated correctly
      expect(req.user).toBeDefined();
      expect(req.user.id).toBe('testuser');
      expect(req.user.name).toBe('Test User');
      done();
    });
  });
});
