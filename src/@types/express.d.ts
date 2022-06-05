import { ITodo } from "../repositories/todos/todosInterface.repository";
import { IUser } from "../repositories/user/interfaceUser.repository";

interface ITodoShape {
    description: string;
    deadline: string;
}

interface IPaginated {
    per_page: number;
    page: number;
}

declare global {
    namespace Express {
        interface Request {
            validated: IUser | ITodo | ITodoShape;
            decoded: { [key: string]: string };
            todo: ITodo;
            paginated: IPaginated;
        }
    }
}
