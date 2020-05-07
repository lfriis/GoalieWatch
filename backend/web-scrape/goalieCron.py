import urllib.parse
import requests
import datetime
import os
from pymongo import MongoClient
from dotenv import load_dotenv
from pathlib import Path

# Pulling in environment variable for database connection
load_dotenv()
env_path = Path('.') / '.env'
load_dotenv(dotenv_path=env_path)
URI = os.getenv('ATLAS_URI')

# Connecting to mongoDB
client     = MongoClient(URI)
db         = client.get_database('GoalieWatch')
collection = db.goalies

# Pulling data from NHL teams
team_api  = 'https://statsapi.web.nhl.com/api/v1/teams/'
team_url  = team_api + urllib.parse.urlencode({})
team_data = requests.get(team_url).json()
insert_count  = 0
updated_count = 0

# Looping through all the teams
for i in range(len(team_data['teams'])):
    team_id   = team_data['teams'][i]['id']
    team_name = team_data['teams'][i]['name']
    #print(team_name)

    # Pulling data from teams roster
    position_api  = 'https://statsapi.web.nhl.com/api/v1/teams/'+ str(team_id) +'/roster'
    position_url  = position_api + urllib.parse.urlencode({})
    position_data = requests.get(position_url).json()

    # Looping through all the players in each team, retrieving data
    for j in range(len(position_data['roster'])):
        position      = position_data['roster'][j]['position']['name']
        player_name   = position_data['roster'][j]['person']['fullName']
        player_id     = position_data['roster'][j]['person']['id']
        player_link   = position_data['roster'][j]['person']['link']
        jersey_number = position_data['roster'][j]['jerseyNumber']

        # Building json object to store into database
        if position == 'Goalie':            
            goalie = {
                "team_id":       team_data['teams'][i]['id'],
                "team_name":     team_data['teams'][i]['name'],
                "goalie_name":   position_data['roster'][j]['person']['fullName'],
                "goalie_id":     position_data['roster'][j]['person']['id'],
                "jersey_number": position_data['roster'][j]['jerseyNumber'],
                "player_link":   position_data['roster'][j]['person']['link'],
                "date_updated":  datetime.datetime.utcnow()
            }

            # Comparing each record to existing documents in Mongo
            pulled_record = collection.find_one({"goalie_id": player_id})
           
            # If goalie doesn't exist, insert new document
            if pulled_record == None:
                collection.insert_one(goalie)
                insert_count += 1

            # If goalie exists in database, replace with new data
            elif pulled_record['goalie_id'] == player_id:
                collection.find_one_and_replace(pulled_record, goalie)
                updated_count += 1

# Outputting counts from updates
print('New goalies inserted: ' + str(insert_count))
print('Goalies records updated: ' + str(updated_count))