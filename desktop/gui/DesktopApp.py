from tkinter import *  # Importing the Tkinter (tool box) library

from Monitor import monitor

from time import sleep

from threading import Thread, Lock

from Monitor import display

from Monitor import UserModel

from Monitor.client import Client

from Monitor.client import register as signup

from cat import Cat, CatDisplay

from login import LoginScreen

class DesktopApp:
    def __init__(self):
        self.root = Tk()
        self.cat = Cat()
        self.user = None
        self.client = None
        self.loggedIn = False

        self.processLock = Lock()
        self.processLock.acquire()

        #self.root.overrideredirect(1)

        self.productivityList = []
        self.readList("./../Monitor/pList.txt")

        container = Frame(self.root, bd=5, relief=RAISED)
        container.pack(side="top", fill="both", expand=True)
        container.grid_rowconfigure(0, weight=1)
        container.grid_columnconfigure(0, weight=1)

        self.GUI = CatDisplay(container, self.cat, self.pauseMonitoring)
        self.mainFrame = display.MainFrame(container, self.productivityList, self.startMonitoring)
        self.loginFrame = LoginScreen(container, self.loginPage, self.register)

        self.GUI.grid(row=0, column=0, stick="nsew")
        self.mainFrame.grid(row=0, column=0, stick="nsew")
        self.loginFrame.grid(row=0, column=0, stick="nsew")
        self.loginFrame.tkraise()
        #self.mainFrame.tkraise()

        self.monitor = monitor.Monitor(self.productivityList)
        self.running = 1

        self.thread1 = Thread(target=self.monitorProcesses)
        self.thread1.start()

        # Client thread
        self.thread2 = Thread(target=self.syncWithServer)
        self.thread2.start()

        self.root.protocol("WM_DELETE_WINDOW", self.onClosing)
        self.root.wm_attributes("-topmost", 1)
        self.xoffset = 0
        self.yoffset = 0
        self.root.bind('<Button-1>', self.clickWindow)
        self.root.bind('<B1-Motion>', self.dragWindow)

        self.root.mainloop()

    def dragWindow(self, event):
        x = self.root.winfo_pointerx() - self.xoffset
        y = self.root.winfo_pointery() - self.yoffset
        self.root.geometry('+{x}+{y}'.format(x=x, y=y))

    def clickWindow(self, event):
        self.xoffset = event.x
        self.yoffset = event.y

    def startMonitoring(self):
        #self.running = 1
        self.updateAffection()
        self.saveList()
        self.monitor.processLists = self.productivityList
        self.monitor.initVars()
        self.GUI.tkraise()
        self.processLock.release()

    def pauseMonitoring(self):
        self.processLock.acquire()
        # self.running = 0
        self.mainFrame.tkraise()

    def onClosing(self):
        self.running = 0
        self.root.destroy()

    def monitorProcesses(self):
        while self.running:
            self.processLock.acquire()
            #self.monitor.initVars()
            print(self.monitor.pollLatestProcess())
            self.processLock.release()
            sleep(2)


    def register(self, user, password):
        signup(user, password)

    def loginPage(self, user, password):
        self.login(user, password)
        self.mainFrame.tkraise()

    # PLAINTEXT PASSWORD
    def login(self, user, password):
        self.user = UserModel.UserModel(user, password)
        self.client = Client(self.user)
        self.client.login()

    def syncWithServer(self):
        while self.running:
            if (self.client and self.client.auth()):
                # TODO update server
                print("UPDATING WITH SERVER")
                self.user.setActive(self.monitor.pollMostUsed())
                self.client.postDataToServer()
            sleep(5)

    def updateAffection(self):
        if self.running:
            self.cat.setState(self.monitor.getAffection())
            self.root.after(5000, self.updateAffection)

    def readList(self, file):
        with open(file) as f:
            lines = f.readlines()

        for line in lines:
            self.productivityList.append(line.strip("\n").split(","))
        print(self.productivityList)

    def saveList(self):
        with open("./../Monitor/pList.txt", "w") as f:
            for processes in self.productivityList:
                f.write(",".join(processes) + "\n")


if __name__ == '__main__':
    app = DesktopApp()
