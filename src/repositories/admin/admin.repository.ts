import { Todo } from "../../entities";

interface IAdminRepo {
    retrieveAllTodos: () => Promise<Todo[]>;
    retrieveLateTodos: () => Promise<Todo[]>;
}

export { IAdminRepo };
