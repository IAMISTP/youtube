import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Outlet, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { generateMedia } from "styled-media-query";
import { RecoilRoot, atom } from "recoil";

const queryClient = new QueryClient();

export const darkModeState = atom({
  key: "darkModeState",
  default: false,
});

function App() {
  return (
    <>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <div className="App">
            <Header />
            <Outlet />
          </div>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </RecoilRoot>
    </>
  );
}

export default App;
