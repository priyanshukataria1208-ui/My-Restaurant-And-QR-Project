const successResponse = (res, status, data) => {
  return res.status(status).json({
    success: true,
    data
  });
};

module.exports = { successResponse };
