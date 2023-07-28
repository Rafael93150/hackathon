import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: false,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        address: {
            type: String,
            required: false,
        },
        picture: {
            type: String,
            required: false,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["rh", "employee", "admin"],
            default: "employee",
        },
        level: {
            type: Number,
            default: 1,
        },
        points: {
            type: Number,
            default: 0,
        },
        skills: {
            type: [String],
            default: [],
        },
        companies: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Company",
            },
        ],
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

export default User;
