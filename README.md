# Ayomikun-V2

A comprehensive WhatsApp bot with entertainment, moderation, and gaming features built using Node.js and whatsapp-web.js. Features a React-based dashboard for monitoring and management.

## Features

### Entertainment Commands
- 🃏 Jokes - Random jokes to lighten the mood
- 🎯 Fun Facts - Interesting trivia and facts
- 💖 Rizz Lines - Conversation starters and pickup lines
- 📖 Quotes - Inspirational and motivational quotes
- 📚 Bible/Quran - Religious verses and references

### Gaming Commands
- 🎮 Tic-Tac-Toe - Play the classic game with friends
- 🔤 Word Chain Games - Test your vocabulary skills
- 📊 Game Statistics - Track wins, losses, and draws

### Moderation Features
- 🚫 Block/Unblock - Manage blocked contacts
- 🏠 Ban/Unban Groups - Control group access
- 👥 Member Management - Kick, add, and promote members
- 📢 Tag All - Mention all group members

### Utility Commands
- 🏓 Ping - Check bot responsiveness
- ⏱️ Runtime - View bot uptime statistics
- 💰 Payment - Payment processing features
- 🔧 Session Management - Bot session controls

## Technology Stack

- Backend: Node.js with Express.js
- Frontend: React 18 with TypeScript
- Database: PostgreSQL with Drizzle ORM
- Styling: Tailwind CSS with shadcn/ui components
- WhatsApp Integration: whatsapp-web.js
- Build Tools: Vite and ESBuild

## Installation

1. Clone the repository:git clone https://github.com/your-username/ayomikun-whatsapp-bot.git
cd ayomikun-whatsapp-bot

2. Install dependencies:npm install

3. Set up environment variables:cp .env.example .env
# Edit .env with your configuration

4. Start the development server:npm run dev

5. Scan the QR code with your WhatsApp mobile app to authenticate

## Configuration

The bot can be configured through environment variables:

- BOT_NAME - Name of the bot (default: "Ayomikun X")
- OWNER_NAME - Owner's name (default: "AYOMIKUN")
- OWNER_NUMBER - Owner's WhatsApp number
- PREFIX - Command prefix (default: ".")
- MODE - Bot mode: "public" or "private"
- PORT - Server port (default: 5000)

## Dashboard

Access the web dashboard at http://localhost:5000 to:
- Monitor bot status and connectivity
- View blocked contacts and banned groups
- Check bot configuration
- Monitor real-time statistics

## Commands

All commands start with the configured prefix (default: `.`):

### Basic Commands
- .ping - Check if bot is responsive
- .menu - Show available commands
- .runtime - Show bot uptime

### Entertainment
- .jokes - Get a random joke
- .fun - Get a fun fact
- .rizz - Get a pickup line
- .quotes - Get an inspirational quote
- .bible - Get a Bible verse
- .quran - Get a Quran verse

### Games
- .tictactoe - Start a tic-tac-toe game
- .wcg - Start word chain game
- .games - View available games

### Moderation (Owner/Admin only)
- .block [number] - Block a contact
- .unblock [number] - Unblock a contact
- .bangroup - Ban current group
- .unbangroup [groupId] - Unban a group
- .kick @user - Kick a group member
- .add [number] - Add member to group
- .promote @user - Promote member to admin
- .tagall [message] - Tag all group members

## Development

### Project Structure/
├── client/          # React frontend dashboard
├── server/          # Express.js backend + WhatsApp bot
├── shared/          # Shared database schema and types
├── .github/         # GitHub Actions workflows
└── tests/           # Test files

### Available Scripts
- npm run dev - Start development server
- npm run build - Build for production
- npm run start - Start production server
- npm test - Run tests
- npm run check - Type checking

## Deployment

### Requirements
- Node.js 18+ 
- PostgreSQL database
- System dependencies for Puppeteer (for WhatsApp Web)

### Cloud Deployment Notes
WhatsApp Web.js requires browser automation which may not work in all cloud environments. The dashboard will operate in demo mode if browser dependencies are unavailable.

For full WhatsApp functionality, deploy on:
- VPS with display support
- Local machine
- Containers with proper browser dependencies

## License
MIT License - see LICENSE file for details

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Support

For issues and questions:
- Open an issue on GitHub
- Check the troubleshooting section
- Review WhatsApp Web.js documentation

## Acknowledgments

- Built with [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js)
- UI components from [shadcn/ui](https://ui.shadcn.com)
---

## 💡 Fork This Project

[![Fork Repo](https://img.shields.io/badge/FORK-REPO-black?style=for-the-badge&logo=github)](https://github.com/AyoFemi10/Ayomikun-V2/fork)


## 🧩 Features

- App Downloader
- Anime downloader (coming soon)
- Group ment e.t.c.


---

## 📦 Deploy Now
📬 [`Contact on telegram to buy panel`](https://t.me/saturotech)
---



## 👑 Owner

<p align="center">
  <a href="https://github.com/AyoFemi10">
    <img src="https://github.com/AyoFemi10.png" width="200" height="200" alt="Malvin King"/>
  </a>
</p>

📬 [`Contact on WhatsApp`](https://wa.me/2348174836550)

---


