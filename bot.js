const Discord = require('discord.js');
const client = new Discord.Client();
var logger = require('winston');
var auth = require('./auth.json');

const ParserPy = require('./Parser.js');
const steamServ = require('./steamTest.js');
let parserExec = new ParserPy();
let steamAccess = new steamServ();

// Init
steamAccess.initializeUsers();

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});

logger.level = 'info';
// Initialize Discord Bot

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});


client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
  if (msg.content.startsWith('!python')) {
    msg.content = msg.content.replace('!python ', '');
    var res = parserExec.runPython(msg.content);
    res.stdout.on('data', (data) => {
      msg.reply(data.toString());
    });
  }
  if (msg.content.startsWith('!js')) {
    msg.content = msg.content.replace('!js', '');
    var res = parserExec.runJsCode(msg.content);
    res.stdout.on('data', (data) => {
      msg.reply(data.toString());
    });
    }
    if (msg.content.startsWith('Data ')) {
        if (msg.content.includes("top dawg") || msg.content.includes("top dog") || msg.content.includes("topdog")) {
            steamAccess.getTopDawg();
        }
    }
});
client.login(auth.DiscordToken);
