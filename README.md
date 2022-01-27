# Interview Scheduler
Students can make appointments by choosing day, time and the interviewer.
## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

### Functional specifications
* Development focuses on a single page application (SPA) called Interview Scheduler, built using React.
* Data is persisted by the API server using a PostgreSQL database.
* The client application communicates with an API server over HTTP, using the JSON format.
* Jest tests are used through the development of the project.
* Cypress tests are used for the end-to-end test.

### Technical specifications
* React
* Webpack, Babel
* Axios, WebSockets
* Axios
* Storybook, Webpack Dev Server, Jest, Testing Library, Cypress
* The Scheduler client application created using Create React App. Express is the basis for the Scheduler API server application.
Both servers run concurrently. Requests are proxied from the Webpack development server to the API server.

## Final Product

### screenshot of the add an appointment
!["add"](https://github.com/Erica-jihyeon/scheduler/blob/master/docs/add.png)

### screenshot of the edit, delete buttons and remaining spot changing
!["edit_delete_spot"](https://github.com/Erica-jihyeon/scheduler/blob/master/docs/edit_delete_spot.png)

### screenshot of delete confirmation
!["delete"](https://github.com/Erica-jihyeon/scheduler/blob/master/docs/delete_confirm.png)

### screenshot of error handling
!["error"](https://github.com/Erica-jihyeon/scheduler/blob/master/docs/error.png)

### screenshot of loading image for deleting and saving
!["loading"](https://github.com/Erica-jihyeon/scheduler/blob/master/docs/loading.png)