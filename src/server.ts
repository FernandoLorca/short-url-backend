import dotenv from 'dotenv';
import express, { Request, Response, Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';

dotenv.config();
const app: Application = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
