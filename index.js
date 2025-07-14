const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const WhatsAppService = require('./services/whatsapp');
const CommandParser = require('./utils/commandParser');
const Logger = require('./utils/logger');
const config = require('./config/settings');
// Temporarily comment out database until fixed
// const { storage } = require('./server/storage');

// Import commands
const pingCommand = require('./commands/ping');
const menuCommand = require('./commands/menu');
const tagallCommand = require('./commands/tagall');
const paymentCommand = require('./commands/payment');
const jokesCommand = require('./commands/jokes');
const funCommand = require('./commands/fun');
const rizzCommand = require('./commands/rizz');
const quotesCommand = require('./commands/quotes');
const bibleCommand = require('./commands/bible');
const quranCommand = require('./commands/quran');
const blockCommand = require('./commands/block');
const unblockCommand = require('./commands/unblock');
const bangroupCommand = require('./commands/bangroup');
const unbangroupCommand = require('./commands/unbangroup');
const banwhatsappCommand = require('./commands/banwhatsapp');
const unbanwhatsappCommand = require('./commands/unbanwhatsapp');
const viewonceCommand = require('./commands/viewonce');
const spampairCommand = require('./commands/spampair');
const kickCommand = require('./commands/kick');
const addCommand = require('./commands/add');
const promoteCommand = require('./commands/promote');
const callCommand = require('./commands/call');
const groupbugCommand = require('./commands/groupbug');
const sessionCommand = require('./commands/session');
const gamesCommand = require('./commands/games');
const wcgCommand = require('./commands/wcg');
const tictactoeCommand = require('./commands/tictactoe');
const runtimeCommand = require('./commands/runtime');
const webpairCommand = require('./commands/webpair');
const setmodeCommand = require('./commands/setmode');

class WhatsAppBot {
    constructor() {
        this.client = null;
        this.whatsappService = null;
        this.commandParser = new CommandParser();
        this.logger = new Logger();
        this.isReady = false;
        
        // Register commands
        this.registerCommands();
    }

    registerCommands() {
        // Core commands
        this.commandParser.registerCommand('ping', pingCommand);
        this.commandParser.registerCommand('menu', menuCommand);
        this.commandParser.registerCommand('tagall', tagallCommand);
        this.commandParser.registerCommand('payment', paymentCommand);
        this.commandParser.registerCommand('pay', paymentCommand);
        
        // Entertainment commands
        this.commandParser.registerCommand('jokes', jokesCommand);
        this.commandParser.registerCommand('fun', funCommand);
        this.commandParser.registerCommand('rizz', rizzCommand);
        this.commandParser.registerCommand('quotes', quotesCommand);
        this.commandParser.registerCommand('bible', bibleCommand);
        this.commandParser.registerCommand('quran', quranCommand);
        
        // Admin/Moderation commands
        this.commandParser.registerCommand('block', blockCommand);
        this.commandParser.registerCommand('unblock', unblockCommand);
        this.commandParser.registerCommand('bangroup', bangroupCommand);
        this.commandParser.registerCommand('unbangroup', unbangroupCommand);
        this.commandParser.registerCommand('banwhatsapp', banwhatsappCommand);
        this.commandParser.registerCommand('unbanwhatsapp', unbanwhatsappCommand);
        
        // Advanced commands
        this.commandParser.registerCommand('viewonce', viewonceCommand);
        this.commandParser.registerCommand('spampair', spampairCommand);
        this.commandParser.registerCommand('kick', kickCommand);
        this.commandParser.registerCommand('add', addCommand);
        this.commandParser.registerCommand('promote', promoteCommand);
        this.commandParser.registerCommand('call', callCommand);
        this.commandParser.registerCommand('groupbug', groupbugCommand);
        this.commandParser.registerCommand('session', sessionCommand);
        
        // Gaming commands
        this.commandParser.registerCommand('games', gamesCommand);
        this.commandParser.registerCommand('wcg', wcgCommand);
        this.commandParser.registerCommand('tictactoe', tictactoeCommand);
        
        // System commands
        this.commandParser.registerCommand('runtime', runtimeCommand);
        this.commandParser.registerCommand('webpair', webpairCommand);
        this.commandParser.registerCommand('setmode', setmodeCommand);
    }

