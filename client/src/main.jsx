import * as React from "react";
import { createRoot } from "react-dom/client";

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChatBot from './Chatbot';
import Map from './Map';

function RouteSystem() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path='/' element={<Map />} />
        <Route path="/:regiao" element={<ChatBot />} />
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")).render(
  <RouteSystem />
);