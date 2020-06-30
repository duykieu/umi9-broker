const router = require("express").Router();

//Controller
const UserController = require("./Controllers/UserController");
const PropertyController = require("./Controllers/PropertyController");
const CategoryController = require("./Controllers/CategoryController");
const PriceModelController = require("./Controllers/PriceModelController");
const UserGroupController = require("./Controllers/UserGroupController");
const ImageController = require("./Controllers/ImageController");
const AuthController = require("./Controllers/AuthController");

router.route("/login").post(AuthController.login);

router.use(AuthController.protect);
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

//Category
router.route("/category").get(CategoryController.get).post(CategoryController.store);
router
    .route("/category/:id")
    .get(CategoryController.show)
    .patch(CategoryController.update)
    .delete(CategoryController.destroy);

//Price Model
router.route("/priceModel").get(PriceModelController.get).post(PriceModelController.store);
router
    .route("/priceModel/:id")
    .get(PriceModelController.show)
    .patch(PriceModelController.update)
    .delete(PriceModelController.destroy);

//User Group
router.route("/userGroup").get(UserGroupController.get).post(UserGroupController.store);
router
    .route("/userGroup/:id")
    .get(UserGroupController.show)
    .patch(UserGroupController.update)
    .delete(UserGroupController.destroy);

//Image
router.route("/image/upload").post(ImageController.upload);
// router
//     .route("/image/:id")
//     .get(ImageController.show)
//     .patch(ImageController.update)
//     .delete(ImageController.destroy);

//Return
module.exports = router;
