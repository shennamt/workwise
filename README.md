<img src="https://i.ibb.co/6XmKDdb/Work-Wise-Logo.png" alt="Logo" height="100" >

## WorkWise, a no frills job tracking app

![Animated GIF](https://media2.giphy.com/media/ObV5mVIsPfxzi4Uxv0/giphy.gif)

**Workwise** is a job application tracking app designed to help users keep track of their job search progress. By keeping track of their job search progress, users can stay organized and motivated in their job search, ensuring that they don't miss out on any potential job opportunities. Workwise is the simplest solution for anyone looking to streamline their job search and maximize their chances of landing their dream job.

### Built With

| Client            | Server            | Development  |
| ----------------- | ----------------- | ------------ |
| axios             | express           | nodemon      |
| react-hooks       | mongodb           | concurrently |
| react-router-dom  | nodejs            |              |
| normalize.css     | jsonwebtoken      |              |
| styled-components | validator         |              |
|                   | http-status-codes |              |
|                   | morgan            |              |

## Getting Started

1. Clone the repo

    ```sh
    git clone git@github.com:shennamt/workwise.git
    ```

2. Navigate to the project folder

    ```sh
    cd workwise
    ```

3. Install App dependencies

    ```bash
    npm i
    ```

4. Environmental Variables Set up

    - Environmental variables that needs to be set in the `.env` file in the server directory.

    ```
      PORT=5001
      MONGO_URL=<Your mongodb url>
      JWT_LIFETIME=1d
      JWT_SECRET=<any secret value of your choice>
    ```

5. Run development server

    ```sh
    npm start
    ```

---

### Ports and EndPoints

#### Ports

-   FrontEnd Development Server runs on port `3000`
-   BackEnd Development Server runs on port `5001`

#### API endpoints

-   **Prefix in server.js**

    -   app.use('/api/v1/auth', authRouter)
    -   app.use('/api/v1/jobs', authenticateUser, jobsRouter)
    -   app.use('/api/v1/admin', authenticateUser, adminRouter)

-   **Auth**

    -   router.route('/register').post(register)
    -   router.route('/login').post(login)
    -   router.route('/updateUser').patch(authenticateUser, updateUser)

-   **Admin**

    -   router.route('/').get(getAllUsers)
    -   router.route('/:id').delete(deleteUser)

-   **Jobs**
    -   router.route('/new').post(createJob)
    -   router.route('/').get(getAllJobs)
    -   router.route('/stats').get(showStats)
    -   router.route('/del/:id').delete(deleteJob)
    -   router.route('/patch/:id').patch(updateJob)
