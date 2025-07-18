const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
// const { storage } = require('../server/storage');

class SessionGenerator {
    constructor() {
        this.sessionFile = path.join(__dirname, '../config/session-ids.json');
        this.sessions = this.loadSessions();
    }

    /**
     * Load existing sessions from file
     */
    loadSessions() {
        try {
            if (fs.existsSync(this.sessionFile)) {
                const data = fs.readFileSync(this.sessionFile, 'utf8');
                return JSON.parse(data);
            }
        } catch (error) {
            console.error('Error loading sessions:', error);
        }
        return {};
    }

    /**
     * Save sessions to file
     */
    saveSessions() {
        try {
            const dir = path.dirname(this.sessionFile);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            fs.writeFileSync(this.sessionFile, JSON.stringify(this.sessions, null, 2));
        } catch (error) {
            console.error('Error saving sessions:', error);
        }
    }

    /**
     * Generate a unique session ID
     * @param {string} prefix - Optional prefix for the session ID
     * @param {number} length - Length of the random part (default: 16)
     * @returns {string} Generated session ID
     */
    generateSessionId(prefix = 'session', length = 16) {
        const timestamp = Date.now().toString(36);
        const randomBytes = crypto.randomBytes(length).toString('hex');
        const sessionId = `${prefix}-${timestamp}-${randomBytes}`;
        
        return sessionId;
    }

    /**
     * Generate a secure session ID with more entropy
     * @param {string} prefix - Optional prefix for the session ID
     * @returns {string} Generated secure session ID
     */
    generateSecureSessionId(prefix = 'secure') {
        const timestamp = Date.now();
        const randomUuid = crypto.randomUUID();
        const secureRandom = crypto.randomBytes(32).toString('base64url');
        
        return `${prefix}-${timestamp}-${randomUuid}-${secureRandom}`;
    }

    /**
     * Generate a WhatsApp session ID specifically for bot instances
     * @param {string} botName - Name of the bot
     * @param {string} userNumber - User's phone number (optional)
     * @returns {string} Generated WhatsApp session ID
     */
    generateWhatsAppSessionId(botName = 'whatsapp-bot', userNumber = null) {
        const cleanBotName = botName.toLowerCase().replace(/[^a-z0-9]/g, '-');
        const timestamp = Date.now().toString(36);
        const randomPart = crypto.randomBytes(8).toString('hex');
        
        let sessionId = `${cleanBotName}-${timestamp}-${randomPart}`;
        
        if (userNumber) {
            const cleanNumber = userNumber.replace(/\D/g, '');
            const numberHash = crypto.createHash('md5').update(cleanNumber).digest('hex').substring(0, 8);
            sessionId = `${cleanBotName}-${numberHash}-${timestamp}-${randomPart}`;
        }
        
        return sessionId;
    }

    /**
     * Create and store a new session
     * @param {string} sessionType - Type of session (whatsapp, user, admin, etc.)
     * @param {object} metadata - Additional metadata for the session
     * @returns {object} Session object with ID and metadata
     */
    createSession(sessionType = 'default', metadata = {}) {
        const sessionId = this.generateSessionId(sessionType);
        const session = {
            id: sessionId,
            type: sessionType,
            createdAt: new Date().toISOString(),
            lastActive: new Date().toISOString(),
            metadata: metadata
        };

        this.sessions[sessionId] = session;
        this.saveSessions();
        
        return session;
    }

    /**
     * Get session by ID
     * @param {string} sessionId - Session ID to retrieve
     * @returns {object|null} Session object or null if not found
     */
    getSession(sessionId) {
        return this.sessions[sessionId] || null;
    }

    /**
     * Update session last active time
     * @param {string} sessionId - Session ID to update
     */
    updateSessionActivity(sessionId) {
        if (this.sessions[sessionId]) {
            this.sessions[sessionId].lastActive = new Date().toISOString();
            this.saveSessions();
        }
    }

