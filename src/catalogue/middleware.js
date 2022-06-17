const { validate } = require('../utils/util');

exports.Validate = (req, res, next) => {
  const err = validate(
    req.body,
    { name: { req: true, min: 2 }, slug: { req: true, min: 2 } },
    error => error
  );
  if (err) return res.status(400).send({ status: 400, message: err });
  next();
}
