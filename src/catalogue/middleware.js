import ValidateBody from '../util.js';

export const Validate = (req, res, next) => {
  const err = ValidateBody(
    req.body,
    { email: { req: true, min: 3 } },
    error => error
  );
  if (err) return res.status(400).send({ status: 400, message: err });
  next();
}

