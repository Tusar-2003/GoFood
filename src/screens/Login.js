import React,{ useState } from 'react'
import { Link,useNavigate } from "react-router-dom";
export default function Login() {
  
  const [credentials, setcredentials] = useState({
    email: "",
    password: "",
   
  })
  let navigate=useNavigate();
  // const handleSignup = ()=>{
  //   navigate("./Signup.js")
  // }
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(JSON.stringify({email:credentials.email,password:credentials.password}))
    const response = await fetch("http://localhost:40002/api/loginuser", {
      // mode:'no-cors',
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
       
        email: credentials.email,
        password: credentials.password
        
      })     
    });
    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert("Enter valid credentials !");
    }
    if(json.success)
    {
      localStorage.setItem("authToken",json.authToken);
      console.log(localStorage.authToken)
      navigate("/");
    }
    
  }
  const onChange = (event) => {
    setcredentials({ ...credentials,[event.target.name]: event.target.value })
  }
  return (
    <>
    <div className="container ">
        <form onSubmit={handleSubmit}>
          
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              value={credentials.email}
              onChange={onChange}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
          </div>

          
          <button type="submit" className="m-3 btn btn-success">
            Submit
          </button>
          <Link to="/login" className="m-3 btn btn-danger" >
           I am a new user
          </Link>
        </form>
      </div>
    </>
  )
}
