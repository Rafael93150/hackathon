import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: false,
            unique: true,
        },
        logo: {
            type: String,
            required: false,
        },
        phone: {
            type: String,
            required: false,
        },
        address: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

const Company = mongoose.model("Company", companySchema);

export default Company;
