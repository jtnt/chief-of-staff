const express = require('express');
const path = require('path');
const parsers = require('./lib/parsers');
const calendar = require('./lib/calendar');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Base path for Chief of Staff
const COS_ROOT = path.resolve(__dirname, '..');

// Middleware to add sidebar data to all views
app.use(async (req, res, next) => {
  try {
    // Get recent logs for sidebar (only for HTML requests)
    if (req.accepts('html')) {
      const sidebarLogs = await parsers.parseRecentLogs(COS_ROOT, 5);
      res.locals.sidebarLogs = sidebarLogs;
    }
  } catch (error) {
    res.locals.sidebarLogs = [];
  }
  next();
});

// Routes

// Main briefing view
app.get('/', async (req, res) => {
  try {
    const [dailyFocus, inboxItems, priorities, recentLogs, calendarData, carriedOver] = await Promise.all([
      parsers.parseDailyFocus(COS_ROOT),
      parsers.parseAllInboxes(COS_ROOT),
      parsers.parsePriorities(COS_ROOT),
      parsers.parseRecentLogs(COS_ROOT, 5),
      calendar.getTodayEvents(),
      parsers.getCarriedOverItems(COS_ROOT)
    ]);

    res.render('briefing', {
      title: 'Today\'s Briefing',
      dailyFocus,
      inboxItems,
      priorities,
      recentLogs,
      calendarData,
      carriedOver,
      currentPage: 'briefing'
    });
  } catch (error) {
    console.error('Error loading briefing:', error);
    res.status(500).render('error', { error: error.message });
  }
});

// Projects view
app.get('/projects', async (req, res) => {
  try {
    const projects = await parsers.parseProjectIndex(COS_ROOT);
    const syncStatus = await parsers.parseSyncStatus(COS_ROOT);

    res.render('projects', {
      title: 'Projects',
      projects,
      syncStatus,
      currentPage: 'projects'
    });
  } catch (error) {
    console.error('Error loading projects:', error);
    res.status(500).render('error', { error: error.message });
  }
});

// Activity view
app.get('/activity', async (req, res) => {
  try {
    const [logs, thoughts] = await Promise.all([
      parsers.parseRecentLogs(COS_ROOT, 20),
      parsers.parseRecentThoughts(COS_ROOT, 10)
    ]);

    res.render('activity', {
      title: 'Activity',
      logs,
      thoughts,
      currentPage: 'activity'
    });
  } catch (error) {
    console.error('Error loading activity:', error);
    res.status(500).render('error', { error: error.message });
  }
});

// Detail views

// Log detail page
app.get('/logs/:filename', async (req, res) => {
  try {
    const log = await parsers.getLog(COS_ROOT, req.params.filename);

    if (!log) {
      return res.status(404).render('error', { error: 'Log not found' });
    }

    res.render('log-detail', {
      title: log.title,
      log,
      currentPage: 'activity'
    });
  } catch (error) {
    console.error('Error loading log:', error);
    res.status(500).render('error', { error: error.message });
  }
});

// Thought detail page
app.get('/thoughts/:filename', async (req, res) => {
  try {
    const thought = await parsers.getThought(COS_ROOT, req.params.filename);

    if (!thought) {
      return res.status(404).render('error', { error: 'Thought not found' });
    }

    res.render('thought-detail', {
      title: thought.title,
      thought,
      currentPage: 'activity'
    });
  } catch (error) {
    console.error('Error loading thought:', error);
    res.status(500).render('error', { error: error.message });
  }
});

// Project detail page
app.get('/projects/:name', async (req, res) => {
  try {
    const project = await parsers.getProjectDetail(COS_ROOT, decodeURIComponent(req.params.name));

    if (!project) {
      return res.status(404).render('error', { error: 'Project not found' });
    }

    res.render('project-detail', {
      title: project.name,
      project,
      currentPage: 'projects'
    });
  } catch (error) {
    console.error('Error loading project:', error);
    res.status(500).render('error', { error: error.message });
  }
});

// API Routes for HTMX

// Toggle daily focus item
app.post('/api/daily-focus/toggle', async (req, res) => {
  try {
    const { date, index, checked } = req.body;
    await parsers.toggleDailyFocusItem(COS_ROOT, date, parseInt(index), checked === 'true');
    const [dailyFocus, carriedOver] = await Promise.all([
      parsers.parseDailyFocus(COS_ROOT),
      parsers.getCarriedOverItems(COS_ROOT)
    ]);
    res.render('partials/daily-focus', { dailyFocus, carriedOver });
  } catch (error) {
    console.error('Error toggling daily focus:', error);
    res.status(500).send('Error updating item');
  }
});

// Add daily focus item
app.post('/api/daily-focus/add', async (req, res) => {
  try {
    const { text } = req.body;
    if (text && text.trim()) {
      await parsers.addDailyFocusItem(COS_ROOT, text.trim());
    }
    const [dailyFocus, carriedOver] = await Promise.all([
      parsers.parseDailyFocus(COS_ROOT),
      parsers.getCarriedOverItems(COS_ROOT)
    ]);
    res.render('partials/daily-focus', { dailyFocus, carriedOver });
  } catch (error) {
    console.error('Error adding daily focus:', error);
    res.status(500).send('Error adding item');
  }
});

// Archive inbox item
app.post('/api/inbox/archive', async (req, res) => {
  try {
    const { file, index } = req.body;
    await parsers.archiveInboxItem(file, parseInt(index));
    const inboxItems = await parsers.parseAllInboxes(COS_ROOT);
    res.render('partials/inbox', { inboxItems });
  } catch (error) {
    console.error('Error archiving inbox item:', error);
    res.status(500).send('Error archiving item');
  }
});

// Refresh calendar
app.get('/api/calendar/refresh', async (req, res) => {
  try {
    const calendarData = await calendar.getTodayEvents();
    res.render('partials/calendar', { calendarData });
  } catch (error) {
    console.error('Error refreshing calendar:', error);
    res.status(500).send('Error refreshing calendar');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🎯 Chief of Staff Dashboard running at http://localhost:${PORT}\n`);
});
