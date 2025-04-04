import express from 'express'
import { DocumentService } from '../services/document.service';


const router = express.Router();
const documentService = new DocumentService();


router.get('/:id', async(req, res) => {
    const docId = Number(req.params.id);

    if (!req.user) {
        return 
      }    

    const doc = await documentService.getDocument(req.user.id, docId);
    res.json(doc)
})

export default router;  



