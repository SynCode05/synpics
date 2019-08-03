const Discord = require('discord.js');
const fs = require('fs');
const config = require("../config.json");
const prefix = config.prefix;

module.exports.run = async (bot, message, args) => {

    if (message.content.startsWith( `${prefix}help`)) {
    let embed = new Discord.RichEmbed()
    .setColor("#ffffff")
    .setDescription("Here are the help command for SynPics")
    .setTitle("Help!")
    .addField(`Ascii`, `Usage: ${prefix}ascii <text>`)
    .addField(`Dog`, `Usage: ${prefix}dog`)
    .addField(`Cat`, `Usage: ${prefix}cat`)
    .addField(`Meme`, `Usage: ${prefix}meme`)
    .setTimestamp();


    message.channel.send(embed);
    }
}

module.exports.help = {
    name: "help" 
}