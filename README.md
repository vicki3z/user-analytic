# Web Analytic
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## What does this do?
This application allow user to upload a log file and analyse the data which would produce these results:
- The number of unique IP addresses
- The top 3 most visited URLs
- The top 3 most active IP addresses

## Features:

### Main features:

[] As a user, I am able to upload a single web server log so that it could analyse the data in the log file
  - [] Able to upload both .log and .txt format
  - [] Throw error when it's an incorrect format

[] As a user, I would like to know the information of unique IP addresses listed in the log file so that I know how many IP addresses are unique
  - [] Read each line and validate if the information are in the correct structure of a log file
  - [] Throw an error if any of the line are not in the correct structure along with the line number 
  - [] Count and listed the IP addresses that are unique
  - [] Validate the IP address is not an admin before incrementing

[] As a user, I would like to know the information of the top 3 most active IP addresses
  - [] Read each line and retrieve the information of the IP addresses
  - [] Count and listed 3 the IP addresses that has the most count
  - [] The functionality from the above story should be reused to validate the IP address

[] As a user, I would like to know the information of the top 3 most visited URLs
  - [] Read each line and retrieve the information of the URLs
  - [] Strip out the domain name if exists
  - [] Validate the visited URL is returning success 200 before incrementing (Assuming that we're only counting the successfully visited page)

### Additional useful features:
- As a user, I should be able to see the date range contains in the log file so that I understand more about the information
- As a user, I should be able to see the unsuccessfully visited URLs so that I could inform my dev team to monitor or check further logs of that particular pages