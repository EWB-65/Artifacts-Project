import TestBackend from "./TestBackend";
import Navbar from "./components/Navbar";
import AddNew from "./pages/AddNew";
import React, {Fragment} from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <>
        <Router>
            <Fragment>
                <Navbar/>
                <div className="container">
            <Routes>
                <Route exact path="/" element={<><Home/><TestBackend/></>}/>
                <Route path="/add-new" element={<AddNew/>}/>
            </Routes>
                </div>
            </Fragment>
        </Router>
    </>
  );
}

export default App;
