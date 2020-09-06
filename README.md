# Birdie Developer Test
We would like to thank you for taking our developer test. We understand that often candidates will have many of these tests to complete. Therefore we think it's important to cut straight to the important stuff. With that in mind, we've gone ahead and created a boilerplate that mostly represents the kind of technical stack we work with. This saves you from having to create needless boilerplate code that does little to demonstrate your potential as a developer.

## Personal Notes from Applicant

Notes Regarding Application 


   * Assumptions:
      1. There were only 3 unqiue patient(care recipients) ids, at this time i didnt filter the sql queries by pateint id as it would not be secure for patient 	records, but a users login details should restrict whos data they could access at source to prevent someone finding a patients id and downloading there data. 

   * Notes: 

      1. I focused on queries that contained notes in the payload as i thought they contained the most infomation that a family member might want to view. So i set 	3 queries for urgent events, mood observations and general observations. Ideally id have a handler for each event type but i only managed time for 3 due to 	time taken to learn the techincal stack that i was not used to.
      2. All queries are sorted by care recipient Id and then by time of event.
      3. All get requests are handled using ajax
      4. All SQL results are formatted in the backend with the html ready content returned. 

   * Techinal issues:
      1. I have a techincal issue when running a production build where it wont leave the index.html page to move to my data selection page     
      2. During setup and testing i had trouble using mysql node module in the backend, so i installed using the command npm install mysql --save 
      	this also added it to the dependencies. 

## Set up

Here's the technical stack this boilerplate was made with:

### Front end
* [React](https://reactjs.org/)
* [Redux](https://redux.js.org/introduction/getting-started)
* [TypeScript](https://www.typescriptlang.org/)
* [Redux sagas](https://redux-saga.js.org/docs/introduction/BeginnerTutorial.html)
* [Styled components](https://www.styled-components.com/)

### Back end
* [Express](https://expressjs.com/)
* [MySQL](https://www.mysql.com/)
* [TypeScript](https://www.typescriptlang.org/)

## Usage

1. Start the API. (Run the following commands within the `backend` folder)

   a. Install the dependencies
   ```
   npm install
    (If needed)
   npm install mysql
   ```
   
   b. Run the HTTP server (will start on port `8000`)
   ```
   npm run dev
   ```
2. Start the React app  (Run the following commands within the `front-end` folder)

    a. Install the dependencies
   ```
   npm install
   ```
   
   b. Run the application (will start on port `3000`)
   ```
   npm start
   ```
