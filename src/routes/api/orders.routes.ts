import {Router} from "express";
import * as controller from '../../controllers/orders.controller'

const router = Router()

router.get('/:uid',controller.currentOrderByUser)

export default router