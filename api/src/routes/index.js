const { Router } = require("express");
const bodyParser = require("body-parser");

//----------------------------------------------------------------------------//
//---------------------------MODULES-IMPORTS----------------------------------//
//----------------------------------------------------------------------------//

const productRouter = require("./Path/product.js");
const categoryRouter = require("./Path/category.js");
const homeRouter = require("./Path/home");
const userRouter = require("./Path/user");
const userOrder = require("./Path/userOrder");
const order = require("./Path/order");
const reviewRouter = require("./Path/review");

//----------------------------------------------------------------------------//
//-----------------------MIDDLEWARES-FUNCIONAL--------------------------------//
//----------------------------------------------------------------------------//

const router = Router();
router.use(bodyParser.json());

//----------------------------------------------------------------------------//
//-----------------------MIDDLEWARES-ROUTES-----------------------------------//
//----------------------------------------------------------------------------//

router.use("/products/category", categoryRouter);
router.use("/products", productRouter);
router.use("/product", reviewRouter);
router.use("/auth", userRouter);
router.use("/users", userOrder);
router.use("/orders", order);
router.use("/", homeRouter);




module.exports = router;
