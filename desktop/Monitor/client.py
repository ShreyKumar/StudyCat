import requests
import datetime

base_url = 'http://localhost:3000/'


class Client:
    # model : UserModel
    # data : TODO determine what data to send to server.. (probably a combination of Cat and Process)
    def __init__(self, usermodel):
        self._model = usermodel

    # TODO: test this
    def register(self, user, password):

        if (self._model.auth() is not None):
            print("YOU CANT REGISTER WHEN LOGGED IN STUPID")
            return

        r = requests.post(base_url + '/sign_up', data={'user': user, 'pass': password})

        print(r.status_code)
        print(r.body)


    def postDataToServer(self):

        if (self._model.auth() is None):
            print("YOU MUST GET AN AUTH KEY BEFORE USING postDataToServer")
            return

        r = requests.post(base_url + '/input_data', data={'user': self._model.user(), 'auth': self._model.auth(),
                                                          'process': self._model.active()})

        print(r.status_code)
        print(r.body)

    # TODO: find out what we should expect from the server
    def getDataFromServer(self):

        if (self._model.auth() is None):
            print("YOU MUST GET AN AUTH KEY BEFORE USING getDataFromServer")
            return

        r = requests.get(base_url + '/get_data', headers={'user': self.model.user(), 'auth': self._model.auth()})

        print(r.status_code)
        print(r.body)

    # Recieve a code to use as authentication
    def login(self):

        if (self._model.auth() is not None):
            print("YOU CANT LOGIN TWICE STUPID")
            return

        r = requests.post(base_url + '/login', headers={'user': self.model.user(), 'pass': self.user.password()})
        print(r.status_code)
        print(r.body)
        self._model.setAuth(r.body.auth)
