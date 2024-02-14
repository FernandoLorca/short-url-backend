import dotenv from 'dotenv';
dotenv.config();
import { Request, Response, NextFunction } from 'express';
import { urlsMiddlewares } from './urls.middlewares';

const mockRequest = {} as Request;

const mockResponse: Response = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
} as any;

const mockNextFn: NextFunction = jest.fn();

describe('JSONValidation', () => {
  it('Should pass JSONValidation for shorten with one object key and a string object value', () => {
    mockRequest.body = {
      url: 'https://google.com/',
    };

    urlsMiddlewares.JSONValidation(mockRequest, mockResponse, mockNextFn);
    expect(mockNextFn).toHaveBeenCalled();
  });

  it('Should return 400 for shorten with one object key and a string object value', () => {
    mockRequest.body = {
      urll: 'https://google.com/',
    };

    urlsMiddlewares.JSONValidation(mockRequest, mockResponse, mockNextFn);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      ok: false,
      status: 400,
      message: 'Invalid JSON',
    });
  });

  it('Should return 400 for shorten with one object key and a number object value', () => {
    mockRequest.body = {
      url: 999,
    };

    urlsMiddlewares.JSONValidation(mockRequest, mockResponse, mockNextFn);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      ok: false,
      status: 400,
      message: 'Invalid JSON',
    });
  });

  it('Should pass JSONValidation for shorten with two object key and a strings object values', () => {
    mockRequest.body = {
      url: 'https://google.com/',
      customLink: 'custom-link',
    };

    urlsMiddlewares.JSONValidation(mockRequest, mockResponse, mockNextFn);
    expect(mockNextFn).toHaveBeenCalled();
  });

  it('Should return 400 for shorten with two object key and a strings object values', () => {
    mockRequest.body = {
      urll: 'https://google.com',
      customLinkk: 'custom-link',
    };

    urlsMiddlewares.JSONValidation(mockRequest, mockResponse, mockNextFn);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      ok: false,
      status: 400,
      message: 'Invalid JSON',
    });
  });

  it('Should return 400 for shorten with two object key and a bollean and number object values', () => {
    mockRequest.body = {
      url: 999,
      customLink: false,
    };

    urlsMiddlewares.JSONValidation(mockRequest, mockResponse, mockNextFn);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      ok: false,
      status: 400,
      message: 'Invalid JSON',
    });
  });

  it('Shoul pass JSONValidation for update with 2 object keys and string object values', () => {
    mockRequest.body = {
      urlLinkToUpdate: 'https://google.com/',
      customLink: 'custom-link',
    };

    urlsMiddlewares.JSONValidation(mockRequest, mockResponse, mockNextFn);
    expect(mockNextFn).toHaveBeenCalled();
  });

  it('Should return 400 for update with two object keys and a string object values', () => {
    mockRequest.body = {
      urlLinkToUpdatee: 'https://google.com/',
      customLinkk: 'custom-link',
    };

    urlsMiddlewares.JSONValidation(mockRequest, mockResponse, mockNextFn);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      ok: false,
      status: 400,
      message: 'Invalid JSON',
    });
  });

  it('Should return 400 for update with two object keys and a boolean and number object values', () => {
    mockRequest.body = {
      urlLinkToUpdatee: true,
      customLinkk: 999,
    };

    urlsMiddlewares.JSONValidation(mockRequest, mockResponse, mockNextFn);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      ok: false,
      status: 400,
      message: 'Invalid JSON',
    });
  });

  it('Should pass JSONValidation for delete with one object key and number objet value', () => {
    mockRequest.body = {
      id: 1,
    };

    urlsMiddlewares.JSONValidation(mockRequest, mockResponse, mockNextFn);
    expect(mockNextFn).toHaveBeenCalled();
  });

  it('Should return 400 for delete with one object key and number object value', () => {
    mockRequest.body = {
      ids: 1,
    };

    urlsMiddlewares.JSONValidation(mockRequest, mockResponse, mockNextFn);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      ok: false,
      status: 400,
      message: 'Invalid JSON',
    });
  });

  it('Should return 400 for delete with two object keys and number object values', () => {
    mockRequest.body = {
      ids: 1,
      another: 999,
    };

    urlsMiddlewares.JSONValidation(mockRequest, mockResponse, mockNextFn);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      ok: false,
      status: 400,
      message: 'Invalid JSON',
    });
  });

  it('Should return 400 for delete with one object key and a string object value', () => {
    mockRequest.body = {
      id: '2',
    };

    urlsMiddlewares.JSONValidation(mockRequest, mockResponse, mockNextFn);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      ok: false,
      status: 400,
      message: 'Invalid JSON',
    });
  });
});

describe('urlsValidation', () => {
  it('Should pass urlsValidation with correct https: protocol', () => {
    mockRequest.body = {
      url: 'https://google.com/',
    };

    urlsMiddlewares.urlsValidation(mockRequest, mockResponse, mockNextFn);
    expect(mockNextFn).toHaveBeenCalled();
  });

  it('Should pass urlsValidation with correct https: protocol', () => {
    mockRequest.body = {
      url: 'http://google.com/',
    };

    urlsMiddlewares.urlsValidation(mockRequest, mockResponse, mockNextFn);
    expect(mockNextFn).toHaveBeenCalled();
  });

  it('Should return 400 for not passing an url', () => {
    mockRequest.body = {
      url: '',
    };

    urlsMiddlewares.urlsValidation(mockRequest, mockResponse, mockNextFn);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      ok: false,
      status: 400,
      message: "Urls dosn't exist",
    });
  });

  it('Should return 400 for bad https: or http: protocol validator', () => {
    mockRequest.body = {
      url: 'httpss://google.com/',
    };

    urlsMiddlewares.urlsValidation(mockRequest, mockResponse, mockNextFn);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      ok: false,
      status: 400,
      message: 'Invalid URL',
    });
  });

  it('Should return 400 for invalid URL', () => {
    mockRequest.body = {
      url: 'google.com/',
    };

    urlsMiddlewares.urlsValidation(mockRequest, mockResponse, mockNextFn);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      ok: false,
      status: 400,
      message: 'Invalid URL',
    });
  });

  it("Should return 400 for missing '/'", () => {
    mockRequest.body = {
      url: 'https://google.com',
    };

    urlsMiddlewares.urlsValidation(mockRequest, mockResponse, mockNextFn);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      ok: false,
      status: 400,
      message: "End of URL must have a '/'",
    });
  });
});
