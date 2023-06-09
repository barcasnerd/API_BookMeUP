import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany, ManyToOne } from "typeorm";
import { LectureList } from "./lecture-list.model";
import { Rank } from "./rank.model";
import { Session } from "./session.model";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: true })
    email!: string;

    @Column({ nullable: true })
    password!: string;

    @Column({ nullable: true })
    username!: string;

    @Column({ nullable: true })
    description!: string;

    @Column({ nullable: true, default: "name" })
    name?: string;

    @Column({ nullable: true })
    gender!: string;

    @Column({ nullable: true })
    avatarUrl!: string;

    @Column({ default: 0 })
    rate!: number;

    @OneToMany(() => Rank, rank => rank.user, { cascade: true })
    ranks!: Rank[]

    @OneToMany(() => Session, session => session.user, { cascade: true })
    sessions!: Session[]

    @OneToMany(() => User, user => user.me, { cascade: true })
    friends!: User[]

    @ManyToOne(() => User, (user) => user.friends)
    @JoinColumn()
    me!: User;

    @OneToOne(() => LectureList, (readingList) => readingList.user)
    @JoinColumn()
    readingList?: LectureList;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt!: Date;

    constructor(email: string, password: string, username: string, description: string, gender: string, avatarUrl: string) {
        this.email = email;
        this.password = password;
        this.username = username;
        this.description = description;
        this.gender = gender;
        this.avatarUrl = avatarUrl;
    }
}
