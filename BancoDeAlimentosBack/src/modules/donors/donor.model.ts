
import mongoose, { Schema, Document } from "mongoose";

export interface IDonor extends Document {
  name: string;
  email: string;
  phone: string;
  address?: string;
  type: "individual" | "company";
  active: boolean;
}

const DonorSchema = new Schema<IDonor>(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "El correo electrónico no es válido"
      ]
    },

    phone: {
      type: String,
      required: true,
      trim: true
    },

    address: {
      type: String,
      trim: true
    },

    type: {
      type: String,
      enum: ["individual", "company"],
      required: true
    },

    active: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
    collection: "donors"
  }
);

export const DonorModel = mongoose.model<IDonor>(
  "Donor",
  DonorSchema
);
