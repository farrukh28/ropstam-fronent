import { Button, Paper, Stack } from "@mui/material";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-mui";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { object, string } from "yup";

const validationSchema = object().shape({
  email: string().email("Invalid email").required("Required"),
  firstName: string().required("Required"),
  lastName: string().required("Required"),
});

const SignUp = () => {
  // router
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmit }) => {
    const toastID = toast.loading("Signing up...");
    try {
      await axios.post("/auth/signup", values);

      navigate("/auth/login");

      toast.success("Signed up successfully.", {
        id: toastID,
        description: "An email with password has been sent to your account.",
      });
    } catch (error) {
      toast.error(error.message, {
        id: toastID,
      });
    } finally {
      setSubmit(false);
    }
  };

  return (
    <div className="flex items-center justify-center flex-grow">
      <Paper className="w-[90%] max-w-[450px] px-4 py-7">
        <h2 className="mb-6 text-xl font-semibold text-center">Sign Up</h2>
        <Formik
          onSubmit={handleSubmit}
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
        >
          {({ isSubmitting }) => (
            <Form>
              <Stack spacing={2}>
                <Stack spacing={2} direction={{ xs: "column", md: "row" }}>
                  <Field
                    component={TextField}
                    name="firstName"
                    label="First Name"
                    size="small"
                    fullWidth
                    required
                  />
                  <Field
                    component={TextField}
                    name="lastName"
                    label="Last Name"
                    size="small"
                    fullWidth
                    required
                  />
                </Stack>
                <Field
                  component={TextField}
                  name="email"
                  label="Email"
                  size="small"
                  fullWidth
                  required
                />
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                  fullWidth
                >
                  Sign up
                </Button>
                <p className="text-sm text-center">
                  Already have an account:{" "}
                  <Link to="/auth/login" className="text-blue-400 underline">
                    Login
                  </Link>
                </p>
              </Stack>
            </Form>
          )}
        </Formik>
      </Paper>
    </div>
  );
};

export default SignUp;
