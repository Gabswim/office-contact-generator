import { CsvGenerator } from "./CsvGenerator";
import { faker } from "@faker-js/faker";
import { generateEmailAliases } from "./util";
import { createArrayCsvWriter } from "csv-writer";

const HEADERS = [
  "First name",
  "Last name",
  "Phone number",
  "Email address",
  "Company",
  "Title/Role",
  "Website URL",
];
export class GotoCsvGenerator extends CsvGenerator {
  generateRandomDataAndCsvWriter({
    numberOfRows,
    email,
    outputFile,
  }: {
    numberOfRows: number;
    email: string;
    outputFile: string;
  }) {
    const csvWriter = createArrayCsvWriter({
      path: outputFile,
      header: HEADERS,
    });
    const data = this.generateRandomData({ numberOfRows, email });
    return { data, csvWriter };
  }
  private generateRandomData({
    numberOfRows,
    email,
  }: {
    numberOfRows: number;
    email: string;
  }): string[][] {
    const data: string[][] = [];

    for (let i = 0; i < numberOfRows; i++) {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const title = faker.person.jobTitle();
      const emailAddress = generateEmailAliases(email, i);
      const mobilePhone = faker.phone.number();
      const company = faker.company.name();
      const webSite = faker.internet.url();

      const row = [
        firstName,
        lastName,
        mobilePhone,
        emailAddress,
        company,
        title,
        webSite,
      ];

      data.push(row);
    }

    return data;
  }
}
