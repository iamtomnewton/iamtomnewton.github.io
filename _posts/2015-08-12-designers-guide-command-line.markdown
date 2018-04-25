---
title: Web Designers guide to the command line (the bits you’ll actually use)
date: 2015-08-12 10:03:00 +01:00
---

**This guide is based on Mac commands. Windows syntax is slightly different and covered in-depth [here](http://cli.learncodethehardway.org/book/).**

The command line (or Terminal) is an alien world for most designers, it goes against everything we know, create and love – Graphical User Interfaces [GUIs]. But that’s all it is, a pure version of the operating system without the restrictions imposed by UI design.

You will have noticed, either on your own or peeking at a developers screen, that with most new web software or development languages (anything node based in particular) that it’s a necessity. It may look scary, but it’s really nothing to fear and can be a very powerful tool and timesaver if you know a little bit about how it works.

The reason a lot of new web technologies use the command line is that it’s **much** easier for developers to write for than creating GUI applications (and getting us involved to design them!) Due to this there has been a boom in very clever and useful programs / technologies that you will likely want to add to your arsenal.

### First things first

The command line is very simple but also very powerful. It’s important that you understand that anything you do in the command line is **irreversible**. There’s no **⌘ + Z** available, once it’s done, it’s done. So tread with a little bit of caution, but it’s unlikely you’ll do something you regret (if you know what you’re doing).

The second thing is that (as I’ve mentioned) the command line is not a GUI. Don’t expect to see any nice icons or drag and drop functionality, it’s just text commands. There isn’t even mouse support, everything is done through the keyboard. It’s the ultimate Minimal Viable Product and doesn’t need to be anything more.

### Let’s get started

When you open the terminal ( *Applications → Utilities → Terminal* ) you’ll see a short line that looks something like this:

{% highlight bash %}
COMPUTERNAME:~ Username$
{% endhighlight %}

My computer shows:

{% highlight bash %}
Macbook:~ Tom$
{% endhighlight %}

The terminal is saying “I am this computer, I am in this folder, you are this person, what do you want me to do?” with a blinking cursor afterwards. This is the prompt. You write commands after the $ symbol that tell the computer to do things (my examples after this start from the $ – Remember, you do not need to type the $ in your commands. Write after it.)

### Where am I?

The first command that you should know is **pwd** this stands for **Print Working Directory**. A directory is another name for a folder. It’s exactly the same as using Finder to look through files, each window and level you navigate through in Finder is a directory.

In the terminal type **pwd**

This will will tell you where you are, initially you should be in your Home directory (the equivalent of clicking Go → Home in Finder)

{% highlight bash %}
$ pwd
/Users/Tom
{% endhighlight %}

You will use this command very frequently to check if you’re in the correct directory when moving around in the command line (remember there’s no undo available so it’s best to check to make sure where you are from time to time)

### Moving around

Now you know where you are you need to be able to move back and forth between directories. To do this use a simple command called **cd** this stands for **Change Directory** and where you want to go.

In terminal type:

{% highlight bash %}
$ cd documents
{% endhighlight %}

Use the **pwd** command to see if that worked:

{% highlight bash %}
$ pwd
/Users/Tom/documents
{% endhighlight %}

Your prompt will also have updated to include where you are and should look something like this:

{% highlight bash %}
COMPUTERNAME:documents Username$
{% endhighlight %}

Which is easier to check than running **pwd** but if you’re not sure it’s best to play it safe and check where you are.

To move up a level, similar to HTML file paths you type:

{% highlight bash %}
$ cd ..
{% endhighlight %}

That will take us back to the home directory (as we’re only one level deep):

{% highlight bash %}
$ pwd
/Users/Tom
{% endhighlight %}

A shortcut to go back home is to type the ~ (tilde) character after **cd** that acts as home and will get you out of deep directories with ease (rather than typing ../../../../ to go back 4 levels)

However the easiest way to move around the terminal isn’t to type full paths out, for example if you want to access a deep folder you’d have to type something like this:

{% highlight bash %}
$ cd ~/documents/sites/my_awesome_project/public/stylesheets/
{% endhighlight %}

Thats a little long winded to type out multiple times. It’s unlikely that you will be navigating your entire project using just the command line, you’ll be using the Finder for general bits and the CL for running programs (like git).
To fast track to your project, navigate to it in Finder and type **cd** in the Terminal. Then drag the folder from Finder into the terminal and it will auto complete the path for you. Magic.

### Making and deleting directories

To make a directory move to where you want the new folder and type:

{% highlight bash %}
$ mkdir my_awesome_project
{% endhighlight %}

**mkdir** is short for Make Directory. This command will make a folder called my_awesome_project. You can make multiple folders by passing a path:

{% highlight bash %}
$ mkdir -p my_awesome_project/public/stylesheets
{% endhighlight %}

You can similarly remove a directory by using **rmdir**. Let’s say we don’t want the stylesheets folder anymore. We **cd** into the file and use **rmdir** to delete it.

Remember, you cannot undo this so make sure you’re not deleting anything important by checking whats inside the folder first.

To find out what is in your directories you can run **ls** which lists the contents of the current directory:

{% highlight bash %}
$ cd ~/documents/sites/my_awesome_project/public/stylesheets
$ ls
styles.scss     _fonts.scss     styles.css
{% endhighlight %}

We’re sure we don’t want our stylesheets for this project, let’s continue and remove the directory:

{% highlight bash %}
$ cd ..
$ rmdir stylesheets
{% endhighlight %}

You can also create files in the terminal by using the **touch** command. Let’s create an index.html file, simply type:

{% highlight bash %}
$ touch index.html
{% endhighlight %}

We can run **ls** to make sure it’s there:

{% highlight bash %}
$ ls
index.html
{% endhighlight %}

### Opening files in the terminal

You may want to open a file you’re browsing easily, you can do that by simply asking the terminal to open the file:

{% highlight bash %}
$ open index.html
{% endhighlight %}

This will open the index.html file in it’s default application (usually a web browser). To open the file in a different application you can type:

{% highlight bash %}
$ open -a atom index.html
{% endhighlight %}

And the file will open in [Atom](https://atom.io/) (my current text editor of choice)

### History and search

Searching for a previous command by scrolling through the previous output can be a little daunting with all the system jargon the terminal can spit out. Luckily there are a few shortcuts:

{% highlight bash %}
$ history
{% endhighlight %}

**history** will pull a list of recent executed commands (without the output). This is really useful to check if you've already done something or not but can be a little overkill.

Pressing **ctrl + R** opens a search function called **reverse-i-search** your prompt will change to:

{% highlight bash %}
(reverse-i-search)`':
{% endhighlight %}

if you start typing, the most recent command that equals your query will be displayed and you can re-use the command by just pressing enter rather than typing it all out again. To exit this function press **esc**.

An even quicker method of searching recent commands is simply pressing the **↑ (up) key** on your num-pad to browse commands in chronological order.

### Find out more

The command line can do **a lot** more than the above but as the title suggests, you probably won’t use many of the other commands on a day-to-day basis. If you’d like to find out more about the command line and the myriad of other commands, I highly suggest reading through the [Command Line Crash Course](http://cli.learncodethehardway.org/book/) by Zed A Shaw.
