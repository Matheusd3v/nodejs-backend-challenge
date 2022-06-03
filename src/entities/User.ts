import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Todo } from "./Todo";

@Entity("users")
class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", length: 250, unique: true })
    email: string;

    @Column({ type: "text", select: false })
    password: string;

    @OneToMany(() => Todo, (todo) => todo.user)
    todos: Todo[];
}

export { User };
