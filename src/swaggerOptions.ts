import dotenv from 'dotenv';
dotenv.config();

export const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'URL Shortener',
      version: '0.0.1',
      description: 'Api to shorten urls',
    },
    servers: [
      {
        url: `${process.env.DOMAIN}`,
      },
    ],
  },
  apis: ['./src/users/users.routes.ts'],
};
