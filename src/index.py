import json

def handler(event,context):
    with open('config.json') as data_file:
        data = json.load(data_file)

    message = "Hello!  I am running in the %s environment" % data["environment"]
    return {
        'message' : message
    }
