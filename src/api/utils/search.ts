import fs from 'fs';
import path from 'path';
import _ from 'lodash';

export const searchFile = (filename: string) => {
  const dir = path.join(__dirname, '../../../upload');
  const files = fs.readdirSync(dir);

  const index = _.findIndex(
    files,
    (e) => {
      return e.includes(filename);
    },
    0
  );

  return files[index];
};
