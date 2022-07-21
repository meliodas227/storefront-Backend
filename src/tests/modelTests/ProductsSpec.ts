import products from "../../models/Products";
import db from "../../database";
import productsType from "../../types/products.type";
import Products from "../../models/Products";

const Product = new products();

describe("Products model", () => {
  describe("logic", () => {
    const product = {
      name: "test",
      price: 1000,
    } as productsType;
    beforeAll(async () => {
      const createProduct = await Product.create(product);
      product.id = createProduct.id;
    });
    afterAll(async () => {
      const connection = await db.connect();
      const sql = "delete from products";
      await connection.query(sql);
      connection.release();
    });

    it("create should return a product", async function () {
      const createProduct = await Product.create({
        name: "test1",
        price: 2000,
      } as productsType);
      expect(createProduct).toEqual({
        id: createProduct.id,
        name: "test1",
        price: "2000" as unknown as number,
      } as productsType);
    });

    it("index should return all products", async function () {
      const products = await Product.getAll();
      expect(products.length).toBeGreaterThanOrEqual(2);
    });

    it("show should return product with specified id", async function () {
      const showProduct = await Product.getOne(product.id as number);
      expect(showProduct).toEqual({
        id: product.id,
        name: product.name,
        price: "1000" as unknown as number,
      } as productsType);
    });
  });
});
