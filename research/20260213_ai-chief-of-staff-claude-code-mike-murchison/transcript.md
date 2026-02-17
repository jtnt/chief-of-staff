---
source: https://x.com/mimurchison/status/2022368529417224480
type: youtube-transcript
channel: Mike Murchison
title: "How I Use Claude Code as My AI Chief of Staff to Double My Productivity"
date: 2026-02-13
captured: 2026-02-13
transcript_type: auto-generated
duration: ~19 minutes
tags: [claude-code, chief-of-staff, productivity, AI-workflow, MCP]
---

# How I Use Claude Code as My AI Chief of Staff to Double My Productivity

**Source:** https://x.com/mimurchison/status/2022368529417224480

**Mike Murchison (CEO, Ada) — 2026-02-13**

**Description:** My relationship with my computer has changed more in the last month than in the previous 10 years. Here's a walkthrough of how I as a CEO am using Claude Code as my AI Chief of Staff to roughly double my productivity.

**GitHub Repo:** https://github.com/mimurchison/claude-chief-of-staff

---

## Transcript

Hey everybody, I'm Mike. I'm the co-founder and CEO of Ada. My relationship with my computer has changed more in the last month than it has in the previous 10 years. And I gave a demo of why that's the case at a recent Claude Code meetup. A lot of people were super interested to learn, so I am recording this video to give you an insight into how my workflow is changing.

How I use Claude Code as my primary system to run both my personal life and my company at Ada. I'm gonna give you a window into how this works now and hopefully that informs how you can be leveraging AI in your own day to day to unlock another level of productivity like I have.

This is my environment. I use Claude Code in VS Code because I like the UI more than the terminal. I use Claude Code to generate a lot of content, and I do a lot of reading through it. So it's a little faster for me than the terminal itself. But instead of actually going through a bunch of information in here, my actual setup — I actually use Claude Code to generate a presentation that will walk you through how I actually use this, and hopefully will be helpful for you.

Let me just move myself over here and let's get into this.

### Doubled Productivity

I'd say I have conservatively doubled my productivity in the last month. And let me explain how I've done that.

I'm using Claude Code as a Chief of Staff. And the central premise here is that a Chief of Staff should be able to do three things:

1. **Full Context** — They should have full context on your business and your life. So my Chief of Staff knows my priorities, all my key relationships, knows my voice, knows my constraints, knows my goals.

2. **Access to Every System** — As you'll see, I've integrated my Chief of Staff into 15+ different systems, all via MCP. And collectively, my Chief of Staff right now has access to about 143 tools.

3. **24/7 Availability** — So I make a lot of use of background workflows that run overnight. And as you'll see, it creates new experiences like multiplayer inboxes where my Chief of Staff works on tasks for me overnight. I have a living, breathing to-do list, really. I am collaborating with someone at all times.

### Four Core Functions

What my system actually does is really four things:

1. **Communicate Better** — Inboxes. I've integrated five different inboxes — that's my email, multiple email boxes and some social channels.

2. **Learn** — It's ingesting content from everywhere and helps you stay on top of what's happening in the business, in the market, and in relationships.

3. **Manage and Deepen Relationships** — It's helping me manage and deepen a number of relationships I have in my life, as you'll see.

4. **Work 24/7** — As I alluded to earlier, it helps me work 24/7 by equipping me with a multiplayer task system where I'm one player and Chief of Staff is the other.

### Goal Foundation

And this is underpinned by a goal foundation where I've equipped Claude Code with real clarity around what my priorities are at a given point. It's actually multiple time horizons, as you'll see.

And so what I've found is that over the last 10 or so years of building Ada, it is a perennial challenge to truly optimize your time. And AI is extremely good at helping you understand if a given investment truly deserves prioritization.

### Architecture

We're not — and this, again, one big architecture. Just briefly — so I'm the user, access Claude Code every day, all day, through VS Code or terminal. I'm pretty much spending my time in VS Code at this point. I find myself rarely going into email, rarely going to Slack, rarely going into other apps that I used to spend time in, like dashboards and things — Tableau and other BI software.

And I'm almost entirely interfacing with Claude Code. Either again through the terminal on my phone, or on my phone via two ways — either a terminal application on my phone or via a Telegram bot that serves as an interface for me to speak to my Chief of Staff.

