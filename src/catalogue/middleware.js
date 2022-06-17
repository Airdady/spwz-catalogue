import ValidateBody from '../util';

export const Validate = (req, res, next) => {
  const err = ValidateBody(
    req.body,
    { name: { req: true, min: 3 } },
    error => error
  );
  if (err) return res.status(400).send({ status: 400, message: err });
  next();
}

