#!/bin/bash

# test
curl -X GET -H "User-Agent: insomnia/8.6.1" http://localhost:3005/test

credentials='{
    "username": "jimmy",
    "password": "jimmy"
}'

#REGISTER
curl -s -X POST \
  -H "Content-Type: application/json" \
  -d "$credentials" \
  http://localhost:3005/users/register


# LOGIN 
response=$(curl -s -X POST \
  -H "Content-Type: application/json" \
  -d "$credentials" \
  http://localhost:3005/users/login)

echo "$response"

# Extract the token value using jq
ACCESS_TOKEN=$(echo "$response" | jq -r '.token')

# Use the token variable for further processing

#AUTH 
curl -s -X GET \
  -H "accessToken: $ACCESS_TOKEN" \
  http://localhost:3005/users/auth


request_data='{
	"name": "Ecommerce Website"
}'


response=$(curl -s -X POST \
  -H "Content-Type: application/json" \
  -H "accessToken: $ACCESS_TOKEN" \
  -d "$request_data" \
  http://localhost:3005/projects/new)

PROJECT_ID=$(echo "$response" | jq -r '.')

# GET PROJECTS 
curl -s -X GET \
-H "accessToken: $ACCESS_TOKEN" \
 http://localhost:3005/projects/


request_data='{
  "taskname": "ui design",
  "description": "designing the ui on figma",
  "hours": 4,
  "ProjectId": 1
}'

curl -X POST \
  -H "Content-Type: application/json" \
  -H "accessToken: $ACCESS_TOKEN" \
  -d "$request_data" \
  http://localhost:3005/tasks/new