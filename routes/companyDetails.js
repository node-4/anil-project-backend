const express = require("express");
const router = express.Router();
const companyDetailsController = require("../controllers/companyDetails");
var multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
cloudinary.config({ cloud_name: 'djgrqoefp', api_key: '274167243253962', api_secret: '3mkqkDDusI5Hf4flGNkJNz4PHYg', }); // node4
const storage = new CloudinaryStorage({ cloudinary: cloudinary, params: { folder: "shahina/images/product", allowed_formats: ["jpg", "avif", "webp", "jpeg", "png", "PNG", "xlsx", "xls", "pdf", "PDF", "svg", "SVG"], }, });
const upload = multer({ storage: storage });
// GET all company details
router.get("/", companyDetailsController.getAllCompanyDetails);

// GET company details by ID
router.get("/:id", companyDetailsController.getCompanyDetailsById);

// CREATE new company details
router.post(
    "/",
    upload.single("gstinOrPanImage"),
    companyDetailsController.createCompanyDetails
);

// UPDATE company details by ID
router.put("/:id", companyDetailsController.updateCompanyDetailsById);

// DELETE company details by ID
router.delete("/:id", companyDetailsController.deleteCompanyDetailsById);

module.exports = router;
