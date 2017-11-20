---
title: Demoing a .NET solution to clients without the need to wait behind a build
  process
date: 2017-11-20 12:48:00 +00:00
---

Recently I moved over to a new client working in a .NET solution, coming from a team where we primarily worked on front-end heavy sites with minimal back-end CMS integration this was a big change. C# and Razor being relatively straight forward languages to pick up and MVC taking a little time to cement in, I didn't have a great deal of trouble, where I did stumble was the deployment process.

When I joined the team it was running a classic Agile / Kanban approach with a semi-waterfall working process (design, then build in FE, then build in BE) causing a **lot** of waste. I set about implimenting newer and smoother working practices including ticket swarming (all members working on the same task at the same time), naturally this approach requires a lot more of the design work being done in the browser. 
However this caused a evident blocker on the client side, they weren't able to see designs as we were doing them *(designing in browser isn't much slower than Photoshop or Sketch, to a client it feels alot more "done" - although amends tend to run quicker)*. Previously working on front-end heavy sites I was used to easily deploy up to a service like [Surge ](https://surge.sh/) for checkins and approval demos. In a .NET solution the site isn't static, in-fact it's as far from static as you can really get meaning Surge was a no-go.

The deployment process (local / dev / staging / live) requires everything being on master, I'm a fan of mainline trunk development but when you're producing a large overhaul of a site, this isn't always a viable option and not being able to go from local to dev is quite a blocker.
We stormed a session coming up with solutions to the preview problem (sticking it behind a flag, using NGROK to tunnel localhost and god-forbid even blocking BAU pipelines while we worked on the project) but none of these really felt right.

Instead we worked out a way to deploy to Surge, which in the end was acutually incrediby simple. 

## Step 1: I need static files to deploy!
Arguably, this is the biggest issue we had. How can we deploy a non-static site (server build, databases etc) to a static site host? The solution was to download the site form IIS localhost and deploy it from there.

To do this we used our usual task runner [Gulp](https://gulpjs.com/) and an NPM package called [Website-Scraper](https://www.npmjs.com/package/website-scraper) to download the site after build and store it locally for Surge to deploy. The gulp file set-up is simple:


