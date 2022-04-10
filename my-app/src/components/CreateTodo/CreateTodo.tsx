import { FormHelperText, Snackbar, TextField } from "@material-ui/core";
import { FormControl } from "@material-ui/core";
import { Select } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import { Container } from "@material-ui/core";
import { Button, makeStyles } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { Formik } from "formik";
import * as Yup from "yup";
import { useRef, useState } from "react";
import axios from "axios";
import { Grid } from "@material-ui/core";
import { Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(2),
      width: "40ch",
      float: "left",
    },
  },
  containerStyle: {
    backgroundColor: "#cfe8fc",
    height: "60%",
  },
  headingStyle: {
    color: "black",
    fontSize: "30px",
    fontWeight: "bold",
    paddingTop: "3%",
  },
  formItemStyle: {
    width: "40ch",
    background: "white",
  },
  formSelectItemStyle: {
    width: "40ch",
    fill: "white",
  },
  buttonControl: {},
}));
interface IMessageItem {
  message: string;
  category: string;
}
type ComponentProps = {
  onCreate: () => void;
};
export const CreateTodo: React.FC<ComponentProps> = ({ onCreate }) => {
  const classes = useStyles();
  const formRef = useRef<any>();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [messageItem, setMessageItem] = useState<IMessageItem>({
    message: "",
    category: "",
  });

  const handleFormSubmit = async (data: IMessageItem) => {
    try {
      console.log("FORM DATA", data);
      const url = `${process.env.REACT_APP_API_ORIGIN}/createPost`;

      await axios.post(url, {
        msg: data.message,
        category: data.category,
      });
      formRef.current.resetForm();
      console.log("Post Created!");
      setSnackbarOpen(true);
      onCreate();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Container className={classes.containerStyle} maxWidth="sm">
      <div className={classes.headingStyle}>Create Your Task</div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => {
          setSnackbarOpen(false);
        }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => {
            setSnackbarOpen(false);
          }}
          severity="success"
        >
          Post Created!
        </MuiAlert>
      </Snackbar>

      <br></br>
      <Formik
        initialValues={messageItem}
        validationSchema={Yup.object().shape({
          message: Yup.string().required("Message is required"),
          category: Yup.string().required("Category is required"),
        })}
        onSubmit={handleFormSubmit}
        innerRef={formRef}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          touched,
          errors,
        }) => (
          <div>
            <form noValidate autoComplete="off">
              <Grid container direction="column" spacing={3}>
                <Grid item xs={3}>
                  <TextField
                    className={classes.formItemStyle}
                    id="msg"
                    label="Message"
                    variant="outlined"
                    name="message"
                    onChange={handleChange}
                    value={values.message}
                    error={Boolean(touched.message && errors.message)}
                    helperText={touched.message && errors.message}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={3}>
                  <FormControl
                    variant="outlined"
                    className={classes.formSelectItemStyle}
                    error={Boolean(touched.category && errors.category)}
                  >
                    <InputLabel id="demo-simple-select-outlined-label">
                      Category
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      name="category"
                      onChange={handleChange}
                      value={values.category}
                      label="Category"
                      error={Boolean(touched.category && errors.category)}
                      onBlur={handleBlur}
                    >
                      <MenuItem value={"Category1"}>Category1</MenuItem>
                      <MenuItem value={"Category2"}>Category2</MenuItem>
                      <MenuItem value={"Category3"}>Category3</MenuItem>
                    </Select>
                    <FormHelperText>
                      {touched.category && errors.category}
                    </FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
            </form>
            <Grid container direction="column" spacing={3} alignItems="center">
              <Grid item xs={3}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleSubmit()}
                  type="submit"
                >
                  Create
                </Button>
              </Grid>
            </Grid>
          </div>
        )}
      </Formik>
    </Container>
  );
};
