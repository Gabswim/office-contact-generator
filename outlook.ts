import { createArrayCsvWriter } from "csv-writer";
import {  generateEmailAliases } from "./util";
import { faker } from "@faker-js/faker";
import { CsvGenerator } from "./CsvGenerator";
const HEADERS = [
  "First Name",
  "Middle Name",
  "Last Name",
  "Title",
  "Suffix",
  "Nickname",
  "Given Yomi",
  "Surname Yomi",
  "E-mail Address",
  "E-mail 2 Address",
  "E-mail 3 Address",
  "Home Phone",
  "Home Phone 2",
  "Business Phone",
  "Business Phone 2",
  "Mobile Phone",
  "Car Phone",
  "Other Phone",
  "Primary Phone",
  "Pager",
  "Business Fax",
  "Home Fax",
  "Other Fax",
  "Company Main Phone",
  "Callback",
  "Radio Phone",
  "Telex",
  "TTY/TDD Phone",
  "IMAddress",
  "Job Title",
  "Department",
  "Company",
  "Office Location",
  "Manager's Name",
  "Assistant's Name",
  "Assistant's Phone",
  "Company Yomi",
  "Business Street",
  "Business City",
  "Business State",
  "Business Postal Code",
  "Business Country/Region",
  "Home Street",
  "Home City",
  "Home State",
  "Home Postal Code",
  "Home Country/Region",
  "Other Street",
  "Other City",
  "Other State",
  "Other Postal Code",
  "Other Country/Region",
  "Personal Web Page",
  "Spouse",
  "Schools",
  "Hobby",
  "Location",
  "Web Page",
  "Birthday",
  "Anniversary",
  "Notes",
];

export class OutlookCsvGenerator extends CsvGenerator {
 
  generateRandomDataAndCsvWriter({
    numberOfRows,
    email,
    outputFile
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
  }
}
