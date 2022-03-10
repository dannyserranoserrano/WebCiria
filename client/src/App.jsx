import React from 'react'
import './App.css';
import { Route, Routes, } from 'react-router-dom';
import Home from './api/Home/Home';
import Register from './api/Register/Register';
import Login from './api/Login/Login';
import User from './api/Users/User/User';
import Users from './api/Users/Users';
import Events from './api/Events/Events';
import AddEvent from './api/Events/AddEvent/AddEvent';
import Event from './api/Events/Event/Event';
import Activities from './api/Activities/Activities';
import AddActivity from './api/Activities/AddActivity/AddActivity';
import Activity from './api/Activities/Activity/Activity';
import Reserves from './api/Reserves/Reserves';
import Files from './api/Files/Files';
import AddFile from './api/Files/AddFile/AddFile';
import File from './api/Files/File/File';
import Logout from './api/Logout/Logout'
import Footer from './components/footer/Footer';



function App() {
  return (
    <div className="App">
      <div>
        <Routes>
          <Route path="/" element={<Home />}
          />
          <Route path="/login" element={<Login />}
          />
          <Route path="/register" element={<Register />}
          />
          <Route path="/user" element={<User />}
          />
          <Route path="/users" element={<Users />}
          />
          <Route path="/events" element={<Events />}
          />
          <Route path="/events/:eventId" element={<Event />}
          />
          <Route path="/events/addEvent" element={<AddEvent />}
          />
          <Route path="/activities" element={<Activities />}
          />
          <Route path="/activities/:activityId" element={<Activity />}
          />
          <Route path="/activities/addActivity" element={<AddActivity />}
          />
          <Route path="/reserves" element={<Reserves />}
          />
          <Route path="/files" element={<Files />}
          />
          <Route path="/files/addFile" element={<AddFile />}
          />
          <Route path="/files/:fileId" element={<File />}
          />
          <Route path="/logout" element={<Logout />}
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;

