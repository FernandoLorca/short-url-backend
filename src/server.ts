import app from './app';
import { sequelize } from './database/connection';
import './users/users.model';
import './urls/urls.model';

const port = process.env.PORT || 3000;

const main = async () => {
  try {
    await sequelize.sync({ force: true });
    app.listen(port, () => console.log(`Server is running on port ${port}`));
  } catch (error) {
    console.error(`Unable to connect to the database: ${error}`);
  }
};
main();
