import React,{useState,useEffect,useContext} from 'react';
import { UserContext } from '../../App'; 
import { Link } from 'react-router-dom';

const Home = ()=>{

    const[data,setData] = useState([])
    const{state,dispatch} = useContext(UserContext)

    useEffect(()=>{
        fetch('/allpost',{
        headers:{
            "Authorization":"Bearer "+localStorage.getItem("jwt")
          }
        }).then(res => res.json())
        .then(result =>{
            console.log(result)
            setData(result.posts);
        })
        
    },[])
 
// for like

    const likePost =(id)=>{
        fetch("/like",{
            method:"put",headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res => res.json())
          .then(result =>{
              console.log(result)
              const newData = data.map(item =>{
                if(item._id === result._id){
                    return result
                }else{
                    return item
                }
    
                })
    
                    setData(newData)
          }).catch(err =>{
              console.log(err)
          })

      
    }

    // for unlike

    const unlikePost =(id)=>{
        fetch("/unlike",{
            method:"put",headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res => res.json())
          .then(result =>{
              console.log(result)
            const newData = data.map(item =>{
            if(item._id === result._id){
                return result
            }else{
                return item
            }

            })

                setData(newData)
          }).catch(err =>{
            console.log(err)
        })

      
    }


    // comments

    const makeComment =(text,postId)=>{
        fetch('/comment',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId,
                text
            })
        }).then(res=>res.json())
        .then(result =>{
            console.log(result)
            const newData = data.map(item =>{
                if(item._id === result._id){
                    return result
                }else{
                    return item
                }
               
    
          })
           
        setData(newData)
        }) .catch(err =>{
            console.log(err)
        })
    }


    // delete post 

    const deletePost =(postid)=>{
        fetch(`/deletepost/${postid}`,{
            method :"delete",
            headers:{
                Authorization:"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res => res.json())
        .then(result =>{
            console.log(result)
            const newData = data.filter(item =>{
                return item._id !== result._id
            })
            setData(newData)
        })
    }

    // delete comment

    // const deleteComment =(postid)=>{
    //     fetch(`/deletecomment/${postid}`,{
    //         method :"delete",
    //         headers:{
    //             Authorization:"Bearer "+localStorage.getItem("jwt")
    //         }
    //     }).then(res => res.json())
    //     .then(result =>{
    //         console.log(result)
    //         const newData = data.filter(item =>{
    //             return item._id !== result._id
    //         })
    //         setData(newData)
    //     })
    // }

    // ====================

 
    return(
     <div className="home"> 

         {
                data.map(item =>{
                    return (
                 
                 <div className="card home-card" key={item._id}>

         <h5 style={{padding:"15px"}}>   <Link  to={item.postedBy._id !== state._id ? "/profile/"+item.postedBy._id :"/profile" }>
          {item.postedBy.name}  {item.postedBy._id === state._id && <i class="material-icons" style={{float:"right",cursor:"pointer"}} onClick={()=> deletePost(item._id)}>delete_sweep </i>
                      } 
                     </Link> </h5>
                    
                    <div className="card-image">
                        <img src={item.photo}/> 
                    </div> 
                    <div className="card-content">
                  

                        {
                            item.likes.includes(state._id)
                            ?    <i className="material-icons" style={{marginLeft:"10px",cursor:"pointer"}}
                            onClick={()=>{unlikePost (item._id) }}
                              >thumb_down</i>
                            :  <i className="material-icons" style={{color:"red",cursor:"pointer"}}
                            onClick={()=>{ likePost(item._id) }}
                            >thumb_up</i>
                        }

                 
                      <h6><span >{item.likes.length} likes</span></h6>
                    
                    {/* <h5>{item.title}</h5> */}
                    <p style={{fontSize:"1.5rem"}}>Title : {item.body}</p>
                                    
                        {
                            item.comments.map(record =>{
                                return(
                                    <h6 key={record._id}><span style={{fontWeight:"500"}}>
                                              {record.postedBy.name +": "}
                                        </span>{record.text}</h6>
                                )
                            }) 
                          }
                        
                    <form onSubmit={(e)=>{
                        e.preventDefault()
                     makeComment(e.target[0].value,item._id)
                    }}>
                       <input type="text" placeholder="add comment"/>
                    </form>
                
                    </div>
                 </div>
                    )
                })

         }

{/* <i class="material-icons">comment</i> */}
     </div>


     )
}

export default Home;