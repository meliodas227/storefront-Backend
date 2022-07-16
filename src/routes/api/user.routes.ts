import {Router} from "express";
import * as controller from '../../controllers/users.controller'
import AuthMiddleware from "../../middleWare/auth.middleware";
const router = Router();

router.route('/').post(AuthMiddleware,controller.createUser).get(AuthMiddleware,controller.getAll)
router.get('/:id',AuthMiddleware,controller.getOne)

router.post('/auth',controller.auth)

export default router
