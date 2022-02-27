// Making a twitter clone,using:
//    Matrtial UI
//    Firebase
//    Context Api
//    Plus more along the way (hopefully)

import React, { useState, useEffect, useRef } from 'react';
import './App.css';

import UserContext from './providers/UserContext';

import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './utils/routes/PrivateRoute';
import PublicRoute from './utils/routes/PublicRoute';

import { getAuth, signOut } from 'firebase/auth';
import { app } from './firebase';

const auth = getAuth();

import Welcome from './components/welcome';
import Surf from './components/surf';

import SignUp from './components/signUp';
import SignIn from './components/signIn';

function App() {
  const [user, setUser] = usePersistedUser();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        const { displayName: name, photoURL, email } = user;
        setUser({ name, email, photoURL });
      } else setUser(null);
    });
  }, []);

  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route
            path="/*"
            element={
              <PublicRoute restricted={!!user}>
                <Welcome />
              </PublicRoute>
            }
          />

          <Route
            path="surf/*"
            element={
              <PrivateRoute user={!!user}>
                <Surf />
              </PrivateRoute>
            }
          />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;

function usePersistedUser() {
  const [user, setUser] = useState(null);
  const firstRenderRef = useRef(true);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('localUser'));
    if (savedUser) setUser(savedUser);
  }, []);

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
    } else {
      localStorage.setItem('localUser', JSON.stringify(user));
    }
  }, [user]);

  return [user, setUser];
}
