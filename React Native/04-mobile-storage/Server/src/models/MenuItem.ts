import mongoose, { Schema } from 'mongoose';
import { IMenuItem } from '../types';

const menuItemSchema = new Schema<IMenuItem>(
  {
    restaurant: {
      type: Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true
    },
    name: {
      type: String,
      required: [true, 'Menu item name is required'],
      trim: true,
      minlength: [2, 'Menu item name must be at least 2 characters'],
      maxlength: [100, 'Menu item name cannot be more than 100 characters']
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: [300, 'Description cannot be more than 300 characters']
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative']
    },
    category: {
      type: String,
      required: true,
      enum: [
        'Appetizers', 'Salads', 'Soups', 'Main Course', 'Pasta',
        'Pizza', 'Burgers', 'Sandwiches', 'Seafood', 'Steaks',
        'Chicken', 'Vegetarian', 'Vegan', 'Desserts', 'Beverages',
        'Alcohol', 'Coffee', 'Breakfast', 'Lunch', 'Dinner', 'Snacks'
      ]
    },
    ingredients: {
      type: [String],
      required: [true, 'At least one ingredient is required'],
      validate: {
        validator: function(v: string[]) {
          return v && v.length > 0;
        },
        message: 'At least one ingredient is required'
      }
    },
    allergens: {
      type: [String],
      enum: [
        'Milk', 'Eggs', 'Fish', 'Shellfish', 'Tree Nuts', 'Peanuts',
        'Wheat', 'Soybeans', 'Sesame', 'Sulfites', 'Mustard', 'Celery'
      ],
      default: []
    },
    image: {
      type: String,
      default: ''
    },
    isVegetarian: {
      type: Boolean,
      default: false
    },
    isVegan: {
      type: Boolean,
      default: false
    },
    isGlutenFree: {
      type: Boolean,
      default: false
    },
    isAvailable: {
      type: Boolean,
      default: true
    },
    preparationTime: {
      type: Number,
      required: true,
      min: [1, 'Preparation time must be at least 1 minute'],
      max: [120, 'Preparation time cannot exceed 120 minutes']
    }
  },
  {
    timestamps: true
  }
);

// Indexes for better query performance
menuItemSchema.index({ restaurant: 1 });
menuItemSchema.index({ category: 1 });
menuItemSchema.index({ name: 'text', description: 'text' });
menuItemSchema.index({ price: 1 });
menuItemSchema.index({ isVegetarian: 1 });
menuItemSchema.index({ isVegan: 1 });
menuItemSchema.index({ isGlutenFree: 1 });

export default mongoose.model<IMenuItem>('MenuItem', menuItemSchema);
