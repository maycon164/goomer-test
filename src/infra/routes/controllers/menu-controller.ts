import {MenuService} from "../../../core/services/menu-service";
import {Request, Response} from "express";

export class MenuController {

    constructor(private readonly menuService: MenuService) {
    }

    public async getMenu(_req: Request, res: Response) {
        const menu = await this.menuService.getMenu();
        return res.status(200).json(menu)
    }
}
