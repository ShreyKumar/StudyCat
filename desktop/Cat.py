from PIL import Image


class Cat:
    def __init__(self):
        self.state = 50
        self.catStates = ["blep.png"]

    def getState(self):
        return self.state

    def setState(self, newState):
        self.state = newState

    def getImage(self):
        path = self.catStates[0]
        image = Image.open(path)
        return image
