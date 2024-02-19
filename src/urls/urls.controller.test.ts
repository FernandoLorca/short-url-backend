import { mockRequest, mockResponse } from 'jest-mock-req-res';
import { Urls } from './urls.model';
import { urlsController } from './urls.controller';

const mockUser = {
  id: 'user_id_mock',
  username: 'username_mock',
  email: 'email@example.com',
  refreshToken: 'refresh_token_mock',
};

const mockUrl = {
  url: 'https://example.com/original',
  shortLink: 'short_link_mock',
  hash: 'hashed_url_mock',
};

describe('storageUrlDatabase', () => {
  it('Should store URL in database and return the stored data', async () => {
    const req = mockRequest({
      user: mockUser,
      url: mockUrl,
      body: { customLink: 'custom_link_mock' },
    });
    const res = mockResponse();

    Urls.create = jest.fn().mockResolvedValue({
      dataValues: {
        id: 'stored_id_mock',
        original: mockUrl.url,
        short: `${process.env.DOMAIN}${mockUrl.shortLink}`,
        customLink: 'custom_link_mock',
      },
    });

    await urlsController.storageUrlDatabase(req, res);

    expect(Urls.create).toHaveBeenCalledWith({
      original: mockUrl.url,
      short: `${process.env.DOMAIN}${mockUrl.shortLink}`,
      hash: mockUrl.hash,
      userId: mockUser.id,
      customLink: 'custom_link_mock',
    });

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      ok: true,
      status: 201,
      user: {
        id: mockUser.id,
        username: mockUser.username,
        email: mockUser.email,
        token: mockUser.refreshToken,
      },
      data: {
        id: 'stored_id_mock',
        originalUrl: mockUrl.url,
        shortUrl: `${process.env.DOMAIN}${mockUrl.shortLink}`,
        customLink: 'custom_link_mock',
      },
    });
  });
});
