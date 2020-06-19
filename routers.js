const router = require("express").Router();

//Controller
const UserController = require("./Controllers/UserController");

router.route("/user").get(UserController.get).post(UserController.store);
router
  .route("/user/:id")
  .get(UserController.show)
  .patch(UserController.update)
  .delete(UserController.destroy);

//Return
module.exports = router;
