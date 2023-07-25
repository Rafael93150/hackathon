import User from "../models/user.js";
import bcrypt from "bcrypt";

export const updateUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const { firstname, lastname, email, password } = req.body;

        const user = await User.findById(userId);
        if (!user) throw new Error("L'utilisateur n'existe pas");

        const userQuery = {};
        if (firstname) userQuery.firstname = firstname;
        if (lastname) userQuery.lastname = lastname;
        if (email) userQuery.email = email;
        if (password) userQuery.password = await bcrypt.hash(password, 10);
        if (level) userQuery.level = level;
        if (points) userQuery.points = points;

        await User.findByIdAndUpdate(userId, userQuery);

        res.json('Le profil a été modifié avec succès');
    } catch (error) {
        res.status(500).json({
            error: `Une erreur est survenue lors de la modification du profil : ${error}`,
        });
    }
};
