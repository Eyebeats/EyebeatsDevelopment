const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);


const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("./config.json");
const fs = require("fs");


const perms = "Bot access";




bot.on('message', message => {



    let msg = message.content.toUpperCase();
    let args = message.content.slice(config.prefix.length).trim().split(' ');
    let command = args.shift().toLowerCase();

    let args12 = message.content.split(" ").slice(1);
    var saytext = args12.join(" ");
  
  if (!msg.startsWith(config.prefix)) return;
  if (message.author.bot) return;
  if (command === "say"){
    if (!message.member.roles.find("name", perms)){
        }
        else {
    message.delete();
          var embed = new Discord.RichEmbed()
      .setTitle("Simon says")
      .addField("Executor:", "<@" + message.author.id + ">")
      .addField("Told the bot to say", saytext)
      bot.channels.get("488956651496407040").send(embed)
    
    message.channel.send(saytext);
        }
  }
  if (command === "mutechannel" || command == "mc"){
    message.delete();
    if (!message.member.roles.find("name", perms)){
        }
    else {
      function closeDownChannel(message) {
    let channel = message.channel;
    let roles = message.guild.roles; // collection

    let testRole = roles.find('name', '@everyone');

    channel.overwritePermissions(
        testRole,
        { 'SEND_MESSAGES': false },
        'channel mute'
    )
    .then(console.log)
    .catch(console.log);
}
      closeDownChannel(message);
      var embed = new Discord.RichEmbed()
      .setTitle("Muted channel")
      .addField("Executor:", "<@" + message.author.id + ">")
      .addField("Muted ", message.channel)
      bot.channels.get("488956651496407040").send(embed)
      message.channel.send("Channel muted. Executor <@" + message.author.id + ">")
    }
  }
  if (command === "unmutechannel" || command == "uc"){
    message.delete();
    if (!message.member.roles.find("name", perms)){
        }
    else {
      function unmuteChannel(message) {
    let channel = message.channel;
    let roles = message.guild.roles; 

    let testRole = roles.find('name', '@everyone');

    channel.overwritePermissions(
        testRole,
        { 'SEND_MESSAGES': true },
        'channel mute'
    )
    .then(console.log)
    .catch(console.log);
}
      unmuteChannel(message);
      var embed = new Discord.RichEmbed()
      .setTitle("Unmuted channel")
      .addField("Executor:", "<@" + message.author.id + ">")
      .addField("Unmuted ", message.channel)
      bot.channels.get("488956651496407040").send(embed)
      message.channel.send("Channel un-muted. Executor <@" + message.author.id + ">")
    }
  }

  if (command === "purge"){
        async function purge() {
            message.delete();

            
            if (!message.member.roles.find("name", perms)) { 
              
            }

            
            if (isNaN(args[0])) {
            
                message.author.send('Please use a number as your arguments. \n Usage: ' + config.prefix + 'purge <amount>'); 
               
                return;
            }

            const fetched = await message.channel.fetchMessages({limit: args[0]}); 
           var embed = new Discord.RichEmbed()
      .setTitle("Purge")
      .addField("Executor:", "<@" + message.author.id + ">")
      .addField("Purged " + args[0])
      bot.channels.get("488956651496407040").send(embed)

            
            message.channel.bulkDelete(fetched)
                .catch(error => message.author.send(`Error: ${error}`));

        }
    purge();
      
  }
  if (command === "help"){
    message.delete();
    message.author.send("The prefix for the bot is `" + config.prefix + "`")
    message.author.send(config.prefix + "announce\n" + config.prefix + "setprefix\n" + config.prefix + "help\n" + config.prefix + "setgame\n" + config.prefix + "suggest\n" + config.prefix + "mutechannel\n" + config.prefix + "unmutechannel\n" + config.prefix + "say")
      }
  
  
  if (command === "suggest"){
    if (message.member.roles.find("name", "suggestion banned")){
      message.author.send("Sorry, <@" + message.author.id + ">! You are currently banned from posting feedback. If you feel this is an issue please contact a staff member.")
    }
    else {
      message.delete();
      var embed = new Discord.RichEmbed()
      .setTitle("Suggestion")
      .setColor("#E9E617")
      .addField("Suggested by", "<@" + message.author.id + ">")
      .setDescription(saytext)
      bot.channels.get("489029761675558913").send(embed)
      
      
    }
  }
  if (command === "announce"){  
    if (!message.member.roles.find("name", perms)){
      
    }
    message.delete();
    var embed = new Discord.RichEmbed()
    .setTitle("Announcement")
    .setColor("#FF0061")
    .setDescription(saytext)
    .setTimestamp()
    .setFooter("•IP: Pure.rip")
    bot.channels.get("459991663578972160").send(embed)
    
  }
  
  if (command === "setprefix"){

    if (!message.member.roles.find("name", perms)){
        }
    else {
      let newPrefix = message.content.split(" ").slice(1, 2)[0];
  config.prefix = newPrefix;
fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
  message.delete();
      message.channel.send("")
      var embed = new Discord.RichEmbed()
      .setTitle("Prefix change")
      .addField("Executor:", "<@" + message.author.id + ">")
      .addField("Set the bots prefix to:", config.prefix)
      bot.channels.get("488956651496407040").send(embed)
      
    }
  }
  
  
  
  if (command === "setgame"){
    if (!message.member.roles.find("name", perms)){
    }
    else {
      config.game = saytext;
      var embed = new Discord.RichEmbed()
      .setTitle("Activity change")
      .addField("Executor:", "<@" + message.author.id + ">")
      .addField("Set the bots game to:", config.game)
      bot.channels.get("488956651496407040").send(embed)
      fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
    bot.user.setGame(config.game);
    
      message.delete();
    }
  }
    


    

});
bot.on('GuildMemberAdd', member =>{
  
});

bot.on('ready', () => {


    console.log('Bot started.');
    bot.user.setGame(config.game);

});
bot.login(process.env.TOKEN);
