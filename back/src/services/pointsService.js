import User from "../models/user.js";

export const addPoints = async (userId, pointsToAdd) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error("Utilisateur non trouvé.");
    }

    let userQuery = {};
    if (user.points + pointsToAdd >= 1000) {
        userQuery = { points: 0, $inc: { level: 1 } };
    } else {
        userQuery = { $inc: { points: pointsToAdd } };
    }
    return true;
};
