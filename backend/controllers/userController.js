// require path module
const path = require("path");

//******************* * REQUIRING THE SCHEMAS   ***********************//

const userSchema = require(path.join(process.cwd(), "./backend/models/User"));

// ERROR HANDLER
const { ErrorHandler } = require(path.join(
  process.cwd(),
  "./backend/utils/errorHandler"
));

// MESSAGE HANDLER
const SuccessMessage = require(path.join(
  process.cwd(),
  "./backend/utils/message"
));

// CATCH ASYNC MIDDLEWARE
const { CatchAsyncError } = require(path.join(
  process.cwd(),
  "./backend/middlewares/CatchAsyncError"
));

// SEND TOKEN
const sendToken = require(path.join(
  process.cwd(),
  "./backend/utils/sendToken"
));

// ***** REGISTER USER ****//

module.exports.register = CatchAsyncError(async (req, res, next) => {
  const { full_name, userId, password, phone } = req.body;
  // find the user using email

  let user = await userSchema.findOne({ userId: userId });
  //   if we find the user
  if (user) {
    return next(new ErrorHandler(404, "User Exists, Try login"));
  }

  //  create a user
  user = await userSchema.create({
    full_name,
    userId,
    password,
    phone,
  });

  // save the user doc inside mongodb
  await user.save();

  return SuccessMessage(201, "Registered Successfully", res);
});

// ***** LOGIN USER ****//

module.exports.login = CatchAsyncError(async (req, res, next) => {
  const { userId, password } = req.body;
  //find the user based on email
  if (!userId || !password) {
    return next(new ErrorHandler(400, "Invalid Fields"));
  }

  let user = await userSchema.findOne({ userId }).select("+password");

  if (!user) {
    return next(new ErrorHandler(404, "Invalid User"));
  }

  // if user exists
  if (user) {
    //  check for password by call match function
    const isMatch = await user.matchPassword(req.body.password);

    if (!isMatch) {
      return next(new ErrorHandler(403, "Incorrect userId or password"));
    }
    // if password match then generate the token
    sendToken(res, 200, user);
  }
});

// ***** LOGOUT USER ****//

module.exports.logout = CatchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  return SuccessMessage(200, "Logout successfully", res);
});

// Get User Detail
module.exports.getUserDetails = CatchAsyncError(async (req, res, next) => {
  const user = await userSchema.findById(req.user._id);

  res.status(200).json({
    success: true,
    user,
  });
});
