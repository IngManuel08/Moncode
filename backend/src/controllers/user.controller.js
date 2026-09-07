import User from "../models/user.models.js";
import bcrypt from "bcryptjs";

export const updateProfile = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

        // validar email duplicado
        if (email) {
            const emailExists = await User.findOne({ email });
            if (emailExists && emailExists._id.toString() !== user._id.toString()) {
                return res.status(400).json({ message: "El email ya está en uso" });
            }
        }

        if (username) user.username = username;
        if (email) user.email = email;

        if (password && password.trim() !== "") {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                return res.status(400).json({ message: "La nueva contraseña no puede ser igual a la anterior" });
            }
            user.password = await bcrypt.hash(password, 10);
        }

        await user.save();

        res.json({
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    }
};