import {Router} from "express";
import * as controller from '../../controllers/products.controller'

const router = Router();

router.route('/').post(controller.createProduct).get(controller.index)
router.route('/:id').get(controller.show)

export default router