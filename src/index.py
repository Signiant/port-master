import boto3
import botocore

simpledb = boto3.client('sdb')
domain = 'ecs-service-ports'
rangeMin = 5001
rangeMax = 5999

def handler(event, context):
    if 'service' not in event or 'code' not in event:
        print("Error, invalid parameters provided in request")
        raise Exception("ParameterError - Invalid parameters provided in POST request")

    service = event['service']
    code  = event['code']

    try:
        portResponse = simpledb.select(
            SelectExpression= "select port from `%s` where port >= '%d' and port <= '%d' order by port desc limit 1" % (domain, rangeMin, rangeMax)
        );
    except botocore.exceptions.ClientError as e:
        print "Error performing select on domain %s" % domain
        print e
        raise Exception("SimpleDbError - %s" % e);

    if 'Items' in portResponse:
        nextPort = max(int(port['Value']) for port in portResponse['Items'][0]['Attributes']) + 1
        if nextPort > rangeMax:
            raise Exception("PortRangeError - Unable to allocate port - Next available port (%d) exceeds defined range (%d - %d)" % (nextPort, rangeMin, rangeMax))
    else:
        print("No existing port allocations found, starting at 5001")
        nextPort = rangeMin

    print "Assigning port %d to service %s with code %s" % (nextPort, service, code)

    try:
        putResponse = simpledb.put_attributes(
            DomainName=domain,
            ItemName=service,
            Attributes=[
                {
                    'Name': 'port',
                    'Value': "%d" % nextPort
                },
                {
                    'Name': 'code',
                    'Value': code
                },
            ],
        )
    except botocore.exceptions.ClientError as e:
        print "Error performing put-attributes on domain %s" % domain
        print e
        raise Exception("SimpleDbError - %s" % e)

    return {'port': nextPort}
