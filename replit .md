# 𝘼𝙔𝙊𝙈𝙄𝙆𝙐𝙉-𝙑2 WhatsApp Bot

## Overview

This is a comprehensive Node.js WhatsApp bot named "𝘼𝙔𝙊𝙈𝙄𝙆𝙐𝙉-𝙑2" that uses WhatsApp Web integration to provide advanced group management, entertainment features, admin tools, and local payment processing capabilities. The bot operates through a command-based interface with 24 total commands including entertainment, moderation, and advanced features like view-once media capture and group management.

## User Preferences

Preferred communication style: Simple, everyday language.
Developer: AYOMIKUN (08174836550)

## System Architecture

### Core Architecture
- **Language**: Node.js (JavaScript)
- **WhatsApp Integration**: `whatsapp-web.js` library for WhatsApp Web API access
- **Authentication**: Local session storage using `LocalAuth` strategy
- **Command System**: Modular command parser with registration system
- **Payment Processing**: Local payment API integration
- **Logging**: Custom logging utility with file and console output

### Design Patterns
- **Command Pattern**: Each bot command is implemented as a separate module with standardized interface
- **Service Layer**: Separate services for WhatsApp operations and payment processing
- **Configuration Management**: Centralized configuration with environment variable support
- **Utility Classes**: Reusable utilities for command parsing and logging

## Key Components

### 1. Bot Core (`index.js`)
- Main bot initialization and orchestration
- WhatsApp client setup with Puppeteer configuration
- Command registration and event handling
- Session management with LocalAuth
- Ban/block checking and enforcement

### 2. Command System (`commands/`)
**Core Commands:**
- **ping.js**: Bot responsiveness testing with performance metrics
- **menu.js**: Interactive menu displaying available commands and bot info
- **tagall.js**: Group member tagging with cooldown protection
- **payment.js**: Payment processing with validation and limits

**Entertainment Commands:**
- **jokes.js**: Random funny jokes collection
- **fun.js**: Fun activities and challenges
- **rizz.js**: Smooth pickup lines and rizz
- **quotes.js**: Inspirational quotes from famous people
- **bible.js**: Random Bible verses for spiritual inspiration
- **quran.js**: Random Quran verses for spiritual guidance

**Admin/Moderation Commands:**
- **block.js**: Block contacts from using bot commands
- **unblock.js**: Unblock previously blocked contacts
- **bangroup.js**: Ban entire groups from using the bot
- **unbangroup.js**: Unban previously banned groups
- **banwhatsapp.js**: Global ban of WhatsApp numbers
- **unbanwhatsapp.js**: Remove global bans from WhatsApp numbers
- **setmode.js**: Set bot operation mode (private/public) with menu interface

**Advanced Commands:**
- **viewonce.js**: View once photos/videos capture and save
- **spampair.js**: Send spam pairing requests (admin only)
- **kick.js**: Remove members from groups (admin/group admin only)
- **add.js**: Add members to groups (admin/group admin only)
- **promote.js**: Promote members to group admin (admin/group admin only)
- **call.js**: Simulate calling someone with realistic responses
- **groupbug.js**: Send group chat bug messages (admin only)

### 3. Services (`services/`)
- **whatsapp.js**: WhatsApp Web API wrapper for common operations
- **payment.js**: Local payment API integration with transaction management

### 4. Utilities (`utils/`)
- **commandParser.js**: Command parsing, registration, and cooldown management
- **logger.js**: Logging utility with file output and level filtering

### 5. Configuration (`config/settings.js`)
- Centralized configuration management
- Environment variable integration
- Bot settings, payment limits, and operational constraints

## Data Flow

### Command Processing Flow
1. WhatsApp message received
2. Command parser validates prefix and extracts command
3. Cooldown check performed
4. Command module executed with message context
5. Response sent back to WhatsApp chat
6. Operation logged

### Payment Processing Flow
1. Payment command triggered with amount
2. Amount validation against configured limits
3. Payment data preparation with customer info
4. Local payment API call
5. Transaction result processing
6. Success/failure message sent to user

## External Dependencies

### Primary Dependencies
- **whatsapp-web.js**: WhatsApp Web API integration
- **qrcode-terminal**: QR code display for authentication
- **dotenv**: Environment variable management

### Optional Dependencies
- **Puppeteer**: Browser automation (included with whatsapp-web.js)
- Local payment API (configurable endpoint)

## Deployment Strategy

### Environment Configuration
Required environment variables:
- `CLIENT_ID`: WhatsApp session identifier
- `COMMAND_PREFIX`: Bot command prefix (default: ".")
- `BOT_MODE`: Bot operation mode (default: "public")
- `OWNER_NUMBER`: Bot owner phone number for admin access
- `PAYMENT_ENABLED`: Enable/disable payment features
- `PAYMENT_API_KEY`: Local payment API authentication
- `PAYMENT_API_URL`: Payment API endpoint
- Various limits and cooldown settings

### Session Management
- Uses LocalAuth for persistent WhatsApp sessions
- QR code authentication for initial setup
- Automatic session restoration on restart

### Security Features
- Command cooldown system to prevent spam
- Payment amount validation and limits
- Group size restrictions for tagging
- Multi-level ban system (contact blocking, group banning, global WhatsApp bans)
- Admin-only commands with owner verification
- Silent blocking (banned users get no response)
- Bot mode control (private/public operation)
- Error handling with graceful degradation

### Logging and Monitoring
- Configurable log levels (info, warn, error)
- Optional file logging
- Performance metrics in ping command
- Transaction logging for payments
- Command execution tracking with user identification
- Security event logging for admin actions

### Scalability Considerations
- Modular command system for easy extension
- Configurable limits and constraints
- Service-based architecture for feature isolation
- Environment-based configuration for different deployments