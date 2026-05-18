import { Repository } from "typeorm";
import { AppDataSource } from "../config/data-source";
import { Customer } from "../entities/Customer";

const getCustomerRepository = () => AppDataSource.getRepository(Customer);

export class CustomerService {
  static async getAll(page: number = 1, limit: number = 10) {
    const repository: Repository<Customer> = getCustomerRepository();
    const [data, total] = await repository.findAndCount({

      relations: ["gender", "title"],
      skip: (page - 1) * limit,
      take: limit,
      order: {
        id: "ASC",
      },
    });

    return {
      data,
      meta: {
        total,
        page,
        limit,
      },
    };
  }

  static async getById(id: number) {
    const repository: Repository<Customer> = getCustomerRepository();
    return repository.findOne({
      where: { id },
      relations: ["gender", "title"],
    });
  }

  static async search(query: string) {
    const repository: Repository<Customer> = getCustomerRepository();
    return repository
      .createQueryBuilder("customer")
      .leftJoinAndSelect("customer.gender", "gender")
      .leftJoinAndSelect("customer.title", "title")
      .where("customer.email LIKE :query", {
        query: `%${query}%`,
      })
      .orWhere("customer.first_name LIKE :query", {
        query: `%${query}%`,
      })
      .orWhere("customer.last_name LIKE :query", {
        query: `%${query}%`,
      })
      .getMany();
  }
}