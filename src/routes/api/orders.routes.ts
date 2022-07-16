import {Router} from "express";
import * as controller from '../../controllers/orders.controller'
import AuthMiddleware from "../../middleWare/auth.middleware";

const router = Router()

router.get('/:uid',AuthMiddleware,controller.currentOrderByUser)

export default router