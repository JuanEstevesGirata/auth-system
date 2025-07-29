export function resultHandler(req, res, next) {
  const result = res.locals.result;

  if (!result) {
    return res.status(500).json({ error: 'No result returned from controller' });
  }

  if (result.isLeft) {
    const error = result.value;
    const status = error.type === 'BadRequest' ? 400 : 500;
    return res.status(status).json({ error: error.message });
  }

  return res.status(200).json(result.value);
}
