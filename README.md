# NC NEWS

## To clone down the repo

Create a new ******public GitHub repository*****. Do not initialise the project with a readme, .gitignore or license.
From your cloned local version of this project you'll want to push your code to your new repository using the following commands:

```
git remote set-url origin YOUR_NEW_REPO_URL_HERE
git branch -M main
git push -u origin main
```


---

## Database Environment
 
To access the the database locally you will need to create .env files for your project: `.env.test` and `.env.development`. Into each, add `PGDATABASE=<database_name_here>`, with the correct database name for that environment. Make sure that these .env files are .gitignored.

