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
- Facilitate discussion in meetings


Darwin Truong

- Responsible for communication with the server


Kevin Zheng

- Responsible for overall UI appearance and integrating Kevin Kang and Darwin Truong's tasks

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

Online meetings will be held on Thursdays and Sunday evenings, while in-person meetings will be held in person after tutorial on Mondays.
 * What's the purpose of each meeting?

    - You state the current progress you have on your portion of the code, if there are any problems with your portion.
    - Reassign and redistrubute new tasks that come up
    
Monday evening meetings directly after tutorial are held to determine tasks for the next week. The group facilitates discussion to focus on our goals for the application as a whole - sample questions being "what's the most important thing for the next week", or questions about the infrastructure of our application and how each team's products should communicate with the other (ie, local server vs one online server.)
They will be held directly after tutorial meetings so that the feedback from the TA is fresh in our minds, so we can incorporate it into our goals for the next sprint.

Thursday meetings act as a mid-week checkup. Everyone will give an update on the work they've done so far during the week, and then we'll revise our tasks as seen (if some tasks are seen to be harder than others, or require more manpower), or reallocate people to different tasks to make sure it's going to be done.
These meetings will be shorter than the other two for the most part; they serve mainly to update the group on progress, and less so about the overall structure of the app.

Sunday meetings will act as a buffer to the tutorial; tasks are expected to be completed by this time, and everyone will report what's been done and we'll figure out our stategy for the tutorial - mainly what we'll talk about, and what we'll present. As well, since all tasks are complete, another group discussion is held to figure out possible takss for the next week, and based on the progress/ difficulty of the tasks completed, to re-prioritize the most important part of the app, and whether certain tasks were worth the effort or not.

 * Other events could be coding sessions, code reviews, quick weekly sync' meeting online, etc.
     - Coding sessions are to be done throughout the week by several individuals.
     
Coding sessions, code reviews, and syncing will be done during the Thursday meetings. Since they act as a checkup meeting, it's also a good opportunity to both get everyone on the same page, and to catchup on any work that's lagging behind.
 

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

The main workflow we chose was to have group work on their own branch, and then after a task is completed, we will do a pull request from their own branch onto master. The pull request will be looked over by each member of their own respective team before it is pushed onto the master branch by any member of that team. 

The reason why we did this was to make sure that each branch wouldn't conflict with other branches. It would also promote more freedom between each team as we have working versions of the product protected on master. Another benefit of this is to make sure that we would always have working code on the master branch ready. This meant that during presentations on Mondays, we could be sure that we had something working and someone didn't push any code that broke our display product.



## Product

#### Goals and tasks

 * Describe your goals for this iteration and the tasks that you will have to complete in order to achieve these goals.
 * Order the items from most to least important.
 * Feel free (but not obligated) to specify some/all tasks as user stories.

#### Artifacts

List/describe the artifacts you will produce in order to present your project idea.

 * Artifacts can be text, code, images, videos, interactive mock-ups and/or any other useful artifact you can think of.
 * Make sure to explain the purpose of each artifact (i.e. Why is it on your to-do list? Why is it useful for your team?)
 * Be concise, yet precise.         
   For example: "Build the website" is not precise at all, but "Build a static home page and upload it somewhere, so that it is publicly accessible" is much clearer.