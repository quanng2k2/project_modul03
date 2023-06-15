import React from "react";
import NavbarPage from "../common/user/NavbarPage";
import Category from "../common/user/Category";
import Slice from "./Slice";
import MainPage from "./MainPage";
import FooterPage from "../common/user/FooterPage";

export default function HomePage() {
  return (
    <div>
      <NavbarPage />
      <Category />
      <Slice />
      <MainPage />
      <FooterPage />
    </div>
  );
}
