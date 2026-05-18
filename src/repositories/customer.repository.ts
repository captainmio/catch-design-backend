import { DataSource, Repository } from 'typeorm';

import { Customer } from '../entities/Customer';

export class CustomerRepository {
  private repository: Repository<Customer>;

  constructor(private readonly dataSource: DataSource) {
    this.repository = dataSource.getRepository(Customer);
  }

  async findByEmail(email: string): Promise<Customer | null> {
      return await this.repository.findOne({
        where: {
          email: email.trim(),
        },
      });
    }

  async create(data: Partial<Customer>): Promise<Customer> {
    const customer = this.repository.create(data);

    return await this.repository.save(customer);
  }
}