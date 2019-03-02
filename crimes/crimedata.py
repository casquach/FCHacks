##
## This program demonstrates interacting with the Fannie MAE
## Exchange portal to retrieve manufactured housing data.
##
## The Exchange can run example queries against the API's and show you the invocation
## as a CURL command. You can use the link below to help you convert CURL parameters
## and formatting into Python.
##
## https://curl.trillworks.com/
##

## import the necessary support libraries
##
import requests
import json
import csv
from collections import Counter

## set up the request object - replace "YOUR_AUTH_KEY" with your actual
## authentication key from the Exchange. Please remember YOUR_AUTH_KEY changes
## every 60 minutes. You'll need to grab the new key from your profile or by
## re-executing one of the sample commands on "The Exchange" and copying
## YOUR_AUTH_KEY from the curl command
##
headers = {
    'accept': 'application/json',
    'Authorization':    'cfIdi7Z4uCnXM7Ccd4DHmN2tzf3P6SHiZaOuuo25',
}

offenses = ['aggravated-assault','burglary', 'larceny', 'motor-vehicle-theft', 'homicide', 'rape', 'robbery', 'arson', 'violent-crime', 'property-crime']
## submit a request to the exchange asking for all the
## manufactured housing acquisitions (loans)
##
offense = offenses[1]
state = 'VA'
response = requests.get('https://api.usa.gov/crime/fbi/sapi/api/data/nibrs/'+offense+'/offense/states/'+state+'/count?api_key=cfIdi7Z4uCnXM7Ccd4DHmN2tzf3P6SHiZaOuuo25', headers=headers)

# region = 'West'
# response = requests.get('https://api.usa.gov/crime/fbi/sapi/api/data/nibrs/'+offense+'/offense/regions/'+region+'/count?api_key=cfIdi7Z4uCnXM7Ccd4DHmN2tzf3P6SHiZaOuuo25', headers=headers)

## grab the response (formatted as json)
##
responseJSON = response.json()

print ('crime by offense and state results')
print (responseJSON)
data = open('crimes.csv', 'w')
csvwriter = csv.writer(data)
count = 0
for datum in responseJSON:
    for x in responseJSON[datum]:
        print(x)
        if count == 0:

             header = x.keys()
             print(header)
             csvwriter.writerow(header)

             count += 1
        csvwriter.writerow(x.values())
    break
data.close()
print ('--------------------------------------------------')