    async initialize() {
        try {
            this.logger.info('Initializing WhatsApp Bot...');
            
            // Create WhatsApp client
            this.client = new Client({
                authStrategy: new LocalAuth({
                    clientId: config.bot.clientId
                }),
                puppeteer: {
                    headless: true,
                    executablePath: '/nix/store/zi4f80l169xlmivz8vja8wlphq74qqk0-chromium-125.0.6422.141/bin/chromium-browser',
                    args: [
                        '--no-sandbox',
                        '--disable-setuid-sandbox',
                        '--disable-dev-shm-usage',
                        '--disable-accelerated-2d-canvas',
                        '--no-first-run',
                        '--no-zygote',
                        '--single-process',
                        '--disable-gpu',
                        '--disable-web-security',
                        '--disable-features=VizDisplayCompositor',
                        '--disable-background-timer-throttling',
                        '--disable-backgrounding-occluded-windows',
                        '--disable-renderer-backgrounding'
                    ]
                }
            });

            this.whatsappService = new WhatsAppService(this.client);
            this.setupEventHandlers();
            
            await this.client.initialize();
            
        } catch (error) {
            this.logger.error('Failed to initialize bot:', error.message || error);
            console.error('Full error details:', error);
            process.exit(1);
        }
    }

    setupEventHandlers() {
        // QR Code for authentication
        this.client.on('qr', (qr) => {
            this.logger.info('QR Code received. Please scan with your WhatsApp mobile app:');
            qrcode.generate(qr, { small: true });
        });

        // Client ready
        this.client.on('ready', () => {
            this.logger.info('WhatsApp Bot is ready and connected!');
            this.isReady = true;
        });

        // Authentication success
        this.client.on('authenticated', () => {
            this.logger.info('WhatsApp authentication successful!');
        });

        // Authentication failure
        this.client.on('auth_failure', (msg) => {
            this.logger.error('Authentication failed:', msg);
        });

        // Connection lost
        this.client.on('disconnected', (reason) => {
            this.logger.warn('WhatsApp client disconnected:', reason);
            this.isReady = false;
        });

        // Message received
        this.client.on('message', async (message) => {
            await this.handleMessage(message);
        });

        // Group join
        this.client.on('group_join', (notification) => {
            this.logger.info(`Someone joined group: ${notification.chatId}`);
        });

        // Error handling
        this.client.on('error', (error) => {
            this.logger.error('WhatsApp client error:', error);
        });
    }

    async handleMessage(message) {
        try {
            // Ignore status messages and own messages
            if (message.from === 'status@broadcast' || message.fromMe) {
                return;
            }

            // Only process messages that start with command prefix
            if (!message.body.startsWith(config.bot.commandPrefix)) {
                return;
            }

            // Get sender information
            const senderNumber = message.from.split('@')[0];
            const chat = await message.getChat();
            const senderContact = await message.getContact();

            // Check bot mode restrictions
            if (config.bot.mode === 'private' && senderNumber !== config.bot.ownerNumber) {
                this.logger.info(`Command blocked - bot in private mode: ${senderNumber}`);
                return; // Silently ignore in private mode
            }

            // Check if sender is globally banned from WhatsApp
            if (banwhatsappCommand.isBanned(senderNumber)) {
                this.logger.info(`Blocked command from globally banned WhatsApp number: ${senderNumber}`);
                return; // Silently ignore
            }

            // Check if sender is blocked
            if (blockCommand.isBlocked(senderNumber)) {
                this.logger.info(`Blocked command from blocked contact: ${senderNumber}`);
                return; // Silently ignore
            }

            // Check if group is banned (only for group chats)
            if (chat.isGroup && bangroupCommand.isBanned(chat.id._serialized)) {
                this.logger.info(`Blocked command from banned group: ${chat.id._serialized}`);
                return; // Silently ignore
            }

            this.logger.info(`Received command: ${message.body} from ${message.from}`);

            // Parse and execute command
            const result = await this.commandParser.parseAndExecute(message, this.whatsappService);
            
            if (result && result.success === false) {
                await message.reply(result.message || 'Command execution failed.');
            }

        } catch (error) {
            this.logger.error('Error handling message:', error);
            await message.reply('Sorry, an error occurred while processing your command.');
        }
    }

    async shutdown() {
        this.logger.info('Shutting down WhatsApp Bot...');
        if (this.client) {
            await this.client.destroy();
        }
        process.exit(0);
    }
}

// Initialize and start the bot
const bot = new WhatsAppBot();

// Graceful shutdown handling
process.on('SIGINT', async () => {
    console.log('\nReceived SIGINT. Shutting down gracefully...');
    await bot.shutdown();
});

process.on('SIGTERM', async () => {
    console.log('\nReceived SIGTERM. Shutting down gracefully...');
    await bot.shutdown();
});

// Start the bot
bot.initialize().catch((error) => {
    console.error('Failed to start bot:', error);
    process.exit(1);
});
