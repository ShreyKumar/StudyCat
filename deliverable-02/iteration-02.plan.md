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
- Also responible for checking database inserts

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

 * Other events could be coding sessions, code reviews, quick weekly sync' meeting online, etc.
     - Coding sessions are to be done throughout the week by several individuals.

#### Artifacts

List/describe the artifacts you will produce in order to organize your team.       

 * Artifacts can be To-do lists, Task boards, schedule(s), etc.
 * We want to understand:
   * How do you keep track of what needs to get done?
   * How do you prioritize tasks?
   * How do tasks get assigned to team members?

The main artifact we will produce is Taiga.io.

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

#### Artifacts

##### Code
 


##### Structure

 * Taiga - Continued use of taiga to create and manage project tasks on Sprint 2.
 * Endpoints Text - A list of endpoints to communicate the usage of server endpoints.

List/describe the artifacts you will produce in order to present your project idea.