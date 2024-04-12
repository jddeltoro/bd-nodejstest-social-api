const Product  = require('../models/product.models');

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).send(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

const createProduct = async (req, res) => {
    try {
        const product = await Product.create({
            name: req.body.name,
            price: req.body.price,
            quantity: req.body.quantity,
            image: req.body.image
        });
        res.send(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.status(200).send(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, {
            name: req.body?.name,
            price: req.body?.price,
            quantity: req.body?.quantity,
            image: req.body?.image
        }, { new: true });
        if (!product) {
            return res.status(404).send('Product not found');
        }   
        res.status(200).send(product);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.status(200).send(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct
};