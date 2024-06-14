import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Task } from "../entities/task.entity";

dotenv.config();

const connection = new DataSource({
  type: "mysql",
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  synchronize: true,
  logging: true,
  entities: [ Task],
});

export default connection;
