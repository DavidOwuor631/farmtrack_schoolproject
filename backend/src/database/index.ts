import { Sequelize } from 'sequelize';



const sequelize = new Sequelize(
  "mysql://root:Gliese581*@localhost:3306/farmtrack"
); // Example for mysql

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });
  export default sequelize;
/*const sequelize = new Sequelize('mysql://farmtrack_user:password@localhost:3306/farmtrack');

export default sequelize;*/
