const Discord = require('discord.js');
const fs = require('fs');
const config = require("../config.json");
const prefix = config.prefix;

module.exports.run = async (bot, message, args) => {

    if (message.content.startsWith( `${prefix}help`)) {
    let bicon = message.author.displayAvatarURL;
    let user = message.author.username
    let embed = new Discord.RichEmbed()
    .setColor("#ffffff")
    .setDescription("Here are the help command for SynPics")
    .setTitle("H E L P")
    .addBlankField()
    .addField(`Ascii`, `Usage: ${prefix}ascii <text>`, true)
    .addField(`Dog`, `Usage: ${prefix}dog`, true)
    .addField(`Cat`, `Usage: ${prefix}cat`, true)
    .addField(`Meme`, `Usage: ${prefix}meme`, true)
    .setThumbnail(bicon)
    .setFooter(`Requested by ${user}`, bicon)
    .setTimestamp();



    message.channel.send(embed);
    }
}

module.exports.help = {
    name: "help" 
}
