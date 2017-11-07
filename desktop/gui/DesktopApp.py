from Tkinter import *           # Importing the Tkinter (tool box) library

from PIL import ImageTk, Image

from Cat import Cat


class DesktopApp():
    def __init__(self):
        self.root = Tk()
        self.cat = Cat()

        self.root.overrideredirect(1)

        img = ImageTk.PhotoImage(self.cat.getImage().resize((250, 250), Image.ANTIALIAS))
        self.panel = Label(self.root, image=img)
        self.panel.pack(side="bottom", fill="both", expand="yes")

        self.label = Label(self.root, text="Happiness: " + str(self.cat.getState()), fg=self.cat.getText())
        self.label.pack(side="bottom", fill="both", expand="yes")

        self.update()
        self.updateLoop(-1)
        self.root.mainloop()

    def update(self):
        img = ImageTk.PhotoImage(self.cat.getImage().resize((250, 250), Image.ANTIALIAS))
        text = "Happiness: " + str(self.cat.getState())

        self.panel.configure(image = img)
        self.panel.image = img

        self.label.configure(text = text, fg = self.cat.getText())
        self.label.text = text

    # temp function for updating the cat's state
    def updateCat(self, change):
        state = self.cat.getState()
        state += change
        if state == 0:
            state = 0
        if state > 99:
            state = 99
        self.cat.setState(state)

    def updateLoop(self, change):
        if self.cat.getState() == 0:
            change = 1
        if self.cat.getState() == 99:
            change = -1

        self.updateCat(change)

        self.root.after(100, self.updateLoop, change)

if __name__ == '__main__':
    app = DesktopApp()
