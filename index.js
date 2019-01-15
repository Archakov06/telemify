#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

const configPath = path.join(os.homedir(), '.config/telemify');
const configFileName = path.join(configPath, 'config.json');

let options = {
  token: null,
  chat_id: null,
};

if (process.argv.length > 2) {
  if (process.argv[2] === 'setup') {
    if (!fs.existsSync(configPath)) {
      fs.mkdirSync(configPath);
    }

    if (process.argv[3].indexOf('--token') > -1) {
      options.token = process.argv[3].split('=')[1];
    } else {
      console.error('Incorrect token');
      return process.exit(1);
    }
    if (process.argv[4].indexOf('--chat_id') > -1) {
      options.chat_id = process.argv[4].split('=')[1];
    } else {
      console.error('Incorrect chat_id');
      return process.exit(1);
    }
    fs.writeFileSync(configFileName, JSON.stringify(options));
    console.log('Configuration file successfully created!');
    return process.exit(0);
  }
  if (process.argv[2] === 'help') {
    console.log(`
Before using tool, you need create configuration file. Use comand:
$ telemify setup --token=XXX --chat_id=XXX

Usage
  $ telemify <text>
  $ tlg <text>

Examples
  $ telemify "Hello, World!"
`);
    process.exit(0);
  }
  text = process.argv[2];
}

try {
  options = JSON.parse(fs.readFileSync(configFileName));
} catch (e) {
  console.error(`Failed to read config from "${configFileName}"`, e);
  process.exit(1);
}

if (!options.token || !options.chat_id) {
  console.error(`Token or chat_id not defined in config file: "${configFileName}"`);
  process.exit(1);
}

const jsonPayload = JSON.stringify({
  text,
  chat_id: options.chat_id,
});

const https = require('https');
const req = https.request(
  {
    hostname: 'api.telegram.org',
    port: 443,
    path: `/bot${options.token}/sendMessage`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': jsonPayload.length,
    },
  },
  res => {
    if (res.statusCode !== 200) {
      console.error(`Failed to call telegram api, status code: ${res.statusCode}`);
    }
  },
);

req.on('error', e => {
  console.error(e);
});

req.write(jsonPayload);
req.end();
