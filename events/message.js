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
  
  let args = message.content.slice(config.prefix).split(' ');
  let cmds = args.shift().toLowerCase();
  let command = client.commands.get(cmds.toLowerCase()) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmds));
  
  if(!message.content.startsWith(config.prefix)) return;
  if(message.author.bot) return;
  if(message.channel.type !== 'text') return;
  if(!command) return;
  
  function error(err) {
    const errorEmbed = new MessageEmbed()
      .setTitle('Error!')
      .setDescription(err)
      .setColor('RED')
    message.channel.send(errorEmbed);
  }

  command.run(message, args, error);
  message.delete();
}
