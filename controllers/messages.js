import { validateMessage } from "../schemes/message.js";
import Message from '../models/message.js';
import { getActualUserId } from "./users.js";
import jwt from 'jsonwebtoken';
import User from "../models/user.js";

export const sendMessage = async (req, res) => {
    const {message} = req.body;

    const messageValidation = validateMessage(req.body);

    if(messageValidation.error){
        return res.status(422).json({message: messageValidation});
    }

    const userCookies = getActualUserId(req);

    if(!userCookies.token){
        return res.status(401).json({message: "Porfavor inicia sesión"})
    }

    try{
    const userId = jwt.verify(userCookies.token, process.env.SECRET_KEY);
        const completedMessage = Message({userId: userId.id, message: message});  
        const savedMessage = await completedMessage.save();

        if(!savedMessage){
            return res.status(500).json({message: "Error al crear el mensaje"});
        }

        return res.status(201).json({message: "Mensaje enviado"});
    }catch(err){
        return res.status(500).json({message: err.message});
    }


}

export const getAllMessages = async (req, res) => {
    try{
        const allUsers = await Message.find({});
        res.json(allUsers);
    }catch(err){
        return res.status(500).json({message: "Error al cargar los mensajes"});
    }
}
