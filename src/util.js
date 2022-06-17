function validate(object, data, cb) {
  for (const key in data) {
    let error;
    const value = data[key];
    let objValue = object[key];
    objValue && typeof objValue !== 'string'
      ? (objValue = objValue.toString())
      : '';

    value.req && (!object[key] || !objValue)
      ? (error = `${key} is required`)
      : '';

    value.alpha && objValue && !objValue.match(/^[a-zA-Z]+$/)
      ? (error = `${key} should be alphabetic`)
      : '';

    value.bool && objValue && !objValue.match(/^(true|false)$/)
      ? (error = `${key} should be either true or false`)
      : '';

    value.alphaNum && objValue && !objValue.match(/^[a-zA-Z0-9]*$/)
      ? (error = `${key} should be alphanumeric`)
      : '';

    value.num && objValue && !objValue.match(/^[0-9]+$/)
      ? (error = `${key} should be an integer`)
      : '';

    value.min && objValue && objValue.length < value.min
      ? (error = `${key} should be greater than ${value.min - 1}`)
      : '';

    value.max && objValue && objValue.length > value.max
      ? (error = `${key} should be less than ${value.max}`)
      : '';

    value.email
      && objValue
      && !objValue.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
      ? (error = `Invalid ${key}`)
      : '';

    value.confirm && objValue && !value.confirm.match(objValue)
      ? (error = `${key} provided do not match`)
      : '';

    if (error) {
      return cb(error);
    }
  }
}

export function methodError(req, res, next) {
  const error = new Error('Ooops this method is not allowed ');
  error.status = 405;
  next(error);
}

export function serverError(error, req, res, next) {
  res.status(error.status || 500).send({ status: error.status || 500, error: error.message });
  next();
}

export const Res = async (res, resFn) => {
  try {
    await resFn()
  } catch (error) {
    if (error.message.match('required')) {
      console.log();
      return res.status(400).send({ status: 400, message: error.message.split('Path ')[1]?.replaceAll('`','') })
    }
    if (error.code === 11000) {
      return res.status(409).send({ status: 409, message: `${Object.keys(error.keyValue)}:${Object.values(error.keyValue)} already exists` })
    }
  }
}


export default validate;
