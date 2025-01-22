const Category = require("../models/categoryModel");

const createCategory = async (req, res) => {
    try {
        const {categoryName} = req.body
        if(!categoryName) {
            return res.status(400).json({success: false, message: "All fields are required"})
        }
        const category = new Category({categoryName})
        await category.save()
        return res.status(201).json({success: true, message: "Category created successfully", category})
    } catch (error) {
        return res.status(500).json({success: false, message: "Internal Server Error"})
    }
}

module.exports = {createCategory}