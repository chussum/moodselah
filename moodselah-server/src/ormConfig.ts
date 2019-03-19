import { ConnectionOptions } from "typeorm";

const connectionOptions: ConnectionOptions = {
  type: "mariadb",
  database: "moodselah",
  synchronize: true,
  logging: false,
  entities: ["entities/**/*.*"],
  host: process.env.DB_ENDPOINT,
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD
};

export default connectionOptions;
