from tkinter import *
from PIL import ImageTk, Image
from tkinter.filedialog import *

white = "#ffffff"


class programDisplay(Frame):

    def __init__(self, master):
        Frame.__init__(self, master, bg=white)
        self. productivityList = []
        self.textBox = Label(master, bg=white)


class MainFrame(Frame):

    def __init__(self, master, productivityList, startCommand):
        Frame.__init__(self, master,bg="#FFB6C1")
        self.startCommand = startCommand
        self.currEXE = StringVar()
        self.currEXE.set("No Program Selected")
        self.productivityList = productivityList
        #self.readList(productivityList)
        self.category = StringVar(master)

        self.category.set("Neutral")
        self.categories = ["Very Unproductive", "Unproductive", "Neutral", "Productive", "Very Productive"]

        self.programDisplayText = StringVar(master)
        self.programDisplayText.set("\n".join(self.productivityList[self.categories.index(self.category.get())]))

        self.create_widgets()

    def readList(self, file):

        with open(file) as f:
            lines = f.readlines()

        for line in lines:
            self.productivityList.append(line.split(","))

    def create_widgets(self):

        self.title = Label(self, text="Initialization", font=("Helvetica", 16),bg="#FFB6C1")
        self.title.pack()

        self.label = Label(self, textvariable=self.currEXE,bg="#FFB6C1")
        self.label.pack(side="top")

        self.selectProgram = Button(self, text="Select Program", command=self.openFile,bg=white)
        self.selectProgram.pack(side="top")

        self.selectCategory = OptionMenu(self, self.category, *self.categories, command=self.updateDisplayedPrograms)
        self.selectCategory.config(bg=white)
        self.selectCategory.pack(side="top")

        self.addProgram = Button(self, text="Add Program", command=self.addProgram,bg=white)
        self.addProgram.pack(side="top")

        self.startMonitoring = Button(self,text="Start",
                                      command=self.startCommand,bg=white)
        self.startMonitoring.pack(side="top")

        self.programDisplay = Label(self, textvariable=self.programDisplayText,bg=white,highlightbackground="#000000",pady=20)
        self.programDisplay.pack()

    def updateDisplayedPrograms(self, event):
        self.programDisplayText.set("\n".join(self.productivityList[self.categories.index(self.category.get())]))

    def addProgram(self):

        if self.currEXE.get() != "No Program Selected":
            self.productivityList[self.categories.index(self.category.get())].append(self.currEXE.get())
            print(self.productivityList)
            self.currEXE.set("No Program Selected")
            self.updateDisplayedPrograms(None)

    def openFile(self):
        exe = askopenfilename().split("/")
        self.currEXE.set(exe[len(exe)-1])

    #def startMonitoring(self):
    #    with open("updatedPLists.txt", "w") as f:
    #        for list in self.productivityList:
    #            f.write(",".join(str(x) for x in list))

        #startMonitoring(self.productivityList)


if __name__ == "__main__":
    processes = "./pList.txt"
    root = Tk()
    app = MainFrame(root, processes)
    app.master.geometry("400x300")
    app.mainloop()

