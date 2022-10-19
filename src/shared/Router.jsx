import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Detail from "../pages/Detail";
import Main from "../pages/Main";
import Write from "../pages/Write";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/detail/:id" element={<Detail />} />
                <Route path="/write/add" element={<Write />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
