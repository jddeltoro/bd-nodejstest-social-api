const User = require('../models/user.model');

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('followers');
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.status(200).send(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error._message });
    }
}

const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req
            .params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.status(200).json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}


module.exports = {
    getUserProfile,
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
};