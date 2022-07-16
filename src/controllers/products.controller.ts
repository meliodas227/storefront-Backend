import Products from "../models/Products";
import {Response,Request,NextFunction} from "express";

const products = new Products()

export const createProduct = async (req:Request,res:Response,next:any)=>{
    try {
        const product = await products.create(req.body)
        res.status(200)
        res.send(product)
    }catch (error){
        next(error)
    }
}

export const index= async (req:Request,res:Response,next:NextFunction) => {
    try {
        const product = await products.getAll()
        res.status(200)
        res.send(product)
    }catch (error){
        next(error)
    }
}

export const show = async (req:Request,res:Response,next:any) => {
    try {
        const product = await products.getOne(req.params.id as unknown as number)
        res.status(200)
        res.send(product)
    }catch (error){
        next(error)
    }
}