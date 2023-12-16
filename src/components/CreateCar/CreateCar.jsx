import { MenuItem, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import { Select, TextField } from "formik-mui";
import React from "react";
import { toast } from "sonner";
import { object, string } from "yup";
import { useCategoriesData } from "../../services/categories";

const validationSchema = object().shape({
  make: string().required("Required"),
  model: string().required("Required"),
  registrationNumber: string().required("Required"),
  color: string().required("Required"),
  category: string().required("Required"),
});

const CreateCar = ({ open, toggle, refetch }) => {
  // queries
  const { isPending, data } = useCategoriesData(0, 50);

  console.log(data);

  const handleClose = () => {
    toggle();
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const toastID = toast.loading("Creating car...");
    try {
      await axios.post(`/cars`, values);
      handleClose();
      refetch();
      toast.success("Car created", { id: toastID });
    } catch (error) {
      toast.error(error.message, { id: toastID });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} fullWidth onClose={handleClose}>
      <DialogTitle>Create Car</DialogTitle>
      <DialogContent>
        <DialogContentText>Fields (*) are required</DialogContentText>
        <div className="mt-4">
          <Formik
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            initialValues={{
              make: "",
              color: "",
              model: "",
              registrationNumber: "",
              category: "",
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Stack spacing={2}>
                  <Stack
                    direction={{
                      xs: "column",
                      md: "row",
                    }}
                    spacing={2}
                  >
                    <Field
                      component={TextField}
                      name="make"
                      label="Make"
                      required
                      fullWidth
                      size="small"
                    />
                    <Field
                      component={TextField}
                      name="model"
                      label="Model"
                      fullWidth
                      required
                      size="small"
                    />
                  </Stack>
                  <Stack
                    direction={{
                      xs: "column",
                      md: "row",
                    }}
                    spacing={2}
                  >
                    <Field
                      component={TextField}
                      name="color"
                      label="Color"
                      fullWidth
                      required
                      size="small"
                    />
                    <Field
                      component={TextField}
                      name="registrationNumber"
                      label="Registration Number"
                      required
                      fullWidth
                      size="small"
                    />
                  </Stack>
                  <Field
                    name="category"
                    label="Category"
                    component={Select}
                    disabled={isPending}
                  >
                    {data?.data?.map((i) => (
                      <MenuItem value={i._id}>{i.title}</MenuItem>
                    ))}
                  </Field>
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

export default CreateCar;
