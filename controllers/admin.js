const Product = require('../models/product');
//const mongodb = require('mongodb');

//const ObjectId = mongodb.ObjectId;

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    });
};

exports.postAddProduct = (req, res, next) => {
    const userId = req.user._id;
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(
        title,
        price,
        description,
        imageUrl,
        null,
        userId)
    product
        .save()
        .then(result => {
            console.log('product created')
            res.redirect('/admin/products')
        })
        .catch(err => {
            console.log(err)
        })
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then(products => {
            const product = products
            if (!product) {
                return res.redirect('/');
            }
            res.render('admin/edit-product', {
                pageTitle: 'Edit Product',
                path: '/admin/edit-product',
                editing: editMode,
                product: product
            });
        })
        .catch(err => {
            console.log(err)
        });
};


exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updateTitle = req.body.title;
    const updateImageUrl = req.body.imageUrl;
    const updatePrice = req.body.price;
    const updateDescription = req.body.description;
    const product = new Product(
        updateTitle,
        updatePrice,
        updateDescription,
        updateImageUrl,
        prodId);
    product
        .save()
        .then(result => {
            console.log('UPDATE PRODUCT');
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err)
        })
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
        .then(products => {
            res.render('admin/products', {
                prods: products,
                pageTitle: 'Admin Products',
                path: '/admin/products'
            });
        })
        .catch(err => {
            console.log(err)
        });
};

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.deleteById(prodId)
        .then(() => {
            console.log('element destroyed');
            res.redirect('/admin/products')
        })
        .catch(err => {
            console.log(err)

        })
};