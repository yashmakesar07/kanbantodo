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
import { stringAvatar } from "./utils";
import { users } from "../app/utils";
const TodoCard = ({ task, currentColumn }) => {
  const dispatch = useDispatch();
  const columns = useSelector((state) => Object.keys(state.todo.columns));

  const [countdown, setCountdown] = useState(null);
  const [toCol, setTocol] = useState(currentColumn);
  const getUsername = (id) => users.find((user) => user.id === id)?.name || "Unknown User";
  
  

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
        maxWidth: 250,
        margin: "8px 0",
        backgroundColor: "#fff",
        borderRadius: "4px",
        boxShadow: "0 1px 3px black",
        flexShrink: 0,
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
          <Avatar {...stringAvatar(getUsername(task.userId))} />
        </CardActions>
      )}
    </Card>
  );
};

export default TodoCard;
