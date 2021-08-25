import React ,{useEffect,useState}from 'react';
import { Link,useHistory } from 'react-router-dom';
// import {useState} from 'react';
import M from 'materialize-css'



const Signup = ()=>{
    
    const history = useHistory("")

    const [name,setName] = useState("");
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("")
    const [image, setImage] = useState("")
    const [url, setUrl] = useState(undefined)
    useEffect(()=>{

        if(url){
            uploadFields()
        }


    },[url])



    const uploadPic = () =>{
        const data = new FormData();
        data.append("file",image)
        data.append("upload_preset","insta-clone")
        data.append("cloud_name","mr sk vlog")
        fetch("	https://api.cloudinary.com/v1_1/mr-sk-vlog/image/upload",{
    
            method:"post",
            body:data
           
    
        }).then(res => res.json())
        .then(data =>{
            setUrl(data.url)
        }).catch(err =>{
            console.log(err)
        })
    }

    const uploadFields =()=>{

        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html:"invalid email",classes:"#b71c1c red darken-4"})
            return   
              }
              fetch("/signup",{
                  method:"post",
                  headers:{
                      "Content-Type":"application/json"
                  },
                  body:JSON.stringify({
                      name,
                      password,
                      email,
                      pic:url
                  })
              }).then(res =>res.json())
              .then(data=>{
                  if(data.error){
                      M.toast({html:data.error,classes:"#b71c1c red darken-4"})
                  }else{
                      M.toast({html:data.message,classes:"#7cb342 light-green darken-1"})
                      history.push('/signin')
                  }
                  
              }).catch(err =>{
                  console.log(err)
              })
    }

    const PostData = ()=>{
        if(image){
            uploadPic()
        }else{
            uploadFields()
          }

          
      }
        

      


 return(
     <>
<div className="homepic">   
`      <div>
        <img  style={{ height:"600px" ,width:"400px",marginLeft:"200px"}}
                        src="https://res.cloudinary.com/mr-sk-vlog/image/upload/v1629728185/instapic_xamzju.png"
                        />
        </div>

    <div className="mycard" style={{marginTop:"30px"}}> 
        <div className="card auth-card input-field">
        <h2 className="insta">Instagram</h2>
        <h1 className="message">
            Sign up to see photos and videos from your friends.
        </h1>
        <input type="text" placeholder="Enter Name"
         value={name} onChange={(e)=>
             setName(e.target.value)
         } />
        
        
        <input type="text" placeholder="Enter email" 
         value={email} onChange={(e)=>
            setEmail(e.target.value)
        }
        />
        <input type="password" placeholder=" Enter password" 
             value={password} onChange={(e)=>
                setPassword(e.target.value)
            }
        />
{/* ========================upload image ============================= */}

                           <div className ="file-field input-field">
                            <div className="btn #2979ff blue darken-1" >
                                <span>Upload Profile pic </span><i class="material-icons" style={{marginLeft:"10px" ,fontSize:"1.1rem"}}>photo_size_select_actual</i>
                                <input type="file"
                                onChange={(e)=> setImage(e.target.files[0])}
                                
                                />
                            </div>
                            <div className="file-path-wrapper">
                                <input className="file-path validate" type="text"/>
                            </div>
                        
                            </div>
                            {/* =================  */}

             <button style={{width:"100%", borderRadius:"10px"}}  className="btn waves-effect waves-light #2979ff blue accent-3"
             onClick={()=>PostData()}
             >
                <span>Sign Up</span> 
               
             </button>
             <h6>Already have an account ..?
                 <Link to='/signin'><span className="blue-text text-darken-2" style={{fontWeight:"bold"}}> Log In</span></Link>
             </h6>

      </div>
    </div>
    </div>
    </>
 )
}

export default Signup;