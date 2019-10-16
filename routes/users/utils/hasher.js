const bcrypt = require('bcryptjs');

module.exports = {
    create: (str) => {
        return new Promise((resolve, reject) => {
            if (str === '') {
                reject('Password cannot be empty')
            }

            bcrypt.genSalt(10, (error, salt) => {
                if (error) {
                    reject(error)
                } 

                bcrypt.hash(str, salt, (err, hash) => {
                    if (err) reject(err)

                    resolve(hash)
                })
            })
        })
    }
}