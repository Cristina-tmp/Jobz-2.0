import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAnthenticatedError } from "../errors/index.js";

const register = async (req, res, next) => {
  // res.send("register user");
  // try {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new BadRequestError("please provide all values");
  }

  //check for duplicate emails before creating the user
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError(`Email already exists`);
  }

  const user = await User.create({ name, email, password });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      name: user.name,
    },
    token,
  });
  //  } catch (error) {
  //res.status(500).json({ msg: "there was an error" });

  //pass the error to the error handler middleware
  // next(error);
  //  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("please provide email and password");
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new UnAnthenticatedError("Invalid credentials");
  }
  const isPasswordCorrect = await user.comparePasswords(password);
  if (!isPasswordCorrect) {
    throw new UnAnthenticatedError("Invalid credentials");
  }

  const token = user.createJWT();
  user.password = undefined;
  res.status(StatusCodes.OK).json({ user, token, location: user.location });

  //res.send("login user");
};

const updateUser = async (req, res) => {
  const { name, email, lastName, location } = req.body;
  if (!email || !email || !lastName || !location) {
    throw new BadRequestError("please provide email and password");
  }

  const user = await User.findOne({ _id: req.user.userId });

  user.name = name;
  user.email = email;
  user.lastName = lastName;
  user.location = location;

  await user.save();
  const token = user.createJWT();

  res.status(StatusCodes.OK).json({ user, token, location: user.location });
  //res.send("update user");
};

export { register, login, updateUser };
