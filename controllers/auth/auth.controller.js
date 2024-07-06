const User = require("../../models/User");
const { generateToken, verifyTokens, verifyToken } = require("../../utils/jwt");
const { sendMail } = require("../../utils/mailer");

class AuthController {
  static async login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    try {
      let user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(401).json({ message: "User has not registered." });
      }

      if (!user.isVerified) {
        return res.status(403).json({ message: "User email is not verified." });
      }

      const isValidPassword = await user.validatePassword(password);

      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid email or password." });
      }

      const token = generateToken(user);

      const userData = user.toJSON();
      delete userData.password;
      delete userData.role;

      return res.status(200).json({ token, userData });
    } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({ message: "Internal server error." });
    }
  }

  static async forgotPassword(req, res) {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      // Implement your password reset logic here

      return res.status(200).json({
        message: "Password reset instructions have been sent to your email.",
      });
    } catch (error) {
      console.error("Error during forgot password:", error);
      return res.status(500).json({ message: "Internal server error." });
    }
  }

  static async signup(req, res) {
    const { username, email, contact, password, address } = req.body;

    if (!username || !email || !contact || !password || !address) {
      return res.status(400).json({ message: "All fields are required." });
    }

    try {
      const existingUser = await User.findOne({ where: { email } });

      if (existingUser) {
        return res.status(409).json({ message: "Email is already in use." });
      }

      const newUser = await User.create({
        username,
        email,
        contact,
        password,
        role: "user",
        address,
      });

      const token = generateToken(newUser, "30m");
      const verificationUrl = `http://localhost:3333/api/user/auth/verify-email?token=${token}`;
      await sendMail(
        email,
        "Email Verification",
        `Please verify your email by clicking the following link: ${verificationUrl}`
      );

      return res.status(200).json({
        message: "Please verify your email to complete the signup process.",
      });
    } catch (error) {
      console.error("Error during signup:", error);
      return res.status(500).json({ message: "Internal server error." });
    }
  }

  static async verifyEmailToken(req, res, next) {
    const { token } = req.query;

    if (!token) {
      return res
        .status(400)
        .json({ message: "Verification token is missing." });
    }

    try {
      const decoded = verifyToken(token, req, next);
      console.log("Token", decoded);
      if (!decoded) {
        return res.status(400).json({ message: "Invalid or expired token." });
      }

      const user = await User.findByPk(decoded.id);
      if (!user) {
        return res.status(400).json({ message: "Invalid verification token." });
      }

      user.isVerified = true;
      await user.save();

      res.status(200).json({ message: "Email verified successfully!" });
    } catch (err) {
      console.error("Error during email verification:", err);
      res.status(500).json({ message: "Internal server error." });
    }
  }
}

module.exports = AuthController;
