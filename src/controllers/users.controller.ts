import Users from "../models/Users";
import {Request,Response,NextFunction} from "express";
import jwt from 'jsonwebtoken'
import config from '../config'

const users = new Users();

export const createUser = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const user = await users.create(req.body)
        res.json({messege:"success",user:{...user}});
    }catch (error){
        next(error)
    }
}

export const getAll = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const user = await users.getAll();
        res.send(user);
    } catch (error){
        next(error)
    }
}

export const getOne = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const user = await users.getOne(req.params.id as unknown as number)
        res.status(200)
        res.send(user)
    } catch (error){
        next(error)
    }
}

export const auth = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const {userName,password} = req.body
        const user = await users.auth(userName,password)
        const token = jwt.sign({user},config.token as unknown as string)
        if (!user){
            return res.status(400).send('user name or password not correct.');
        }
        return res.json({...user,token})
    } catch (error){
        next(error)
    }
}