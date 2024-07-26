import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Page/Home/Home";
import Navbar from "./Page/Navbar/Navbar";
import ProjectDetails from "./Page/ProjectDetail/ProjectDetails";
import IssueDetails from "./Page/IssueDetails/IssueDetails";
import Auth from "./Page/Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "./Redux/Auth/Action";
import { fetchProjects } from "./Redux/Project/Action";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth)

  useEffect(() => {
    dispatch(getUser())
    dispatch(fetchProjects({}))
  }, [auth.jwt])

  console.log(auth)

  return (
    <>
      {
        auth.user ? <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
            <Route path="/project/:projectId/issue/:issueId" element={<IssueDetails />} />
          </Routes>
        </div> : <Auth />
      }
    </>
  );
}

export default App;
