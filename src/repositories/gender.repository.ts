import { DataSource, Repository } from 'typeorm';

import { Gender } from '../entities/Gender';

export class GenderRepository {
  private repository: Repository<Gender>;

  constructor(private readonly dataSource: DataSource) {
    this.repository = dataSource.getRepository(Gender);
  }

  async findByName(name: string): Promise<Gender | null> {
    return await this.repository.findOne({
      where: {
        name: name.trim(),
      },
    });
  }


  async create(name: string): Promise<Gender> {
    const gender = this.repository.create({
      name: name.trim(),
    });

    return await this.repository.save(gender);
  }

  async findOrCreate(name: string): Promise<Gender> {
    const normalizedName = name.trim();

    let gender = await this.findByName(normalizedName);

    if (!gender) {
      gender = await this.create(normalizedName);
    }

    return gender;
  }
}