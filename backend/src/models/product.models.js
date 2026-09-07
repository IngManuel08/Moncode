import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true
        },
        price: {
            type: Number,
            default: 0.0,
            required: true
        },
        quantity:{
            type: Number,
            default: 0,
            required: true
        },
        description:{
            type: String,
            required: true
        },
        category:{
            type: String,
            required: true
        },
        image:{
            type: String,
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        reviews: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                    required: true
                },
                name: { type: String, required: true },
                rating: { type: Number, required: true, min: 1, max: 5 },
                comment: { type: String, required: true },
                createdAt: { type: Date, default: Date.now }
            }
        ],
        rating: {
            type: Number,
            required: true,
            default: 0
        },
        numReviews: {
            type: Number,
            required: true,
            default: 0
        }
    },
    { timestamps: true }
); //fin de productschema

export default mongoose.model('Product', productSchema);
