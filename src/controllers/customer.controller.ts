import { Request, Response } from "express";
import { CustomerService } from "../services/customer.service";
import { Customer } from "../entities/Customer";

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
}

export class CustomerController {
  static async getAll(req: Request, res: Response) {
    const page: number = Number(req.query.page || 1);
    const limit: number = Number(req.query.limit || 10);

    const result: PaginatedResponse<Customer> = await CustomerService.getAll(page, limit);


    return res.json({
      success: true,
      ...result,
    });
  }

  static async getById(req: Request, res: Response) {
    const id: number = Number(req.params.id);

    const customer: Customer | null = await CustomerService.getById(id);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    return res.json({
      success: true,
      data: customer,
    });
  }

  static async search(req: Request, res: Response) {
    const query: string = String(req.query.query || "");

    const customers: Customer[] = await CustomerService.search(query);

    return res.json({
      success: true,
      data: customers,
    });
  }
}