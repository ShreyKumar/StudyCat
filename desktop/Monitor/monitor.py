from win32gui import GetForegroundWindow
from win32process import GetWindowThreadProcessId
from psutil import Process, NoSuchProcess
import datetime


class Monitor:
    def __init__(self, listFile):
        self.categories = ["Very Unproductive", "Unproductive", "Neutral",
                           "Productive", "Very Productive"]
        self.record = [None] * 5
        self.active = None
        self.threadID = None
        self.procName = None
        self.prevStamp = None
        self.processLists = []
        self.readList(listFile)
        self.modifier = [-5, -2, 1, 2, 5]
        self.affection = 50

    def getAffection(self):
        print(self.record)
        for i in range(0, len(self.record)):
            self.affection += (self.record[i].seconds)/10 * self.modifier[i] if self.record[i] != None else 0
        self.affection = 0 if self.affection < 0 else self.affection
        self.affection = 100 if self.affection > 100 else self.affection
        self.record = [None] * 5
        return self.affection

    def pollLatestProcess(self):

        for processes in self.processLists:
                if self.procName.name() in processes:
                    if self.record[self.processLists.index(processes)] == None:
                        self.record[self.processLists.index(processes)] = \
                            datetime.datetime.now() - self.prevStamp
                    else:
                        self.record[self.processLists.index(processes)] += \
                            datetime.datetime.now() - self.prevStamp
        self.initVars()
        return self.procName

    def initVars(self):
        self.active = GetForegroundWindow()
        self.threadID, processID = GetWindowThreadProcessId(self.active)
        self.procName = Process(processID)
        self.prevStamp = datetime.datetime.now()

    def readList(self, file):
        with open(file) as f:
            lines = f.readlines()

        for line in lines:
            self.processLists.append(line.strip("\n").split(","))
