import boto3
import botocore

dynamodb = boto3.client('dynamodb')

table = 'ECS_SERVICE_PORTS'
rangeMin = 5001
rangeMax = 5999

def handler(event, context):
    if 'service' not in event or 'code' not in event:
        print("Error, invalid parameters provided in request")
        raise Exception("ParameterError - Invalid parameters provided in POST request")

    service = event['service']
    code  = event['code']

    try:
        portResponse = dynamodb.scan(
            TableName=table,
            FilterExpression='port BETWEEN :min and :max',
            ProjectionExpression='port',
            ExpressionAttributeValues={
                ':min': {
                    'N': '%d' % rangeMin
                },
                ':max': {
                    'N': '%d' % rangeMax
                } 
            }
        )
    except botocore.exceptions.ClientError as e :
        print "Error performing scan on dynamodb table %s" % table
        print e
        raise Exception("DynamoDbError - %s" % e)
    
    if portResponse['Count'] != 0:
        nextPort =  max(int(port['port']['N'])for port in portResponse['Items']) + 1
        if(nextPort > rangeMax):
            raise Exception("PortRangeError - Unable to allocate port - Next available port (%d) exceeds defined range (%d - %d)" % (nextPort, rangeMin, rangeMax))
    else:
        print "No existing port allocations found in range, starting from %s" % rangeMin
        nextPort = rangeMin
        
    print "Assigning port %d to service %s with code %s" % (nextPort, service, code)
    
    try:
        dynamodb.update_item(
            TableName=table,
            Key={
                'port': {
                    'N': '%d' % nextPort
                }
            },
            UpdateExpression='SET service = :serviceName, code = :serviceCode',
            ExpressionAttributeValues={
                ':serviceName': {
                    'S': service
                },
                ':serviceCode': {
                    'S': code
                }
            } 
        )
    except botocore.exceptions.ClientError as e:
        print "Error adding service to dynamodb table %s" % table
        print e
        raise Exception("DynamoDbError - %s" % e)
    
    return {'port': nextPort}