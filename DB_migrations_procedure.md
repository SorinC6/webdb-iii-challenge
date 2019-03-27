# Knex migrations and seeding

## Initialize and configure `knex`

To create `knexfile.js` and initialize knex, use:
```
npx knex init
```

Update the content of `knexfile.js` to contain `migrations` and `seeds` objects inside `development`, as well as `useNullAsDefault` as it is required by SQLite - 
[link](knexfile.js).

When importing the module from `knexfile.js`, do not forget to call the `development` object from the module, to add to `knex` function.


## Create/upgrade a database with `knex`

To create or upgrade a database, we'll use Migrations. Migrations allow for you to define sets of schema changes.

Migrations use a knexfile, which specify various configuration settings for the module. Once you have a `knexfile.js`, you can use the migration tool to create migration files to the specified directory (default migrations).

Creating new migration file can be achieved by running:

```
knex migrate:make migration_name
```

You can save this command in `package.json`s scripts object.
```
  "scripts": {
    "createCohorts": "knex migrate:make createCohortsTable"
  }
```
And then run it with `yarn createCohorts` or `npm createCohorts`.

After running the script, new Javascript file is created based on your knex config.
Now you can write your migrations inside this file.

`exports.up` will contain your desired changes to the database.
`exports.down` will contain code, that will undo the changes and allows you to rollback in case of problems.

Inside these functions, your write knex functions to create/upgrade your database.
See more details about these functions [here](data/migrations/20190327134034_createCohortsTable.js).

Once you have finished writing the migrations, you can update the database by running:
```
knex migrate:latest
```
Again, you can save this command in `package.json` as a script.


## Rolling back the database with `knex`

If for whatever reason, you want to rollback the last batch of migrations, use:
```
knex migrate:rollback
```


## Seed files into a database

Seed files allows you to populate your database with test or seed data independent of your migration files. Seed files will be created in the directory specified in your knexfile.js.

To create a seed file, run:
```
knex seed:make seed_name
```

Edit the content of the seed function according to your needs.
See more details about my seed functions [here](data/seeds/01-cohorts.js).

Once you have finished writing the seed function, you can run seed files:
```
knex seed:run
```

Seed files are executed in alphabetical order. Unlike migrations, every seed file will be executed when you run the command. You should design your seed files to reset tables as needed before inserting data.

