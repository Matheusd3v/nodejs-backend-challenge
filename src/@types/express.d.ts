import { ITodo } from "../repositories/todos/todosInterface.repository";
import { IUser } from "../repositories/user/interfaceUser.repository";

declare global {
    namespace Express {
        interface Request {
            validated: IUser | ITodo;
            decoded: { [key: string]: string };
            todo: ITodo;
        }
    }
}
