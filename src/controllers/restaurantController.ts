import { Request, Response } from "express";
import AppError from "../errors/appError";

import ListRestauratesService from "../services/restaurantServices/listRestaurantesService";

export const list = async (req: Request, res: Response): Promise<Response> => {
  const restaurantes = await ListRestauratesService();
  return res.status(200).json(restaurantes);
};
