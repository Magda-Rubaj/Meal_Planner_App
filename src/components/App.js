import { useEffect, useState } from 'react';
import Main from "./Main";
import Guest from "./Guest";

import useService from '../api/services/user';

const App = () => {

  const [app, setApp] = useState({
    mounted: false,
    logged: false
  });

  useEffect(() => {
    const fetch = async() => {
      const fetchedUser = await useService.getUser();
      if(fetchedUser){
        setApp(old => {
          return {
            ...old,
            logged: true
          }
        })
      }
    }
    fetch();
    setApp(old => {
      return {
        ...old,
        mounted: true
      }
    })
  }, [])

  const login = callback =>{
    setApp(old => {
      return {
        ...old, 
        logged: callback
      }
    });
  }

  if(app.mounted) {
    if(app.logged === true){
      return <Main/>
    }
    else {
      return <Guest handleLogin={login}/>
    }
  }
  else {
    return null;
  }
}

export default App;