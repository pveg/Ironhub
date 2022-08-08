# <p align="center" dir="auto"><img src="public/images/ironhub_nobg.png" width="100px"></p>

<br>



## Description 

A plataform that allows ironhackers to add and share their projects



<br>

## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **search** - As a user logs in it will display fields to search for projects/profiles on the app.
- **sign up** - As a user I want to sign up on the web page.
- **login** - As a user I want to be able to log in on the web page so that I can get back to my account
- **logout** - As a user I want to be able to log out from the web page so that I can make sure no one will access my account
- **favorite list** - As a user I want to see the list of my favorite and delete them.
- **edit user** - As a user I want to be able to edit my profile.
- **search result** - As a user I want to see the list of profiles filter by my preferences (course || name || campus).
- **profile** - As a user I want to be able to display my projects, my basic info, and my favorite list. Also, I want to be able to edit my basic info.
- **project page** - displays basic information about the project: user picture, name, project image, project description, edit button for the project, link and a comment field that gets updated everytime a new comment is pushed to database.
- **edit project** - allows the user to edit a specific project
- **private page** - Not a user, I want to sign up for a bootcamp and join the community :-)


<br>



## Server Routes (Back-end):



| **Method** | **Route**                          | **Description**                                              | Request  - Body                                          |
| ---------- | ---------------------------------- | ------------------------------------------------------------ | -------------------------------------------------------- |
| `GET`      | `/`                                | Main page route.  Renders home/login `index` view.                 |                                                          |                               |                                                          |
| `POST`     | `/login`                           | Sends Login form data to the server.                         | { email, password }                                      |
| `GET`     | `/logout`                           | Logs out the user and redirects to the mainpage/login.                         |                                       |
| `GET`      | `/signup`                          | Renders `signup` form view.                                  |                                                          |
| `POST`     | `/signup`                          | Sends Sign Up info to the server and creates user in the DB. | {  email, password, ironpass }                                    |
| `GET`      | `/:username/edit-profile`            | Private route. Renders `edit-profile` form view.             |                                                          |
| `POST`      | `/:username/edit-profile`            | Private route. Sends edit-profile info to server and updates user in DB. | { email, password, [firstName], [lastName], [imageUrl] } |
| `GET`      | `/:username/favorites`               | Private route. Render the `favorites` view.                  |                                                          |
| `POST`     | `/:username/favorites/`              | Private route. Adds a new favorite for the current user.     | { name, cuisine, city, }                                 |
| `POST`   | `/:username/favorites/:favoriteID` | Private route. Deletes the existing favorite from the current user. |                                                                                  
| `GET`      | `/:username`         | Renders `profile` view for the user profile. |                                                          |
| `GET`      | `/search`         | Renders `search`. Private route. Search for info the user wants. |                                                          |
| `POST`      | `/search/results`         | Renders `search-results`. Private route. Search for info the user wants. |      { course, campus, name }                                                    | 
| `GET`      | `/:username/projects`         | Renders `project page`. Private route. View for the user's projects page. |                                                          |
| `GET`      | `/:username/projects/:projectId`         | Renders `project page`. Private route. View for a specific project page. |                                                          |
| `POST`      | `/:username/projects/:projectID/edit`         | Private route. View for editing each project. Redirect to project |      { links, description, image, title }                                                    | 
| `GET`      | `/:username/projects/:projectId/edit`         | Renders `edit project`. Private route. Edit for a specific project page. |                                                          |






## Models

User model

```javascript
{
  name: {
    type: String,
    required: true,
    trim: true
  }
  surname: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    unique: true
    lowercase: true,
    trim: true
  }
  email:{ 
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  }
  password: {
    type: String,
    required: true,
  },
  ironpass: {
    type: String,
    required: true,
    match: [best_bootcamp],
  },
  cohort: {
    type: String,
    required: true
  },
  campus: {
    type: String,
    required: true
  },
  profilepicture:{
    type: String,
    default: 'url'
 },
  links: [String],
  favorites: [favoriteId],
  projects: [ProjectsId],
  comments: [CommentsId]
}

```

Project model

```javascript

{
  image: {
    type: String,
  }
  title: {
   type: String,
   required: true
  },
  description: {
    type: String,
    required: true,
  },
  link: [String],
  comments: [commentsId]
}

```

Comments model

```javascript

{
  author: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true,
  },
}

```


<br>


## Packages
```
ExpressJS
NodeJS
TailwindCSS
MongoDB
```


<br>



## Backlog

[See the Trello board.](https://trello.com/b/NXvjUrkH/ironhub)



<br>



## Links



### Git

The url to your repository and to your deployed project

[Repository Link](https://github.com/lzaquine/Ironhub)

[Deploy Link](https://project2ironhack.herokuapp.com)



<br>



### Slides

The url to your presentation slides

[Slides Link](https://docs.google.com/presentation/d/1P5FIi0vHZBUcgUtmt1M4_lLCO5dwdJ4UOgtJa4ehGfk/edit?usp=sharing)

### Contributors
Lucas Zaquine - [`Github`](https://github.com/lzaquine) - [`Linkedin`](https://www.linkedin.com/in/lucaszaquine)

Paulo Torres - [`Github`](https://github.com/pveg) - [`Linkedin`](https://www.linkedin.com/in/pveg)
