# ROBODUCKY - BACKEND
This is the backend repository of roboducky.
Roboducky is a "robotic" (not really but almost as cool) rubber duck that listens patiently to developers **and** actually remembers your previous conversations.
  
## INTRODUCTION


Roboducky is a web application that facilitates the continuation and transformation of a longstanding tradition in software development.  
Developers oftentimes find themselves in challenging situations where they have to figure out some logic or problem with their code but do not immediately come up with a good solution. Talking to another person might help in such a situation but sometimes nobody is there to listen or you as a dev. might want to spare your co-workes, family or friends the time to listen for hours on end just in order for you to come up with a solution on your own after a while.  
In such cases developers have long enjoyed talking to a rubber duck on their desk that would patiently listen to them - no matter what time of day or night.
During their conversations with their rubber ducks many issues and troubles have been talked through and those rubbery companions facilitated breakthrough ideas and solutions.  
But unfortunately those patient rubber ducks could be described as highly prone to intense amnesia.
This is where roboducky comes in.  
Roboducky will listen to your issues and struggles as patiently as its rubbery relatives but it can also remember previous conversations and therefore may be able to help you out when encountering similar issues in the present or future.
  
## FEATURES
All features combine frontend and backend functionalities.

### CURRENT FEATURES 

* Registration of a new account with a personalized roboducky
* Login
* Creating a new conversation including:
  * **Description** of your issue (your monolog),
  * **Solution** for that issue if roboducky's patient listening enabled you to come up with one already,
  * **Mood**
  * **Tags** (manually entered tags)
* Retrieving past conversations:
  * All personal conversations,
  * Conversations with specific tags

### WORK IN PROGRESS
* Editing previous conversations
* Deleting previous conversations if intended
* Deleting the own account if intended
* Improvement of UI *(mainly contextual presence of buttons only if needed)*
* Add a **title** to conversations that is used as such in retrieved conversations if present and only defaults to the mood if no title was given yet.
* Fix the bug preventing tags from being displayed in the detail view of a conversation.
  
### PLANNED FEATURES

* Basic natural language processing *(see "auto keywords" below)*
* New conversation data including:
  * **Code snippets**,
  * **Auto keywords** suggested for you to use as tags by roboducky
* New retrieval functions:
  * Automatically suggesting similar conversations from the past if - and only if - you ask roboducky for help.
  * Retrieve previous conversations via mood
  * Retrieve and filter tags and use them to create a **force directed graph** view of topics you mentioned in your conversations
* Voice to text entry, so that you can actually "talk" to roboducky via the web speech API
https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API
* React Native & Electron App for roboducky to be able to have it always with you even in a not spot
  
## CURRENT TECH-STACK:
  
| Frontend      | Backend               |
| ---           | ---                   |
| React.js      | Node.js & Express     |
| Material-UI   | MongoDB & Mongoose    |

## ADDITIONAL INFO
  
Roboducky is the outcome of my final project of my training at WBS coding school. 

Currently roboducky is still in pre-release (v. 0.8 or 0.9? ;) ). Once the list of WIP is implemented, it will be happy to meet you.

Thanks a lot to the whole staff and especially to @Electric_Sheep for the guidance and inspiration for this project!