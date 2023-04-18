import { initialProducts } from "src/assets/initial-products";
import { ProductsDB } from "src/data-providers/produsts.db";

console.log(process.env);

initialProducts.forEach(product => {
    ProductsDB.add(product);
})