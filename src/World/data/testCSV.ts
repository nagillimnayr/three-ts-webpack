import { Chance } from 'chance';
import { dataRecord, writeToCSV } from './writeToCSV.ts';

export default function testCSV() {
  const dataSet: dataRecord[] = [];
  const chance = new Chance();

  const num = process.argv.length > 2 ? process.argv[2] : 0;
  const fileName = `csv-test-${num}`;

  for (let i = 0; i < 20; i++) {
    const record: dataRecord = {
      firstName: chance.first(),
      lastName: chance.last(),
      age: chance.age(),
    };
    dataSet.push(record);
  }

  writeToCSV(dataSet, fileName);
}

testCSV();