All this is powered by Claude Opus 4.6, using the million-token context window. I have used fast mode recently, which has been amazing — though of course it's expensive.

And really engaging in a couple ways. So one is performing live sessions, obviously with Claude Code. Every morning I wake up, trigger a workflow called "Good Morning" which gives me a ton of content about what's happening today, both inside and outside my company.

I have a bunch of parallel processes that are running all the time. These are background jobs — these are tasks performing functions all the time. Right now there are about 500 of them that fire every day.

And then I use MC Porter, which is effectively a means of more efficiently managing lots of different MCP servers at once. In the past, it's been the case — if you integrate a lot of MCP servers, your context window gets blown because you have so many tools in the context window. This is no longer the case with MC Porter. I'm sure at some point it will be baked into Claude Code.

### MCP Integrations

Here are examples of servers that are integrated. Here, looks like — Chief of Staff, we talked about it earlier, but we are living in a world right now where we're no longer intelligence-constrained. How do you get perfect context to your system? And this is how I do it — it's near-perfect context.

So my Chief of Staff has access to:
- **Google Drive** — to see documents
- **Linear** — to see our product roadmap and progress
- **PostHog** — to understand product usage data, how people are using the product
- **BambooHR** — employee information
- **Gong** — recordings, which helps my system learn about how our team is showing up with prospects and customers
- **Contacts** — access to all contacts
- **API Documentation**
- **Granola** — has been a huge unlock. Literally every time I have a meeting, Granola transcribes the meeting and my Chief of Staff gets perfect context about what happened in that meeting. My Chief of Staff's decisions are informed by transcripts.
- **Ada MCP** — our own MCP server for our product and how customers are using it

All within Claude Code. Some of these are bidirectional — so in this case my Chief of Staff is able to actually send messages on my behalf and is able to schedule appointments for me. And then some of these are unidirectional, where we're just ingesting information from the systems.

### Core Operating Instructions

My core operating instructions — very simple, but the principle that I have is that my Chief of Staff's job is to double the productivity. And it has two key levers to do that: helps me speed through inboxes and tasks, and helps deepen relationships. Specifically, its goal is to increase the number of deep relationships I can manage.

My CLAUDE.md file, which is the core operating instructions of my Chief of Staff, is pretty lengthy at this point. Still a lot, and I've learned about optimizing operating instructions by breaking out CLAUDE.md into multiple sub-files. So if anyone is interested in that, I'm happy to share what I've learned on the front. It's been pretty effective for me.

The core principles are here, but a couple other things I want to highlight: my Chief of Staff really understands my voice. And so it's learned, because it's ingested so much context and has seen how I communicate across different channels, it is good at drafting extremely accurate emails, presentations, prototypes for me, just based on how it knows that I like to build and communicate.

### Relationship Management

On the relationship management front, it creates a contact record in Markdown file for every person in my life. And it has a process of regularly creating new ones, enriching them over time. As you will see, it breaks down all my contacts into three tiers, which informs how I communicate with each group and how often to communicate with each group. And my Chief of Staff will inform me when my inner circle — for example, a Tier 1 contact — hasn't been contacted in 14 days.

So I work very closely with it. There were mistakes in the early days where emails were sent to folks that I did not intend. Since then, we've dialed this in and it's working quite well.

As you see, this is the open-source system I built here. So welcome your feedback on it. I think you'll find it works pretty well in terms of guardrails, but maybe some edges that you can help me fill in.

### Goals System

And then finally, I instruct my Chief of Staff to help me achieve very specific goals. These are made-up goals here — I didn't want to reveal any sensitive information. But you can see how at a given point I can change the goals and my Chief of Staff will reorient me and schedule time more efficiently. Again, all in service of what is most important to me at a given point.

### Triage System

Let's talk about my triage system. One common task that I do with Claude Code is I run a skill called "triage" and it will ingest five different channels — like email across work and personal, Slack DMs, WhatsApp, iMessage — and it will understand where all these messages have come from. And it will draft the responses to every one of those contacts.

And it will measure its acceptance rate. It will learn from every edit I have made and it will self-improve. What's been great is that we are able at this point to achieve north of 50% acceptance rate and it is climbing quite nicely.

