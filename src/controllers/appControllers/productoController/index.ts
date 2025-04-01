import createCRUDController from "../../middlewaresControllers/createCRUDController";
import { IProducto } from "@/models/producto-model";
import create from "./create";
import update from "./update";
import remove from "./remove";

const methods = createCRUDController<IProducto>("Producto");

methods.create = create;
methods.update = update;
methods.remove = remove;

export default methods;
