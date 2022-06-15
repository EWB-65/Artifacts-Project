import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import Navbar from "./components/Navbar";
import AddNew from "./pages/AddNew";
import Home from "./pages/Home";
import Artifact from "./pages/Artifact";
import Search from "./pages/Search";
import ArtifactUpdate from "./pages/ArtifactUpdate";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";

const App = () => {
  return (
    <>
        <Router>
            <Fragment>
                <Navbar/>
                <div className="container">
            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route path="/add-new" element={<AddNew/>}/>
                <Route path="/artifact/:id" element={<Artifact/>}/>
                <Route path="/search/:query" element={<Search/>}/>
                <Route path="/update" element={<ArtifactUpdate/>}/>
            </Routes>
                </div>
            </Fragment>
        </Router>
    </>
  );
}

export default App;
