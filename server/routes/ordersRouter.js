const Router = require('express');
const router = new Router();

const ordersController = require('./../controllers/ordersController');
const checkRole = require('./../middleware/checkRoleMiddleware');
const authMiddleware = require("../middleware/authMiddleware");

router
    .post('/', authMiddleware, ordersController.create)
    .get('/', checkRole("ADMIN"), ordersController.getAll)
    .get('/:id', checkRole("ADMIN"), ordersController.getOne)
    .put('/', checkRole("ADMIN"), ordersController.updateOrder)
    .delete('/', checkRole("ADMIN"), ordersController.deleteOrder);


module.exports = router;
