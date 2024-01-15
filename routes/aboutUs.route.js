const router = require("express").Router();
const {
    create,
    getAboutUs,
    updateAboutUs,
    deleteAboutUs,
} = require("../controllers/aboutUs");
const upload = require("../services/uploadImages");

router.post("/", upload.single("image"), create);
router.get("/", getAboutUs);
router.put("/:id", updateAboutUs);
router.delete("/:id", deleteAboutUs);
module.exports = router;
