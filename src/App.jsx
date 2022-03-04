// Making a twitter clone,using:
//    Matrtial UI
//    Firebase
//    Context Api
//    Plus more along the way (hopefully)

import React, { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';

import UserContext from './providers/UserContext';

import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './utils/routes/PrivateRoute';
import PublicRoute from './utils/routes/PublicRoute';

import { getAuth } from 'firebase/auth';

// firebase initialzed app must be imported
import { app } from './firebase';

const auth = getAuth();

import Welcome from './components/welcome';
import Surf from './components/surf';

function App() {
  const [user, setUser] = usePersistedUser();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
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

// custom hook to get user credentials stored in local storage

function usePersistedUser() {
  const [user, setUser] = useState(null);
  const firstRenderRef = useRef(true);

  const updateUser = useCallback((user) => {
    if (user) {
      const { displayName: name, email, photoURL, uid: id } = user;
      setUser({ name, email, photoURL, id });
    } else {
      setUser(null);
    }
  });

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('localUser'));
    if (savedUser) setUser(savedUser);
  }, []);

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
    } else {
      if (user) {
        localStorage.setItem('localUser', JSON.stringify(user));
      } else {
        localStorage.removeItem('localUser');
      }
    }
  }, [user]);

  return [user, updateUser];
}
