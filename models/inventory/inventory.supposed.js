const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inventorySupposedSchema = new Schema({
    member: {
        type: Schema.Types.ObjectId,
        ref: 'adherent',
        require: true
    },
    date: String,
    products: {
        type: [{
            product: {
                type: Schema.Types.ObjectId,
                ref: 'product'
            },
            quantity: Number
        }]
    }
}, { collection: 'inventorySupposed', versionKey: false });

inventorySupposedSchema.statics.sale = async function(product, quantity) {

    var lastInventory = await this.findOne().sort('-date');
    var listProducts = lastInventory.products;
    var newProduct = {};
    var newArray = [];
    listProducts.forEach(element => {
        if (element.product == product) {
            newProduct = {
                element: element._id,
                product: element.product,
                quantity: element.quantity - quantity
            };
            newArray.push(newProduct);
        } else {
            newArray.push(element);
        }
    });
    if (newArray != []) {
        return this.findByIdAndUpdate(lastInventory._id, {
            $set: { products: newArray }
        }, { new: true });
    }
};

inventorySupposedSchema.statics.bill = async function(product, quantity) {

    var lastInventory = await this.findOne().sort('-date');
    var listProducts = lastInventory.products;
    var newProduct = {};
    var newArray = [];
    listProducts.forEach(element => {
        if (element.product == product) {
            newProduct = {
                element: element._id,
                product: element.product,
                quantity: element.quantity + quantity
            };
            newArray.push(newProduct);
        } else {
            newArray.push(element);
        }
    });
    if (newArray != []) {
        return this.findByIdAndUpdate(lastInventory._id, {
            $set: { products: newArray }
        }, { new: true });
    }
};

const InventorySupposedModel = mongoose.model('inventorySupposed', inventorySupposedSchema);
module.exports = InventorySupposedModel;