#from tkFont import Font
from PIL import ImageTk, Image
from tkinter.filedialog import *

white = "#ffffff"
myFont = "Roboto 10"
style = {"font":myFont,"relief":"flat", "bg":"#ff6262", "fg":"#ffffff"}
pady=5

class programDisplay(Frame):

    def __init__(self, master):
        Frame.__init__(self, master, bg=white)
        self. productivityList = []
        self.textBox = Label(master, bg=white)


class MainFrame(Frame):

    def __init__(self, master, productivityList, startCommand):
        Frame.__init__(self, master,bg="#FFFFFF")
        self.startCommand = startCommand
        self.currEXE = StringVar()
        self.currEXE.set("No Program Selected")
        self.productivityList = productivityList
        #self.readList(productivityList)
        self.category = StringVar(master)

        self.category.set("Neutral")
        self.categories = ["Very Unproductive", "Unproductive", "Neutral", "Productive", "Very Productive"]

        self.programDisplayText = StringVar(master)
        self.updateDisplayedPrograms(None)
        self.create_widgets()

    def readList(self, file):

        with open(file) as f:
            lines = f.readlines()

        for line in lines:
            self.productivityList.append(line.split(","))

    def create_widgets(self):

        self.title = Label(self, font="Roboto 16 bold", text="Initialization", bg=white)
        self.title.pack(pady=pady)

        self.label = Label(self, font=myFont, textvariable=self.currEXE, bg=white,pady=pady)
        self.label.pack(side="top",pady=pady)

        self.selectProgram = Button(self, text="Select Program", command=self.openFile)
        self.selectProgram.configure(style)
        self.selectProgram.pack(side="top",pady=pady)

        self.selectCategory = OptionMenu(self, self.category, *self.categories, command=self.updateDisplayedPrograms)
        self.selectCategory.configure(style)
        self.selectCategory.pack(side="top",pady=pady)

        self.addProgram = Button(self, text="Add Program", command=self.addProgram,bg=white)
        self.addProgram.configure(style)
        self.addProgram.pack(side="top",pady=pady)

        self.startMonitoring = Button(self,text="Start",
                                      command=self.startCommand,bg=white)
        self.startMonitoring.configure(style)
        self.startMonitoring.pack(side="top",pady=pady)



        self.programDisplay = Label(self, textvariable=self.programDisplayText,bg=white, borderwidth=1)
        self.programDisplay.configure(font=myFont, relief="groove", pady=20)

        self.programDisplay.pack(pady=pady)

    def updateDisplayedPrograms(self, event):
        self.programDisplayText.set(self.category.get() + " Programs\n" + "\n".join(self.productivityList[self.categories.index(self.category.get())]))

    def addProgram(self):
        if self.currEXE.get() != "No Program Selected":
            self.productivityList[self.categories.index(self.category.get())].append(self.currEXE.get())
            print(self.productivityList)
            self.currEXE.set("No Program Selected")
            self.updateDisplayedPrograms(None)

    def openFile(self):
        exe = askopenfilename().split("/")

        if exe[0] != '':
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

