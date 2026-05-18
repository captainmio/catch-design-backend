import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Customer } from "./Customer";

@Entity()
export class Title {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @OneToMany(() => Customer, (customer) => customer.title)
    customers: Customer[];
}