import { userMiddlewares } from './users.middlewares';
import { Request, Response, NextFunction } from 'express';

// Here simulate the request and response objects
const mockRequest: Request = {} as Request;
// Here we mock the response object
// In status and json we use jest.fn() to create a mock function
const mockResponse: Response = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
} as any;
const mockNextFn: NextFunction = jest.fn();

// Test for JSONValidation. This function validate the format of the JSON request body in the http Request. Validate the correct name and key numbers.
describe('JSONValidation', () => {
  // configure the request body for success scenario simulation
  it('Should pass JSON validation for login', () => {
    mockRequest.body = {
      email: 'fernandolorca@gmail.com',
      password: 'password',
    };

    // Call the JSON validator fn
    userMiddlewares.JSONValidation(mockRequest, mockResponse, mockNextFn);

    // Verify if the next function really is call
    expect(mockNextFn).toHaveBeenCalled();
  });

  it('Should pass JSON validation for signup', () => {
    mockRequest.body = {
      username: 'Fernando Lorca',
      email: 'fernandolorca@gmail.com',
      password: 'password',
      repeatPassword: 'password',
    };

    // Call the JSON validator fn
    userMiddlewares.JSONValidation(mockRequest, mockResponse, mockNextFn);

    // Verify if the next function really is call
    expect(mockNextFn).toHaveBeenCalled();
  });

  it('Should return 400 for invalid JSON of numbers of JSON keys', () => {
    mockRequest.body = {
      username: 'Fernando Lorca',
      email: 'fernandolorca@gmail.com',
      password: 'password',
      repeatPassword: 'password',
      extra: 'extra',
    };

    userMiddlewares.JSONValidation(mockRequest, mockResponse, mockNextFn);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      ok: false,
      status: 400,
      message: 'Invalid JSON',
    });
    expect(mockNextFn).not.toHaveBeenCalled();
  });
});

// Test for signUpInputsValidations. This function validate the field required, email format, password character limitations and password match.
describe('signUpInputsValidations', () => {
  it('Should pass signup inputs validation', () => {
    mockRequest.body = {
      username: 'Fernando Lorca',
      email: 'fernandolorca@gmail.com',
      password: 'password',
      repeatPassword: 'password',
    };

    userMiddlewares.signUpInputsValidations(
      mockRequest,
      mockResponse,
      mockNextFn
    );
    expect(mockNextFn).toHaveBeenCalled();
  });

  it('Should return 400 for missing fields', () => {
    mockRequest.body = {
      username: 'Fernando Lorca',
      email: 'fernandolorca@gmail.com',
      password: 'password',
    };

    userMiddlewares.signUpInputsValidations(
      mockRequest,
      mockResponse,
      mockNextFn
    );

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      ok: false,
      status: 400,
      message: 'All fields are required',
    });
  });

  it('Should return 400 for invalid email format', () => {
    mockRequest.body = {
      username: 'Fernando Lorca',
      email: 'fernandolorcagmail.commm',
      password: 'password',
      repeatPassword: 'password',
    };

    userMiddlewares.signUpInputsValidations(
      mockRequest,
      mockResponse,
      mockNextFn
    );
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      ok: false,
      status: 400,
      message: 'Invalid email',
    });
  });

  it('Should return 400 for invalid password format', () => {
    mockRequest.body = {
      username: 'Fernando Lorca',
      email: 'fernandolorca@gmail.com',
      password: 'pass',
      repeatPassword: 'pass',
    };

    userMiddlewares.signUpInputsValidations(
      mockRequest,
      mockResponse,
      mockNextFn
    );
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      ok: false,
      status: 400,
      message: 'Password must be between 6 and 24 characters',
    });
  });

  it('Should return 400 for passwords do not match', () => {
    mockRequest.body = {
      username: 'Fernando Lorca',
      email: 'fernandolorca@gmail.com',
      password: 'password',
      repeatPassword: 'passwordd',
    };

    userMiddlewares.signUpInputsValidations(
      mockRequest,
      mockResponse,
      mockNextFn
    );

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      ok: false,
      status: 400,
      message: 'Passwords do not match',
    });
  });
});

describe('signUpVerificationByEmail', () => {
  it('Should pass signup verification by email', async () => {
    mockRequest.body = {
      // Always do with new email
      email: 'fernandolorcaaa@gmail.com',
    };

    await userMiddlewares.signUpVerificationByEmail(
      mockRequest,
      mockResponse,
      mockNextFn
    );

    expect(mockNextFn).toHaveBeenCalled();
  });

  it('Should return 409 for email already registered', async () => {
    mockRequest.body = {
      email: 'fernandolorca@gmail.com',
    };

    await userMiddlewares.signUpVerificationByEmail(
      mockRequest,
      mockResponse,
      mockNextFn
    );

    expect(mockResponse.status).toHaveBeenCalledWith(409);
    expect(mockResponse.json).toHaveBeenCalledWith({
      ok: false,
      status: 409,
      message: 'Email already exists',
    });
  });
});

describe('signInInputsValidations', () => {
  it('Should pass sign in inputs validation', () => {
    mockRequest.body = {
      email: 'fernandolorca@gmail.com',
      password: 'password',
    };

    userMiddlewares.signInInputsValidations(
      mockRequest,
      mockResponse,
      mockNextFn
    );

    expect(mockNextFn).toHaveBeenCalled();
  });

  it('Should return 400 for missing fields', () => {
    mockRequest.body = {
      email: '',
      password: '',
    };

    userMiddlewares.signInInputsValidations(
      mockRequest,
      mockResponse,
      mockNextFn
    );

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      ok: false,
      status: 400,
      message: 'Email and password are required',
    });
  });

  it('Should return 400 for invalid email format', () => {
    mockRequest.body = {
      email: 'fernandolorcagmail.commmm',
      password: 'password',
    };

    userMiddlewares.signInInputsValidations(
      mockRequest,
      mockResponse,
      mockNextFn
    );

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      ok: false,
      status: 400,
      message: 'Invalid email',
    });
  });
});

describe('signInVerificationByEmail', () => {
  it('Should pass sign in verification by email', async () => {
    mockRequest.body = {
      email: 'fernandolorca@gmail.com',
      password: 'password',
    };

    await userMiddlewares.signInVerificationByEmail(
      mockRequest,
      mockResponse,
      mockNextFn
    );

    expect(mockNextFn).toHaveBeenCalled();
  });

  it('Should return 404 for user not found', async () => {
    mockRequest.body = {
      email: 'fernandolorcaaaaaaaa@gmail.com',
      password: 'password',
    };

    await userMiddlewares.signInVerificationByEmail(
      mockRequest,
      mockResponse,
      mockNextFn
    );

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({
      ok: false,
      status: 404,
      message: 'User not found',
    });
  });

  it('Should return 400 for password do not match', async () => {
    mockRequest.body = {
      email: 'fernandolorca@gmail.com',
      password: 'passwordd',
    };

    await userMiddlewares.signInVerificationByEmail(
      mockRequest,
      mockResponse,
      mockNextFn
    );

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      ok: false,
      status: 400,
      message: 'Incorrect password',
    });
  });
});
