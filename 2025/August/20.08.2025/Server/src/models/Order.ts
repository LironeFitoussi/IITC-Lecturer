import mongoose, { Schema } from 'mongoose';
import { IOrder } from '../types';

const orderSchema = new Schema<IOrder>(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    restaurant: {
      type: Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true
    },
    items: [{
      menuItem: {
        type: Schema.Types.ObjectId,
        ref: 'MenuItem',
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity must be at least 1']
      },
      price: {
        type: Number,
        required: true,
        min: [0, 'Price cannot be negative']
      },
      specialInstructions: {
        type: String,
        maxlength: [200, 'Special instructions cannot be more than 200 characters']
      }
    }],
    totalAmount: {
      type: Number,
      required: true,
      min: [0, 'Total amount cannot be negative']
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'],
      default: 'pending'
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending'
    },
    deliveryAddress: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zipCode: { type: String },
      instructions: { type: String, maxlength: 200 }
    },
    estimatedDeliveryTime: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

// Indexes for better query performance
orderSchema.index({ customer: 1 });
orderSchema.index({ restaurant: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ createdAt: -1 });
orderSchema.index({ paymentStatus: 1 });

// Pre-save middleware to calculate estimated delivery time
orderSchema.pre('save', function(next) {
  const order = this as any;
  if (order.isNew && order.status === 'confirmed') {
    const now = new Date();
    // Add 30-60 minutes for delivery (random between 30-60)
    const deliveryMinutes = Math.floor(Math.random() * 31) + 30;
    order.estimatedDeliveryTime = new Date(now.getTime() + deliveryMinutes * 60000);
  }
  next();
});

export default mongoose.model<IOrder>('Order', orderSchema);
