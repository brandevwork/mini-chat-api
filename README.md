# minichat-api

TL;DR
```
This project is to practice building an API that supports open communication using socket.io
```
- There is a test frontend for this project [Test FE Mini Chat](https://github.com/ifiokudoidiok/minichat-api) to make sure the chat feature works.

- The main frontend which is [Mini Chat FE](https://github.com/ifiokudoidiok/minichat-fe) is still a wip but can be reviewed interms of code structure and coding style


- Temporary doc. - https://documenter.getpostman.com/view/9560786/2s8YzQWj2y

# The Chat App
``` 
The purpose of the app is to demonstrate knowledge of full stack development. 

In recent times, Web sockets have been vital in a lot of applications as most applications require a persistent connection between the server and the client. 

In order to further gain some deeper understanding of how web sockets work, I decided to build this app with my primary focus on having the backend production ready. 
```



## The Backend: 
[Github Repo](https://github.com/ifiokudoidiok/minichat-api)

The Backend is set up to have authentication and authorization implemented. 
Users can sign up and log in using the corresponding auth APIs. 

There are also unit tests to make sure the CRUD operations are not buggy. 

The web socket is set up to detect:
- when users join a room
- When a message is sent 
- When users leave a room
- When users lose network connectivity. 
- A count of users in the chat room

The Base Tech stack used are:
- NodeJS w/Typescript 
- Express
- Knex
- PostgreSQL
- JWT
- Bcrypt 
- Socket.io
- Jest / Supertest



## The Test FrontEnd :  
[Github Repo](https://github.com/ifiokudoidiok/test-fe-minichat)

There is a test FrontEnd to use in testing the chat feature since it’s vital to visually test the chat APIs and make sure that the sockets are properly setup. 

The base tech stack used here are:
 - React
 - Socket.io client


## The Main FrontEnd: 
[Github Repo [WIP]](https://github.com/ifiokudoidiok/minichat-fe) 

The FrontEnd is built to consume the auth APIs and to use the web sockets to power the chat feature. 

Custom  reusable components are built to be used across the codebase. E.g button, text field, etc

A Zustand store is set up to enable easy management of state across the application. 


The base tech stack used are:
- NextJS with Typescript 
- Zustand
- Socket.io-client
- Material UI
- React hook form
