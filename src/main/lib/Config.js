const os = require('os');
const path = require('path');
const fs = require('fs');

const INIT = Symbol('INIT');

class NoteConfig {
  constructor() {
    this[INIT]();
  }

  // 设置配置文件,及文件存储的目录
  [INIT]() {
    const configDirPath = path.join(os.homedir(), 'electron-note');
    if (!fs.existsSync(configDirPath)) {
      fs.mkdirSync(configDirPath);
      fs.mkdirSync(path.join(configDirPath, 'docs'));
    }

    const configPath = path.join(configDirPath, 'config.json');
    if (!fs.existsSync(configPath)) {
      fs.writeFileSync(
        configPath,
        `{"baseDir": "${path.join(configDirPath, 'docs')}"}`
      );
    }
  }
}

export default NoteConfig;
