# Relief Tracker Starter Pack

Starter project for the Relief Tracker data access layer (DAL).

## Installation

The following assumes you have [set up Git](https://help.github.com/articles/set-up-git/) on your laptop.

- Fork the [relief-student](https://github.com/jrs-innovation-center/relief-student) repo.

  A fork is a copy of a repository. Forking a repository allows you to freely experiment with changes without affecting the original project.

  Most commonly, forks are used to either propose changes to someone else's project or to use someone else's project as a starting point for your own idea.  [More...](https://help.github.com/articles/fork-a-repo/)

- On GitHub, navigate to **your fork** of the relief-student repository.
- Under your repository name, click **Clone or download**.
- In the Clone with HTTPs section, click the clipboard to copy the clone URL for the repository.
- Open Terminal.
- Type git clone, and then paste the URL you copied . It will look like this, with your GitHub username instead of `YOUR-USERNAME`:

  ```
  $ git clone https://github.com/YOUR-USERNAME/relief-student
  ```
- Press **Enter**. Your local clone will be created.
- Change to the project's directory

  ```
  $ cd relief-student
  ```
- run `npm install` to install the project's dependencies.

  ```
  $ npm install
  ```
- **program.js** is the starting point for your application.  Within Terminal, run the application:

  ```
  $ NODE_ENV=production node program.js
  ```
  In Terminal, you should notice the following message:

  > You need to create a database and return database info.  Get Crackin'.  See [https://pouchdb.com/api.html](https://pouchdb.com/api.html)
