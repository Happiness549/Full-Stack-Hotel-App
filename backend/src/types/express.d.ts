import { User } from "./hotel.types";

declare global {
    namespace Express {
        export interface Request{
            user?: User;
        }
    }
}