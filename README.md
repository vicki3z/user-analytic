# Web Analytic
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## What does this do?
This application allow user to upload a log file and analyse the data which would produce these results:
- The number of unique IP addresses
- The top 3 most visited URLs
- The top 3 most active IP addresses

## Assumptions:
- The purpose of the task is to analyse the website traffic based on the log file
- User is allowed to upload only a single file
- System only allowed the these 2 formats of log file; *.log and *.txt
- System will treat the visited URLs contain in log file as the same route regardless of whether url contain domain name
- IP addresses that are from the admin role should be filtered out as they're internal users and not consumer users


## Features:

### Main features:

[x] As a user, I am able to upload a single web server log so that it could analyse the data in the log file
  - [x] Able to upload both .log and .txt format
  - [x] Validate and process log entries for a given file
  - [x] Show errror message when there's no valid log entry 

[x] As a user, I would like to know the information of unique IP addresses listed in the log file so that I know how many IP addresses are unique
  - [x] Read each line and validate if the information are in the correct structure of a log file - completed by the above user story
  - [x] Throw an error if any of the line are not in the correct structure along with the line number - completed by the above user story
  - [x] Count and listed the IP addresses that are unique
  - [x] Validate the IP address is not an admin before incrementing
  - [x] List unique IP addresses along with it's total request, the unique paths visited, and the last seen

[x] As a user, I would like to know the information of the top 3 most visited URLs
  - [x] Read each line and retrieve the information of the URLs
  - [x] Strip out the domain name if exists
  - [x] Validate the visited URL is returning success 200 before incrementing (Assuming that we're only counting the successfully visited page)

[x] As a user, I would like to know the information of the top 3 most active IP addresses
  - [x] A button within the IP analytic table to filter to top 3
  - [x] Ability to reset back to the original state

### Additional useful features:
- As a user, I should be able to see the date range contains in the log file so that I understand more about the information
- As a user, I should be able to see the unsuccessfully visited URLs so that I could inform my dev team to monitor or check further logs of that particular pages
- As a user, I should be able to visualise data with pie chart?
- As a user, I should be able to visualise the traffic data in graph so that I can understand which date has the highest traffic and from which path?
- Limit file size?
- Limit table row?
- How to categorise the status code?

### Other consideration
- Deployment
- CI/CD pipeline
- Infrastructure

========================

## Enhancement / After Thoughts?
User uploading the log file might not make sense in terms of overall user experience.
In a real world, the log file would be collected periodically by other systems (host, web server, cloud services, etc.). These log files should be stored somewhere (Eg. AWS S3 or something similar). 

Instead of user uploading, the application should have accessed to those files and able to download them via API. The parsing might make more sense to be done on the backend? Depends on whether we would need to save the processed data anywhere else like DB or whether how big are the log entries we are processing.

