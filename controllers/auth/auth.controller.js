const User = require("../../models/User");
const { generateToken } = require("../../utils/jwt");

class AuthController {
  async login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(401).json({ message: "Invalid email or password." });
      }

      const isValidPassword = await user.validatePassword(password);

      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid email or password." });
      }

      const token = generateToken(user);

      return res.status(200).json({ token });
    } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({ message: "Internal server error." });
    }
  }

  async forgotPassword(req, res) {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      return res.status(200).json({
        message: "Password reset instructions have been sent to your email.",
      });
    } catch (error) {
      console.error("Error during forgot password:", error);
      return res.status(500).json({ message: "Internal server error." });
    }
  }
}

module.exports = new AuthController();
