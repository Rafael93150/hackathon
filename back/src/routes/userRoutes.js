import User from "../models/user.js";
import bcrypt from "bcrypt";
import Company from "../models/company.js";

export const getUsers = async (req, res) => {
    // { filters : { skills: ["React", "Node"], companies: ["CompanyName1", "CompanyName2"] } }
    try {
        const filters = req.body.filters;
        const userQuery = {};
        if (filters) {
            if (filters.skills && filters.skills.length) userQuery.skills = { $in: filters.skills };
            if (filters.companies && filters.companies.length) {
                const companyIds = await Company.find({
                    name: { $in: filters.companies },
                }).distinct("_id");
                userQuery.companies = { $in: companyIds };
            }
        }

        const users = await User.find(userQuery);
        res.json(users);
    } catch (err) {
        res.status(500).json({
            message: `Une erreur est survenue lors de la récupération des utilisateurs: ${err}`,
        });
    }
};

export const updateUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const { firstname, lastname, email, password, phone, level, address, points, skills, companies, picture } = req.body;

        const user = await User.findById(userId);
        if (!user) throw new Error("L'utilisateur n'existe pas");

        const userQuery = {};
        if (firstname) userQuery.firstname = firstname;
        if (lastname) userQuery.lastname = lastname;
        if (phone) userQuery.phone = phone;
        if (email) userQuery.email = email;
        if (password) userQuery.password = await bcrypt.hash(password, 10);
        if (level) userQuery.level = level;
        if (address) userQuery.address = address;
        if (points) userQuery.points = points;
        if (picture) userQuery.picture = picture;
        if (skills) userQuery.skills = skills;
        if (companies) userQuery.companies = companies;

        await User.findByIdAndUpdate(userId, userQuery);

        res.json("Le profil a été modifié avec succès");
    } catch (error) {
        res.status(500).json({
            error: `Une erreur est survenue lors de la modification du profil : ${error}`,
        });
    }
};
