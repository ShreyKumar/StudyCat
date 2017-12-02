import requests
import datetime
# from UserModel import UserModel

base_url = 'http://localhost:3000'


class Client:
    # model : UserModel
    def __init__(self, usermodel):
        self._model = usermodel

    def auth(self):
        return self._model.auth()

    def postDataToServer(self):

        if (self._model.auth() is None):
            print("YOU MUST GET AN AUTH KEY BEFORE USING postDataToServer")
            return


        r = requests.post(base_url + '/input_data', headers={'user': self._model.user(), 'authkey': self._model.auth()},
                                                    data={'process_data': self._model.active(),
                                                          'affection' : self._model.affection()})


        print(r.status_code)
        print(r.text)

    def getDataFromServer(self, cb=None):

        if (self._model.auth() is None):
            print("YOU MUST GET AN AUTH KEY BEFORE USING getDataFromServer")
            return

        r = requests.get(base_url + '/get_data', headers={'user': self._model.user(), 'authKey': self._model.auth()})

        if(cb is not None):
            cb(r)
        print(r.status_code)
        print(r.text)

    # Recieve a code to use as authentication
    def login(self, cb):

        if (self._model.auth() is not None):
            print("YOU CANT LOGIN TWICE STUPID")
            return

        r = requests.post(base_url + '/login', headers={'user': self._model.user(), 'password': self._model.password()})

        #Callback initiated.
        cb(r)

        if(r.status_code == 200):
            self._model.setAuth(r.text)
            return
        else:
            print("LOGIN FAILED: ", r.status_code)
            print(r.text)

# TODO: test this
def register(user, password, cb):

    r = requests.post(base_url + '/sign_up', headers={'user': user, 'password': password})

    cb(r)

    print(r.status_code)
    print(r.text)

