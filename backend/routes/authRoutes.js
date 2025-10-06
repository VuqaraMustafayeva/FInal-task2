const router = require("express").Router();
const { register, login } = require("../controllers/authController");
const { registerValidation, loginValidation } = require("../validations/authValidation");
const { validationResult } = require("express-validator");

// routerlerda bir nece validation qaydasini eyni anda tetbiq ede bilmek ucun. (yanlis melumatlarin qarsini almaq)
const validate = (validations) => async (req, res, next) => {
  await Promise.all(validations.map(validation => validation.run(req)));
  const errors = validationResult(req);
  // eger sehv yoxdusa novbetiye kecid
  if (errors.isEmpty()) return next();
  res.status(400).json({ errors: errors.array() });
};

router.post("/register", validate(registerValidation), register);
router.post("/login", validate(loginValidation), login);

module.exports = router;
