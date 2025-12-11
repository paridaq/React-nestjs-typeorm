import React, { useState } from "react";
import "./auth.css";
import { useNavigate } from "react-router";


export default function Register() {
  const [username, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  type User ={
    username:string;
    email:string;
    password:string
  }
 async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
       const data = {username, email, password};
        const res = await fetch("http://localhost:3001/user/register",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",

            },
            body: JSON.stringify(data)
        })
        const result = await res.json();
        if(res.ok){
            console.log("registration successful",data)
        }
        localStorage.setItem("username",result.username)
        navigate('/')
    

    } catch (error) {
        console.log(error)
    }
    console.log({ username, email, password });
  }

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={username}
          onChange={(e) => setuserName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
