import createCRUDController from "../../middlewaresControllers/createCRUDController";
import { ICategoria } from "@/models/categoria-model";
import create from "./create";
import update from "./update";
import remove from "./remove";

const methods = createCRUDController<ICategoria>("Categoria");

methods.create = create;
methods.update = update;
methods.remove = remove;

export default methods;
