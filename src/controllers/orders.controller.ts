import Orders from "../models/Orders";
import {Response, Request, NextFunction} from "express";

const orders = new Orders()

export const currentOrderByUser = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const order = await orders.get(req.params.uid as unknown as number)
        res.status(200)
        res.send(order)
    }catch (error){
        next(error)
    }
}