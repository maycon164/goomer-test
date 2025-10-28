import {Category, Product} from "../../../src/core/model/product";
import {BadRequestException} from "../../../src/core/exceptions/bad-request.exception";


describe("Product", () => {

    describe("createProduct", () => {

        it("should create a product successfully", () => {
            const requestBody = {
                name: "Pizza",
                price: 25,
                category: Category.MAIN_COURSE,
                isVisible: true
            };

            const product = Product.createProduct(requestBody);

            expect(product).toBeInstanceOf(Product);
            expect(product.name).toBe("Pizza");
            expect(product.price).toBe(25);
            expect(product.category).toBe(Category.MAIN_COURSE);
            expect(product.isVisible).toBe(true);
            expect(product.id).toBeNull();
        });

        it("should throw if request body is missing", () => {
            expect(() => Product.createProduct(null as any)).toThrow(BadRequestException);
        });

        it("should throw if required fields are missing", () => {
            expect(() => Product.createProduct({ name: "Cake" })).toThrow(BadRequestException);
        });

        it("should throw if name is empty", () => {
            const body = { name: "   ", price: 10, category: Category.DRINK };
            expect(() => Product.createProduct(body)).toThrow(BadRequestException);
        });

        it("should throw if price <= 0", () => {
            const body = { name: "Juice", price: 0, category: Category.DRINK };
            expect(() => Product.createProduct(body)).toThrow(BadRequestException);
        });

        it("should throw if category is invalid", () => {
            const body = { name: "Juice", price: 10, category: "INVALID" };
            expect(() => Product.createProduct(body)).toThrow(BadRequestException);
        });
    });

    describe("update", () => {
        let product: Product;

        beforeEach(() => {
            product = new Product(1, "Pizza", 25, Category.MAIN_COURSE, true);
        });

        it("should update valid fields", () => {
            const updated = product.update({
                name: "Pasta",
                price: 30,
                category: Category.STARTER,
                isVisible: false
            });

            expect(updated.name).toBe("Pasta");
            expect(updated.price).toBe(30);
            expect(updated.category).toBe(Category.STARTER);
            expect(updated.isVisible).toBe(false);
        });

        it("should throw if fields is null", () => {
            expect(() => product.update(null as any)).toThrow(BadRequestException);
        });

        it("should throw if name is empty", () => {
            expect(() => product.update({ name: " " })).toThrow(BadRequestException);
        });

        it("should throw if price <= 0", () => {
            expect(() => product.update({ price: 0 })).toThrow(BadRequestException);
        });

        it("should throw if category is invalid", () => {
            expect(() => product.update({ category: "INVALID" as any })).toThrow(BadRequestException);
        });

        it("should ignore fields not provided", () => {
            const original = product.toJSON();
            const updated = product.update({});
            expect(updated.toJSON()).toEqual(original);
        });
    });
});
