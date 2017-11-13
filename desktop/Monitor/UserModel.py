import datetime


class UserModel():
    # User : username
    # Password : self explainatory
    # auth : Authentication code to be recieved from the server, can't make calls to server without a valid one
    # active : The most active process in the current time quantum
    # record : Total record of productivity, each index represents a level of productivity.
    def __init__(self, user, password):
        self._user = user
        self._password = password
        self._auth = None
        self._active = None
        self._record = [-1] * 5

    def setActive(self, proc):
        self._active = proc

    def updateRecord(self, index, timestamp):
        if self._record[index] == -1:
            self._record[index] = datetime.datetime.now - timestamp
        else:
            self._record[index] += datetime.datetime.now - timestamp

    def setAuth(self, auth):
        self._auth = auth

    def active(self):
        return self._active

    def user(self):
        return self._user

    def password(self):
        return self._password

    def auth(self):
        return self._auth