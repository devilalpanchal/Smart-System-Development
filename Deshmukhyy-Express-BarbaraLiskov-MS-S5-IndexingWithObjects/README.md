# DT L&D Backend Base

The **DT L&D Backend Base** is the base foundation designed to support the Learning and Development (L&D) process within the organization. This project serves as the backbone, providing essential functionalities and a structured architecture that facilitates seamless extension and completion of tasks throughout the L&D journey.

## Prerequisites

Make sure you have the following installed on your system:

- Node.js: [Download and install Node.js](https://nodejs.org/)
- NPM (Node Package Manager): NPM comes bundled with Node.js.

## Steps to Set Up Project Configuration

1. **Clone the Repository:**
   ```
   git clone https://github.com/deepthoughtEdu/backend-base.git
   cd backend-base
   ```

2. **Create the Configuration File:**
   Go to the project's root directory and create a file named `config.json`.

   ```javascript
   {
       "port": 3000,
       "env": "<Development_Environment>", // Can be either "development" or "production"
       "mongoUri": "<Your_MongoDB_Connection_String>",
       "database": "backend-base",
       "cookieSecret": "<Cookie_Secret_String>"
   }
   ```

   - **`port`:** Set the port number where your application will run. The default is `3000`.
   - **`env`:** Specify the environment for your application (`development`, `production`, etc.).
   - **`mongoUri`:** Provide the MongoDB connection string for your database.
   - **`database`:** Set the name of your MongoDB database.
   - **`cookieSecret`:** Enter a secure secret key for handling cookies and sessions.

3. **Save the Configuration File:**
   Save the changes you made to the `config.json` file.

4. **Install Dependencies:**
   If there are new dependencies mentioned in the project's `package.json` file, install them using the following command:
   ```bash
   npm install # Installs all the dependencies in one go
   ```

5. **Start the Application:**
   Run the following command to start your backend application:
   ```bash
   npm start # Typically used while the app runs in production mode
   
   npm run dev # Run a development server along with nodemon
   ```

   Your application is now configured and ready to run with the specified properties.

## Additional Notes

- **Security Note:**
  Ensure that sensitive information, such as database connection strings and secret keys, is kept secure. Avoid storing such information directly in version control systems.

- **Troubleshooting:**
  If you encounter issues during the configuration process, refer to the project's documentation or seek help from the development team.

Feel free to reach out if you need further assistance or have any questions!