    /**
     * Delete a session
     * @param {string} sessionId - Session ID to delete
     * @returns {boolean} True if deleted, false if not found
     */
    deleteSession(sessionId) {
        if (this.sessions[sessionId]) {
            delete this.sessions[sessionId];
            this.saveSessions();
            return true;
        }
        return false;
    }

    /**
     * Clean up expired sessions
     * @param {number} maxAgeHours - Maximum age in hours (default: 24)
     * @returns {number} Number of sessions cleaned up
     */
    cleanupExpiredSessions(maxAgeHours = 24) {
        const maxAge = maxAgeHours * 60 * 60 * 1000; // Convert to milliseconds
        const now = new Date();
        let cleaned = 0;

        Object.keys(this.sessions).forEach(sessionId => {
            const session = this.sessions[sessionId];
            const lastActive = new Date(session.lastActive);
            
            if (now - lastActive > maxAge) {
                delete this.sessions[sessionId];
                cleaned++;
            }
        });

        if (cleaned > 0) {
            this.saveSessions();
        }

        return cleaned;
    }

    /**
     * Get all active sessions
     * @returns {object} Object containing all active sessions
     */
    getAllSessions() {
        return { ...this.sessions };
    }

    /**
     * Get sessions by type
     * @param {string} sessionType - Type of sessions to retrieve
     * @returns {array} Array of sessions matching the type
     */
    getSessionsByType(sessionType) {
        return Object.values(this.sessions).filter(session => session.type === sessionType);
    }

    /**
     * Generate a session token for API authentication
     * @param {string} sessionId - Session ID
     * @returns {string} JWT-like token for the session
     */
    generateSessionToken(sessionId) {
        const session = this.getSession(sessionId);
        if (!session) {
            throw new Error('Session not found');
        }

        const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
        const payload = Buffer.from(JSON.stringify({
            sessionId: sessionId,
            type: session.type,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
        })).toString('base64url');
        
        const signature = crypto
            .createHmac('sha256', process.env.SESSION_SECRET || 'default-secret')
            .update(`${header}.${payload}`)
            .digest('base64url');

        return `${header}.${payload}.${signature}`;
    }

    /**
     * Validate a session token
     * @param {string} token - Token to validate
     * @returns {object|null} Decoded payload if valid, null if invalid
     */
    validateSessionToken(token) {
        try {
            const [header, payload, signature] = token.split('.');
            
            const expectedSignature = crypto
                .createHmac('sha256', process.env.SESSION_SECRET || 'default-secret')
                .update(`${header}.${payload}`)
                .digest('base64url');

            if (signature !== expectedSignature) {
                return null;
            }

            const decodedPayload = JSON.parse(Buffer.from(payload, 'base64url').toString());
            
            // Check expiration
            if (decodedPayload.exp < Math.floor(Date.now() / 1000)) {
                return null;
            }

            return decodedPayload;
        } catch (error) {
            return null;
        }
    }

    /**
     * Get session statistics
     * @returns {object} Statistics about sessions
     */
    getSessionStats() {
        const sessions = Object.values(this.sessions);
        const now = new Date();
        
        const stats = {
            total: sessions.length,
            byType: {},
            active: {
                last1Hour: 0,
                last24Hours: 0,
                last7Days: 0
            }
        };

        sessions.forEach(session => {
            // Count by type
            stats.byType[session.type] = (stats.byType[session.type] || 0) + 1;
            
            // Count active sessions
            const lastActive = new Date(session.lastActive);
            const timeDiff = now - lastActive;
            
            if (timeDiff <= 60 * 60 * 1000) { // 1 hour
                stats.active.last1Hour++;
            }
            if (timeDiff <= 24 * 60 * 60 * 1000) { // 24 hours
                stats.active.last24Hours++;
            }
            if (timeDiff <= 7 * 24 * 60 * 60 * 1000) { // 7 days
                stats.active.last7Days++;
            }
        });

        return stats;
    }
}

module.exports = SessionGenerator;