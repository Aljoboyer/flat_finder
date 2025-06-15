const { updateAllData, addAreaName, getAreaNameByCity } = require("../controllers/data_mange_controllers/data_mange_controllers");

const router = require("express").Router();


router.get("/allUpdate",  updateAllData);
router.post("/add-area-name",  addAreaName);
router.get("/area-names",  getAreaNameByCity);

module.exports = router;
