import {BadRequestException} from "../exceptions/bad-request.exception";

export enum Category {
    STARTER = "STARTER",
    MAIN_COURSE = "MAIN_COURSE",
    DESSERT = "DESSERT",
    DRINK = "DRINK"
}

export class Product {
    constructor(
        private readonly _id: number,
        private _name: string,
        private _price: number,
        private _category: Category,
        private _isVisible: boolean
    ) {}

    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get price(): number {
        return this._price;
    }

    get category(): Category {
        return this._category;
    }

    get isVisible(): boolean {
        return this._isVisible;
    }

    set name(value: string) {
        this._name = value;
    }

    set price(value: number) {
        this._price = value;
    }

    set category(value: Category) {
        this._category = value;
    }

    set isVisible(value: boolean) {
        this._isVisible = value;
    }

    public update(fields: Partial<Omit<Product, "id">>) {

        if(!fields) {
            throw new BadRequestException("Request body is missing");
        }

        if (fields.name != null) {
            if (fields.name.trim().length === 0) {
                throw new BadRequestException("Name cannot be empty");
            }
            this.name = fields.name;
        }

        if (fields.price != null) {
            if (fields.price <= 0) {
                throw new BadRequestException("Price must be greater than 0");
            }
            this.price = fields.price;
        }

        if (fields.category != null) {
            if (!Object.values(Category).includes(fields.category)) {
                throw new BadRequestException(
                    `Invalid category. Must be one of: ${Object.values(Category).join(", ")}`
                );
            }
            this.category = fields.category;
        }

        if (fields.isVisible != null) {
            this.isVisible = fields.isVisible;
        }

        return this;
    }

    toJSON() {
        return {
            id: this._id,
            name: this._name,
            price: this._price,
            category: this._category,
            isVisible: this._isVisible
        };
    }

    static createProduct(requestBody: any): Product {

        if(!requestBody) {
            throw new BadRequestException("Request body is missing");
        }

        if (!requestBody.name || !requestBody.price || !requestBody.category) {
            throw new BadRequestException("Missing required fields: name, price, or category");
        }

        if (requestBody.name.trim().length === 0) {
            throw new BadRequestException("Name cannot be empty");
        }

        if(requestBody.price <= 0 ) {
            throw new BadRequestException("Price must be greater than 0");
        }

        if (!Object.values(Category).includes(requestBody.category)) {
            throw new BadRequestException(`Invalid category. Must be one of: ${Object.values(Category).join(", ")}`);
        }

        return new Product(
            null,
            requestBody.name,
            requestBody.price,
            requestBody.category as Category,
            requestBody.isVisible ?? true
        );
    }
}
