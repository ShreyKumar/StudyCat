import requests
import datetime
# from UserModel import UserModel

base_url = 'http://localhost:3000'


class Client:
    # model : UserModel
    # data : TODO determine what data to send to server.. (probably a combination of Cat and Process)
    def __init__(self, usermodel):
        self._model = usermodel

    def auth(self):
        return self._model.auth()

    def postDataToServer(self):

        if (self._model.auth() is None):
            print("YOU MUST GET AN AUTH KEY BEFORE USING postDataToServer")
            return


        r = requests.post(base_url + '/input_data', headers={'user': self._model.user(), 'authkey': self._model.auth()},
                                                    data={'process_data': self._model.active()})


        print(r.status_code)
        print(r.text)

    # TODO: find out what we should expect from the server
    def getDataFromServer(self, cb):

        if (self._model.auth() is None):
            print("YOU MUST GET AN AUTH KEY BEFORE USING getDataFromServer")
            return

        r = requests.get(base_url + '/get_data', headers={'user': self._model.user(), 'auth': self._model.auth()})

        cb()
        print(r.status_code)
        print(r)

    # Recieve a code to use as authentication
    def login(self):

        if (self._model.auth() is not None):
            print("YOU CANT LOGIN TWICE STUPID")
            return

        r = requests.post(base_url + '/login', headers={'user': self._model.user(), 'password': self._model.password()})
        print(r.status_code)
        print(r.text)
        self._model.setAuth(r.text)

# TODO: test this
def register(user, password):

    r = requests.post(base_url + '/sign_up', headers={'user': user, 'password': password})

    print(r.status_code)
    print(r.text)


# if __name__ == '__main__':
#     user = UserModel("lamr@dodabiz.com", "kaiismynigga2017")
#     #register("lamr@dodabiz.com", "kaiismynigga2017")
#     client = Client(user)
#     client.login()
