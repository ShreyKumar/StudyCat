import requests
import datetime
base_url = 'http://localhost:3000/'

class User():

	_record = []
	active = None

	def __init__(self, user_id):
		record = [-1] * 5
		self.user_id = user_id

	def getActive(self):
		return active
	
	def updateRecord(self, index, timestamp):
		if record[index] == -1:
			record[index] = datetime.datetime.now - timestamp
		else:
			record[index] += datetime.datetime.now - timestamp

	def getRecord(self):
		return _record

	def postDataToServer(self):
		r = requests.post(base_url + '/input_data', data={ 'user': self.user_id })
		print(r.status_code)	

	def getDataFromServer(self):
		pass

