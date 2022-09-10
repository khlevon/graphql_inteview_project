# This is a simple project which provides a GraphQL API to add a city into a database and get an hourly weather forecast for it.

# What is your task?

1. You need to setup project in your local environment
2. You need to read and understand the code
3. You need to create a new GraphQL type called `Weather` based on the type definitions in `src/app/db/models/weather.ts`
4. You need to create a new GraphQL query called `weatherForCities` which will get list of city ids and return a list of `Weather` objects
5. You need to change `addCityResolver`: fetch weather data from OpenWeatherMap API for newly added city and create a new `Weather` object in the database

## Getting started

### Required technologies:

[NodeJS 16.x](https://nodejs.org/en/download/)

[docker v20.x](https://docs.docker.com/engine/install)

[docker-compose v1.29.x](https://docs.docker.com/compose/install)

### Folder structure

```
.
├── package.json        # Package.json for the whole repo
├── .env.example        # Contains sample content of .env and .env.ENVIRONMENT files
├── docker-compose.yml  # Configuration of docker services
├── scripts/            # Some helper scripts for docker-compose/migrations/code compiler
│── src/                # Your Main App specific TypeScript source code goes here
│── dist/               # Compiled JavaScript code goes here (DON'T WRITE CODE HERE)
```

### Getting started the development process

1. Install Dependencies (run script in the root directory)

   ```bash
   npm install
   ```

2. Create environment configs

   ```bash
   cp .env.example .env.development
   ```


4. Run docker services

   - For initialize

   ```bash
   docker-compose --env-file ./.env.development up -d --build
   ```

   - For destroy

   ```bash
   docker-compose --env-file ./.env.development down
   ```

   - For development start/stop

   ```bash
   docker-compose --env-file ./.env.development start -d
   ```

   and

   ```bash
   docker-compose --env-file ./.env.development stop -d
   ```

   - To see app logs

   ```bash
   docker-compose --env-file ./.env.development logs -f app
   ```
5. Run the development server

   ```bash
   npm run watch
   ```
