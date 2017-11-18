from tkinter import *

class prettyButton(Button):
    def __init__(self, master, text, font, command):
        Button.__init__(self,
                        master,
                        borderwidth=0,
                        text=text,
                        width=25,
                        font=font,
                        command=command,
                        bg="#FF6262",
                        foreground="#FFFFFF")