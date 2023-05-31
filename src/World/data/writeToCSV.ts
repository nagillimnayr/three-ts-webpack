import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

export interface dataRecord {
  firstName: string;
  lastName: string;
  age: number;
}

export function writeToCSV(dataSet: dataRecord[], fileName: string) {
  const __filename = fileURLToPath(import.meta.url);

  const __dirname = path.dirname(__filename);

  const pathToNewFile = path.resolve(
    __dirname,
    path.join('recordedData', `${fileName}.csv`)
  );
  for (let i = 0; i < dataSet.length; i++) {
    const record = dataSet[i];

    const csvString = `${record.firstName},${record.lastName},${record.age},\n`;

    try {
      fs.appendFileSync(pathToNewFile, csvString);
    } catch (err) {
      console.error(err);
    }
  }

  console.log("complete: '", fileName, "' written to: ", pathToNewFile);
}
