# Study Cat

 > _Note:_ This document is meant to be written during (or shortly after) your initial planning meeting.     
 > It does not really make sense for you to edit this document much (if at all) while working on the project - Instead, at the end of the planning phase, you can refer back to this document and decide which parts of your plan you are happy with and which parts you would like to change.


## Iteration 02

 * Start date: October 23rd, 2017
 * End date: November 17th, 2017

## Process

#### Roles & responsibilities

Describe the different roles on the team and the responsibilities associated with each role.


First, we divided into three main teams:

Team 1 (Main Application): 

Kevin Kang

- Responsible for process monitoring
- Faciliate discussion in meetings


Darwin Truong

- Responsible for communication with the server


Kevin Zheng

- Responsible for overall UI appearance and integrating Kevin kang and Darwin Truong's tasks

Team 2 (Server): 

Hongyu Wang

- Responsible for implementing server endpoints for adding and removing data about a user
- Responsible for managing currently logged in users

Jeff Lin

- Responsible for adding endpoints to add and remove persistent data from firebase
- Also responsible for checking database inserts

Team 3 (Extension): 

Shrey Kumar

- Responsible for coding the chrome extension

#### Events

Describe meetings (and other events) you are planning to have:

 * When and where? In-person or online?

 We are planning to have meetings online once per week on Sunday.

 * What's the purpose of each meeting?

    - You state the current progress you have on your portion of the code, if there are any problems with your portion.
    - Reassign and redistrubute new tasks that come up
    
Monday evening meetings directly after tutorial are held to determine tasks for the next week. The group facilitates discussion to focus on our goals for the application as a whole - sample questions being "what's the most important thing for the next week", or questions about the infrastructure of our application and how each team's products should communicate with the other (i.e, local server vs one online server.)
They will be held directly after tutorial meetings so that the feedback from the TA is fresh in our minds, so we can incorporate it into our goals for the next sprint.

Thursday meetings act as a mid-week checkup. Everyone will give an update on the work they've done so far during the week, and then we'll revise our tasks as seen (if some tasks are seen to be harder than others, or require more manpower), or reallocate people to different tasks to make sure it's going to be done.
These meetings will be shorter than the other two for the most part; they serve mainly to update the group on progress, and less so about the overall structure of the app.

Sunday meetings will act as a buffer to the tutorial; tasks are expected to be completed by this time, and everyone will report what's been done and we'll figure out our strategy for the tutorial - mainly what we'll talk about, and what we'll present. As well, since all tasks are complete, another group discussion is held to figure out possible tasks for the next week, and based on the progress/ difficulty of the tasks completed, to re-prioritize the most important part of the app, and whether certain tasks were worth the effort or not.

 * Other events could be coding sessions, code reviews, quick weekly sync' meeting online, etc.
     - Coding sessions are to be done throughout the week by several individuals.

List/describe the artifacts you will produce in order to organize your team.       

 * Artifacts can be To-do lists, Task boards, schedule(s), etc.
 * We want to understand:
   * How do you keep track of what needs to get done?
   * How do you prioritize tasks?
   * How do tasks get assigned to team members?

The main artifact we will produce is Taiga.io. Sprints will be created either weekly or bi-weekly (depending on both our availability), and four user stories will be used to organize tasks (based on the teams, as well): Chrome Extension, Process Monitoring, Server, and Main Game. Each of these represents one of the four main core aspects of our app.
Tasks are prioritized based on how important they are to the basic functionality of the app (the MVP). For the most part, this will be the most basic process monitoring, hooked up to a user system and with the chrome extension feeding information in to the desktop app, and all of this affecting the cat's affection.
Generally, since tasks will be formulated during the Monday meetings, we will as a group discuss the most important tasks for the week (across teams as well, since each team relies on eachother for full app functionality.) Everyone will then decide which task they want to take, and once all tasks are allocated, we re-meet on the Thursday.

#### Git / GitHub workflow

Describe your Git / GitHub workflow.     
Essentially, we want to understand how your team members share a codebase and avoid conflicts.

 * Be concise, yet precise.      
For example, "we use pull-requests" is not a precise statement since it leaves too many open questions - Pull-requests from where to where? Who reviews the pull-requests? Who is responsible for merging them? etc.
 * If applicable, specify any naming conventions or standards you decide to adopt.
 * Don't forget to **explain why** you chose this workflow.

The main workflow we chose was to have group work on their own branch, and then after a task is completed, we will do a pull request from their own branch onto master. The reason why we did this was to make sure that each branch wouldn't conflict with other branches. It would also promote more freedom between each user 

## Product

#### Goals and tasks

 * Fully Threaded Client - Will use structure of tutorial file to implement threaded structure.
 * Login/Signup Page - Will create opening page for app, allowing the user to login or signup to the application.
 * Program Selection Page - Will create page to allow users to customize and mark programs to varying levels of productivity, to be tracked by the app when it begins to run.
 * App Side Client - Creating app side endpoints to retreive and push data to the server, allowing for sign-in and communication with the chrome extension.
 * Server Endpoints - Will implement endpoints for backend server.
 * Chrome Extension - Will complete implementation of chrome extention so that chrome tabs may be monitored. Also allows transferring of data to the main app.

Goals:

Art:

- Find an artist to draw the required art assets for the project
    + Gifs of Cats
    + Additional DLC

Server:

- Create Server endpoints in order to handle 
    + Login endpoint
    + Get current user data endpoint
    + Signup endpoint
    + Update data endpoint
    + Database endpoints

Front end:

#### Artifacts

List/describe the artifacts you will produce in order to present your project idea.

Front End:

- kComponents.py: Create a library of tkinter components for the UI of the app.
- login.py: The login frame of the application.
- cat.py: The module containing all functionality of the cat and cat UI display.
- monitor.py: The module which monitors system processes.
- client.py: The list of client side endpoints and functions to interact with the server.
- display.py: The page for selecting programs and assigning productivity levels.
- UserModel.py: A singleton module for storing server and user information.
- pList.txt: A list of programs to monitor.

Server:

- server.js: Express server that contains all routes required
- user_manager.js: File that contains User class, as well as the dictionary that stores currently logged on users.


