import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Main from "./routes/main/Main.jsx";
import Equipments from "./routes/equipments/Equipments.jsx";
import Chemicals from "./routes/chemicals/Chemicals.jsx";
import AddEquipment from "./routes/add/AddEquipment.jsx";
import AddChemicals from "./routes/add/AddChemicals.jsx";
import AllChemicals from "./routes/chemicals/AllChemicals.jsx";
import AddNotice from "./routes/add/AddNotice.jsx";
import ChemicalList from "./routes/chemicals/ChemicalList.jsx";
import ChemicalDetail from "./routes/chemicals/ChemicalDetail.jsx";
import EquipmentList from "./routes/equipments/EquipmentList.jsx";
import EquipmentDetail from "./routes/equipments/EquipmentDetail.jsx";

function App() {
  <Route path="/" element={<Main />} />;
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/equipments" element={<Equipments />} />
        <Route path="/chemicals" element={<Chemicals />} />
        <Route path="/add/equipment" element={<AddEquipment />} />
        <Route path="/add/chemical" element={<AddChemicals />} />
        <Route path="/add/notice" element={<AddNotice />} />
        <Route path="/chemicals/all" element={<AllChemicals />} />

        <Route path="/chemicals/list/:searchTerm" element={<ChemicalList />} />
        <Route path="/chemicals/detail/:cid" element={<ChemicalDetail />} />

        <Route
          path="/equipments/list/:searchTerm"
          element={<EquipmentList />}
        />
        <Route path="/equipments/detail/:eid" element={<EquipmentDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
