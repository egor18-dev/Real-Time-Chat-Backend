import Router from 'express';
import sendMessage from '../controllers/messages.js';

export const messagesRouter = Router();

messagesRouter.post('/create', sendMessage);