import mongoose, { Schema } from 'mongoose';
import { IRestaurant } from '../types';

const restaurantSchema = new Schema<IRestaurant>(
  {
    name: {
      type: String,
      required: [true, 'Restaurant name is required'],
      trim: true,
      minlength: [2, 'Restaurant name must be at least 2 characters'],
      maxlength: [100, 'Restaurant name cannot be more than 100 characters']
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: [500, 'Description cannot be more than 500 characters']
    },
    cuisine: {
      type: [String],
      required: [true, 'At least one cuisine type is required'],
      validate: {
        validator: function(v: string[]) {
          return v && v.length > 0;
        },
        message: 'At least one cuisine type is required'
      },
      enum: [
        'Italian', 'Chinese', 'Indian', 'Mexican', 'Japanese', 'Thai',
        'Mediterranean', 'French', 'American', 'Korean', 'Vietnamese',
        'Middle Eastern', 'Greek', 'Spanish', 'German', 'British',
        'Fast Food', 'Vegetarian', 'Vegan', 'Seafood', 'Steakhouse',
        'Pizza', 'Burger', 'Sushi', 'BBQ', 'Cafe', 'Bakery', 'Other'
      ]
    },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, required: true, default: 'USA' }
    },
    contact: {
      phone: {
        type: String,
        required: true,
        match: [/^\+?[\d\s-()]+$/, 'Please provide a valid phone number']
      },
      email: {
        type: String,
        required: true,
        lowercase: true,
        match: [
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
          'Please provide a valid email'
        ]
      }
    },
    hours: {
      monday: {
        open: { type: String, default: '09:00' },
        close: { type: String, default: '22:00' },
        closed: { type: Boolean, default: false }
      },
      tuesday: {
        open: { type: String, default: '09:00' },
        close: { type: String, default: '22:00' },
        closed: { type: Boolean, default: false }
      },
      wednesday: {
        open: { type: String, default: '09:00' },
        close: { type: String, default: '22:00' },
        closed: { type: Boolean, default: false }
      },
      thursday: {
        open: { type: String, default: '09:00' },
        close: { type: String, default: '22:00' },
        closed: { type: Boolean, default: false }
      },
      friday: {
        open: { type: String, default: '09:00' },
        close: { type: String, default: '23:00' },
        closed: { type: Boolean, default: false }
      },
      saturday: {
        open: { type: String, default: '10:00' },
        close: { type: String, default: '23:00' },
        closed: { type: Boolean, default: false }
      },
      sunday: {
        open: { type: String, default: '10:00' },
        close: { type: String, default: '21:00' },
        closed: { type: Boolean, default: false }
      }
    },
    images: {
      type: [String],
      default: []
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    },
    priceRange: {
      type: Number,
      enum: [1, 2, 3, 4],
      required: true,
      default: 2
    },
    features: {
      type: [String],
      enum: [
        'Delivery', 'Takeout', 'Dine-in', 'Outdoor Seating',
        'Wi-Fi', 'Parking', 'Wheelchair Accessible', 'Pet Friendly',
        'Live Music', 'Bar', 'Happy Hour', 'Catering', 'Private Dining',
        'Reservations', 'Credit Cards', 'Cash Only', 'Online Ordering'
      ],
      default: []
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Indexes for better query performance
restaurantSchema.index({ name: 'text', description: 'text' });
restaurantSchema.index({ cuisine: 1 });
restaurantSchema.index({ 'address.city': 1 });
restaurantSchema.index({ priceRange: 1 });
restaurantSchema.index({ rating: -1 });
restaurantSchema.index({ owner: 1 });

// Virtual for menu items
restaurantSchema.virtual('menuItems', {
  ref: 'MenuItem',
  localField: '_id',
  foreignField: 'restaurant'
});

export default mongoose.model<IRestaurant>('Restaurant', restaurantSchema);
