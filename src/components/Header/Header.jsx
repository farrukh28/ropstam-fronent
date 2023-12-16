import { Container } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useReduxUser } from "../../utils/hooks";
import { useDispatch } from "react-redux";
import { removeAuthUser } from "../../redux/slices/authUser";
import axios from "axios";

const Header = () => {
  // router
  const navigate = useNavigate();

  // hooks
  const reduxUser = useReduxUser();

  // redux
  const dispatch = useDispatch();

  const handleGoHome = () => {
    navigate("/");
  };

  const handleLogout = () => {
    axios.defaults.headers.common["Authorization"] = "";
    dispatch(removeAuthUser());
  };

  return (
    <header className="py-4 bg-blue-400 ">
      <Container maxWidth="xl">
        <div className="flex items-center justify-between">
          <span
            onClick={handleGoHome}
            className="text-lg cursor-pointer md:text-2xl"
          >
            Ropstam
          </span>
          <div>
            {reduxUser && (
              <span onClick={handleLogout} className="cursor-pointer">
                Logout
              </span>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
