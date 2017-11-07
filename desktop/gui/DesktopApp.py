from tkinter import *           # Importing the Tkinter (tool box) library

from PIL import ImageTk, Image

from Monitor import monitor

from time import sleep

from threading import Thread

from Monitor import display

class Cat:
    def __init__(self):
        self.state = 50
        self.catStates = ["cat_0.jpeg", "blep.png", "cat_2.jpeg", "cat_3.jpg", "cat_4.jpg"]
        self.catStates = [ImageTk.PhotoImage(Image.open(x).resize((250, 250), Image.ANTIALIAS)) for x in self.catStates]
        self.catText = ["navy", "deep sky blue", "rosy brown", "plum1", "green2"]

    def getState(self):
        return self.state

    def setState(self, newState):
        self.state = newState

    def getText(self):
        index = int(self.state / (100 / len(self.catStates)))
        return self.catText[index]

    def getImage(self):
        index = int(self.state/(100 / len(self.catStates)))
        return self.catStates[index]


class CatDisplay(Frame):
    def __init__(self, master, cat):
        Frame.__init__(self, master)
        self.root = master
        self.cat = cat
        img = self.cat.getImage()
        self.panel = Label(self, image=img)
        self.panel.pack(side="bottom", fill="both", expand="yes")

        self.label = Label(self, text="Happiness: " + str(self.cat.getState()), fg=self.cat.getText())
        self.label.pack(side="bottom", fill="both", expand="yes")
        self.update()

    def update(self):
        img = self.cat.getImage()
        text = "Happiness: " + str(self.cat.getState())

        self.panel.configure(image = img)
        self.panel.image = img

        self.label.configure(text = text, fg = self.cat.getText())
        self.label.text = text

        self.root.after(1000, self.update)


class DesktopApp:
    def __init__(self):
        self.root = Tk()
        self.cat = Cat()

        container = Frame(self.root)
        container.pack(side="top", fill="both", expand=True)
        container.grid_rowconfigure(0, weight=1)
        container.grid_columnconfigure(0, weight=1)

        self.GUI = CatDisplay(container, self.cat)
        #self.display = display.Application("./../Monitor/pList.txt", container)

        self.GUI.grid(row=0,column=0,stick="nsew");
        #self.display.grid(row=0,column=0,stick="nsew");

        #self.display.tkraise()
        #self.root.overrideredirect(1)

        self.monitor = monitor.Monitor("./../Monitor/pList.txt")
        self.running = 1
        self.thread1 = Thread(target=self.monitorProcesses)
        self.thread1.start()

        self.updateAffection()
        self.root.protocol("WM_DELETE_WINDOW", self.onClosing)
        self.root.mainloop()

    def onClosing(self):
        self.running = 0
        self.root.destroy()

    def monitorProcesses(self):
        while self.running:
            self.monitor.initVars()
            sleep(2)
            print(self.monitor.pollLatestProcess())

    def updateAffection(self):
        self.cat.setState(self.monitor.getAffection())
        self.root.after(5000, self.updateAffection)


if __name__ == '__main__':
    app = DesktopApp()