const Product = require('../../products/models/Product');



module.exports = {
    remove: (req, res) => {
        Product.findOneAndDelete({ _id: req.body.product }, (err, result) => {
            if (err) {
                req.flash('errors', `"${req.body.product}" was not found in the database`)
                res.redirect('/api/admin/removeproduct')
            } else {
                req.flash('success', `"${result.name}" has been removed`)
                res.status(302).redirect('/api/admin/removeproduct')
            }
        })
    }
}