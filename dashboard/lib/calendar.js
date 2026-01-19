const { google } = require('googleapis');
const fs = require('fs').promises;
const path = require('path');

// Paths for OAuth credentials
const CREDENTIALS_PATH = path.join(__dirname, '..', '..', '.claude', 'gcp-oauth.keys.json');
const TOKENS_PATH = path.join(process.env.HOME, '.config', 'google-calendar-mcp', 'tokens.json');

// Calendar IDs to query (per user preference)
const CALENDAR_IDS = [
  'primary',  // jtntolson@gmail.com
  'nicholas@razzohq.com'
];

let authClient = null;

/**
 * Initialize the OAuth2 client
 */
async function getAuthClient() {
  if (authClient) return authClient;

  try {
    // Read credentials
    const credentialsContent = await fs.readFile(CREDENTIALS_PATH, 'utf-8');
    const credentials = JSON.parse(credentialsContent);

    // Read tokens
    const tokensContent = await fs.readFile(TOKENS_PATH, 'utf-8');
    const tokensData = JSON.parse(tokensContent);

    // The tokens file has various formats, try to find valid tokens
    let tokens = null;
    if (tokensData.normal) {
      // google-calendar-mcp format: { normal: { access_token, ... } }
      tokens = tokensData.normal;
    } else if (tokensData.accounts) {
      // Multi-account format: { accounts: { accountId: { access_token, ... } } }
      const accountKeys = Object.keys(tokensData.accounts);
      if (accountKeys.length > 0) {
        tokens = tokensData.accounts[accountKeys[0]];
      }
    } else if (tokensData.access_token) {
      // Legacy single-account format: { access_token, ... }
      tokens = tokensData;
    }

    if (!tokens) {
      throw new Error('No valid tokens found');
    }

    const { client_id, client_secret } = credentials.installed || credentials.web || {};
    if (!client_id || !client_secret) {
      throw new Error('Invalid credentials file format');
    }

    const oauth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      'http://localhost'
    );

    oauth2Client.setCredentials(tokens);
    authClient = oauth2Client;

    return authClient;
  } catch (error) {
    console.error('Calendar auth error:', error.message);
    return null;
  }
}

/**
 * Get today's events from both calendars
 */
async function getTodayEvents() {
  const auth = await getAuthClient();

  if (!auth) {
    return {
      events: [],
      nextUp: null,
      error: 'Calendar authentication not available'
    };
  }

  const calendar = google.calendar({ version: 'v3', auth });

  // Get today's date range
  const now = new Date();
  const startOfDay = new Date(now);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(now);
  endOfDay.setHours(23, 59, 59, 999);

  const allEvents = [];

  for (const calendarId of CALENDAR_IDS) {
    try {
      const response = await calendar.events.list({
        calendarId,
        timeMin: startOfDay.toISOString(),
        timeMax: endOfDay.toISOString(),
        singleEvents: true,
        orderBy: 'startTime'
      });

      const events = response.data.items || [];

      for (const event of events) {
        allEvents.push({
          id: event.id,
          calendarId,
          summary: event.summary || '(No title)',
          description: event.description,
          location: event.location,
          start: event.start.dateTime || event.start.date,
          end: event.end.dateTime || event.end.date,
          isAllDay: !event.start.dateTime,
          htmlLink: event.htmlLink,
          hangoutLink: event.hangoutLink,
          conferenceData: event.conferenceData,
          attendees: event.attendees || [],
          status: event.status
        });
      }
    } catch (error) {
      console.error(`Error fetching calendar ${calendarId}:`, error.message);
    }
  }

  // Sort by start time
  allEvents.sort((a, b) => new Date(a.start) - new Date(b.start));

  // Find next upcoming event
  const nextUp = allEvents.find(event => {
    if (event.isAllDay) return false;
    const eventStart = new Date(event.start);
    return eventStart > now;
  });

  // Calculate countdown for next event
  if (nextUp) {
    const eventStart = new Date(nextUp.start);
    const diffMs = eventStart - now;
    const diffMins = Math.round(diffMs / 60000);

    if (diffMins < 60) {
      nextUp.countdown = `${diffMins} min`;
    } else {
      const hours = Math.floor(diffMins / 60);
      const mins = diffMins % 60;
      nextUp.countdown = mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
    }

    // Get meet link
    nextUp.meetLink = nextUp.hangoutLink ||
      (nextUp.conferenceData?.entryPoints?.find(e => e.entryPointType === 'video')?.uri);
  }

  // Group events by time of day
  const morning = allEvents.filter(e => {
    if (e.isAllDay) return false;
    const hour = new Date(e.start).getHours();
    return hour < 12;
  });

  const afternoon = allEvents.filter(e => {
    if (e.isAllDay) return false;
    const hour = new Date(e.start).getHours();
    return hour >= 12;
  });

  const allDay = allEvents.filter(e => e.isAllDay);

  return {
    events: allEvents,
    nextUp,
    morning,
    afternoon,
    allDay,
    error: null
  };
}

/**
 * Format time for display
 */
function formatTime(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

module.exports = {
  getTodayEvents,
  formatTime
};
