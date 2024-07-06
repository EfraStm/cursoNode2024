//const express = require('express');
import express from 'express';
import morgan from 'morgan';
import {authenticateToken} from './middlewares/authenticate.middleware.js';
const app = express();
//Import routes
import usersRoutes from './routes/users.routes.js';
import tasksRoutes from './routes/tasks.routes.js';
import authRoutes from './routes/auth.routes.js';
//MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());
//RUTAS
app.use('/api/users/',usersRoutes);
app.use('/api/tasks',authenticateToken,tasksRoutes);
app.use('/api/login',authRoutes);
export default app;
