const router = require("express").Router();

//Controller
const UserController = require("./Controllers/UserController");
const PropertyController = require("./Controllers/PropertyController");
const CategoryController = require("./Controllers/CategoryController");
const PriceModelController = require("./Controllers/PriceModelController");
const UserGroupController = require("./Controllers/UserGroupController");
const ImageController = require("./Controllers/ImageController");
const AuthController = require("./Controllers/AuthController");
const StateController = require("./Controllers/StateController");
const CityController = require("./Controllers/CityController");
const StreetController = require("./Controllers/StreetController");
const WardController = require("./Controllers/WardController");
const ProjectController = require("./Controllers/ProjectController");
const PermissionController = require("./Controllers/PermissionController");

router.route("/login").post(AuthController.login);

router.use(AuthController.protect);

//Geo Fetch
router.route("/state").get(StateController.get);
router.route("/city/:idOrSlug").get(CityController.get);
router.route("/ward/:stateId/:cityId").get(WardController.get);
router.route("/street/:stateId/:cityId").get(StreetController.get);
router.route("/project/:stateId/:cityId").get(ProjectController.get);

// router.use(AuthController.protect);
router
    .route("/user")
    .get(AuthController.protect, AuthController.restrictTo("UserIndex"), UserController.get)
    .post(UserController.store);
router.route("/user/autoComplete").post(UserController.autoComplete);

//Geo edit
router.post("/state", StateController.store);

router
    .route("/state/:id")
    .get(StateController.show)
    .patch(StateController.update)
    .delete(StateController.destroy);

router
    .route("/user")
    .get(UserController.get, AuthController.restrictTo("UserIndex"))
    .post(UserController.store, AuthController.restrictTo("UserStore"));
router
    .route("/user/:id")
    .get(UserController.show, AuthController.restrictTo("UserShow"))
    .patch(UserController.update, AuthController.restrictTo("UserUpdate"))
    .delete(UserController.destroy, AuthController.restrictTo("UserDestroy"));

//Property
router
    .route("/property")
    .get(PropertyController.get, AuthController.restrictTo("PropertyIndex"))
    .post(PropertyController.store, AuthController.restrictTo("PropertyStore"));
router.route("/property/grid").post(PropertyController.grid);
router
    .route("/property/:id")
    .get(PropertyController.show, AuthController.restrictTo("PropertyShow"))
    .patch(PropertyController.update, AuthController.restrictTo("PropertyUpdate"))
    .delete(PropertyController.destroy, AuthController.restrictTo("PropertyDestroy"));

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
router
    .route("/user-groups")
    .get(AuthController.restrictTo("UserGroupIndex"), UserGroupController.get)
    .post(UserGroupController.store, AuthController.restrictTo("UserGroupStore"));
router
    .route("/user-groups/:id")
    .get(UserGroupController.show, AuthController.restrictTo("UserGroupShow"))
    .patch(UserGroupController.update, AuthController.restrictTo("UserGroupUpdate"))
    .delete(UserGroupController.destroy, AuthController.restrictTo("UserGroupDestroy"));

//Image
router.route("/image/upload").post(ImageController.upload);
// router
//     .route("/image/:id")
//     .get(ImageController.show)
//     .patch(ImageController.update)
//     .delete(ImageController.destroy);

router.route("/permissions").get(PermissionController.get);

//Return
module.exports = router;
