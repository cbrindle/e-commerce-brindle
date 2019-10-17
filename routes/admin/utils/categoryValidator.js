const Category = require('../../products/models/Category');

const categoryValidator = (req, res) => {
    if (req.body.name === '') {
        req.flash('errors', 'Field cannot be blank')
        res.redirect('/api/admin/add-category')
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
            req.flash('success', 'Category added successfully');
            res.redirect('/api/admin/add-category')
            return
        } else {
            req.flash('errors', 'That category already exists')
            res.redirect('/api/admin/add-category')
        }
    })
}

module.exports = categoryValidator