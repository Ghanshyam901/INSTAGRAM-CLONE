import React,{useEffect,createContext,useReducer,useContext} from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom';
import Home from './Components/Screens/Home';
import Signup from './Components/Screens/Signup';
import Signin from './Components/Screens/Signin';
import Profile from './Components/Screens/Profile'; 
import CreatePost from './Components/Screens/CreatePost';
import {initialState, reducer} from "./reducer/userReducer"
import UserProfile from './Components/Screens/UserProfile';
import SubUserPost from './Components/Screens/SubUserPost';
import M from 'materialize-css'

 export const UserContext = createContext()

const Routing =()=>{
  const history = useHistory()
  const {state,dispatch} = useContext(UserContext)

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    // console.log(typeof(user),user)
    if(user){
      dispatch({type:"USER",payload:user})
       
      // history.push('/')
    }else{
      history.push('/signin')
      M.toast({html:"you are not logged in"})
    }
  },[])

  return(
    <Switch>
      <Route exact path="/">
          <Home />
        </Route>
     
        <Route path='/signin'>
          <Signin />
        </Route>
     
        <Route path='/signup'>
          <Signup />
        </Route>
     
        <Route exact path='/profile'>
          <Profile />
        </Route>

        <Route path='/create'>
          <CreatePost />
        </Route>
      
        <Route path='/profile/:userid'> 
          <UserProfile />
        </Route>

        <Route path='/myfollowingpost'> 
          <SubUserPost />
        </Route>

      </Switch>
  )
}

function App() {

  const [state,dispatch] = useReducer(reducer,initialState)

  return (

    <UserContext.Provider value ={{state,dispatch}}>
    <BrowserRouter>
      <Navbar />

      <Routing/>

    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
