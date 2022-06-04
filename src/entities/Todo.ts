import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

import { User } from "./User";

@Entity("todos")
class Todo {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

    @Column({ name: "finished_at", nullable: true })
    finishedAt: Date;

    @Column()
    deadline: Date;

    @Column({ type: "varchar", length: 550, unique: true })
    description: string;

    @Column({ nullable: true })
    done: boolean;

    @Column({ default: false })
    overdue: boolean;

    @ManyToOne(() => User, (user) => user.todos)
    user: User;
}

export { Todo };
