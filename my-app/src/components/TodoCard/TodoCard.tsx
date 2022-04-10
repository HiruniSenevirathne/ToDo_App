import React from "react";
import Button from "@material-ui/core/Button";
import {
  Box,
  Card,
  FormControlLabel,
  FormGroup,
  makeStyles,
  Switch,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { blue } from "@material-ui/core/colors";
const useStyles = makeStyles({
  root: {
    minWidth: 275,
    background: " #2188ad  ",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 20,
  },
  pos: {
    marginBottom: 12,
  },
  switchController: {
    marginLeft: "47%",
    marginBottom: "2%",
  },
});
function TodoCard(props: { msg: string; category?: string }) {
  const classes = useStyles();

  return (
    <Box m={5}>
      <Card className={classes.root}>
        <Box p={5}>
          <h4 className={classes.title}>{props.msg}</h4>
          <p>{props.category}</p>
          <FormGroup row className={classes.switchController}>
            <FormControlLabel
              control={
                <Switch
                  // checked={state.checkedA}
                  // onChange={handleChange}
                  name="checkedA"
                />
              }
              label="Done"
            />
          </FormGroup>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </Box>
      </Card>
    </Box>
  );
}

export default TodoCard;
