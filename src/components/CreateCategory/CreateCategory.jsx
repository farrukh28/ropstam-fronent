import { Stack } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-mui";
import React from "react";
import { toast } from "sonner";
import { object, string } from "yup";

const validationSchema = object().shape({
  title: string().required("Required"),
});

const CreateCategory = ({ open, toggle, refetch }) => {
  const handleClose = () => {
    toggle();
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const toastID = toast.loading("Creating category...");
    try {
      await axios.post(`/categories`, values);
      handleClose();
      refetch();
      toast.success("Category created", { id: toastID });
    } catch (error) {
      toast.error(error.message, { id: toastID });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} fullWidth onClose={handleClose}>
      <DialogTitle>Create Category</DialogTitle>
      <DialogContent>
        <DialogContentText>Fields (*) are required</DialogContentText>
        <div className="mt-4">
          <Formik
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            initialValues={{
              title: "",
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Stack spacing={2}>
                  <Field
                    component={TextField}
                    name="title"
                    label="Title"
                    required
                    fullWidth
                  />

                  <div className="flex flex-wrap justify-end gap-3">
                    <Button
                      variant="outlined"
                      onClick={handleClose}
                      color="secondary"
                      size="small"
                      disabled={isSubmitting}
                    >
                      Close
                    </Button>
                    <Button
                      variant="contained"
                      type="submit"
                      color="primary"
                      size="small"
                      disabled={isSubmitting}
                      disableElevation
                    >
                      Create
                    </Button>
                  </div>
                </Stack>
              </Form>
            )}
          </Formik>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategory;
