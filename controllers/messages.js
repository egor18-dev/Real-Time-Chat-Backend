import { validateMessage } from "../schemes/message.js";
import Message from '../models/message.js';

const sendMessage = async (req, res) => {
    const {message} = req.body;

    const messageValidation = validateMessage(req.body);

    if(messageValidation.error){
        return res.status(422).json({message: messageValidation});
    }

    try{
        const completedMessage = Message({message: message});  
        const savedMessage = await completedMessage.save();
    
        if(!savedMessage){
            return res.status(500).json({message: "Error al crear el mensaje"});
        }

        return res.status(201).json({message: "Mensaje enviado"});
    }catch(err){
        return res.status(500).json({message: err.message});
    }


}

export default sendMessage;