class Goalie:
   def __init__(self, name, time, status):
      self.name = name
      self.time = time
      self.status = status
   
   def getGoalieName(self):
        return self.name

   def getGoalieTime(self):
        return self.time

   def getGoalieStatus(self):
        return self.status