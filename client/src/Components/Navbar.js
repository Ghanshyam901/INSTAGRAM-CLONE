import React,{useContext,useRef,useEffect,useState} from 'react';
import {Link,useHistory} from 'react-router-dom';
import { UserContext } from '../App';
import M from 'materialize-css'

const Navbar = () => {
    const searchModel = useRef(null)
    const {state,dispatch} = useContext(UserContext)
    const history = useHistory()
    const [search,SetSearch] = useState("")
    const [userData , setUserData] = useState([])


    useEffect(()=>{
        M.Modal.init(searchModel.current)
    },[])

    const rederList =()=>{
        if(state){
            return [
           
                // <i style={{color:"black"}} data-target="modal1"  className="material-icons modal-trigger">search</i>    

            //    <li><input id="first_name2" type="text" class="validate"></input></li> ,

                <li key="1"><input data-target="modal1"   type="text" className="validate modal-trigger" placeholder=" Search user"
                 style={{ marginRight:"400px",width:"13rem",height:"2rem",borderRadius:"6px" , borderTop:"1px solid grey",borderLeft:"1px solid grey",borderRight:"1px solid grey" }}></input> </li>,

                <li key="2" style={{color:"grey"}}><Link to={"/"}><i className="material-icons"  style={{fontSize:"2.5rem"}}>home</i></Link></li>,
                // <li><i className="material-icons" style={{color:"black"}}>home</i></li>,
                <li key="3"><Link to="/profile">Profile</Link></li>,
                <li key="4"><Link to="/create">Create post</Link></li>,
                <li key="5"><Link to="/myfollowingpost">Following feeds</Link></li>,

                <li>

                    <button style={{marginRight:"50px" ,borderRadius:"6px"}} className="btn waves-effect waves-light #2979ff red accent-3"
                    onClick={()=>{
                        localStorage.clear()
                        dispatch({type:"CLEAR"})
                        history.push('/signin')
                     }}>
                        Logout 
                    </button>
                </li>
            ]
        }else{
            return [
                <li><Link to="/signin">Signin</Link></li>,
                <li><Link to="/signup">Signup</Link></li>
            ]
        }
    }

    const fetchUsers = (query)=>{
        SetSearch(query)
        fetch("/search-users",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
                // "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                query:query
            })
        }).then(res => res.json())
        .then(result =>{
            console.log(result)
            setUserData(result.user)
        })
    }


    return (
        <>

        <nav>
            <div className="nav-wrapper white">
                <Link to={state?"/" : "/signin"}  style={{marginLeft:"50px"}} className="brand-logo left">Instagram</Link>
                <ul id="nav-mobile" className="right ">
                 
                    {rederList()}
                </ul>
            </div>
           
                 <div id="modal1" className="modal" ref={searchModel} style={{color:"black"}}>
                        <div className="modal-content">
                        <input
                        type="text"
                        placeholder="Search user"
                        value={search}
                        onChange={(e) => fetchUsers(e.target.value)}
                        />
                         <div class="collection">
                             {userData.map(item =>{
                                   return <Link to={item._id !== state._id ? '/profile/'+item._id:'/profile'} onClick={()=>{
                                       M.Modal.getInstance(searchModel.current).close()
                                   
                                       SetSearch('')
                                   }}><li className="collection-item">{item.name || item.email }</li></Link>
                                
                             })} 
                       
                        
      </div>
                </div>
                        <div className="modal-footer">
                        <button className="modal-close waves-effect waves-green btn-flat" onClick={()=>SetSearch('')}>Close</button> 
                        </div>
                </div>
        </nav>
        </>
    )
}

export  default Navbar ;