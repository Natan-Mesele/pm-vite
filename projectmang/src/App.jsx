import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom"; // Add Navigate for redirection
import "./App.css";
import Home from "./Page/Home/Home";
import Navbar from "./Page/Navbar/Navbar";
import ProjectDetails from "./Page/ProjectDetail/ProjectDetails";
import IssueDetails from "./Page/IssueDetails/IssueDetails";
import Auth from "./Page/Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./Redux/Auth/Action";
import { fetchProjects } from "./Redux/Project/Action";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);

  useEffect(() => {
    // Only fetch user if the user is logged in, not just registered
    if (!auth.registered && auth.jwt) {
      dispatch(getUser());
    }
    dispatch(fetchProjects({}));
  }, [auth.jwt, auth.registered]);

  console.log(auth);

  return (
    <>
      {auth.user ? (
        <div>
          <Navbar />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
            <Route path="/project/:projectId/issue/:issueId" element={<IssueDetails />} />
            <Route path="*" element={<Navigate to="/home" />} /> {/* Default to home if authenticated */}
          </Routes>
        </div>
      ) : (
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="*" element={<Navigate to="/auth" />} /> {/* Redirect to Auth if not authenticated */}
        </Routes>
      )}
    </>
  );
}

export default App;
