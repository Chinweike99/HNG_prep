import db from '../db/db';
import { DocumentAccess } from '../models/types';


export class DocumentService {
    async getDocument(userId: number, docId: number): Promise<DocumentAccess<boolean>>{
        const [user, document] = await Promise.all([
            db.query('SELECT * FROM users WHERE id = $1', [userId]),
            db.query('SELECT * FROM documents WHERE id = $1', [docId])
        ]);

        const hasAccess = document.is_public || user.role === 'admin';
        return hasAccess 
        ? {content: document.content} 
        : {error: "unauthorized"}
    }
}


