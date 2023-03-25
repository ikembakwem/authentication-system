## Backend Authentication System

This project is a backend authentication system that uses GraphQL, Apollo and PostgreSQL as the database.

Features include new user creation and existing user authentication.

### Requirements for running this project locally

Here are a list of requirements for running this project locally on your computer.

- A PostgreSQL database running locally or hosted in the cloud
- NodeJS runtime 16+ version installed on your system

### Follow this instruction to get this project running

Once you have met the above requirements take the following steps.

1. Clone this repository
2. Create a .env file at the root of the project
3. Inside the .env file, assign your database secret information to these environment variables DB_PORT, DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_DIALECT. (If your PostgreSQL database is hosted in the cloud, extract these details and assign them individually)
4. Open your terminal in the project root and run the command `npm install` to install all the dependencies
5. Run `npm run dev` to start the server 🚀

Congratulations 🎉 you just launched this project
