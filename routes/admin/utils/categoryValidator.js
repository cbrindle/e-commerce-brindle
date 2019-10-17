const Category = require('../../products/models/Category');

const categoryValidator = (req, res, next) => {
    if (req.body.name === '') {
        req.flash('errors', 'Field cannot be blank')
        res.redirect('/api/admin/add-category')
    } else {
        const newCat = new Category;
        newCat.name = req.body.name;
        newCat.save();
        req.flash('success', 'Category added successfully');
        res.redirect('/api/admin/add-category')
    }
}

module.exports = categoryValidator