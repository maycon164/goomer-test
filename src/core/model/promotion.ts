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
        private _isActive?: boolean = true,
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

    set price(value: number) {
        if (value <= 0) {
            throw new BadRequestException("Price must be greater than 0");
        }
        this._price = value;
    }

    set initTime(value: string) {
        this.validateTime(value, "initTime");
        this.validateTimeDifference(value, this._endTime);
        this._initTime = value;
    }

    set endTime(value: string) {
        this.validateTime(value, "endTime");
        this.validateTimeDifference(this._initTime, value);
        this._endTime = value;
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
