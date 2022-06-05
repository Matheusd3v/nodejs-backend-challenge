import {
    ITodo,
    ITodoUpdate,
} from "../repositories/todos/todosInterface.repository";
import { IUser } from "../repositories/user/interfaceUser.repository";

interface ITodoShapeUpdate {
    description: string;
    deadline: string;
}

declare global {
    namespace Express {
        interface Request {
            validated: IUser | ITodo | ITodoShapeUpdate;
            decoded: { [key: string]: string };
            todo: ITodo;
        }
    }
}
