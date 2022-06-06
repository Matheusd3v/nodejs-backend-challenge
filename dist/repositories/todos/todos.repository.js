"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoRepository = void 0;
const data_source_1 = require("../../database/data-source");
const entities_1 = require("../../entities");
class TodoRepository {
    constructor() {
        this.createTodo = async (todo, userId) => {
            const query = await this.ormRepository.save({
                ...todo,
                user: { id: userId },
            });
            return query;
        };
        this.updateTodo = async (data, id) => {
            const query = await this.ormRepository.update({ id }, data);
            return query;
        };
        this.findById = async (id) => {
            const query = this.ormRepository.findOne({ where: { id } });
            return query;
        };
        this.retrieveUserTodos = async (userId) => {
            const query = await this.ormRepository.find({
                where: {
                    user: { id: userId },
                },
                order: { createdAt: "ASC" },
            });
            return query;
        };
        this.retrieveAllTodos = async (paginated) => {
            const query = await this.ormRepository.find({
                relations: { user: true },
                select: {
                    user: { email: true },
                    id: true,
                    description: true,
                    deadline: true,
                },
                skip: paginated.per_page * (paginated.page - 1),
                take: paginated.per_page,
            });
            return query;
        };
        this.retrieveAllOverdueTodos = async (paginated) => {
            const query = await this.ormRepository.find({
                relations: { user: true },
                select: {
                    user: { email: true },
                    id: true,
                    description: true,
                    deadline: true,
                    overdue: true,
                },
                where: {
                    overdue: true,
                },
                skip: paginated.per_page * (paginated.page - 1),
                take: paginated.per_page,
            });
            return query;
        };
        this.updateUserOverdueTodos = async (id) => {
            const query = await this.ormRepository
                .createQueryBuilder()
                .update()
                .set({ overdue: true })
                .where("user.id = :id and overdue = :condition and deadline < :currentDate", {
                id,
                condition: false,
                currentDate: new Date(),
            })
                .execute();
            return query;
        };
        this.ormRepository = data_source_1.AppDataSource.getRepository(entities_1.Todo);
    }
}
exports.TodoRepository = TodoRepository;
//# sourceMappingURL=todos.repository.js.map