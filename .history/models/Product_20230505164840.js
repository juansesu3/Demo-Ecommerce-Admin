import { model, models, Mongoose, Schema } from "mongoose";

const ProductSchema = new Schema({
    title: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    images: [{ type: String }],
    category: { type: Mongoose.Types.ObjectId, ref: 'Category' },
});

export const Product = models.Product || model('Product', ProductSchema);
