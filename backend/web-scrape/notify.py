from datetime import datetime 
from sendEmail import sendEmail

def notify(val, goalie, time):

    preciseTime = time[:-4].replace(" ", "") # Chopping of timezone and removing whitespace
    #Timezone should be irrelevant, it will be hosted in eastern and check the time in eastern


    currentYMD = datetime.now()
    # Interpret game time as today's date so we can perform arithmetic on it properly
    gameTime = datetime.strptime(str(currentYMD.year)+' '+str(currentYMD.month)+' '+str(currentYMD.day)+' '+preciseTime,
                                     '%Y %m %d %I:%M%p')
    
    timeToGameTime = gameTime - datetime.now()
    minutesToGameTime = divmod(timeToGameTime.total_seconds(), 60)[0] # This is it

    if minutesToGameTime >= 15:
        #email 'goalie' is 'val' to play
        x = goalie +" is " + val +" to play at: " + time
        sendEmail(x)

    #Run this program on bash ever quatre of minuite