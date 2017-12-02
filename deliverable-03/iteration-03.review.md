# Study Cat

## Iteration 2 - Review & Retrospect

When: Wednesday November 29
Where: Online via. Discord

## Process - Reflection

#### Decisions that turned out well

* Setting internal deadlines to get everything done well in advance, this fixed our procrastination issue of getting everything done just before the deadline. Also, this made sure we aren't pushing broken code for the next team to use and gave us a "grace period" in case something suddenly stopped working.
* Starting work for this deliverable to be complete well in advance.
* Setting good communication standards before and after code is committed to the repository, this fixed our problem from last time where communication between teams was the main problem in finishing things late.  
* Started work on android app. 
* Deciding to take one or two days off this project to fully rest and deliver on time with effeciency. 

<img src="taigamain.png" width="640" height="480">

<br /> 
<br /> 
<img src="extensiontaskboard.png" width="640" height="320">



<br /> 
<br /> 

<img src="taskexample.png" width="640" height="600">


<br /> 
<br /> 


[Link to some of our team notes.](https://drive.google.com/drive/folders/0B2HiDj_0mhzYZktXVWxpaUdUZW8)

#### Decisions that did not turn out as well as hoped

* Some internal deadlines were not hit by everyone, as such we should have been more realistic in setting these deadlines
* A lot more unexpected bugs were encountered this time than before, which delayed progress in our overall process 
* Some code could have been better structured. (For the chrome extension)
* Did not have the time to test out both chrome extension and desktop app synchronously.

#### Planned Changes

* Changing from a single-platform process monitor to a interface that allows support for multiple operating systems
    - We believe that it is important to support multiple operating systems since even during development we ran into issues with not being able to run the app on Unix based systems.
    - Considering that a significant portion of people are not exclusively using Windows, we would be losing a lot of potential users by restricting the type of operating system
* UI improvements
    - Visuals of the desktop application could still use some improvements
    - A few UI bugs on chrome extension that need be fixed.
* Effeciency issues
    - Some parts of the extension are still glitchy, although the functionality works. 
* Group Functionality
    - We plan on adding a feature that allows for multiple users to join a group where each user will have a certain score, therefore incentivizing the group members to be more productive.
    - This unique feature will make our app stand out compared to other productivity apps
 
## Product - Review

#### Goals and/or tasks that were met/completed:

* Getting the main process monitoring and productivity score algorithm up at working
* Server that uses Firebase for user authentication
* Having a Chrome extension to monitor active browser tabs

<img src="app.png" width="400" height="300">

<br />

<img src="artifact1.PNG" width="250" height="600">

#### Goals and/or tasks that were planned but not met/completed:

* Having the User's data persist across devices
    - Synchronizing data between devices hasn't been implemented yet
    - The team determined that getting the main functionality as good as possible was a higher priority than extra details such as multi device support
* Multi-platform support (OSX and W10)
    - Currently the process monitoring will only work for devices using Windows as we installed the win32 packages instead of the Unix based packages
    - We plan on creating an interface which will allow the app to dynamically choose which packages to use for process monitoring. 

## Meeting Highlights

* For our next iteration we are planning on implementing the goals that we planned earlier but were not able to complete such as user data persistence, and multi-platform support. We believe that these are important features that should be implemeneted for our MVP, which we explain above.
* For the MVP we also want to have group functionality implemented, as this was one of the key unique features of our app.
* We also plan on adding some smaller features such as being able to customize appearance of the cat/user and adding custom user-defined productivity levels (being able create our own productivity categories).

