import React from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Login from './LoginPage/Login';
import Register from './RegisterPage/Register';
import CreateBlog from './CreateBlogPage/CreateBlog';
import BlogView from './CreateBlogPage/BlogView';
import Navigation from './NavBar/Navigation';
import ProfilePage from './ProfilePage/ProfilePage ';
import Home from './HomePage/Home';
import MyBlog from './MyBlogsPage/MyBlog';
import ChangePassword from './ProfilePage/ChangePassword';
import NotificationsPage from './NotificationsPage/NotificationsPage';
import BlogByMonthChart from './BlogByMonthChart';





function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/nav" element={<Navigation />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/createBlog" element={<CreateBlog />}></Route>
        <Route path="/blogView/:id" element={<BlogView />}></Route>
        <Route path="/myBlog" element={<MyBlog />}></Route>
        <Route path="/profile" element={<ProfilePage />}></Route>
        <Route path="/changepassword" element={<ChangePassword />}></Route>
        <Route path="/notificationsPage" element={<BlogByMonthChart />}></Route>



        {/* <Route path ="/ " element={<AdminDashboard/>}></Route> */}
        ChangePassword
      </Routes>
    </BrowserRouter>

  )
}

export default App;
