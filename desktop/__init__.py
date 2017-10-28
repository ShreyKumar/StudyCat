from Tkinter import *           # Importing the Tkinter (tool box) library
from PIL import ImageTk, Image
root = Tk()                     # Create a background window
                                # Create a list
li = 'Carl Patrick Lindsay Helmut Chris Gwen'.split()
listb = Listbox(root)           # Create a listbox widget
for item in li:                 # Insert each item within li into the listbox
    listb.insert(0,item)

path = "blep.png"

#Creates a Tkinter-compatible photo image, which can be used everywhere Tkinter expects an image object.
img = ImageTk.PhotoImage(Image.open(path).resize((250, 250), Image.ANTIALIAS))

#The Label widget is a standard Tkinter widget used to display a text or image on the screen.
panel = Label(root, image = img)

#The Pack geometry manager packs widgets in rows or columns.
panel.pack(side = "bottom", fill = "both", expand = "yes")

listb.pack()                    # Pack listbox widget
root.mainloop()                 # Execute the main event handler