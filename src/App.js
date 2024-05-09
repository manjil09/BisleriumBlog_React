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
import Dashboard from './Dashboard';
import AdmineRegister from './RegisterPage/AdmineRegister';
import UserView from './UserView/UserView';
import EditProfile from './ProfilePage/EditProfile';






function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/nav" element={<Navigation />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/adminRegister" element={<AdmineRegister />}></Route>
        <Route path="/createBlog" element={<CreateBlog />}></Route>
        <Route path="/blogView/:id" element={<BlogView />}></Route>
        <Route path="/myBlog" element={<MyBlog />}></Route>
        <Route path="/profile" element={<ProfilePage />}></Route>
        <Route path="/changePassword" element={<ChangePassword />}></Route>
        <Route path="/notificationsPage" element={<BlogByMonthChart />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/userView" element={<UserView />}></Route>
        <Route path="/editProfile" element={<EditProfile />}></Route>






        {/* <Route path ="/ " element={<AdminDashboard/>}></Route> */}
        ChangePassword
      </Routes>
    </BrowserRouter>

  )
}

export default App;
