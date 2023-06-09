import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToMany, JoinColumn, JoinTable } from "typeorm";
import { User } from "./user.model";
import { Book } from "./book.model";

@Entity()
export class LectureList {
    @PrimaryGeneratedColumn()
    id!: number;

    @OneToOne(() => User, (user) => user.readingList)
    user: User;

    @ManyToMany(() => Book, book => book.readingLists)
    @JoinTable()
    books: Book[];

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt!: Date;

    constructor(user: User, books: Book[]) {
        this.user = user;
        this.books = books;
    }
}
