	import wmi, time, datetime
from enum import Enum
c = wmi.WMI ()

#swithc code to get active window

class Category(Enum):
	UNPRODUCTIVE = 0
	NEUTRAL = 1
	PRODUCTIVE = 2
veryUnproductive["LeagueClient.exe"]#0
unproductive = ["Discord.exe"] #1
neutral = ["chrome"] #2
productive = ["notepad++.exe", "notepad.exe"] #3
veryProductive = ["pycharm.exe"]#4
lists = [unproductive, neutral, productive]
processes = {}
names = []
class Process:
	def __init__(self, pid, name,category):
		self.name = name
		self.pid = pid
		self.category = category
		self.started = datetime.datetime.now()


for process in c.Win32_Process():
	for list in lists:
		if process.Name in list:
			names.append(process.Name)
			processes[process.Name] = Process(process.ProcessId, process.Name, Category(lists.index(list)))


while 1:
	print("polling...")
	running = c.Win32_Process()
	procNames = names[:]
	print(procNames)
	for process in running:
		for list in lists:
			if processes.get(process.Name, None) is None and process.Name in list:
				names.append(process.Name)
				processes[process.Name] = Process(process.ProcessId, process.Name, Category(lists.index(list)))
			elif processes.get(process.Name, None) is not None and process.Name in procNames:
				print(process.Name)
				procNames.remove(process.Name)
	
	for name in procNames:
		process = processes.pop(name)
		names.remove(name)
		print(datetime.datetime.now() - process.started)
		
	time.sleep(2)