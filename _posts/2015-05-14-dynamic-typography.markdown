---
title: Dynamic Web Typography with Typekit
date: 2015-05-14 11:40:00 +01:00
---

Web performance budgets are a hot topic right now and for very good reasons. We as designers have been let off the lead recently (relatively free from not doing things because a certain browser can’t) and are having a blast using big high-res imagery, background videos and the font-stack of our dreams. Unfortunately all of this comes at a cost, and that is a monetary one to the user (data isn’t cheap!)

Serving responsive images is taking a step forward to having a solved and agreed upon solution by the introduction and across the board support for srcset (and video isn’t far behind). However fonts usually don’t come into the discussion on how we can shave off pounds from our websites because, although font files can be quite heavy, they’re very important to the design.

Adobe Typekit have done something very clever called Dynamic Subsetting which has potential to become the srcset of font-stacks. It was born out of Typekit adding East Asian font support such as Source Han Sans which has glyph counts ranging from 18,000 for Japanese and 31,000 for Simplified Chinese. There are not only a lot of glyphs but also a lot of weight with sizing ranging from 4.2MB to 8.8MB per font!

![DS_01.jpg](/uploads/DS_01.jpg)

If a site is using Source Han Sans for instance it’s not best practice to serve the entire glyph set. When you add an East Asian font family to Typekit it will automatically become a Dynamic Kit (thats the whole kit, not just one typeface). When your Dynamic Kit JavaScript loads in the browser it detects the characters you’re using and requests that only the used characters are sent. For example, say you’re using a typeface to set a homepage h1 to read “Betty’s Buttery Bakery” then instead of the font-file containing all of it’s glyphs, it will only contain A-B-E-K-R-S-T-U-Y-' in a smaller (much faster loading) font file.
It’s clear to see the benefit of this approach when using huge typefaces like Source Han Sans but it’s also useful for latin fonts too.

As you know Latin fonts are substantially smaller in glyph count and weight than East Asian fonts but sometimes site designs require multiple fonts to be served (separate typefaces for header and body copy with various typeface weights used for each for example) and this can quickly add up. At the moment Dynamic Subsetting is only available for East Asian fonts (and will be coming to Latin font families shortly), however if you want to use it in your Latin project now, there is a workaround.

### How to use Dynamic Subsetting in your project

Add the typefaces you need for your project

![DS_02.jpg](/uploads/DS_02.jpg)

As you can see, there is no option to add Dynamic Subsetting to this kit. To activate this option you can simply add an East Asian font to the kit (like Source Hans Pro) and you’ll be given the option of converting the kit to a Dynamic Kit.

![DS_03.jpg](/uploads/DS_05.jpg)

Press the ‘Convert to dynamic kit’ button and your kit will update to the new format.

![DS_03.jpg](/uploads/DS_03.jpg) 

Next you can remove the additional East Asian typeface (don’t worry the kit will stay Dynamic)

![DS_04.jpg](/uploads/DS_04.jpg)

Then use your kit as you usually would and it will include Dynamic Subsetting.

But what if my site contains comments or dynamic content?

Don’t worry, instead of re-downloading a new font for any new glyphs (or even worse not showing the new content in your chosen typefaces, gasp!) Dynamic Kits look for any changes in the DOM and request that any new characters be added to the local copy of the fonts. Adobe call this Dynamic Augmentation and it happens automatically for any font families in your Dynamic Kit.

Hopefully this helps to reduce your performance debt and speed up your websites without sacrificing good typography.