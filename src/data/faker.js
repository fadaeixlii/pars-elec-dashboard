import { faker } from "@faker-js/faker";
import fs from "fs";
import path from "path";

const arr = ["type1", "type2", "type3"];

export function createRandomEvent(index) {
  return {
    id: index,
    date: faker.date.past(),
    branchName: faker.location.secondaryAddress(),
    branchCode: faker.number.int({ min: 10, max: 150 }),
    eventType: arr[faker.number.int({ min: 1, max: 3 }) - 1],
    inputNumber: faker.number.int({ min: 1000000 }),
    userNumber: faker.number.int({ min: 1000000 }),
    userName: faker.person.fullName(),
  };
}

const r = [];
for (let i = 0; i <= 100; i++) {
  r.push(createRandomEvent(i + 1));
}

const __dirname = path.resolve();

const filePath = path.join(__dirname, "events.json");

fs.writeFileSync(filePath, JSON.stringify(r, null, 2));

console.log(`Data saved to ${filePath}`);
