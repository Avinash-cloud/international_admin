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
    type: Number,
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
  category: {
    type: String,
    required: true,
    trim: true
  },
  properties: {
    color: {
      type: String,
      trim: true
    },
    weight: {
      type: Number, // Weight in grams
      min: 0
    },
    dimensions: {
      length: { type: Number, min: 0 },
      width: { type: Number, min: 0 },
      height: { type: Number, min: 0 }
    }
  },
  sku: {
    type: String,
    unique: true,
    trim: true,
    required: true
  },
  stockQuantity: {
    type: Number,
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