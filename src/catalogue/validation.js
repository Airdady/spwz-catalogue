import validate from '../utils/validator.util';
import Send from '../utils/res.utils';

const category = (req, res, next) => {
  const err = validate(
    req.body,
    { name: { req: true, min: 4 } },
    error => error
  );
  if (err) return Send(res, 400, err);
  next();
}

export default category;