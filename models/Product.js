import mongoose, {model, Schema, models} from "mongoose";

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  discountedPrice: {
    type: String,
    min: 0
  },
  images: {
    type: [String], // Array of image URLs
    validate: {
      validator: function(arr) {
        return arr.every(url => typeof url === 'string');
      },
      message: 'Each image URL must be a string'
    }
  },
  category: {type:mongoose.Types.ObjectId, ref:'Category'},
  properties: {type:Object},
  sku: {
    type: String,
    trim: true,
    required: true
  },
  stockQuantity: {
    type: String,
    min: 0,
    default: 0
  },
  dateAdded: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
});

export const Product = models.Products || model('Products', ProductSchema);