import createCRUDController from "../../middlewaresControllers/createCRUDController";
import { IRestaurant } from "@/models/restaurant-model";
import create from "./create";
import update from "./update";
import remove from "./remove";

const methods = createCRUDController<IRestaurant>("Restaurant");

methods.create = create;
methods.update = update;
methods.remove = remove;

export default methods;
