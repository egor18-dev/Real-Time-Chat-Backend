import Router from 'express';
import {sendMessage, getAllMessages} from '../controllers/messages.js';

export const messagesRouter = Router();

messagesRouter.get('/', getAllMessages);
messagesRouter.post('/create', sendMessage);