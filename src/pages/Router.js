import React, { Component, useState } from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Home from ".";
import Login from "./login";
import Signup from "./signup";
import jwtDecode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import Logout from "./logout";
import Router from "next/router";
import Students from "./students";
import TeacherMaterials from "./repository/teacher/[all]";
import Add from './repository/add'
import Profile from "./profile/[id]";
import AddHomework from './homework/add'
import Homework from "./homework/[homework]";
import CheckHomework from './homework/check/[hid]'
import Teacher from "./homework/teacher/[teacher]"
import App from "./chat/app";

function Routes({logUser}) {
  const [user,setUser]=useState(logUser)
  Router.push('/', user)
  
        return (
            <div>
              <BrowserRouter>
         
              <Routes>
              <Route path="/" element={<Home/>}>
                  <Route path="/login" element={<Login props = {user}/>} />   
                  <Route path="/logout" element={<Logout  logUser={user}/>} />   
                 
                  <Route path="/signup" element={<Signup  logUser={user}/>} />               
                  <Route path="/repository/teacher/[all]" element={<TeacherMaterials logUser={user}/>} />               


                </Route>
              </Routes>
              </BrowserRouter>
            </div>
          );
    }
export default Routes;