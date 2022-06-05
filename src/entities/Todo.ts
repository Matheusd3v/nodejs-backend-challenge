import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn,
} from "typeorm";

import { User } from "./User";

@Entity("todos")
@Unique(["user", "description"])
class Todo {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

    @Column({
        type: "varchar",
        length: 100,
        name: "finished_at",
        nullable: true,
    })
    finishedAt: Date;

    @Column()
    deadline: Date;

    @Column({ type: "varchar", length: 250 })
    description: string;

    @Column({ nullable: true })
    done: boolean;

    @Column({ default: false })
    overdue: boolean;

    @ManyToOne(() => User, (user) => user.todos, { onDelete: "CASCADE" })
    user: User;
}

export { Todo };
