import { Container } from "@mui/material";
import React, { useEffect } from "react";
import Column from "./Column";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeTask } from "../app/todoSlicers";

const Board = () => {
  const columns = useSelector((state) => state.todo.columns);
  const deletedTasks = useSelector((state) => state.todo.columns["Deleted"]);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(deletedTasks);
    deletedTasks.forEach((task) => {
      const timeSinceDeleted = Date.now() - task.deletedAt;
      const timeRemaining = 10000 - timeSinceDeleted;
      if (timeRemaining <= 0) {
        dispatch(removeTask({ columnName: "Deleted", taskId: task.id }));
      } else {
        setTimeout(() => {
          dispatch(removeTask({ columnName: "Deleted", taskId: task.id }));
        }, timeRemaining);
      }
    });
  }, [dispatch, deletedTasks]);

  return (
    <Container
      sx={{
        height: "700px",
        p: "10px",
        width: "700px",
        display: "flex",
        flexDirection: "row",
        flex: 1,
        gap: "5px",
        overflowY: "auto",
        borderRadius: 2,
      }}
      disableGutters
    >
      {Object.entries(columns).map(([name, tasks]) => (
        <Column key={name} name={name} tasks={tasks} />
      ))}
    </Container>
  );
};

export default Board;
