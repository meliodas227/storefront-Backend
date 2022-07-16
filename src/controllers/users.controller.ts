import Users from "../models/Users";
import {Request,Response,NextFunction} from "express";

const users = new Users();

export const createUser = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        console.log(req.body)
        const user = await users.create(req.body)
        res.send("success");
        res.send({...user});
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