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

``` 
'use-strict';

var gulp = require('gulp');
var scrape = require('website-scraper');

gulp.task('download', function (done) {
    scrape({
        urls: [ {
                url: 'https://localhost/',
                filename: 'FILE-NAME-HERE.html'
            }],
            directory: './DIR',
            request: {
                headers: {
                    Host: 'HOST-HEADER'
                }
            }
    }).then(function () {
        done();
    });
});
```

Firstly require gulp and website-scraper, create a gulp wrapper task and define **scrape** to take a **URLs** object with **URL** and **filename** properties, these will be the URLs that are scraped (I.E localhost/anypage) and a filename for website-scraper to give the file (if left blank this will default to index.html). You can include multiple objects to scrape muiltiple pages, we have this set up in a config file to scrape a longer list, which I recommend setting up for ease of adding new pages as you get to designing them.

Secondly define a **directory** for the files to be populated to (I.E ./surge). Then lastly we added a catch-all incase of IIS hosts not being set-up the same on all computers, the **request** step is optional but good for your sanity (just add your ISS hostheader binding here).

Great, we've got our site downloading to our file system, now we need a way to access the pages we want to deploy. For this we used another NPM package called [Index](https://www.npmjs.com/package/gulp-index) which looks through a folder and pulls all .html files into a index.html file which you can use as a landing page.

``` 
var index = require('gulp-index');


gulp.task('buildIndex', function () {
    return gulp.src(['./DIR/**/*.html'])
       .pipe(gulp.dest('./DIR/'));
    });
```

Index is quite simple to set up, just add the folder and file types you want it to index and pass a destination. This works okay but the paths are all set to `local/DIR` which won't work on Surge so we need to add a **relativePath** option to clean this up. There are a lot of available options for this package including changing titles, index HMTL structure and styling all of which we added seporately.

``` 
var index = require('gulp-index');


gulp.task('buildIndex', function () {
    return gulp.src(['./DIR/**/*.html'])
     .pipe(index({
                'relativePath': './DIR'
            }))
       .pipe(gulp.dest('./DIR/'));
    });
```

Great, our index is working. Now we just need to deploy it to Surge using the handy [gulp-surge](https://github.com/surge-sh/gulp-surge) package.


``` 
var surge = require('gulp-surge');

gulp.task('surge', function () {
    surge({
        project: './DIR/',
        domain: 'YOUR-PROJECT.surge.sh'
    });
});
```

and wrap it all up in a deploy task

``` 
gulp.task('deploy', function (cb) {
    runSeq(['download'], ['buildIndex'], ['surge'], cb);
});
```

We used the [Run Sequence](https://www.npmjs.com/package/run-sequence) package to make sure we're handling these tasks in the correct order, otherwise you'll end up deploying a half-downloaded site! I'd recommend running your Sass and any move tasks you're also using as part of this task (before [download]).

Our final gulp file looks like this (I've also added [del](https://www.npmjs.com/package/del) to handle removing the `/DIR/` file before we run download, to clear it out and some basic styling to the index file)

``` javascript
'use-strict';

var del = require('del');
var runSeq = require('run-sequence');
var scrape = require('website-scraper');
var index = require('gulp-index');
var surge = require('gulp-surge');

gulp.task('download', function (done) {
    scrape({
        urls: [ {
                url: 'https://localhost/',
                filename: 'FILE-NAME-HERE.html'
            }],
            directory: './DIR',
            request: {
                headers: {
                    Host: 'HOST-HEADER'
                }
            }
    }).then(function () {
        done();
    });
});


gulp.task('buildIndex', function () {
    return gulp.src(['./DIR/**/*.html'])
        .pipe(index({
            'relativePath': './DIR',
            'title': 'Index',
            'prepend-to-output': () => `<head>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
            *{
                font-family: arial;
            }

            body {
                padding: 15px;
            }

            .index__title, ul {
                padding-left: 0;
            }

            .index__section-heading {
                 display: none;
            }

            li {
                list-style: none;
                margin-bottom: 10px;
                }
            li a {
                color: #1c8162;
                text-decoration: none;
            }
            </style>
            </head>
            <body>
            `,
        }))
        .pipe(gulp.dest('./DIR/'));
});

// Surge
gulp.task('surge', function () {
    surge({
        project: './DIR/',
        domain: 'YOUR-PROJECT.surge.sh'
    });
});

// Deploy
gulp.task('deploy', function (cb) {
    runSeq(['sass'], ['download'], ['buildIndex'], ['surge'], cb);
});