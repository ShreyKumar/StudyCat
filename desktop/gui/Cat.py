from PIL import Image


class Cat:
    def __init__(self):
        self.state = 50
        self.catStates = ["cat_0.jpeg", "blep.png", "cat_2.jpeg", "cat_3.jpg", "cat_4.jpg"]
        self.catText = ["navy", "deep sky blue", "rosy brown", "plum1", "green2"]

    def getState(self):
        return self.state

    def setState(self, newState):
        self.state = newState

    def getText(self):
        index = self.state / (100 / len(self.catStates))
        return self.catText[index]

    def getImage(self):
        index = self.state/(100 / len(self.catStates))
        print self.state
        print index
        path = self.catStates[index]
        image = Image.open(path)
        return image
