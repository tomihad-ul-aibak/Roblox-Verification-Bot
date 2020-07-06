const discord = require('discord.js');
const client = new discord.Client();
const noblox = require('noblox.js');
const config = requure('./settings/config.json');
const fs = require('fs');

client.login(config.token);

fs.readdir('./events/', (err, file) => {
  if(err) return console.log(err);
  files.forEach(file => {
    if(!file.endsWith('.js') return;
    const event = require('./events/${file}');
    let eventName = file.split('.')[0];
    
    client.on('eventName', (null, client));
  };
};
