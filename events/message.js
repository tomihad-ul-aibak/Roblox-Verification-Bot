const config = require('../settings/config.json');
const { Collection, MessageEmbed } = require('discord.js');
const fs = require('fs');

module.exports = (client, message) => {
  client.commands = new Collection();
  const mainSection = fs.readdirSync('./commands/v').filter(file => file.endsWith('.js'));
  for(const file of mainSection) {
    const command = require(`../commands/main/${file}`);
    client.commands.set(command.name, command);
  }
  
 
