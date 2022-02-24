const router = require("express").Router();
const controller = require("./theaters.controller");
const methodNotAllowed = require("../utils/errors/methodNotAllowed");

route 
    .route("/")
    .get(controller.list)
    .all(methodNotAllowed);

    module.exports = router;