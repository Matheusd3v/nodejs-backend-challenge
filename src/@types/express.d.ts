import { IUser } from "../repositories/user/interfaceUser.repository";

declare global {
    namespace Express {
        interface Request {
            validated: IUser;
        }
    }
}
