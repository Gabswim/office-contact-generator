#!/usr/bin/env tsx
import { generateCSV, getUserInput } from "./util";

const userInput = await getUserInput();
generateCSV(userInput);

console.log("Random data generated and saved to random_data.csv");

export {};
