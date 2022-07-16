import UserRoutes from "./api/user.routes";
import productsRoutes from "./api/products.routes";
import ordersRoutes from "./api/orders.routes";
import {Router} from "express";

const router = Router()

router.use('/users',UserRoutes)
router.use('/products',productsRoutes)
router.use('/orders',ordersRoutes)

export default router
