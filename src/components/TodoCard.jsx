import React, { Children, useEffect, useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { moveTask } from "../app/todoSlicers";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
        height: "30px",
        width: "30px",
        fontSize: "15px"
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}



const TodoCard = ({ task, currentColumn }) => {
  const [toCol, setTocol] = useState(currentColumn);
  const dispatch = useDispatch();
  const columns = useSelector((state) => Object.keys(state.todo.columns));
  const [countdown, setCountdown] = useState(null);

  const handleChange = (e) => {
    const newCol = e.target.value;
    setTocol(newCol);
    dispatch(moveTask({ from: currentColumn, to: newCol, task }));
  };

  useEffect(() => {
    if (currentColumn === "Deleted" && task.deletedAt) {
      const interval = setInterval(() => {
        const timeLeft = 10 - Math.floor((Date.now() - task.deletedAt) / 1000);
        setCountdown(timeLeft > 0 ? timeLeft : 0);
        if (timeLeft <= 0) clearInterval(interval);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [currentColumn, task.deletedAt]);

  return (
    <Card
      sx={{
        height: "auto",
        minWidth: 250,
        margin: "8px",
        backgroundColor: "#fff",
        borderRadius: "4px",
        boxShadow: "0 1px 3px black",
      }}
    >
      <CardContent
        sx={{
          textWrap: "wrap",
          width: "100%",
          height: "",
        }}
      >
        <Typography
          gutterBottom
          variant="body1"
          sx={{ textWrap: "wrap", display: "block" }}
        >
          {task.title}
        </Typography>
        {currentColumn === "Deleted" && countdown !== null && (
          <Typography variant="caption" color="error">
            Deleting in {countdown}s
          </Typography>
        )}
      </CardContent>
      {currentColumn !== "Deleted" && (
        <CardActions
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingX: 2,
            paddingBottom: 2,
          }}
        >
          <InputLabel sx={{ fontSize: "0.9rem", color: "#555" }}>
            Move
          </InputLabel>
          <Select
            sx={{
              minWidth: 50,
              fontSize: "0.9rem",
              height: 32,
              backgroundColor: "#f5f5f5",
            }}
            value={toCol}
            onChange={handleChange}
          >
            <MenuItem value={currentColumn} disabled>
              {currentColumn}
            </MenuItem>
            {columns
              .filter((col) => col !== currentColumn)
              .map((col) => (
                <MenuItem key={col} value={col}>
                  {col}
                </MenuItem>
              ))}
          </Select> 
          <Avatar {...stringAvatar('Kent Dodds')} />
        </CardActions>
      )}
    </Card>
  );  
};

export default TodoCard;
