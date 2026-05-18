import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Customer } from "./Customer";

@Entity()
export class Gender {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @OneToMany(() => Customer, (customer) => customer.gender)
    customers: Customer[];
}