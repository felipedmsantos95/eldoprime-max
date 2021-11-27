# EldoPrime Max

## Application Web Preview

<p align="center">
  <img src="https://github.com/felipedmsantos95/eldoprime-max/blob/main/img/eldoprimemax.gif"/>
</p>

## About

Application for Movies Catalogue, with a CRUD and filter by categories, also supports image uploads and a simple login with redirect.

## Used technologies

- Angular 12 for front-end
- Node.js (Typescript) for back-end
- MySQL database


## Requirements

To execute the project modules it is necessary to have the following requirements installed in the system:

- Node 12.x or later
- Yarn 1.21 or later
- Ng 12.2.10 or later

## Running the project

### Clonning the project

```bash
$ git clone https://github.com/felipedmsantos95/eldoprime-max
$ cd eldoprime-max
```

### Running Backend

1. To run the API for the first time, access the `./server/` directory and execute the command below to install the dependencies:

		yarn 

2. To configure the database:

        yarn typeorm migration:run  

2. Once the dependencies are installed, using the command below it is possible to execute the application backend, by default it will be available for requests through port 3333 at the address http://localhost:3001/

		yarn dev:server

### Running Frontend Web

With the backend running, you can perform the steps below to run the application frontend locally.

1. Access the `./eldoprimemax-front/` directory and run the command below to install the dependencies:

		yarn

2. Once the dependencies are installed, using the command below it is possible to run the application frontend:

		yarn start

3. That done, through an internet browser (preferably Chrome or Firefox), through the address below, it will be possible to interact with the developed application.

		http://localhost:4002/
