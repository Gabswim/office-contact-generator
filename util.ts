import { faker } from "@faker-js/faker";
import { z } from "zod";
import { question } from "zx";
import { OutlookCsvGenerator } from "./outlook";
import { CsvGenerator } from "./CsvGenerator";
import { GotoCsvGenerator } from "./goto";

const NUMBER_OF_ROWS_DEFAULT = 10_000;
const OUTPUT_FILE_DEFAULT = "random_contacts.csv";

const TYPES_OF_CSV = ["outlook", "goto"] as const;
const TYPE_OF_CSV_DEFAULT = TYPES_OF_CSV[0];

export const userInputSchema = z.object({
  numberOfRows: z.coerce.number().optional().default(10_000),
  email: z.string().email(),
  outputFile: z.string().optional().default(OUTPUT_FILE_DEFAULT),
  typeOfCsv: z.enum(TYPES_OF_CSV).default(TYPE_OF_CSV_DEFAULT),
});

export type UserInput = z.infer<typeof userInputSchema>;
export type UserInputOutlookOnly = Omit<UserInput, "typeOfCsv"> & {
  typeOfCsv: "outlook";
};
export type UserInputGotoOnly = Omit<UserInput, "typeOfCsv"> & {
  typeOfCsv: "goto";
};

export const generateEmailAliases = (email: string, n: number) => {
  const [username, domain] = email.split("@");
  return `${username}+GoToDev-${n}@${domain}`;
};

export const generateRandomData = ({
  numberOfRows,
  email,
}: {
  numberOfRows: number;
  email: string;
}) => {
  const data: string[][] = [];

  for (let i = 0; i < numberOfRows; i++) {
    const firstName = faker.person.firstName();
    const middleName = faker.person.middleName();
    const lastName = faker.person.lastName();
    const title = faker.person.jobTitle();
    const suffix = faker.person.suffix();
    const nickname = faker.person.zodiacSign();
    const givenYomi = faker.word.sample();
    const surnameYomi = faker.word.sample();
    const emailAddress = generateEmailAliases(email, i);
    const emailAddress2 = faker.internet.email();
    const emailAddress3 = faker.internet.email();
    const homePhone = faker.phone.number();
    const homePhone2 = faker.phone.number();
    const businessPhone = faker.phone.number();
    const businessPhone2 = faker.phone.number();
    const mobilePhone = faker.phone.number();
    const carPhone = faker.phone.number();
    const otherPhone = faker.phone.number();
    const primaryPhone = faker.phone.number();
    const pager = faker.phone.number();
    const businessFax = faker.phone.number();
    const homeFax = faker.phone.number();
    const otherFax = faker.phone.number();
    const companyMainPhone = faker.phone.number();
    const callback = faker.phone.number();
    const radioPhone = faker.phone.number();
    const telex = faker.phone.number();
    const tyyTddPhone = faker.phone.number();
    const imAddress = faker.internet.email();
    const jobTitle = faker.person.jobTitle();
    const department = faker.person.jobArea();
    const company = faker.company.name();
    const officeLocation = faker.location.streetAddress();
    const managerName = faker.person.fullName();
    const assistantName = faker.person.fullName();
    const assistantPhone = faker.phone.number();
    const companyYomi = faker.word.sample();
    const businessStreet = faker.location.streetAddress();
    const businessCity = faker.location.city();
    const businessState = faker.location.state({ abbreviated: true });
    const businessPostalCode = faker.location.zipCode();
    const businessCountryRegion = faker.location.country();
    const homeStreet = faker.location.streetAddress();
    const homeCity = faker.location.city();
    const homeState = faker.location.state({ abbreviated: true });
    const homePostalCode = faker.location.zipCode();
    const homeCountryRegion = faker.location.country();
    const otherStreet = faker.location.streetAddress();
    const otherCity = faker.location.city();
    const otherState = faker.location.state({ abbreviated: true });
    const otherPostalCode = faker.location.zipCode();
    const otherCountryRegion = faker.location.country();
    const personalWebPage = faker.internet.url();
    const spouse = faker.person.fullName();
    const schools = faker.word.sample();
    const hobby = faker.word.sample();
    const location = faker.location.city();
    const webPage = faker.internet.url();
    const birthday = faker.date.past().toLocaleDateString();
    const anniversary = faker.date.past().toLocaleDateString();
    const notes = faker.word.sample();

    const row = [
      firstName,
      middleName,
      lastName,
      title,
      suffix,
      nickname,
      givenYomi,
      surnameYomi,
      emailAddress,
      emailAddress2,
      emailAddress3,
      homePhone,
      homePhone2,
      businessPhone,
      businessPhone2,
      mobilePhone,
      carPhone,
      otherPhone,
      primaryPhone,
      pager,
      businessFax,
      homeFax,
      otherFax,
      companyMainPhone,
      callback,
      radioPhone,
      telex,
      tyyTddPhone,
      imAddress,
      jobTitle,
      department,
      company,
      officeLocation,
      managerName,
      assistantName,
      assistantPhone,
      companyYomi,
      businessStreet,
      businessCity,
      businessState,
      businessPostalCode,
      businessCountryRegion,
      homeStreet,
      homeCity,
      homeState,
      homePostalCode,
      homeCountryRegion,
      otherStreet,
      otherCity,
      otherState,
      otherPostalCode,
      otherCountryRegion,
      personalWebPage,
      spouse,
      schools,
      hobby,
      location,
      webPage,
      birthday,
      anniversary,
      notes,
    ];

    data.push(row);
  }

  return data;
};

export const generateCSV = async ({
  numberOfRows,
  email,
  outputFile,
  typeOfCsv,
}: UserInput) => {
  try {
    const csvGenerator = getCsvGenerator(typeOfCsv);

    await csvGenerator.generateCSVAndSave({ numberOfRows, email, outputFile });
    console.log("Finish writing csv file.");
  } catch (error) {
    console.log("Error writing csv file.");
  }
};

const getCsvGenerator = (typeOfCsv: UserInput["typeOfCsv"]): CsvGenerator => {
  switch (typeOfCsv) {
    case "outlook":
      return new OutlookCsvGenerator();
    case "goto":
      return new GotoCsvGenerator();
    default:
      assertNever(typeOfCsv);
      throw new Error("Unexpected typeOfCsv");
  }
};

export const getUserInput = async () => {
  const numberOfRowsAnswer = await question(
    `Number of rows to generate (default: ${NUMBER_OF_ROWS_DEFAULT}): `
  );
  const emailAnswer = await question("Email address for the contact: ");
  const outputFileAnswer = await question(
    `Output file name (default: ${OUTPUT_FILE_DEFAULT}): `
  );
  const typeOfCsvAnswer = await question(
    `Type of CSV (${TYPES_OF_CSV.join(', ')}) (default: ${TYPE_OF_CSV_DEFAULT}): `
  );

  return userInputSchema.parse({
    numberOfRows: numberOfRowsAnswer === "" ? undefined : numberOfRowsAnswer,
    email: emailAnswer,
    outputFile: outputFileAnswer === "" ? undefined : outputFileAnswer,
    typeOfCsv: typeOfCsvAnswer === "" ? undefined : typeOfCsvAnswer,
  });
};

const assertNever = (x: never): never => {
  throw new Error("Unexpected object: " + x);
};
