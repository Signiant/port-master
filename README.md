# :anchor: Port Master :anchor:
Port master is a lambda function for maintaining ECS service port mappings

## About
The port master service stores ECS service information in a dynamo db table  
It is designed to be called through API gateway  
The lambda function queries the table for the next available port, adding a new entry for the returned value

## Use
The handler function requires that the event object contains two properties, service and code  
The service property indicates the name of the service  
The code property indicates a short, all capitals identifier used to reference the service in CFN templates  
If successful, the service returns the port assigned to the service  
Example event object :  
``` 
{
  "service": "sample-ecs-service",
  "code": "SMPLESRV"
}
```

## Setup
### Function Setup
The function reads three properties from config.json   

* tableName - name of the dynamo db table to read from / write to
* rangeMin - start of port range
* rangeMax - end of port range  

Edit this file with your table name and desired port range

The dynamodb statement in the function's IAM policy (deploy/policy.lam.json) must be changed to point to correct table resource

This function is set up to be promoted and deployed using the [lambda promotion tool](https://github.com/Signiant/lambda-promotion)

### API Setup
Create a new API, or navigate to an existing API, and create a POST method  

Set the integration type to lambda function, and point it to port-master:PROD 

Open the new POST method and select __method response__  

Create new responses for HTTP status codes 400, 500, and 506, adding a response model to each with the content type application/json and the model Error

Now return to the POST method and select __Integration Response__  

Add three integration responses with the following configurations:   
* Lambda Error Regex: _ParameterError.*_  
Method Response Status: _400_
* Lambda Error Regex: _DynamoDbError.*_  
Method Response Status _500_
* Lambda Error Regex: _PortRangeError.*_  
Method Response Status _506_

You can now return to the POST method and deploy your API  

If you wish to add authorization, you may require an API key through the Authorization Settings of the POST method under Method Request