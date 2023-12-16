import { ArrowBack } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const NoPage = () => {
  // router
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4 mt-3">
      <span style={{ fontSize: "3rem" }} className="text-danger">
        404
      </span>
      <p style={{ fontSize: "18px" }} className="black">
        Oops! The page you requested was not found!
      </p>
      <Button
        onClick={handleGoHome}
        startIcon={<ArrowBack />}
        variant="outlined"
        color="error"
      >
        Back to Home
      </Button>
    </section>
  );
};

export default NoPage;
