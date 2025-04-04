import db from "../db/db";
import {UserRole, userWithPermissions} from '../models/types';


export class UserService {
    async getUser<T extends UserRole>(id: number): Promise<userWithPermissions<T>>{
        const user = await db.one('SELECT * FROM users where id = $1', [id]);;

        return{
            ...user,
            canEdit: user.role === 'admin' || user.role === 'editor',
            canDelete: user.role === 'admin'
        } as userWithPermissions<T>;
    }
}


