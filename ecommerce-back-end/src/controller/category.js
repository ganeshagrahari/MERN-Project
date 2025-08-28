const Category = require('../models/category');
const slugify = require('slugify');


function createCategories(categories, parentId = null) {   
    const categoryList = [];
    let category;
    if(parentId == null){
        category = categories.filter(cat => cat.parentId === undefined || cat.parentId === null);
    } else {
        category = categories.filter(cat => cat.parentId && cat.parentId.toString() === parentId.toString());
    }

    for(let cat of category){
        categoryList.push({
            _id: cat._id,
            name: cat.name,
            slug: cat.slug,
            children: createCategories(categories, cat._id)
        });
    }
    return categoryList;
};

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
        if(!categories || categories.length === 0){
            return res.status(404).json({
                message: 'No categories found'
            })
        }
        
        const categoryList = createCategories(categories);
        res.status(200).json({categoryList});
        
    } catch (error) {
        res.status(400).json({
            message: 'Error fetching categories',
            error: error.message
        })
    }
}

