const { checkLoggedIn } = require('../middleware/authorize');

describe('checkLoggedIn middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      oidc: {
        isAuthenticated: jasmine.createSpy().and.returnValue(true),
      },
    };
    res = {
        status: (statusCode) => ({
          send: (data) => {
            res.statusCode = statusCode;
            res.data = data;
            return res;
          },
        }),
      };          
    next = jasmine.createSpy('next');
  });

  it('should call next when user is authenticated', () => {
    checkLoggedIn(req, res, next);

    expect(req.oidc.isAuthenticated).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  it('should return an error when user is not authenticated', () => {
    req.oidc.isAuthenticated = jasmine.createSpy().and.returnValue(false);

    const result = checkLoggedIn(req, res, next);

    expect(req.oidc.isAuthenticated).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
    expect(result.statusCode).toBe(401);
    expect(result.data.error).toBe('Not authorized to change data without login.');
    expect(result.data.login).toBe('https://cse341-course-mgmt.onrender.com/login');
  });
});
