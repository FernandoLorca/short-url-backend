import dotenv from 'dotenv';
import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';
import usersRouter from './users/users.routes';
import urlsRouter from './urls/urls.routes';

dotenv.config();
const app: Application = express();

const swaggerDocument = YAML.load('./src/swagger/apiDocumentation.yaml');

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(
  `${process.env.API_VERSION}/docs`,
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocument)
);
app.use(`${process.env.API_VERSION}/user`, usersRouter);
app.use(`${process.env.API_VERSION}/urls`, urlsRouter);

export default app;
