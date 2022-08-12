## <a href="https://ironhubapp.herokuapp.com" target="_blank"><p align="center" dir="auto"><img src="public/images/ironhub_nobg.png" width="150px"></p></a>

<br>



## Description:

A plataform by Ironhackers to Ironhackers to showcase projects done during the bootcamp all around the world! 💻 🚀 🌎 ✨

<br>

## User Stories:

- **404** - As a user, I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault.
- **500** - As a user, I want to see a nice error page when the super team screws it up so that I know that is not my fault.
- **Sign up** - As a user, I want to sign up.
- **Login** - As a user, I want to be able to log in.
- **Logout** - As a user, I want to be able to log out.
- **Profile** - As a user I want to be able to display my projects and my information.
- **Edit Profile** - As a user, I want to be able to edit my profile.
- **Delete Profile** - As a user, I want to be able to delete my account.
- **Projects** - As a user, I want to be able to see all the projects and comments.
- **New Project** - As a user, I want to be able to create a new project. 
- **Edit Project** - As a user, I want to be able to edit projects.
- **Delete Project** - As a user, I want to be able to delete projects.
- **Comments** - As a user, I want to be able to leave comments on other projects and receive comments on my projects.
- **Search** - As a user, I want to be able to search for other profiles based on the filters I use.
- **Search Result** - As a user, I want to be able to see the list of profiles filtered by my preferences.


<br>



## Server Routes (Back-end):

<br>


| **Method** | **Route**                          | **Description**                                              | Request  - Body                                          |
| ---------- | ---------------------------------- | ------------------------------------------------------------ | -------------------------------------------------------- |
| `GET`      | `/`                                | Login when Logged Out, Search when Logged In route.  Renders login `login` view when logged out and `search` view when logged in.                 |                                                          |                               |                                                          |
| `POST`     | `/login`                           | Sends Login form data to the server.                         | { username, password }                                      |
| `GET`     | `/logout`                           | Logs out the user and redirects to the login.                         |                                       |
| `GET`      | `/signup`                          | Renders `signup` form view.                                  |                                                          |
| `POST`     | `/signup`                          | Sends Sign Up info to the server and creates user in the DB. | {  username, name, surname, ironpass, password, campus, course }                                    |
| `GET`      | `/profile/:username`         | Private route. Renders `profile` view for the user profile. |                                                          |
| `GET`      | `/profile/:username/edit-profile`            | Private route. Renders `edit-profile` view.             |                                                          |
| `POST`      | `/profile/:username/edit-profile`            | Sends edit-profile info to server and updates user in DB. | { profile picture, username, name, surname, campus, course, location, email, website, linkedin, instagram, bio } |
| `GET`      | `/search`         | Private route. Renders `search`.  |                                                          |
| `GET`      | `/search/results`         | Private route. Renders `search-results`. |                                                        | 
| `GET`      | `/:username/projects`         | Private route. Renders `project`. |                                                          |
| `GET`      | `/:username/projects/new`         | Renders `new-project`. Private route. View for a specific project page. |                                                          |
| `POST`      | `/:username/projects/new`         | Sends New Project info to the server and creates it. |      { image, title, description, link }                                                    | 
| `GET`      | `/projects/:projectid/edit-project`         | Private route. Renders `edit-project`.|                                                          |
| `POST`      | `/projects/:projectid/edit-project`         | Sends Edit Project info to the server and updates it.|  { image, title, description, link }                                                         |
| `GET`      | `/projects/:projectid/delete-project`         | Private route. Deletes a project. Redirects user to `profile`.|                                               |
| `POST`      | `/:projectId/comments/:username`         | Sends Comments info to the server and creates it. |  { image, title, description, link }                                                         |
| `GET`      | `/profile/:username/delete-profile`         | Private route. Deletes user. Redirects user to `signup`  |     |




<br><br>

## Models:
<br>
<strong>User model:</strong>


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
    unique: true,
    lowercase: true,
    trim: true,
    maxlength: 20
},
  password: {
    type: String,
    required: true
},
  ironpass: {
    type: String,
    required: true,
},
  course: {
    type: String,
    required: true,
    enum: ['Web Dev', 'UX/UI', 'Data Analyst', 'Cybersecurity']
},
  campus: {
    type: String,
    required: true
},
  profilepicture:{
    type: String,
    default: 'url'
},
 location: {
    type: String
},
  email: {
    type: String
},
  website: {
    type: String,
    set: removeHttp
},
  linkedin: {
    type: String,
    set: removeHttp
},
  instagram: {
    type: String,
    set: removeHttp
},
  bio: {
    type: String
},
  projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
}

```

<br>
<strong>Project model:</strong>

```javascript

{
  author: { type: Schema.Types.ObjectId, ref: "User" },
  image: {
    type: String
},
  title: {
    type: String,
    required: true
},
  description: {
    type: String,
    required: true
},
  link: {
    type: String,
    set: removeHttp
},
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
},


```
<br>
<strong>Comment model:</strong>


```javascript

{
  project: { type: Schema.Types.ObjectId, ref: "Project" },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  comment: { type: String, required: true },
},


```


<br>


## Packages:
```
ExpressJS
NodeJS
MongoDB
TailwindCSS
```


<br>



<br><h1 align="center" dir="auto"><strong>Ironhub</strong></h1>


<a href="https://ironhubapp.herokuapp.com" target="_blank">
<img src="public/images/Ironhub-front.png" alt="IronHub"/></a>


<br><br>



## Links:

[Repository](https://github.com/lzaquine/Ironhub)

[Deploy](https://ironhubapp.herokuapp.com)



<br>


## Contributors:
⚒️ Lucas Zaquine - [`GitHub`](https://github.com/lzaquine) - [`LinkedIn`](https://www.linkedin.com/in/lucaszaquine)

🗿 Paulo Torres - [`GitHub`](https://github.com/pveg) - [`LinkedIn`](https://www.linkedin.com/in/pveg)
