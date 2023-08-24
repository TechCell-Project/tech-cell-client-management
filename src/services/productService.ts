import { PRODUCTS_ENDPOINT } from "@constants/service";
import instance from "./instance";

export const getProducts = () => instance.get(`${PRODUCTS_ENDPOINT}?all=true`);