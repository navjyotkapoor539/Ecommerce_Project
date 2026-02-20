import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const createAccessToken = (user) => {
  return jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "15m",
  });
};
const createRefreshToken = (user) => {
  return jwt.sign({ sub: user.id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN|| "30d",
  });
};

const setAccessTokenCookie = (res, token) => {
  res.cookie("accessToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    maxAge: 15 * 60 * 1000, // 15 minutes
  });
};

const Refresh_Token_Cookie_Name = "refreshToken";
const setRefreshTokenCookie = (res, token) => {
  const cookieOpts = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    path: "/api/auth/refresh",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  };
  res.cookie(Refresh_Token_Cookie_Name, token, cookieOpts);
};

const clearRefreshTokenCookie = (res) => {
  res.cookie(Refresh_Token_Cookie_Name, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    path: "/api/auth/refresh",
    expires: new Date(0),
  });
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields required" });

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(409).json({ message: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashed,
    });

    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);

    user.refreshTokens = user.refreshTokens || [];
    user.refreshTokens.push({ token: refreshToken, createdAt: new Date() });
    await user.save();

    setAccessTokenCookie(res, accessToken);
    setRefreshTokenCookie(res, refreshToken);

    return res.status(201).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      accessToken,
    });
  } catch (error) {
    console.error("Register error", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Please provide email and password" });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);

    user.refreshTokens = user.refreshTokens || [];
    if (user.refreshTokens.length >= 5) {
      user.refreshTokens.shift(); // remove oldest
    }
    user.refreshTokens.push({ token: refreshToken, createdAt: new Date() });
    await user.save();

    setAccessTokenCookie(res, accessToken);
    setRefreshTokenCookie(res, refreshToken);

    return res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      accessToken,
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies[Refresh_Token_Cookie_Name];
    if (!refreshToken)
      return res.status(401).json({ message: "No refresh token provided" });
    let payload;
    try {
      payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    } catch (error) {
      clearRefreshTokenCookie(res);
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const user = await User.findById(payload.sub);
    if (!user) {
      clearRefreshTokenCookie(res);
      return res.status(401).json({ message: "Invalid token user" });
    }

    const foundIndex = (user.refreshTokens || []).findIndex(
      (rt) => rt.token === refreshToken
    );
    if (foundIndex === -1) {
      clearRefreshTokenCookie(res);
      return res.status(401).json({ message: "Refresh token revoked" });
    }

    const newAccessToken = createAccessToken(user);
    const newRefreshToken = createRefreshToken(user);

    user.refreshTokens[foundIndex] = {
      token: newRefreshToken,
      createdAt: new Date(),
    };
    await user.save();

    setAccessTokenCookie(res, newAccessToken);
    setRefreshTokenCookie(res, newRefreshToken);

    return res.json({ accessToken: newAccessToken });
  } catch (err) {
    console.error("Refresh token error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies[Refresh_Token_Cookie_Name];
    if (!refreshToken) {
      clearRefreshTokenCookie(res);
      return res.status(200).json({ message: "Logged out" });
    }

    let payload = null;
    try {
      payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    } catch (err) {
      clearRefreshTokenCookie(res);
      return res.status(200).json({ message: "Logged out" });
    }

    const user = await User.findById(payload.sub);
    if (user) {
      user.refreshTokens = (user.refreshTokens || []).filter(
        (rt) => rt.token !== refreshToken
      );
      await user.save();
    }

    clearRefreshTokenCookie(res);
    return res.json({ message: "Logged out" });
  } catch (err) {
    console.error("Logout error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getMe = async (req, res) => {
  try {
    // req.user is already attached by protect middleware
    return res.json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const getAllUsers=async(req,res)=>{
  try{
    const users=await User.find()
    return res.json(users)
  }
 catch(err){
    return res.status(500).json({message:"Server error"})
  }
}