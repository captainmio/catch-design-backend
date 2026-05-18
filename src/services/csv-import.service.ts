import fs from "fs";
import path from "path";

import { parse } from "csv-parse";

import { AppDataSource } from "../config/data-source";

import { customerSchema } from "../schemas/customer.schema";
import { CustomerRepository } from "../repositories/customer.repository";
import { GenderRepository } from "../repositories/gender.repository";
import { TitleRepository } from "../repositories/title.repository";


export async function csvImport() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  const customerRepository = new CustomerRepository(AppDataSource);
  const genderRepository = new GenderRepository(AppDataSource);
  const titleRepository = new TitleRepository(AppDataSource);

  const filePath = path.join(
    process.cwd(),
    "data/customers.csv",
  );


  const parser = fs
    .createReadStream(filePath)
    .pipe(
      parse({
        columns: true,
        skip_empty_lines: true,
        trim: true,
      }),
    );

  for await (const row of parser) {
    try {
      const validated = customerSchema.parse(row);

      // =========================
      // CHECK EXISTING CUSTOMER
      // =========================

      const existingCustomer =
        await customerRepository.findByEmail(validated.email);

      if (existingCustomer) {
        continue;
      }

      // // =========================
      // // FIND OR CREATE GENDER
      // // =========================

      let gender = await genderRepository.findByName(validated.gender);

      if (!gender) {
        gender = await genderRepository.create(validated.gender);
      }

      // =========================
      // FIND OR CREATE TITLE
      // =========================

      let title = await titleRepository.findByName(validated.title);

      if (!title) {
        title = await titleRepository.create(validated.title);
      }

      // =========================
      // CREATE CUSTOMER
      // =========================

      const customer = await customerRepository.create({
        ...validated,
        city:
          validated.city != null
            ? String(validated.city)
            : undefined,
        gender,
        title,
      } as any);

    } catch (error) {
      console.log(error)
    }
  }
}

csvImport().catch((error) => {
  console.error(error);
});