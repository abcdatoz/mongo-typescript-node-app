import { Document, Schema, model } from "mongoose";

export interface IRestaurant extends Document {
  nombre: string;
  descripcion: string;
  domicilio: string;
  logo?: Buffer;
  logoUrl?: string;
}

const RestaurantSchema = new Schema<IRestaurant>({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  domicilio: { type: String, required: true },
  logo: Buffer,
  logoUrl: String,
});

const Restaurant = model<IRestaurant>("Restaurant", RestaurantSchema);

export default Restaurant;
