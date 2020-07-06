module.exports = (client) => {
  console.log(`${client.user.tag} is ONLINE!`);
  console.log(`✅ | Verify.js
✅ | Get-Roles.js
✅ | Online.js`);
  
  client.user.setActivity(`${verifiedMembers} Verified Members!`, { type: 'WATCHING' });
}
