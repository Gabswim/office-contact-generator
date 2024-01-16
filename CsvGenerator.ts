import { CsvWriter } from "csv-writer/src/lib/csv-writer";

export abstract class CsvGenerator {
    abstract generateRandomDataAndCsvWriter({
      numberOfRows,
      email,
      outputFile
    }: {
      numberOfRows: number;
      email: string;
      outputFile: string;
    }): { data: string[][]; csvWriter: CsvWriter<string[]> };
    async generateCSVAndSave({
      numberOfRows,
      email,
      outputFile
    }: {
      numberOfRows: number;
      email: string;
      outputFile: string;
    }) {
      const { data, csvWriter } = this.generateRandomDataAndCsvWriter({
        numberOfRows,
        email,
        outputFile
      });
      await csvWriter.writeRecords(data);
    }
  }