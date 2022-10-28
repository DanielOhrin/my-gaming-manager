# Introduction

This project is my front-end capstone for Nashville Software School.
I developed everything myself apart from boilerplate from installing React.

## What is it?

I wanted to build a project with a public video game api. I decided to make an application where users can create lists of games however they like. Each list can be edited and deleted however the user wants. However, there are a few required fields for making a list and account to ensure uniformity.

# Purpose/Motivation

I enjoy playing video games so I knew I wanted to build something based around them. I threw around a couple of ideas in the weeks leading up to "capstone season" at NSS, and this one seemed most appealing to me, because I can actually use it myself.

# How it works

When the user first opens the application, they are redirected to the [login page](https://prnt.sc/a-5fI6UpD1Hi) where they can either login or [register](https://prnt.sc/um0zDvrp7_L5) a new account. Then they are redirected to a view with their lists.

The user can create a list here, then navigate over to the [Search](https://prnt.sc/LePb0A8xCbg9) page _from the navbar_ to search for games to add.

The user's lists are display on the page called [My Lists](https://prnt.sc/opFtVQ8i5vD8), and when the name of a list is clicked on, the user is directed to a view with [the list](https://prnt.sc/x5yzBBrMBz6e) information and all games added to it.

This is the main purpose of the application -- to organize games from all platforms.

# How it was developed

To reach MVP, I spent four days coding all of the functionality for the components and styling them enough to be useable.

I used [React](https://reactjs.org/) and [React-Router](https://v5.reactrouter.com/web/guides/quick-start) to manage state and routes in my application.

For styling, I wanted to try a framework and used [Tailwind](https://tailwindcss.com/).
For my next project I will probably use BootStrap, because it offers many complex classes that I could have used to make my website look cleaner.

# Challenges Conquered

## IGDB (Public API)

The biggest challenge I conquered was trying to figure out IGDB's API.

[IGDB](https://api-docs.igdb.com/#about) requires the user to use a POST fetch to GET whatever data they need. Also, they require the user to use a bridge database, or proxy, to avoid CORS.

Figuring out how to setup a database or proxy was very challenging considering I have only dealt with json-servers up to this point, and the instructions on their website were outdated.

I ended up figuring out what was wrong with their instructions and reporting it to them, so I was able to create a stack on AWS to fetch from.

## Modals

My trouble with modals was short-lived, and was a styling issue more than anything.

Whenever my modal popped up, it only covered the screen from its position to the end of the parent container, meaning if my modal was created on the right side of the screen, it would only cover the right side of the screen.

I was able to fix it by using the **top** and **left** attributes in my CSS file

# How to run the application yourself

## 1. Clone the Repositories

A) Open your terminal of choice, and navigate to the directory you want the project in. <br>
B) Paste the following in your terminal:

```
git clone git@github.com:DanielOhrin/my-gaming-manager.git
git clone git@github.com:DanielOhrin/mgm-api.git
```

## 3. Sign up For Twitch (API)

You _need_ to do this step to run IGDB's public API for the games:
<br>
<br>
A) Follow IGDB's [Getting Started](https://api-docs.igdb.com/#about) Directions <br>

- Note: **Account Creation** contains the instructions. When you get to step 3, put http://localhost as your oAuth.<br>

B) Follow IGDB's [Proxy](https://api-docs.igdb.com/#proxy) Instructions <br>

## 4. Create file in project directory for the stack link

Create a **proxy** file in the src/ folder of the main project directory (my-gaming-manager) <br>
Inside the file, paste the following:

```
export const proxy = "OutputURLLinkHere"
```

## 5. Installing dependencies

While in the my-gaming-manager directory in your terminal, type `npm install`.

## 7. Run the project

Once npm finishes installing the dependencies, type `npm start` and move on to the next step.

## 6. Start json server

Create a new terminal session (don't close the original one) <br>
Navigate to the mgm-api directory and type `json-server database.json -p 8088`

## 7. Have fun with the project

If you followed all of the steps up to this point, you are now able to use the project personally whenever you like. <br>

**IMPORTANT:** Do not share your AWS link with anyone, as too many API calls (`4000+/m`) could result in payment requested.
