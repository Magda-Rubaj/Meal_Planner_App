import { useEffect, useState } from 'react';
import {
  Route,
  HashRouter,
  Redirect
} from "react-router-dom";
import Profile from "./Profile";
import Products from "./Products";
import CalendarComp from './CalendarComp.jsx';
import CalendarDay from './CalendarDay.jsx';
import Nav from './Nav.jsx';
import '../css/Main.css';

import userService from '../api/services/user';
import tokenService from '../api/services/token';

const Main = () => {
  const [user, setUser] = useState({
    username: "",
    avatar: null,
    currentWeight: "",
    desiredWeight: "",
    date: 0,
    mounted: false,
  })

  useEffect(() => {
    const fetch = async() => {
      const fetchedUser = await userService.getUser();
      setUser(fetchedUser);
    }
    fetch();
    setUser(old => {
      return {...old, ...{
        mounted: true
      }}
    });
    const interval = setInterval(refresh, minutesToMili(2) - 10)
    return () => {
      clearInterval(interval)
    }
  }, [])

  const minutesToMili = minutes => minutes * 1000 * 60;

  const changeInfo = callback => {
    setUser(old => {
      return {
        ...old, ...{
          username: callback.username,
          currentWeight: callback.currentWeight,
          desiredWeight: callback.desiredWeight
        }
      }
    })
  }
  const renderDay = (month, day, year) => {
    setUser(old => {
      return {
        ...old, ...{
          date: day + month + year
        }
      }
    })
  }
  const refresh = async() => {
    const refresh = JSON.stringify({
      refresh: localStorage.getItem('refresh_token')
    })

    const res = await tokenService.refresh(refresh);
    if(res){
      localStorage.setItem('access_token', res.access);
      localStorage.setItem('refresh_token', res.refresh);
      alert("Token refreshed")
    }
  }

  if(!user.mounted)
    return null;

    return (
      <div className="Main">
        <HashRouter>
          <Redirect to="/home" />
          <div className="wrapper">
            <div className="side_container">
              <div className="info_container">
                <img className="info_item" src={user.avatar} alt="avatar" height="90" width="90" />
                <h4 className="info_item">{user.username}</h4>
                <div className="weight_wrapper">
                  <h5 className="info_item">{user.currentWeight}</h5>
                  <h5 className="info_item">{user.desiredWeight}</h5>
                </div>
              </div>
              <Nav />
            </div>
            <div className="main_container">
              <Route
                path="/profile"
                render={(props) => <Profile {...props} handleChange={changeInfo} />}
              />
              <Route
                path="/calendar"
                render={(props) => <CalendarComp {...props} getDay={renderDay} />}
              />
              <Route path="/saved" component={Products} />
              <Route
                path={'/' + user.date}
                render={(props) => <CalendarDay {...props} date={user.date} />}
              />
            </div>
          </div>
        </HashRouter>
      </div>
    );
}

export default Main;