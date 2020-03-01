import * as fs from 'fs';
import { homedir } from 'os';
import { INoteConfig } from '@/types';

export function getNoteConfig(): INoteConfig {
  let config!: INoteConfig;
  const basePath = `${ homedir() }/electron-note`;
  const docPath = basePath + '/doc';
  const imagesPath = basePath + '/image';
  const configPath = basePath + '/config.json';

  if (!fs.existsSync(basePath)) {
    fs.mkdirSync(docPath, {
      recursive: true,
    });
    fs.mkdirSync(imagesPath);

    config = { 'doc': docPath, img: imagesPath };
    fs.writeFileSync(configPath, JSON.stringify(config));
  } else {
    config = JSON.parse(fs.readFileSync(configPath).toString());
  }
  return config;
}
