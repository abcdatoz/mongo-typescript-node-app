import createCRUDController from "../middlewaresControllers/createCRUDController";
import { IMesa } from "@/models/mesa";

const mesaController = createCRUDController<IMesa>("Mesa");

export default mesaController;
