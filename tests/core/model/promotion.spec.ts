import {DAYS, Promotion} from "../../../src/core/model/promotion";
import {BadRequestException} from "../../../src/core/exceptions/bad-request.exception";

describe("Promotion", () => {
    const validData = {
        description: "Lunch Promo",
        price: 15,
        daysOfWeek: [DAYS.MON, DAYS.TUE],
        initTime: "10:00",
        endTime: "11:00",
        productsIds: [1, 2, 3],
        isActive: true
    };

    test("should create promotion with valid data", () => {
        const promo = Promotion.createPromotion(validData);

        expect(promo).toBeInstanceOf(Promotion);
        expect(promo.description).toBe(validData.description);
        expect(promo.price).toBe(validData.price);
        expect(promo.daysOfWeek).toEqual(validData.daysOfWeek);
        expect(promo.initTime).toBe(validData.initTime);
        expect(promo.endTime).toBe(validData.endTime);
    });

    test("should throw if request body is missing", () => {
        expect(() => Promotion.createPromotion(null)).toThrow(BadRequestException);
    });

    test("should throw if description is empty", () => {
        expect(() => Promotion.createPromotion({ ...validData, description: "  " })).toThrow(BadRequestException);
    });

    test("should throw if price <= 0", () => {
        expect(() => Promotion.createPromotion({ ...validData, price: 0 })).toThrow(BadRequestException);
    });

    test("should throw if daysOfWeek is empty or invalid", () => {
        expect(() => Promotion.createPromotion({ ...validData, daysOfWeek: [] })).toThrow(BadRequestException);
        expect(() => Promotion.createPromotion({ ...validData, daysOfWeek: ["INVALID"] })).toThrow(BadRequestException);
    });

    test("should throw if productsIds is invalid", () => {
        expect(() => Promotion.createPromotion({ ...validData, productsIds: "notArray" as any })).toThrow(BadRequestException);
        expect(() => Promotion.createPromotion({ ...validData, productsIds: [1, "two"] as any })).toThrow(BadRequestException);
    });

    test("should throw if initTime or endTime format is invalid", () => {
        expect(() => Promotion.createPromotion({ ...validData, initTime: "24:00" })).toThrow(BadRequestException);
        expect(() => Promotion.createPromotion({ ...validData, endTime: "10:60" })).toThrow(BadRequestException);
    });

    test("should throw if endTime <= initTime", () => {
        expect(() => Promotion.createPromotion({ ...validData, initTime: "10:00", endTime: "09:00" })).toThrow(BadRequestException);
    });

    test("should throw if time difference < 15 minutes", () => {
        expect(() => Promotion.createPromotion({ ...validData, initTime: "10:00", endTime: "10:10" })).toThrow(BadRequestException);
    });
});
