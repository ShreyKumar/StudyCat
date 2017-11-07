import requests
import datetime
base_url = 'http://localhost:3000/'

class User():

	# model : DesktopModel
	def __init__(self, model):
		self._model = model

	def postDataToServer(self):
		r = requests.post(base_url + '/input_data', data={ 'user': self._model.user(), 
			'process': self._model.active() })
		print(r.status_code)
		print(r.body)	

	def getDataFromServer(self):
		r = request.get(base_url + '/get_data', headers={ 'user': self.model.user() })
		print(r.status_code)
		print(r.body)

	def login(self):
		r = request.post(base_url + '/login', headers={ 'user': self.model.user() })
		print(r.status_code)
		print(r.body)
