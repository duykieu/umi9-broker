const router = require("express").Router();

//Controller
const UserController = require("./Controllers/UserController");
const PropertyController = require("./Controllers/PropertyController");

router.route("/user").get(UserController.get).post(UserController.store);
router
    .route("/user/:id")
    .get(UserController.show)
    .patch(UserController.update)
    .delete(UserController.destroy);

//Property
router.route("/property").get(PropertyController.get).post(PropertyController.store);
router
    .route("/property/:id")
    .get(PropertyController.show)
    .patch(PropertyController.update)
    .delete(PropertyController.destroy);

//Return
module.exports = router;
