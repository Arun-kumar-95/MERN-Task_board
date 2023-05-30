// CREATING TOKEN AND SAVING IN COOKIE

const sendToken = async (res, statusCode, user) => {
  const token = await user.generateToken();

  // options for cookie
  const COOKIE_OPTIONS = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),

    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
    secure: process.env.NODE_ENV === "Development" ? false : true,
  };

  res.status(statusCode).cookie("token", token, COOKIE_OPTIONS).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;
