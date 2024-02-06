import dotenv from 'dotenv';
dotenv.config();
import { Request, Response, NextFunction } from 'express';
import { urlsMiddlewares } from './urls.middlewares';

interface CustomRequest extends Request {
  headers: {
    authorization: string;
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

describe('verifyToken', () => {
  beforeEach(() => {
    process.env.JWT_SECRET;
  });

  it("should return 401 if token dosen't exist", () => {
    mockRequest.headers.authorization = '';

    urlsMiddlewares.verifyToken(mockRequest, mockResponse, mockNextFn);
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

    urlsMiddlewares.verifyToken(mockRequest, mockResponse, mockNextFn);
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

    urlsMiddlewares.verifyToken(mockRequest, mockResponse, mockNextFn);
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

    urlsMiddlewares.verifyToken(mockRequest, mockResponse, mockNextFn);
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

    urlsMiddlewares.verifyToken(mockRequest, mockResponse, mockNextFn);
    expect(mockNextFn).toHaveBeenCalled();
  });
});
