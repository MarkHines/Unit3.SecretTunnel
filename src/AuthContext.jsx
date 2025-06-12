import { createContext, useContext, useState } from "react";

const API = "https://fsa-jwt-practice.herokuapp.com";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem(`token`));
  const [location, setLocation] = useState("GATE");
  const [userName, setUserName] = useState(` `);
  
  // TODO: signup

  const signUp = async(event) => {
    event.preventDefault();

    if(userName === ` `){
      alert(`Please Enter a Name!`)
      throw Error (`error`)
    }
    const response = await fetch(API + `/signup`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: userName,
        password: `secrettunnel`,
      })
    })
    const tokenObject = await response.json()
    //console.log(tokenObject);
    localStorage.setItem(`token`, tokenObject.token);
    setToken(tokenObject.token);
    setLocation("TABLET")
  }
  // TODO: authenticate

  const authenticate = async(event) => {
    event.preventDefault();
    //console.log(token);
    if(!token){
      throw Error (`No token provided`)
    }
    else {
      const response = await fetch(API + `/authenticate`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })
      const responseObject = await response.json()
      //console.log(responseObject);
      if(!responseObject.success) {
        throw Error (`Failed to Authenticate`);
      }
      else {
        setLocation("TUNNEL")
      }
    }
  }

  const value = { 
    location, userName, setUserName, 
    signUp, authenticate
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}
