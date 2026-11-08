
import mongoose, { Schema, Document } from "mongoose";

export interface IOrganization extends Document {
  name: string;
  address: string;
  email: string;
  phone: string;
  peopleCount: number;
  active: boolean;
}

const OrganizationSchema = new Schema<IOrganization>(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    address: {
      type: String,
      required: true
    },email: {
  type: String,
  required: true,
  lowercase: true,
  trim: true,
  unique: true,
  match: [
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    "El correo electrónico no es válido"
  ]
},
    phone: {
      type: String,
      required: true
    },
    peopleCount: {
      type: Number,
      required: true,
      min: 1
    },
    active: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
    collection: "organizations"
  }
);

export const OrganizationModel =
  mongoose.model<IOrganization>(
    "Organization",
    OrganizationSchema
  );
