import dotenv from 'dotenv';
dotenv.config();
import { Request, Response, NextFunction } from 'express';

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
