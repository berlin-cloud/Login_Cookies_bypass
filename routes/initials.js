import axios from "axios";
import express from "express";
import morgan from "morgan";
import bcrypt from "bcrypt";
import env from "dotenv";
import pg from "pg";
import session from "express-session";
import passport from "passport";
import LocalStrategy from "passport-local";
import GoogleStrategy from "passport-google-oauth2";

env.config();

const app = express();
const dirname = import.meta.dirname;
const port = 3000;
const saltRounds = 10;
const db = new pg.Client({
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.PORT,
  database: process.env.DATABASE,
});

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static(dirname + "/../staticFiles"));
app.use(session({
  secret: process.env.PASSWORD,
  resave: false,
  saveUninitialized: true,
  cookie: {                                                                                                                                                                                                                                             
        maxAge: 1000 * 60 * 60 * 24                                                                                      
      }  
}));
app.use(passport.authenticate('session'));

app.set("view engine", "ejs");
app.set("views", dirname + "/../dynamicFiles");

await db.connect(); 

export default {axios, express, bcrypt, env, pg, session, passport, LocalStrategy, GoogleStrategy, app, dirname, port, saltRounds, db}