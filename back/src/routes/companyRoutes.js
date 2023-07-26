import Company from "../models/company.js";

export const getCompanies = async (req, res) => {
    try {
        const companies = await Company.find();
        res.json(companies);
    } catch (err) {
        res.status(500).json({
            message: `Une erreur est survenue lors de la récupération des entreprises: ${err}`,
        });
    }
};

export const createCompany = async (req, res) => {
    try {
        const { name, address, phone, email, picture } = req.body;

        const newCompany = new Company({
            name,
            address,
            phone,
            email,
            picture,
        });

        await newCompany.save();

        res.json({
            message: "Entreprise créée avec succès",
        });
    } catch (error) {
        res.status(500).json({
            message: `Une erreur est survenue lors de la création de l'entreprise : ${error}`,
        });
    }
};