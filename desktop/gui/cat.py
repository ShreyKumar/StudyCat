from tkinter import *
from PIL import ImageTk, Image
from itertools import count


myFont = "Roboto 10"
buttonStyle = {"font":myFont,"relief":"flat", "bg":"#ff6262", "fg":"#ffffff"}
textStyle = {"font":myFont,"relief" : "groove", "bg":"white", "fg": "black"}

class Cat:
    def __init__(self):
        self.state = 50
        self.catStates = ["cat_0.gif", "cat_1.gif", "cat_2.gif", "cat_3.gif", "cat_4.gif"]
        #self.catStates = [ImageTk.PhotoImage(Image.open(x).resize((250, 250), Image.ANTIALIAS)) for x in self.catStates]
        self.catText = ["navy", "deep sky blue", "rosy brown", "plum1", "green2"]

    def getState(self):
        return self.state

    def setState(self, newState):
        self.state = newState

    def getText(self):
        index = int(self.state / (100 / len(self.catStates)))
        return self.catText[index]

    def getImage(self):
        index = int(self.state / (100 / len(self.catStates)))
        return index


class CatDisplay(Frame):
    def __init__(self, master, cat, pauseCommand):
        Frame.__init__(self, master)
        self.root = master
        self.cat = cat

        self.configure(bg="white")

        self.label = Label(self, text="Happiness: " + str(self.cat.getState()), fg=self.cat.getText())
        self.label.configure(textStyle)
        self.label.pack(side="top", fill="both", expand="yes")

        self.catFrames = []
        for state in cat.catStates:
            self.catFrames.append(AnimatedLabel(self, state))

        img = self.cat.getImage()
        self.panel = self.catFrames[img]
        self.panel.pack(side="top", fill="both", expand="yes")
        #self.panel = Label(self, image=img)
        #self.panel.pack(side="top", fill="both", expand="yes")

        self.stop = Button(self, text="Stop", command=pauseCommand)
        self.stop.configure(buttonStyle)
        self.stop.pack(side="bottom")

        self.update()

    def update(self):
        img = self.cat.getImage()
        text = "Happiness: " + str(int(self.cat.getState()))

        self.panel.pack_forget()

        self.panel = self.catFrames[img]
        self.panel.pack(side="top", fill="both", expand="yes")

        #self.panel.configure(image=img)
        #self.panel.image = img

        self.label.configure(text=text, fg=self.cat.getText())
        self.label.text = text

        self.root.after(1000, self.update)


class AnimatedLabel(Label):

    def __init__(self, master, image):
        Label.__init__(self, master)
        image = Image.open(image)
        self.index = 0
        self.frames = []
        try:
            for i in count(1):
                self.frames.append(ImageTk.PhotoImage(image.copy()))
                image.seek(i)
        except EOFError:
            pass

        try:
            self.delay = image.info['duration']
        except:
            self.delay = 100

        self.play()

    def play(self):
        self.index = (self.index + 1 )%len(self.frames)
        self.config(image=self.frames[self.index])
        self.after(self.delay, self.play)



