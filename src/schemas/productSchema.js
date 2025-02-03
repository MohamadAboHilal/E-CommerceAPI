import Joi from "joi";

const productSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number()
    .precision(2)
    .required()
    .custom((value, helpers) => {
      if (!/^\d+(\.\d{1,2})?$/.test(value.toString())) {
        return helpers.message("Price must have at most 2 decimal places");
      }
      return value;
    }),
  category_id: Joi.number().optional(),
<<<<<<< HEAD
=======
  category_name: Joi.string().optional(),
>>>>>>> 6e143e707dd8ca23a871385e116a47534be77a0e
  description: Joi.string().optional().allow(null, ""),
  image_url: Joi.string().uri().optional(),
  stock: Joi.number().integer().min(0).optional(),
});

export default productSchema;
