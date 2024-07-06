import { DataTypes } from "sequelize";
import { Status } from "../constants/index.js";
import { sequelize } from "../database/database.js";
import { Task } from "./task.js";
import {encriptar} from "../common/bycript.js";
import logger from "../logs/logger.js";

export const User= sequelize.define('users',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    username:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate:{
            notNull:{
                msg:'Ingrese el nombre del usuario'
            },
        }
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notNull:{
                msg:'Ingrese la contraseña'
            },
        }
    },
    status:{
        type:DataTypes.STRING,
        defaultValue: Status.ACTIVE,
        validate:{
            isIn:{
                args:[[Status.ACTIVE,Status.INACTIVE]],
                msg:`El estado solo puede ser ${Status.ACTIVE} o ${Status.INACTIVE}`, 
            }  
        }
    }
});
//FORMA AUTOMATICA
User.hasMany(Task);
//pero una tarea solo pertenece a un usuario
Task.belongsTo(User);

//RELACION MANUAL
//un usuario tiene muchas tareas
/*
User.hasMany(Task, { 
    foreignKey: 'user_id',
    sourceKey: 'id'
 });

 //una tarea pertenece a un usuario
 Task.belongsTo(User, {
    foreignKey: 'user_id',
    targetKey: 'id'
 })
    */

 User.beforeCreate(async (user) => {
    try {
        user.password = await encriptar(user.password);
    } catch (error) {
        logger.error(error.message);
        throw new Error('Error al encriptar la contraseña');
    }
});

User.beforeUpdate(async (user) => {
    try {
        user.password = await encriptar(user.password);
    } catch (error) {
        logger.error(error.message);
        throw new Error('Error al encriptar la contraseña');
    }
});