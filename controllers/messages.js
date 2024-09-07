import { validateMessage } from "../schemes/message.js";

const sendMessage = (req, res) => {
    
    const messageValidation = validateMessage(req.body);

    if(messageValidation.error){
        return res.status(422).json({message: messageValidation});
    }

}

export default sendMessage;