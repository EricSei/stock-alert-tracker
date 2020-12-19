const Category = require("../models/category");
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.categoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category)=>{
       
        if(err || !category ){
            return res.status(400).json(
                {error: "Category does not exist." }
            )
        }

        req.category = category;
        next();
    })
}

exports.create = (req, res) => {
    const category = Category(req.body);
    
    category.save((err, data) => {
        if (err) {
            res.status(400).json({
                error: errorHandler(err)
            })
        }

        res.json({ data })
    })
}

exports.read = ( req ,res ) => {
    //console.log(req)
    return res.json(req.category);
}

exports.update = (req, res) => {
    const category = req.category;
    category.name = req.body.name;

    category.save((err, data) => {
        if (err) {
            res.status(400).json({
                error: errorHandler(err)
            })
        }
        
        res.json(data);
    })
}

exports.remove = (req, res) => {
    const category = req.category;
    
    category.remove((err, data) => {
        if (err) {
            res.status(400).json({
                error: errorHandler(err)
            })
        }
        
        res.json({  "message" : "Cateogry deleted successfully."  })
    })
}

exports.list = ( req ,res ) => {
    //console.log(req)
    Category.find().exec((err, data )=>{
        if(err){
            res.json({
                error: errorHandler(err)
            })
        }

        res.json(data);
    })
}