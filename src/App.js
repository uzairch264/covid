import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppRoute from "./Component/AppRoute";
import Global from "./Component/Global";
import CTable from "./Component/Table";

const App=()=> {

  return (
<Router>
<Routes>
  <Route
   path="/"
   element={
     <AppRoute selectedKey="worldwide">
       <Global/>
     </AppRoute>
    }
    />
     <Route
   path="/countries"
   element={
     <AppRoute aaa = {<CTable/>} selectedKey="countries">
       <CTable/>
     </AppRoute>
    }/>
     </Routes>
</Router>
  );
}


export default App;
