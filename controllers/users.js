import { validateUser } from "../schemes/user.js";
import User from "../models/user.js";
import br from 'bcrypt';
import jwt from 'jsonwebtoken';

export const createUser = async (req, res) => {
    const {username, password} = req.body;

    const userValidation = validateUser(req.body);

    if(userValidation.error){
        return res.status(422).json({message: userValidation.error.issues[0].message})
    }

    try{

        const passwordHash = await br.hash(password, 10);
        const completeUser = User({username: username, password: passwordHash});
        const savedUser = await completeUser.save();

        if(!savedUser){
            return res.status(500).json({error: "Error al crear el usuario"});
        }

        return res.status(201).json({message: "Usuario creado"});

    }catch(err) {
        res.status(500).json({message: err.message});
    }
}

export const signIn = async (req, res) => {
    
    const {username, password} = req.body;

    const userValidation = validateUser(req.body);

    if(userValidation.error){
        return res.status(422).json({message: userValidation.error.issues[0].message})
    }

    const person = await User.findOne({username: username});

    if(!person){
        return res.status(422).json({message: "Usuario o contraseña incorrecta"});
    }

    const passwordVerify = await br.compare(password, person.password);
    
    if(!passwordVerify){
        return res.status(422).json({message: "Usuario o contraseña incorrecta"});
    }

    const token = jwt.sign(
        {id: person.id},
        process.env.SECRET_KEY,
        {expiresIn: '1h'}
    );

    res.cookie('token', token, {
        maxAge: 1000 * 60 * 60,
        httpOnly: true, 
        secure: false,
    });

    return res.status(200).json({message: `Welcome ${token}`});
}   
