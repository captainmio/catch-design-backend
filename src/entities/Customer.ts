import { Entity, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Gender } from "./Gender";
import { Title } from "./Title";

@Entity()
export class Customer {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    first_name!: string;

    @Column()
    last_name!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    ip_address!: string;

    @Column({ nullable: false })
    company!: string;

    @Column()
    city!: string;

    @Column()
    website!: string;

    @ManyToOne(() => Gender, (gender) => gender.customers)
    @JoinColumn({ name: 'gender_id' })
    gender: Gender;

    @ManyToOne(() => Title, (title) => title.customers)
    @JoinColumn({ name: 'title_id' })
    title: Title;

    @CreateDateColumn({
        type: 'datetime',
    })
    createdAt!: Date;

    @UpdateDateColumn({
        type: 'datetime',
    })
    updatedAt!: Date;
}