import { appendFileSync } from 'fs-extra';

export interface DataSet {
  records: dataRecord[];
}
export interface dataRecord {
  field1: string;
  field2: string;
}

export function saveToCSV(dataSet: DataSet) {
  for (let i = 0; i < dataSet.records.length; i++) {
    const record = dataSet.records[i];

    const csvString = `${record.field1},${record.field2}\n`;
    try {
      appendFileSync('./recordedData/testCSV.csv', csvString);
    } catch (err) {
      console.error(err);
    }
  }
}
