from Tkinter import *           # Importing the Tkinter (tool box) library
from PIL import ImageTk, Image

from desktop.Cat import Cat


class DesktopApp():
    def __init__(self):
        self.root = Tk()
        self.cat = Cat()


    def update(self):
        img = ImageTk.PhotoImage(self.cat.getImage().resize((250, 250), Image.ANTIALIAS))

        panel = Label(self.root, image=img)

        panel.pack(side="bottom", fill="both", expand="yes")

        self.root.mainloop()


