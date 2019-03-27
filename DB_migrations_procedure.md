## Initialize and configure `knex`

To create `knexfile.js` and initialize knex, use:
```
npx knex init
```

Update the content of `knexfile.js` to contain `migrations` and `seeds` objects inside `development`, as well as `useNullAsDefault` as it is required by SQLite - 
[link](knexfile.js).

When importing the module from `knexfile.js`, do not forget to call the `development` object from the module, to add to `knex` function.


## Create a database with `knex`

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

