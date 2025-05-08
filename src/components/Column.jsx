import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  Container,
} from "@mui/material";
import TodoCard from "./TodoCard";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../app/todoSlicers";
import { nanoid } from "@reduxjs/toolkit";
const Column = ({ name }) => {
  const [open, setOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");

  const dispatch = useDispatch();

  const columns = useSelector((state) => state.todo.columns);
  const tasks = columns[name] || [];

  const isTodoColumn = name === "TODO";

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddTask = () => {
    if (taskTitle.trim()) {
      const newTask = { id: nanoid(), title: taskTitle };
      dispatch(addTask({ columnName: name, task: newTask }));
      setTaskTitle("");
      handleClose();
    }
  };

  return (
    <>
      <Box
        sx={{
          minHeight: "auto",
          minWidth: "290px",
          backgroundColor: "white",
          border: "1px solid #e0e0e0",
          overflowX: "auto",
          borderRadius: 2,
          boxShadow: 1,
          "&::-webkit-scrollbar": {
            display: "none",
          },
          padding: 2,
        }}
      >
        <div className="flex items-center justify-between px-4 h-[10%]">
          <h3 className="text-xl font-semibold text-black">{name}</h3>
          {isTodoColumn && (
            <Button
              sx={{
                backgroundColor: "blue",
                color: "white",
                py: "2px",
                px: "12px",
                textTransform: "none",
                fontSize: "0.875rem",
                "&:hover": {
                  backgroundColor: "darkblue",
                },
              }}
              onClick={handleOpen}
            >
              Add Task
            </Button>
          )}
        </div>

        {tasks.map((task) => (
          <TodoCard key={task.id} task={task} currentColumn={name} />
        ))}
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="add-task-modal"
        aria-describedby="add-task-modal-description"
      >
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <Box
            sx={{
              backgroundColor: "white",
              padding: 3,
              borderRadius: 2,
              width: 400,
              boxShadow: 3,
            }}
          >
            <Typography
              id="add-task-modal"
              variant="h6"
              component="h2"
              gutterBottom
            >
              Add New Task
            </Typography>
            <TextField
              fullWidth
              label="Task Title"
              variant="outlined"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleAddTask}
              disabled={!taskTitle}
              sx={{
                marginBottom: "5px",
              }}
            >
              Add Task
            </Button>
            <Button
              fullWidth
              variant="outlined"
              color="error"
              onClick={handleClose}
            >
              Close
            </Button>
          </Box>
        </Container>
      </Modal>
    </>
  );
};

export default Column;
