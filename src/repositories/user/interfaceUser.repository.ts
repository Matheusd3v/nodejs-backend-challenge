import { DeleteResult, UpdateResult } from "typeorm";

interface IUser {
    id?: string;
    email: string;
    password: string;
}

interface IUserUpdate {
    email?: string;
    password?: string;
}

interface IUserRepo {
    createUser: (user: IUser) => Promise<IUser>;
    updateUser: (data: IUserUpdate, id: string) => Promise<UpdateResult>;
    deleteUSer: (id: string) => Promise<DeleteResult>;
    findUser: (
        param: { [key: string]: string },
        pass?: boolean
    ) => Promise<IUser>;
}

export { IUser, IUserRepo, IUserUpdate };