A good example of this — I find I've used a lot of other AI that has sought to draft responses for me. I have never found it worked nearly as well as what I have working now. Here is an example. It's so hard to nail tone — and it's so hard for human colleagues too to nail your tone. Many other CEOs who have worked with social teams in the past have struggled. There really is no substitute for doing it yourself — until now. Maybe an AI Chief of Staff — you will find the tone that this system is able to achieve is pretty impressive. Again, north of 50% acceptance rate on first shot.

### Morning Briefing

I often start every day with a very important skill I call "Good Morning." And Good Morning will essentially review my calendar, will review all active tasks that I have. It spawns three different waves of agents that will go off and find news across the web, across my favorite podcasts, summarize everything including sports news that I care about — Toronto Raptors for example — and distill everything into a morning board briefing that at this point has been such an important part of my day.

I also have Claude Code now read out to me, which is a really nice way before getting work done.

### Contact Profiles

On the relationship side, every contact I have has a living profile. And my Chief of Staff is very good at keeping these profiles updated because it has perfect context. It will take a recent meeting that I have — literally an hour later — and it will summarize what happened, what we learned about a different person in that meeting, and update the profile of that person.

So if there is someone — say, James — my Chief of Staff will figure out new things we learned about James in this meeting and will update his contact record for me. And the next time I engage with James, my Chief of Staff will reference that contact record to ensure that my responses are personalized and there's continuity between what we spoke about last and what we're now speaking about.

### Multiplayer To-Do List

One of my favorite capabilities right now is the multiplayer to-do list that I've built with my Chief of Staff. Every time I create a task — which I do inside Claude Code multiple times a day — Claude Code will go and work on that task in the background. And the next time I pick it up, most of these tasks are about 50% done.

Again, there's a wonderful feedback loop here where my Chief of Staff will learn from edits I make to a given task and improve how it approaches the next set of tasks. So an example here: if I have a board meeting — which of course is every quarter — Ada, we have to prepare our pre-read and send it to our board a couple days in advance. It understands how previous pre-reads worked, understands what context has changed in the last 90 days, and drafts both the letter and deck. That is about 50% complete by the time I pick it up.

So this new level of engagement where when I add something to my list, someone else is already working on it, has been a big unlock for me. And something I am excited about improving ahead.

### Goal Tracking

Speaking of improvement, my system is really good at tracking momentum against goals. So it knows my goals, keeps up to date around how I'm tracking against them, if I'm keeping pace or not, and who I'm engaging with. This has been a really powerful source of feedback for me as I work on the most important things at any point in time.

### Flywheel Effect

Claude is being cute here, but there is a flywheel at play where it learns how to communicate better and work better. It deepens relationships and helps my relationships. And in some way, that informs the kind of work it is able to do 24/7 for me.

### Background Workflows

One of the coolest things are the number of background workflows that happen. These fire about 500 times in a given day. There is a ton of pre-processing behind the scenes:

- **Every 30 minutes** — my Chief of Staff reviews everything in my inbox and pre-drafts responses to everything
- **Contact enrichment** — every hour, based on new contacts that I have in transcripts and meeting responses and email responses
- **Task execution** — working on my to-do list every hour, will update and do more work
- **Meeting prep, metrics tracking, news**

Really, this is growing at an exciting clip. And soon going to reach the point where I'm much more conscious of jobs running. But it has been an energizing unlock for me to know that my Chief of Staff is always on and doing work in the background.

### Closing

I am really excited to take this to the next level. We are deploying it across all of Ada and it has been super exciting to see how people are further personalizing it for themselves.

Speaking of which, I encourage you to do the same. This is open source — what I have shown here today. So get the repo yourself, let me know what you think. I will include this video in the repo, so review it whenever you like. And let me know what you think — just hit me up on LinkedIn or Twitter.

And I hope this is somewhat helpful. I keep working on this. One of the big joys about building my Chief of Staff has been that it's easy for me to provide feedback. And as I do, it gets better and better and better. Check back in a few weeks and I'll give you an update.

---

**People/companies mentioned:**
- Mike Murchison (CEO, Ada)
- Ada (agentic customer experience platform)
- Claude Code / Claude Opus 4.6
- MC Porter (MCP server manager)
- Granola (meeting transcription)
- PostHog (product analytics)
- Linear (product roadmap)
- BambooHR (HR)
- Gong (sales recordings)
- Telegram (mobile interface)
- Toronto Raptors (personal interest)
- Slack, WhatsApp, iMessage, Gmail
- Tableau (BI software)
