import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useSelector } from "react-redux";

const TodoCard = ({ task, currentColumn }) => {
    const columns = useSelector((state) => Object.keys(state.todo.columns));
    const handleChange =()=>{
        
    }
  return (
    <Card
      sx={{
        minWidth: 275,
        margin: "8px",
        backgroundColor: "#fff",
        borderRadius: "4px",
        boxShadow: "0 1px 3px black",
      }}
    >
      <CardContent>
        <Typography gutterBottom variant="body1">
          {task.title}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          alignItems: "center",
          paddingX: 2,
          paddingBottom: 2,
        }}
      >
        {currentColumn !== "Deleted" && (
          <>
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
              defaultValue=""
              displayEmpty
              onChange={handleChange}
            >
              <MenuItem value="" disabled>
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
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default TodoCard;
