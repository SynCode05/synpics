//Don't touch
const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("./config.json");
const fs = require("fs");
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.afk = new Map();
const superagent = require('superagent');
const errors = require("./utils/errors.js");
let purple = config.purple;
var guildConf = require('./guildConf.json');
let prefix = config.prefix



fs.readdir("./commands/", (err, files) => {

	if(err) console.log(err);
	let jsfile = files.filter(f => f.split(".").pop() === "js");
	if(jsfile.length <= 0){
	  console.log("Couldn't find commands.");
	  return;
	}
  
	jsfile.forEach((f, i) =>{
	  let props = require(`./commands/${f}`);
	  console.log(`${f} loaded!`);
	  bot.commands.set(props.help.name, props);
	});
  });
  
  


bot.on("ready", async () => {
  console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
  bot.user.setActivity(`${bot.guilds.size} Guilds | ${prefix}help`, {type: "WATCHING"});


});


bot.on('message', (message) => {
    if (message.channel.type === "dm" || message.author.bot || message.author === bot.user) return; // Checks if we're on DMs, or the Author is a Bot, or the Author is our Bot, stop.
    var args = message.content.split(' ').slice(1); // We need this later


	// //Server info
	// if (message.content.startsWith(`${prefix}info`)) {
	// 	let sicon = message.guild.displayAvatarURL;
	// 	let serverembed = new Discord.RichEmbed()
	// 	.setDescription("Server Information")
	// 	.setThumbnail(sicon)
	// 	.setColor("#ffffff")
	// 	.addField("Server name", message.guild.name)
	// 	.addField("Server prefix", prefix)
	// 	.addField("Server created at", message.guild.createdAt)
	// 	.addField("You joined on", message.member.joinedAt)
	// 	.addField("Total members", message.guild.memberCount);
	
	// 	return message.channel.send(serverembed);
	//   }
	// //Bot info
	//   if (message.content.startsWith(`${prefix}bot`)) {
	// 	  let bicon = bot.user.displayAvatarURL;
	// 	  let botembed = new Discord.RichEmbed()
	// 	  .setDescription("Bot Information")
	// 	  .setThumbnail(bicon)
	// 	  .setColor("#ffffff")
	// 	  .addField("Bot User, ", bot.user.username)
	// 	  .addField("Bot created at",bot.user.createdAt);
	
	// 	 return message.channel.send(botembed);
	// 	}
	
	// Report Command
	//   if (message.content.startsWith(`${prefix}report`)) {
	// 	const args1 = message.content.split(" ").slice(1);
	// 	  let rUser = message.guild.member(message.mentions.user || message.guild.members.get(args1[0]));
	// 	  if(!rUser) return message.channel.send("Couldn't find user.");
	// 	  let reason = args.join(" ").slice(22);
	// 	  let bicon = bot.user.displayAvatarURL;
	
	// 	  let reportEmbed = new Discord.RichEmbed()
	// 	  .setDescription("Reports")
	// 	  .setThumbnail(bicon)
	// 	  .setColor("#ffffff")
	// 	  .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
	// 	  .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
	// 	  .addField("Channel", message.channel)
	// 	  .addField("Time", message.createdAt)
	// 	  .addField("Reason", reason);
	
	// 	  let reportschannel = message.guild.channels.find('name', "reports");
	// 	  if(!reportschannel) return message.channel.send("Couldn't find the repots channel. Please Contact a server admin to create a channel called reports");
	
	
	// 	  message.delete().catch(O_o=>{});
	// 	  reportschannel.send(reportEmbed)
	// 	}
	
	// talk
	const y = process.openStdin();
	y.addListener('data', res => {
    const x = res.toString().trim().split(/ +/g);
    bot.channels.get('606056239075557379').send(x.join(' '));
});

	//main commands
		if (message.content.startsWith(`${prefix}dab`)) {
		  message.author.sendMessage("<o/");
		}

	//eval
	if (message.content.startsWith( `${prefix}eval`)) {
	       if(message.author.id !== config.OwnerID) return;
		try {
		  const code = args.join(" ");
		  let evaled = eval(code);
	 
		  if (typeof evaled !== "string")
			evaled = require("util").inspect(evaled);
	
	 
		  message.channel.send(clean(evaled), {code:"xl"});
		} catch (err) {
		  message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
		}
	}

    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    // let args = messageArray.slice(1);
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot,message,args);

	
//stop command
if (message.content.startsWith(prefix + "shutdown")) {
	if(message.author.id !== '249474587530625034') return;
	  try {
	  message.author.sendMessage('The bot has been shutdown!')
	  process.exit(0)
		
	  } catch (l) {
		message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
	  }
	}    
	
  
	  function clean(text) {
	if (typeof(text) === "string")
	  return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
	else
		return text;
  } 
});

//Login
bot.login(process.env.token);
