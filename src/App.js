import React from 'react'
import { BrowserRouter as Router, Route, Switch, BrowserRouter, Routes } from 'react-router-dom';
import Login from './LoginPage/Login';
import Register from './RegisterPage/Register';
import CreateBlog from './CreateBlogPage/CreateBlog';
import BlogView from './CreateBlogPage/BlogView';
import Navigation from './NavBar/Navigation';
import ProfilePage from './ProfilePage/ProfilePage ';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path ="/" element={<Navigation/>}></Route>
      <Route path ="/login" element={<Login/>}></Route>
      <Route path ="/register" element={<Register/>}></Route>
      <Route path ="/createBlog" element={<CreateBlog/>}></Route>
      <Route path ="/blogView" element={<BlogView/>}></Route>
      <Route path ="/blogView" element={<BlogView/>}></Route>
      <Route path ="/profilePage" element={<ProfilePage/>}></Route>
      {/* <Route path ="/ " element={<AdminDashboard/>}></Route> */}



      


    </Routes>
    </BrowserRouter>
    
  )
}

export default App;
