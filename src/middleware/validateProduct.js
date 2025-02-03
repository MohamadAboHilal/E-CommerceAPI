import productSchema from "../schemas/productSchema.js";

const validateProduct = (req, res, next) => {
  const { error, value } = productSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      error: error.details.map((err) => err.message),
    });
  }

  req.body = value;
  next();
};

export default validateProduct;
