# Kidkards Application
---

Kidkards application

Get the application on appstore here: [AppStore](https://itunes.apple.com/us/app/kidkards/id1088182089)

Check the website here: [Website](https://kidkards.herokuapp.com/#/)

Check the Kidkard Server API repo: [Github](https://github.com/renandeswarte/kidkards-api)

## Application
---
Kidkards is an application available for iOS devices, iPhone and iPads.<br>

* Learn and play with new English words and flashcards<br>
* Discover new words, try to guess the flashcard answer and listen to the definition of the card.<br>
* Play a matching card game with several card.
* Choose the category you want to learn or play with

Kidkards uses a Rest API for all its data. [Check on Github](https://github.com/renandeswarte/kidkards-api)
<br>
Admins can add, update or delete flashcards.

Each flashcard contains a term (picture) and a definition(text).<br>
The pictures are uploaded directly to AWS S3.

## Technologies Stack
---

* FRONT
	* **Cordova**
	* **AngularJS** Framework
	* **Sass** for CSS
* BACK
	* **Node.js/Express** Server
* OTHER
	* **Grunt** as Task runner for Js and Sass files
	
## Front
---

Use `grunt watch` to start watching Js and Sass files

To simulate the application in iOS simulator, go in **mobileApp/** folder and type `cordova run ios`
	
## Server
---

Run `nodemon` to serve the application on your browser
	
### Configuration file

You need to add a .env file in the root folder.

You can find an example of the file in the documentations folder: [.env](Documentations/dotenvfile.json).

## Local installation
---

Install dependencies `npm install`<br>
Run the server with `nodemon`


