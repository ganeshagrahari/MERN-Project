const Category = require('../models/category');
const slugify = require('slugify');


exports.addCategory = async (req, res) => {
    try {
        const categoryObj = {
            name: req.body.name,
            slug: slugify(req.body.name)
        }
        if(req.body.parentId){
            categoryObj.parentId = req.body.parentId
        }
        
        const cat = new Category(categoryObj)
        const category = await cat.save()
        
        res.status(201).json({
            message: 'Category created successfully',
            category
        })
    } catch (error) {
        res.status(400).json({
            message: 'Error creating category',
            error: error.message
        })
    }
}

exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find()
        if(!categories){
            return res.status(404).json({
                message: 'No categories found'
            })
        }
        res.status(200).json({
            categories
        })
    } catch (error) {
        res.status(400).json({
            message: 'Error fetching categories',
            error: error.message
        })
    }
}