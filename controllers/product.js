const Product = require("../models/product");
const { errorHandler } = require('../helpers/dbErrorHandler');
const formidable = require('formidable'); // another package monitor
const _ = require('lodash');
const fs = require('fs');

exports.productById = (req, res, next, id) => {
    Product.findById(id).exec((err, product) => {
        if (err || !product) {
            return res.status(400).json({
                error: "Product not found."
            });
        }
        req.product = product;
        next();
    })
}

exports.read = (req, res) => {
    req.product.photo = undefined;
    return res.json(req.product);
}

exports.create = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {

        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            })
        }
        const { name, description, price, category, quantity, shipping } = fields;

        //check all fields
        if (!name || !description || !price || !category || !quantity || !shipping) {
            return res.status(400).json({
                error: "All fields are required."
            })
        }
        let product = new Product(fields);
       
        if (files.photo) {
            //console.log(files.photo);
            // 1KB = 1000, 1MB = 1000,000
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: 'Image size should be less than 1 mb in size.'
                })
            }

            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }
        product.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result)
        });
    });
};

exports.update = (req, res) => {
    let form = new formidable.IncomingForm()    
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {

        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            })
        }
        const { name, description, price, category, quantity, shipping } = fields;

        //check all fields
        if (!name || !description || !price || !category || !quantity || !shipping) {
            return res.status(400).json({
                error: "All fields are required."
            })
        }

        let product = req.product;
        product = _.extend(product, fields);

        if (files.photo) {
            //console.log(files.photo);
            // 1KB = 1000, 1MB = 1000,000
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: 'Image size should be less than 1 mb in size.'
                })
            }

            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }
        product.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result)
        });
    });
};

exports.remove = (req, res) => {
    let product = req.product;
    product.remove((err, deletedProduct) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: "Product deleted successfully."
        });
    })
}


/**
 * sell / Arrival
 * by sell = /products?sortBy=sold&order=desc&limit=4
 * by arrival = /products?sortBy=createdAt&order=desc&limit=4
 * if no parameters , all products are returned
 */

 exports.list = (req,res) => {
     let order = req.query.order ? req.query.order : 'asc';
     let sortBy = req.query.order ? req.query.sortBy : '_id';
     let limit = req.query.limit ? parseInt(req.query.limit) : 6;

    Product.find()
        .select("-photo")
        .populate('category')
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, products)=>{
            if(err){
                return res.status(400).json({
                    error: 'Product Not Found'
                })
            }
            res.send(products)
        })
     
 }

/**
 * it will find the proudct based on the req product category
 * Other product that has the same category will be retured
 */

 exports.listRelated = (req, res ) => {
     let limit = req.query.limit ? parseInt(req.query.limit): 4;

     Product.find({_id: { $ne: req.product}, category: req.product.category })
        .limit(limit)
        .populate('category', '_id name')
        .exec((err, products ) => {
            if(err){
                return res.status(400).json({
                    error: "Products Not Found"
                })
            }
            res.json(products);
        })
 }

 exports.listCategories = (req, res) => {
    //Note: category that are distint to Product
     Product.distinct("category", {}, (err, categories )=>{
        if(err){
            return res.status(400).json({
                error: " Categories Not Found"
            })
        }
        res.json(categories);
     })
 }

 /**
 * we will show categories in checkbox and price range in radio buttons
 * as the user clicks on those checkbox and radio buttons
 * we will make api request and show the products to users based on what he wants
 */

exports.listBySearch = (req, res) => {

    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};
 
    // console.log(order, sortBy, limit, skip, req.body.filters);
    // console.log("findArgs", findArgs);
 
    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                // gte -  greater than price [0-10]
                // lte - less than
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }
 
    Product.find(findArgs)
        .select("-photo")
        .populate("category")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "Products not found"
                });
            }
            res.json({
                size: data.length,
                data
            });
        });
};

exports.photo = (req, res, next) => {
    
    if(req.product.photo.data){
        res.set('Content-Type', req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }

    next();
}