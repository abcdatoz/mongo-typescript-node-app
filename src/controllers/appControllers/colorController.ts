import createCRUDController from "../middlewaresControllers/createCRUDController";
import { IColor } from "@/models/color";

const colorController = createCRUDController<IColor>("Color");

export default colorController;
