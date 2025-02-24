import { Request, Response } from "express";
import AppError from "../errors/appError";
import { IRestaurant } from "../models/restaurant-model";

import ListRestauratesService from "../services/restaurantServices/listRestaurantesService";
import CreateRestaurantService from "../services/restaurantServices/createRestaurantService";
import EditRestaurantService from "../services/restaurantServices/editRestaurantService";
import RemoveRestaurantService from "../services/restaurantServices/removeRestaurantService";

export const list = async (req: Request, res: Response): Promise<Response> => {
    const restaurantes = await ListRestauratesService();
    return res.status(200).json(restaurantes);
};

export const add = async (req: Request, res: Response): Promise<Response> => {
    const newRestaurant: IRestaurant = req.body;

    if (req.file?.filename) {
        newRestaurant.logo = req.file?.filename;
    }

    const restaurant = await CreateRestaurantService(newRestaurant);

    return res.status(200).json(restaurant);
};

export const edit = async (req: Request, res: Response): Promise<Response> => {
    const restaurantData: IRestaurant = req.body;
    const { id } = req.params;

    if (req.file?.filename) restaurantData.logo = req.file?.filename;

    const restaurantUpdated = await EditRestaurantService(restaurantData, id);

    return res.status(200).send(restaurantUpdated);
};

export const remove = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const { id } = req.params;

    await RemoveRestaurantService(id);
    return res.status(200).json({ message: "Restaurant Eliminado" });
};
