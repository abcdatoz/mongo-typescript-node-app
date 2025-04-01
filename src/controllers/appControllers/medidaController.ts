import createCRUDController from "../middlewaresControllers/createCRUDController";
import { IMedida } from "@/models/medida";

const medidaController = createCRUDController<IMedida>("Medida");

export default medidaController;
