import { usersController } from './users.controller';
import { Request, Response } from 'express';

const mockRequest: Request = {} as Request;
const mockResponse: Response = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
} as any;
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn().mockResolvedValue('generateToken'),
}));

describe('createUser', () => {
  it('Should create a new user', async () => {
    mockRequest.body = {
      username: 'Roberto Lara',
      email: 'weqdfqwef.fewfwef.4@gmail.com',
      password: 'password',
    };

    await usersController.createUser(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({
      ok: true,
      status: 201,
      message: 'User created',
      user: {
        id: 1,
        username: 'Roberto Lara',
        email: 'rlaraaaa@gmail.com',
        token: 'token',
      },
    });
  });
});
