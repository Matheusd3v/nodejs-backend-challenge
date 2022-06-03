import { DeleteResult, UpdateResult } from "typeorm";

interface IUserInterface {
    id?: string;
    email: string;
    password: string;
}

interface IUserUpdate {
    email?: string;
    password?: string;
}

interface IUserRepo {
    createUser: (user: IUserInterface) => Promise<IUserInterface>;
    updateUser: (data: IUserUpdate, id: string) => Promise<UpdateResult>;
    deleteUSer: (id: string) => Promise<DeleteResult>;
}

export { IUserInterface, IUserRepo, IUserUpdate };
