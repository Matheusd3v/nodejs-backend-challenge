import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users_admin")
class Admin {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", length: 250, unique: true })
    email: string;

    @Column({ type: "text", select: false })
    password: string;

    @Column({ type: "text", select: false, name: "admin_key" })
    adminKey: string;
}

export { Admin };
