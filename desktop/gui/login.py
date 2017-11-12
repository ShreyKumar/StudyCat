from tkinter import *


class LoginScreen(Frame):
    def __init__(self, master, startCommand):
        Frame.__init__(self, master, bg="#FFB6C1")
        self.startCommand = startCommand

        self.userText = Label(self, text="Username", font=("Helvetica", 16),bg="#FFB6C1")
        self.userText.pack()

        self.username = Entry(self)
        self.username.pack()

        self.passText = Label(self, text="Password", font=("Helvetica", 16),bg="#FFB6C1")
        self.passText.pack()

        self.password = Entry(self)
        self.password.pack()

        self.loginButton = Button(self, text="Login", width=10, command=self.login)
        self.loginButton.pack()

    def login(self):
        self.startCommand(self.username.get(), self.password.get())