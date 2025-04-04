import * as express from 'express';
import { UserService } from '../services/user.service';



const router = express.Router();
const userService = new UserService();

router.get('/:id', async(req, res) => {
    const userId = Number(req.params.id)
    if(isNaN(userId)){
        return 
        // return res.status(400).json({error: "Invalid user"})
    }

    const user = await userService.getUser(userId);
    res.json(user);
})

export default router;


