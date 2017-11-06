from win32gui import GetWindowText, GetForegroundWindow
from win32process import GetWindowThreadProcessId
from time import sleep
from psutil import Process
import wmi, time, datetime
sleeptime = 3

#veryUnproductive["LeagueClient.exe"]#0
#unproductive = ["Discord.exe"] #1
#neutral = ["chrome"] #2
#productive = ["notepad++.exe", "notepad.exe"] #3
#veryProductive = ["pycharm.exe"]#4
#lists = [veryUnproductive, unproductive, neutral, productive, veryProductive]


def startMonitoring(lists):
    record = [-1] * 5

    active = GetForegroundWindow()
    threadID, processID = GetWindowThreadProcessId(active)
    procname = Process(processID)
    prevStamp = datetime.datetime.now()
    f = open("processTime.txt", "w")
    while 1:
        print("checking...")
        print(active)
        print(GetForegroundWindow())
        print(procname.name())

        if active != GetForegroundWindow():
            for list in lists:
                if procname.name() in list:
                    if record[lists.index(list)] == -1:
                        record[lists.index(list)] = datetime.datetime.now() - prevStamp
                    else:
                        record[lists.index(list)] += datetime.datetime.now() - prevStamp

                    print(procname.name() + " "+ str(record[lists.index(list)])+ "\n")
            active = GetForegroundWindow()
            threadID, processID = GetWindowThreadProcessId(active)
            procname = Process(processID)
            prevStamp = datetime.datetime.now()
        sleep(2)
