import "reflect-metadata";
import { DataSource } from "typeorm";
import { Customer } from "../entities/Customer";
import { Gender } from "../entities/Gender";
import { Title } from "../entities/Title";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true, // Auto-creates database tables based on entities for easy testing
    logging: false,
    entities: [Customer, Gender, Title],
    migrations: [],
    subscribers: [],
});