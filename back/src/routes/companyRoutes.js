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

export const updateCompany = async (req, res) => {
    try {
        const companyId = req.params.companyId;
        const { name, address, phone, email, logo } = req.body;

        const company = await Company.findById(companyId);
        if (!company) throw new Error("L'entreprise n'existe pas");

        const companyQuery = {};
        if (name) companyQuery.name = name;
        if (address) companyQuery.address = address;
        if (phone) companyQuery.phone = phone;
        if (email) companyQuery.email = email;
        if (logo) companyQuery.logo = logo;

        await Company.findByIdAndUpdate(companyId, companyQuery);

        res.json("L'entreprise a été modifiée avec succès");
    } catch (error) {
        res.status(500).json({
            error: `Une erreur est survenue lors de la modification de l'entreprise : ${error}`,
        });
    }
}