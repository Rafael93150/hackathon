import User from "../models/user.js";
import bcrypt from "bcrypt";
import Company from "../models/company.js";
import { Types } from "mongoose";

export const getUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId).select('-password');
        if (!user) throw new Error("L'utilisateur n'existe pas");
        res.json(user);
    } catch (error) {
        res.status(500).json({
            error: `Une erreur est survenue lors de la récupération du profil : ${error}`,
        });
    }
};

export const getUsers = async (req, res) => {
    // { filters : { skills: ["React", "Node"], companies: ["CompanyName1", "CompanyName2"] } }
    try {
        const filters = req.body.filters;
        const userQuery = {};
        if (filters) {
            if (filters.skills && filters.skills.length)
                userQuery.skills = { $in: filters.skills };
            if (filters.companies && filters.companies.length) {
                const companyIds = await Company.find({
                    name: { $in: filters.companies },
                }).distinct("_id");
                userQuery.companies = { $in: companyIds };
            }
        }

        const users = await User.find(userQuery).select("-password").populate("companies", "_id name logo");
        res.json(users);
    } catch (err) {
        res.status(500).json({
            message: `Une erreur est survenue lors de la récupération des utilisateurs: ${err}`,
        });
    }
};

export const createUser = async (req, res) => {
    try {
        const {
            firstname,
            lastname,
            email,
            password,
            role,
            phone,
            level,
            address,
            points,
            skills,
            companies,
            picture,
        } = req.body;
        // role commenté pour l'instant
        if (!(firstname && lastname && email && password))
            throw new Error("Invalid arguments");

        const hashedPassword = await bcrypt.hash(password, 10);

        const existingUser = await User.findOne({ email });
        if (existingUser)
            throw new Error(`L'adresse email ${email} est déjà utilisée`);

        const user = new User({
            firstname,
            lastname,
            email,
            password: hashedPassword,
            role,
            phone,
            level,
            address,
            points,
            skills,
            companies,
            picture,
        });

        await user.save();

        res.json({
            message: "Utilisateur créé avec succès",
        });
    } catch (error) {
        res.status(500).json({
            error: `Une erreur est survenue lors de la création de l'utilisateur : ${error}`,
        });
    }
};

export const updateUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const {
            firstname,
            lastname,
            email,
            role,
            password,
            phone,
            level,
            address,
            points,
            skills,
            companies,
            picture,
        } = req.body;

        const user = await User.findById(userId);
        if (!user) throw new Error("L'utilisateur n'existe pas");

        const userQuery = {};
        if (firstname) userQuery.firstname = firstname;
        if (lastname) userQuery.lastname = lastname;
        if (role) userQuery.role = role;
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
        const updatedUser = await User.findById(userId).select("-password");

        res.json({
            message: "Le profil a bien été modifié",
            user: updatedUser,
        });
    } catch (error) {
        res.status(500).json({
            error: `Une erreur est survenue lors de la modification du profil : ${error}`,
        });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findByIdAndDelete(userId);
        if (!user) throw new Error("L'utilisateur n'existe pas");
        res.json({
            message: "Le profil a bien été supprimé",
        });
    } catch (error) {
        res.status(500).json({
            error: `Une erreur est survenue lors de la suppression du profil : ${error}`,
        });
    }
};

export const addCompanyToUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const companyId = req.body.companyId;

        const user = await User.findById(userId);
        if (!user) throw new Error("L'utilisateur n'existe pas");

        const company = await Company.findById(companyId);
        if (!company) throw new Error("L'entreprise n'existe pas");

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                $addToSet: { companies: new Types.ObjectId(companyId) },
            },
            { new: true }
        ).select("-password");

        res.json({
            message: "L'entreprise a bien été ajoutée",
            user: updatedUser,
        });
    } catch (error) {
        res.status(500).json({
            error: `Une erreur est survenue lors de l'ajout de l'entreprise : ${error}`,
        });
    }
};

export const getCompaniesFromUser = async (req, res) => {
    try {
        const userId = req.params.userId;

        const user = await User.findById(userId);
        if (!user) throw new Error("L'utilisateur n'existe pas");

        const companies = await Company.find({ _id: { $in: user.companies } });

        res.json(companies);
    } catch (error) {
        res.status(500).json({
            error: `Une erreur est survenue lors de la récupération des entreprises : ${error}`,
        });
    }
};
