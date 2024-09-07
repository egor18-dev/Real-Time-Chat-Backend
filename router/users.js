import { Router } from "express";
import { createUser, signIn} from "../controllers/users.js";
import {tokenMiddleware} from "../middleware/token.js";

export const userRouter = Router();

userRouter.get('/hello', (req, res) => {
    res.json({message: "Hola Mundo"});
}); 

userRouter.post('/create', createUser);
userRouter.post('/enter', signIn);

userRouter.get('/', tokenMiddleware, (req, res) => {
    res.status(200).json({"message": "User authenticated"});
});


export default userRouter;