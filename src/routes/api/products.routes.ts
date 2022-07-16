import {Router} from "express";
import * as controller from '../../controllers/products.controller'
import AuthMiddleware from "../../middleWare/auth.middleware";
const router = Router();

router.route('/').post(AuthMiddleware,controller.createProduct).get(controller.index)
router.get('/:id',controller.show)

export default router