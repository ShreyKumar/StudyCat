from tkinter import *
from PIL import ImageTk, Image
from tkinter.filedialog import *
#from alt_processes import *


class Application(Frame):

    def __init__(self, productivityList, master):
        Frame.__init__(self, master)
        #self.pack()
        self.currEXE = StringVar()
        self.currEXE.set("")
        self.productivityList = []
        self.readList(productivityList)
        self.category = StringVar(master)
        self.category.set("Neutral")
        self.categories = ["Very Unproductive", "Unproductive", "Neutral", "Productive", "Very Productive"]
        self.create_widgets()

    def readList(self, file):

        with open(file) as f:
            lines = f.readlines()

        for line in lines:
            self.productivityList.append(line.split(","))

    def create_widgets(self):
        self.label = Label(self, textvariable=self.currEXE)
        self.label.pack(side="top")

        self.selectProgram = Button(self, text="Select Program", command=self.openFile)
        self.selectProgram.pack(side="top")

        self.selectCategory = OptionMenu(self, self.category, *self.categories)
        self.selectCategory.pack(side="top")

        self.addProgram = Button(self, text="Add Program", command=self.addProgram)
        self.addProgram.pack(side="top")

        self.start = Button(self,text="Start Monitoring", command=self.startMonitoring)
        self.start.pack(side="top")

    def addProgram(self):

        self.productivityList[self.categories.index(self.category.get())].append(self.currEXE.get())
        print(self.productivityList)
        self.currEXE.set("No Program Selected")


    def openFile(self):
        exe = askopenfilename().split("/")
        self.currEXE.set(exe[len(exe)-1])
        print(self.currEXE)

    def startMonitoring(self):
        with open("updatedPLists.txt", "w") as f:
            for list in self.productivityList:
                f.write(",".join(str(x) for x in list))

        #startMonitoring(self.productivityList)


if __name__ == "__main__":
    processes = "./pList.txt"
    root = Tk()
    app = Application(processes, master=root)
    app.master.geometry("400x300")
    app.mainloop()

