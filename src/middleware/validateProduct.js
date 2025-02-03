import productSchema from "../schemas/productSchema.js";

const validateProduct = (req, res, next) => {
<<<<<<< HEAD
  const { error, value } = productSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      error: error.details.map((err) => err.message),
    });
  }

  req.body = value;
=======
  const { error } = productSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
>>>>>>> 6e143e707dd8ca23a871385e116a47534be77a0e
  next();
};

export default validateProduct;
