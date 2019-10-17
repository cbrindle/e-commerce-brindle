const Category = require('../../products/models/Category');

module.exports = {

    valAndCreate: (req, res) => {
        if (req.body.name === '') {
            req.flash('errors', 'Field cannot be blank')
            res.status(302).redirect('/api/admin/add-category')
            return
        }

        Category.findOne({ name: req.body.name }, (err, result) => {
            if (err) {
                console.log(err);
                return
            } else if (!result) {
                const newCat = new Category;
                newCat.name = req.body.name;
                newCat.save();
                req.flash('success', `Category "${newCat.name}" added successfully`);
                res.status(302).redirect('/api/admin/add-category')
                return
            } else {
                req.flash('errors', `"${req.body.name}" already exists in the database`)
                res.status(302).redirect('/api/admin/add-category')
            }
        })
    },

    getAllCategories: (req, res) => {
        Category.find({})
            .then(categories => {
                res.render('categories/create-fake-product', { categories: categories })
            })
            .catch(err => {
                req.flash('errors', error)
            })
    }
}