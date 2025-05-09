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
import { addTask,moveTask } from "../app/todoSlicers";
import { nanoid } from "@reduxjs/toolkit";
import { useDrop } from "react-dnd";

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

  const [, dropRef] = useDrop(() => ({
    accept: "TASK",
    drop: ({ task, currentColumn }) => {
      if (currentColumn !== name) {
        dispatch(moveTask({ from: currentColumn, to: name, task }));
      }
    },
  }));

  return (
    <>
     <div
      ref={dropRef}
      className="bg-amber-600 overflow-y-auto scroll-smooth"
      style={{
        scrollbarWidth: "none",       // Firefox
        msOverflowStyle: "none",      // IE 10+
      }}
    >
      <Box
        sx={{
          minHeight: "100%",
          minWidth: "290px",
          backgroundColor: "white",
          border: "1px solid #e0e0e0",
          borderRadius: 2,
          boxShadow: 1,
            "&::-webkit-scrollbar": {
              display: "none",          // Chrome, Safari
            },
          padding: 2,
        }}
      >
        <div className="flex items-center justify-between px-4 h-[10%]">
          <Typography variant="h6" className="text-xl font-semibold text-black">
            {name}
          </Typography>
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
        <div className="w-64 min-h-[400px] bg-white rounded shadow p-2">
          {/* Render tasks inside the column */}
          {tasks.map((task) => (
            <TodoCard key={task.id} task={task} currentColumn={name} />
          ))}
        </div>
      </Box>
      </div>

      {/* Modal for adding new task */}
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
