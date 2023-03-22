const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    user: {
        type: [mongoose.Types.ObjectId],
        ref: 'User',
        required: true
    },
    products: [ {
        productId: {
            type: [mongoose.Types.ObjectId],
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number, 
            required: true
        }
    }]
})

module.exports = mongoose.model('Order', OrderSchema)
