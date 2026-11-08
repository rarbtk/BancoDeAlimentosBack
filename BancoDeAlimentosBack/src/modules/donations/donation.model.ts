
import mongoose, { Schema, Document, Types } from "mongoose";

export interface IDonation extends Document {
  donorId: Types.ObjectId;
  product: string;
  quantity: number;
  expirationDate: Date;
  status: "pending" | "available" | "delivered";
}

const DonationSchema = new Schema<IDonation>(
  {
    donorId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Donor"
    },

    product: {
      type: String,
      required: true,
      trim: true
    },

    quantity: {
      type: Number,
      required: true,
      min: 1
    },

    expirationDate: {
      type: Date,
      required: true
    },

    status: {
      type: String,
      enum: ["pending", "available", "delivered"],
      default: "pending"
    }
  },
  {
    timestamps: true,
    collection: "donations"
  }
);

export const DonationModel =
  mongoose.model<IDonation>(
    "Donation",
    DonationSchema
  );
