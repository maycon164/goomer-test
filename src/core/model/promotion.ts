import { BadRequestException } from "../exceptions/bad-request.exception";

export enum DAYS {
    MON = "MON",
    TUE = "TUE",
    WED = "WED",
    THU = "THU",
    FRI = "FRI",
    SAT = "SAT",
    SUN = "SUN"
}

export class Promotion {
    constructor(
        private readonly _id: number | null,
        private _description: string,
        private _price: number,
        private _daysOfWeek: DAYS[],
        private _initTime: string,
        private _endTime: string,
        private productsIds: number[],
        private _isActive: boolean = true,
    ) {
        this.validateTime(_initTime, "initTime");
        this.validateTime(_endTime, "endTime");
        this.validateTimeDifference(_initTime, _endTime);
    }

    private validateTime(time: string, field: string) {
        const regex = /^([01]\d|2[0-3]):([0-5]\d)$/; // HH:mm format
        if (!regex.test(time)) {
            throw new BadRequestException(`${field} must be in 'HH:mm' format`);
        }
    }

    private validateTimeDifference(init: string, end: string) {
        const [initHours, initMinutes] = init.split(":").map(Number);
        const [endHours, endMinutes] = end.split(":").map(Number);

        const initTotalMinutes = initHours * 60 + initMinutes;
        const endTotalMinutes = endHours * 60 + endMinutes;

        if (endTotalMinutes <= initTotalMinutes) {
            throw new BadRequestException("endTime must be greater than initTime");
        }

        const diff = endTotalMinutes - initTotalMinutes;
        if (diff < 15) {
            throw new BadRequestException("The difference between initTime and endTime must be at least 15 minutes");
        }
    }

    get id(): number | null {
        return this._id;
    }

    get description(): string {
        return this._description;
    }

    get price(): number {
        return this._price;
    }

    get daysOfWeek(): DAYS[] {
        return this._daysOfWeek;
    }

    get initTime(): string {
        return this._initTime;
    }

    get endTime(): string {
        return this._endTime;
    }

    static createPromotion(requestBody: any): Promotion {
        if (!requestBody) {
            throw new BadRequestException("Request body is missing");
        }

        const { description, price, daysOfWeek, initTime, endTime, productsIds, isActive } = requestBody;

        if (!description || price == null || !daysOfWeek || !initTime || !endTime || !productsIds) {
            throw new BadRequestException("Missing required fields: description, price, daysOfWeek, initTime, endTime, or productsIds");
        }

        if (description.trim().length === 0) {
            throw new BadRequestException("Description cannot be empty");
        }

        if (price <= 0) {
            throw new BadRequestException("Price must be greater than 0");
        }

        if (!Array.isArray(daysOfWeek) || daysOfWeek.length === 0) {
            throw new BadRequestException("daysOfWeek must be a non-empty array");
        }

        const invalidDays = daysOfWeek.filter((d: string) => !Object.values(DAYS).includes(d as DAYS));

        if (invalidDays.length > 0) {
            throw new BadRequestException(`Invalid daysOfWeek: ${invalidDays.join(", ")}`);
        }

        if (!Array.isArray(productsIds) || productsIds.some((id: any) => typeof id !== "number")) {
            throw new BadRequestException("productsIds must be an array of numbers");
        }

        return new Promotion(
            null,
            description,
            price,
            daysOfWeek,
            initTime,
            endTime,
            productsIds,
            isActive ?? true
        );
    }

    toJSON() {
        return {
            id: this._id,
            description: this._description,
            price: this._price,
            daysOfWeek: this._daysOfWeek,
            initTime: this._initTime,
            endTime: this._endTime,
        };
    }
}
