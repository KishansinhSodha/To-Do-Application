import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import "./TodoCard.css";

const TodoCard = (props) => {
  return (
    <div className="todo-wrap">
      <Card className="basic-card">
        <CardContent className="card-content">
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className="todo-title"
          >
            {props.title}
          </Typography>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className="todo-details"
          >
            {props.details}
          </Typography>
        </CardContent>
        <div className="two-buttons">
          <CardActions>
            {!props.isCompleted && (
              <Button
                className="card-buttons"
                size="small"
                onClick={() => props.onComplete(props.id)}
              >
                Complete
              </Button>
            )}
            <Button
              className="card-buttons"
              size="small"
              onClick={() => props.onDelete(props.id)}
            >
              Delete
            </Button>
          </CardActions>
        </div>
      </Card>
    </div>
  );
};

export default TodoCard;
