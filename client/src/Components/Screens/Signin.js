import React from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../App";
import { useState, useContext } from "react";
import M from "materialize-css";

const Signin = () => {
  const { state, dispatch } = useContext(UserContext);

  const history = useHistory("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const PostData = () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      M.toast({ html: "invalid email", classes: "#b71c1c red darken-4" });
      return;
    }
    fetch("/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          M.toast({ html: data.error, classes: "#b71c1c red darken-4" });
        } else {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          dispatch({ type: "USER", payload: data.user });
          M.toast({
            html: "signed in successfully.",
            classes: "#7cb342 light-green darken-1",
          });
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="homepic">
        `
        <div>
          <img
            style={{ height: "600px", width: "400px", marginLeft: "200px" }}
            src="https://res.cloudinary.com/mr-sk-vlog/image/upload/v1629728185/instapic_xamzju.png"
          />
        </div>
        <div className="mycard">
          <div className="card auth-card input-field">
            <h2 className="insta">Instagram</h2>
            <h1 className="message">
              Login to see photos and videos from your friends.
            </h1>
            <input
              type="text"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder=" Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button style={{width:"100%", borderRadius:"10px"}} className="btn waves-effect waves-light #2979ff blue accent-3"
              onClick={() => PostData()}
            >
             <span>Log In</span> 
            </button>
        
          </div>

           <div className="card auth-card input-field">
               <h6>Dont have an account..? 
                 <Link to="/signup"><span className="blue-text text-darken-2" style={{fontWeight:"bold"}}> Sign Up</span></Link>
                </h6>
           </div>

        </div>
        
      </div>
    </>
  );
};

export default Signin;

{/* 
// <div>

// <h5>
//   <Link to="/signup">Dont have an account </Link>
// </h5>
// </div> */}