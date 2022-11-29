const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectIdd

const reviewSchema = new mongoose.Schema(
    {
        bookId: {
            type: ObjectId,
            required: true,
            refs: "Book"
        },
        reviewedBy: {
            type: ObjectId,
            required: true,
            default:'Guest'
        },
        reviewedAt: {
            type: Date,
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
        review: {
            type: String
        },
        isDeleted: { type:Boolean, 
            default: false 
        }
    }, { timestamps: true })

    module.exports = mongoose.model("review", reviewSchema)  