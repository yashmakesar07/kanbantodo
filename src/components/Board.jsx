import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Box,
  Select,
  MenuItem,
  Checkbox,
  Chip,
  Typography,
  Menu,
  Avatar,
} from "@mui/material";
import Column from "./Column";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";

import { useSelector, useDispatch } from "react-redux";
import { removeTask } from "../app/todoSlicers";
import { users } from "../app/utils";
import { stringAvatar } from "./utils";
import { stringToColor } from "./utils";
const Board = () => {
  const columns = useSelector((state) => state.todo.columns);
  const deletedTasks = useSelector((state) => state.todo.columns["Deleted"]);
  const dispatch = useDispatch();

  const columnNames = Object.keys(columns);
  const [visibleColumns, setVisibleColumns] = useState(columnNames);
  const [anchorEl, setAnchorEl] = useState(null);

  const actions = [
    { icon: <FileCopyIcon />, name: "Copy" },
    { icon: <SaveIcon />, name: "Save" },
    { icon: <PrintIcon />, name: "Print" },
    { icon: <ShareIcon />, name: "Share" },
  ];

  const selectedUsers = [1, 3];

  useEffect(() => {
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

  const toggleUser = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };
  
  const handleColumnChange = (event) => {
    const {
      target: { value },
    } = event;
    setVisibleColumns(typeof value === "string" ? value.split(",") : value);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container
      sx={{
        height: "700px",
        p: "10px",
        maxWidth: "700px",
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        overflow: "hidden",
        borderRadius: 2,
      }}
      disableGutters
    >
      {/* Filter Button and Column Selector */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2, gap: 2 }}>
        <Box>
          <SpeedDial
            ariaLabel="Filter by User"
            icon={<SpeedDialIcon />}
            direction="left"
          >
            {users.map((user) => (
              <SpeedDialAction
                key={user.id}
                icon={
                  <Avatar
                    {...stringAvatar(user.name)}
                    sx={{
                      width: 32,
                      height: 32,
                      border: selectedUsers.includes(user.id)
                        ? "2px solid royalblue"
                        : "2px solid transparent",
                    }}
                  />
                }
                tooltipTitle={user.name}
                onClick={() => toggleUser(user.id)}
              />
            ))}
          </SpeedDial>
        </Box>
        <Button variant="contained" onClick={handleClick}>
          Filter
        </Button>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          sx={{ maxHeight: "300px", overflow: "auto" }}
        >
          <Box sx={{ p: 2 }}>
            <Typography variant="h6">Select Columns</Typography>
            <Select
              multiple
              value={visibleColumns}
              onChange={handleColumnChange}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {columnNames.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={visibleColumns.includes(name)} />
                  {name}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Menu>
      </Box>

      {/* Render Columns */}
      <div className="flex flex-row h-[100%] gap-2">
        {columnNames
          .filter((column) => visibleColumns.includes(column))
          .map((name) => (
            <Column key={name} name={name} tasks={columns[name]} />
          ))}
      </div>
    </Container>
  );
};

export default Board;
