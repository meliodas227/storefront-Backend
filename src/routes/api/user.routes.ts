import {Router} from "express";
import * as controller from '../../controllers/users.controller'
const router = Router();

router.post('/',controller.createUser).get('/',controller.getAll).get('/:id',controller.getOne)

export default router
