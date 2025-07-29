export function asyncHandler(controller) {
  return (req, res, next) => {
    Promise.resolve(controller(req, res)).catch(next);
  };
}
