const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
  name: 'verify',
  descripion: 'Allows a user to verify with your bot!',
  aliases: ['ver', 'v'],
  async run(message, args, error) {
    let verified = db.fetch(`userInformation.verify_${message.author.id}`);
  
    if(verified === null) {
      db.set(`userInformation.verify_${message.author.id}`, false); 
    };
    if(verified === true) {
       return;
    };
   
    const embed1 = new MessageEmbed()
      .setTitle('Roblox Username')
      .setColor('GREEN')
      .setDescription('What is your ROBLOX username?')
      .setFooter('120 seconds until prompt cancels');
   
    
    const statements = [`${message.guild.name}`, `${message.author.username}`];
    const random = Math.floor(Math.random() * statements.length);
    
    const embed2 = new MessageEmbed()
      .setTitle('Verification Step')
      .setColor('GREEN')
      .setDescription(`To verify the accounts ${username} is your account, please enter the following statement into your blurb or description!

\`${statements[random]}\``)
      .setFooter('Once you have finished say \'done\'')
    
     async function getStatus(username) {
       const id =  await noblox.getIdByUsername(username);
       const blurb = await noblox.getBlurb(username);
       if(blurb !== `${message.guild.name}` && blurb !== `${message.author.username}`) {
         return;
       };
     };
    
    const filter = m => m.author.id === message.author.id;
    message.channel.send(embed1).then(async function(message) {
      const collector1 = message.channel.createMessageCollector(filter, { max: 1, time: 120000 });
      collector1.on('collect', username => {
        const validUsername = await noblox.getIdFromUsername(username);
        if(!validUsername) {
          return error(`I cannot find the username ${username}! Please try again.`);
        }
        
        message.channel.send(embed2)
      }
  }
}
