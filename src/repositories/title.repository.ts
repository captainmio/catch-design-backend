import { DataSource, Repository } from 'typeorm';

import { Title } from '../entities/Title';

export class TitleRepository {
  private repository: Repository<Title>;

  constructor(private readonly dataSource: DataSource) {
    this.repository = dataSource.getRepository(Title);
  }

  async findByName(name: string): Promise<Title | null> {
    return await this.repository.findOne({
      where: {
        name: name.trim(),
      },
    });
  }

  async create(name: string): Promise<Title> {
    const title = this.repository.create({
      name: name.trim(),
    });

    return await this.repository.save(title);
  }

  async findOrCreate(name: string): Promise<Title> {
    const normalizedName = name.trim();

    let title = await this.findByName(normalizedName);

    if (!title) {
      title = await this.create(normalizedName);
    }

    return title;
  }
}