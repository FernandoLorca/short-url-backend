import dotenv from 'dotenv';
dotenv.config();
import { Request, Response, NextFunction } from 'express';
import { userMiddlewares } from '../users/users.middlewares';

interface CustomRequest extends Request {
  headers: {
    authorization: string;
  };
}

interface RequestWithToken extends CustomRequest {
  token: {
    decoded: {
      id: number;
      email: string;
      iat: number;
      exp: number;
    };
    token: string;
    tokenExpired: boolean;
  };
}

const mockRequest = {
  headers: {
    authorization: '',
  },
} as CustomRequest;

const mockResponse: Response = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
} as any;

const mockNextFn: NextFunction = jest.fn();

const mockTokenRequest = {
  token: {
    decoded: {},
    token: '',
    tokenExpired: false,
  },
} as RequestWithToken;

describe('verifyToken', () => {
  beforeEach(() => {
    process.env.JWT_SECRET;
  });

  it("should return 401 if token dosen't exist", () => {
    mockRequest.headers.authorization = '';

    userMiddlewares.verifyToken(mockRequest, mockResponse, mockNextFn);
    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({
      ok: false,
      status: 401,
      message: 'Token is required',
    });
  });

  it('Should return 401 if token is expired', () => {
    mockRequest.headers.authorization =
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImVtYWlsIjoiZmVybmFuZG9sb3JjYUBnbWFpbC5jb20iLCJpYXQiOjE3MDY3Mjc2NjAsImV4cCI6MTcwNjgxNDA2MH0.jumm1djyRvE4sLkg33zFTQB51DoHTV4-2KUzdaav94I';

    userMiddlewares.verifyToken(mockRequest, mockResponse, mockNextFn);
    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({
      ok: false,
      status: 401,
      message: 'Token expired',
    });
  });

  it('Should return 500 Internal error for invalid token', () => {
    mockRequest.headers.authorization =
      'Bearer yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImVtYWlsIjoiZmVybmFuZG9sb3JjYUBnbWFpbC5jb20iLCJpYXQiOjE3MDY3Mjc2NjAsImV4cCI6MTcwNjgxNDA2MH0.jumm1djyRvE4sLkg33zFTQB51DoHTV4-2KUzdaav94I';

    userMiddlewares.verifyToken(mockRequest, mockResponse, mockNextFn);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      ok: false,
      status: 500,
      message: 'Internal server error: invalid token',
    });
  });

  it('Should return 500 Internal error for invalid signature', () => {
    mockRequest.headers.authorization =
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImVtYWlsIjoiZmVybmFuZG9sb3JjYUBnbWFpbC5jb20iLCJpYXQiOjE3MDY3Mjc2NjAsImV4cCI6MTcwNjgxNDA2MH0.jumm1djyRvE4sLkg33zFTQB51DoHTV4-2KUzdaav94';

    userMiddlewares.verifyToken(mockRequest, mockResponse, mockNextFn);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      ok: false,
      status: 500,
      message: 'Internal server error: invalid signature',
    });
  });

  it('Should pass with valid token', () => {
    mockRequest.headers.authorization =
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImVtYWlsIjoiZmVybmFuZG9sb3JjYUBnbWFpbC5jb20iLCJpYXQiOjE3MDY3Mjc2NjAsImV4cCI6MTcwNjgxNDA2MH0.jumm1djyRvE4sLkg33zFTQB51DoHTV4-2KUzdaav94I';

    userMiddlewares.verifyToken(mockRequest, mockResponse, mockNextFn);
    expect(mockNextFn).toHaveBeenCalled();
  });
});

describe('refreshToken', () => {
  it('Should return 404 for user not found', async () => {
    mockTokenRequest.token.decoded = {
      id: 9999,
      email: 'fernandolorca@gmail.com',
      iat: 1706727660,
      exp: 1706814060,
    };
    mockTokenRequest.token.token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImVtYWlsIjoiZmVybmFuZG9sb3JjYUBnbWFpbC5jb20iLCJpYXQiOjE3MDcyMjEzOTgsImV4cCI6MTcwNzMwNzc5OH0.QULNBpRHC6S43CYMx3Wqwf-REayx1AkLWS7-00B1Rls';
    mockTokenRequest.token.tokenExpired = false;

    await userMiddlewares.refreshToken(
      mockTokenRequest,
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

  it('Should refresh token and call next function', async () => {
    mockTokenRequest.token.decoded = {
      id: 11,
      email: 'fernandolorca@gmail.com',
      iat: 1706727660,
      exp: 1706814060,
    };
    mockTokenRequest.token.token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImVtYWlsIjoiZmVybmFuZG9sb3JjYUBnbWFpbC5jb20iLCJpYXQiOjE3MDcyMjEzOTgsImV4cCI6MTcwNzMwNzc5OH0.QULNBpRHC6S43CYMx3Wqwf-REayx1AkLWS7-00B1Rls';
    mockTokenRequest.token.tokenExpired = false;

    await userMiddlewares.refreshToken(
      mockTokenRequest,
      mockResponse,
      mockNextFn
    );

    expect(mockNextFn).toHaveBeenCalled();
  });
});
