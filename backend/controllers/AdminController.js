import User from "../models/UserSchema.js";

// GET USERS
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//update role
export const updateRole = async (req, res) => {

  try {

    const { role } = req.body;

    const user = await User.findById(req.params.id);

    // 🔥 PROTECTED ADMIN
    if (user.email === "admin@pharma.com") {
      return res.status(403).json({
        error: "Protected admin cannot be modified"
      });
    }

    user.role = role;

    await user.save();

    res.json(user);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};