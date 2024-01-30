import { Response } from 'express';
import { usersController } from './users.controller';
import type { AuthenticatedRequest } from './types';

const mockRequest: AuthenticatedRequest = {} as AuthenticatedRequest;
const mockResponse: Response = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
} as any;

// This is the mock for the bcrypt.hash function
// It will return the same password that was passed as an argument
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn().mockReturnValue('generateToken'),
}));

describe('createUser', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.spyOn(console, 'error').mockRestore();
  });

  // it('Should create a new user', async () => {
  //   mockRequest.body = {
  //     username: 'Roberto Lara',
  //     // Must be a new email, always
  //     email: 'correo13@gmail.com',
  //     password: 'password',
  //   };

  //   await usersController.createUser(mockRequest, mockResponse);

  //   expect(mockResponse.status).toHaveBeenCalledWith(201);
  //   expect(mockResponse.json).toHaveBeenCalledWith({
  //     ok: true,
  //     status: 201,
  //     message: 'User created',
  //     user: {
  //       id: expect.any(Number),
  //       username: 'Roberto Lara',
  //       // Must match the mockRequest.body email value
  //       email: 'correo13@gmail.com',
  //       token: 'generateToken',
  //     },
  //   });
  // });

  // it('Should return an error if the email is already in use', async () => {
  //   mockRequest.body = {
  //     username: 'Roberto Lara',
  //     email: 'correo1@gmail.com',
  //     password: 'password',
  //   };

  //   await usersController.createUser(mockRequest, mockResponse);

  //   expect(mockResponse.status).toHaveBeenCalledWith(500);
  //   expect(mockResponse.json).toHaveBeenCalledWith({
  //     ok: false,
  //     status: 500,
  //     message: 'Internal server error: Validation error',
  //   });
  // });

  it('Should return an error if inputs are missing', async () => {
    mockRequest.body = {
      username: 'Roberto Lara',
    };

    await usersController.createUser(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      ok: false,
      status: 500,
      message: 'Internal server error: Illegal arguments: undefined, number',
    });
  });
});

describe('getUser', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.spyOn(console, 'error').mockRestore();
  });

  it('Should return the user if it exists', async () => {
    mockRequest.user = {
      user: {
        dataValues: {
          id: expect.any(Number),
          username: 'Fernando Lorca',
          email: 'fernandolorca@gmail.com',
          password:
            '$2a$10$nfEOm8jJDxFJLP1UV0ARx.WT0H/g1cVRalBmwsT.uOtiBWw8K1p9y',
        },
      },
    };

    await usersController.getUser(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      ok: true,
      status: 200,
      message: 'User found',
      data: {
        user: expect.objectContaining({
          id: expect.any(Number),
          username: 'Fernando Lorca',
          email: 'fernandolorca@gmail.com',
          password:
            '$2a$10$nfEOm8jJDxFJLP1UV0ARx.WT0H/g1cVRalBmwsT.uOtiBWw8K1p9y',
        }),
      },
    });
  });
});
