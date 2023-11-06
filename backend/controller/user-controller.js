import User from "../model/user.js";

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        if (users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }
        return res.status(200).json({ users });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const signup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Check if a user with the same email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create a new user
        const newUser = new User({
            name,
            email,
            password,
        });

        // Save the new user to the database
        await newUser.save();

        // Return a successful response
        return res.status(201).json({ user: newUser });
    } catch (err) {
        console.error(err); // Log the error for debugging purposes
        return res.status(500).json({ message: "Internal Server Error" });
    }
};