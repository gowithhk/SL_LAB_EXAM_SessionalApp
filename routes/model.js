const mongoose = require("mongoose");
const { ObjectUnsubscribedError } = require("rxjs");

const ExpenseModel = mongoose.model("expense",
    mongoose.Schema({
        desc: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        category_id: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        }
        
    })
);

const CategoryModel = mongoose.model("category",
    mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        threshold: {
            type: Number,
            required: true
        }
    })
);


module.exports = {ExpenseModel, CategoryModel};
