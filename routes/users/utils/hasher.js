const bcrypt = require('bcryptjs');

module.exports = {
    create: (str) => {
        if (str === ''){
            throw Error('password string is empty')
        }
        bcrypt.hash(str, 10, (err, hash) => {
            if (err) {
                throw Error('error')
            }
            return hash
        })

        // return new Promise((resolve, reject) => {
        //     if (str === '') {
        //         reject('Password cannot be empty')
        //     }

        //     bcrypt.genSalt(10, (error, salt) => {
        //         if (error) {
        //             reject(error)
        //         } 

        //         bcrypt.hash(str, salt, (err, hash) => {
        //             if (err) reject(err)

        //             resolve(hash)
        //         })
        //     })
        // })
    }
}