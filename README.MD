<b>reSCue Dashboard</b>
</br>
A project hacked together in Cal Hacks 2017
Created by: Chris Cao, Denim Mazuki, David Valdez, Thomas Zhang
DevPost: https://devpost.com/software/rescue-xdkhc8

A dashboard using APIs from Cisco Meraki, WRLD, and Twitter to provide location and sentiment analysis of a location.
The dashboard was initially created with first-responders in mind because it allows visual representation of where people in the vicinity are moving. However, the dashboard can prove to provide good utility to even civilians.

The app is built with a Bootstrap client alongside a NodeJS server. The app utilizes WRLD api to generate the map due to the team's excitement towards working with 3D maps. Cisco Meraki's API was also utilized due to its ability to collect data of the hackers in Berkeley, allowing us to perform analysis on them. Websocket.io is used to communicate between the server and client due to the periodic POST that the server receives from Meraki.

The dashboard's functionality composes of the following:<br />
<b>Real-time heat map</b>
<br/>
![Alt Text](https://media.giphy.com/media/xT9IgHmpc1WlRqIQ1i/giphy.gif)
<br />
<b>Location marker for building interiors</b>
<br />
![Alt Text](https://media.giphy.com/media/l1J9BuncDaKJhva3C/giphy.gif)
<br />
<b>Live Twitter feed</b>
<br />
![Alt Text](https://media.giphy.com/media/xT9IgiiNjM8MiiSKgU/giphy.gif)
<br />
Potential Improvements
Due to the time constraints presented in the hackathon and the time it required to brainstorm a project, various trade-offs were explored. Given enough time, the team plans to focus on the data aspect of the dashboard (currently, the data is hard-coded) as well as potential machine learning applications to predict disasters before it happens.
