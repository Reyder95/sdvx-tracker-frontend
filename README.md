# Archive Note
This project was my first real project working with a back end and front end, and I even published it online working with cloud computing and such. I am going to archive this project showing it off as it was a really cool start into further improving my development skills!

## Running yourself
- Clone the repository anywhere you'd like  
- Type `npm install` to install all the project's dependencies
- Create a file named `keys.json` and place it inside the src folder.
```
{
   "api_url": "http://localhost:3000" // This is the link to the back end API of this project
}
```
- `npm start` will start the project in development mode.
- `npm run build` will build the project. If you do this, type `npm install -g serve` and then `serve -s build` to serve a static build of the project.
- **Remember you need the back end built correctly. Please take a look at the repository  here: https://github.com/Reyder95/sdvx-tracker-backend ...** Note: There is no database build script just yet, so this repository isn't exactly ready to be useable by the public. I will be setting this up soon with documentation.

## Introduction
This is a project developed for use with the game SOUND VOLTEX and its respective simulators (Unnamed SDVX Clone, K-Shoot Mania, and soon Neurosonic). In a tl;dr fashion, it will be a system that users can keep track of all their scores among these versions of the game and view statistics that may make them better players. Since there are many versions of the game and people switch it up, having one central system where you can manually input and keep track of scores would be a benefit. This system will also support customs for the various simulators

## Have a suggestion or a bug to report?
Check out the Issues tab above to submit an issue whether it be a bug report or a feature request. This way we can keep track of what everyone thinks about the platform and how we can work to improve it!

## How Does This Work?
When you browse the Song List, you can view all charts that are currently uploaded to the website. These entries are just data, and do not have a physical chart download attached to them. If you play a song and need to upload it to the website, you would first check if whether or not the song was posted to the website already. If it was not, you would create the song first, inputting as much information as you want so other people can also use the song to post their own scores. After this, you'd be able to enter the song view page and click the Add Score button, which will bring a button that allows you to input and submit your score. This submits your score to the database and processes against the rest of your scores to check whether or not you gain volforce from this.

## Upcoming Feature List
### Song Entry
At the current moment, there is a plan to allow for users to manually input songs into a global song listing. This global song listing can be viewed by all players, and it will be the start of allowing the website to keep a huge collection of official and custom chart information to be used by all players. But there are a few problems that need to be discussed.
1. Can't lots of people input the same chart over and over again without checking if one exists?
    * Yes, and our solution to this is the Verified system. While users may still be to continually duplicate charts, verified ensures that all charts placed in there are unique from one another. Verified charts will only allow for official charts to be implemented (no customs)
    * There will eventually be a system to limit the number of duplicates via algorithms to figure out whether or not a specific chart is a duplicate of an existing one or not, however this will primarily check against Verified since non-verified charts may have errors.
2. Who can edit the information in a chart I upload?
    * At the current moment, only you and the moderators / developers will have the ability to edit your chart information. However, in the future, we will handle the system in a "wiki" fashion, and only Verified charts will be unable to edit.
3. How does a chart get verified?
    * A chart will need a specific number of player and moderator votes in order to be verifiable. This is still being discussed, but the numbers aren't finalized. Somewhere around 3 to 5 players and 1 or 2 moderators will be required for the verification of a specific chart.
4. What if I post a score on one version of an unverified chart, but another chart becomes verified?
    * We will be adding a score transferring system. So you can simply take the scores on one chart and transfer them to another. Considering there is no global leaderboards and you will not be competing against others, even people who abuse this in any way will not be gaining anything from it.
