import { Box } from '@mui/material';
import React, { useEffect } from 'react';

const Column = (props) => {
    return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
        border: '1px solid #e0e0e0',
        borderRadius: 2,
        boxShadow: 1,
        padding: 2,
      }}
    >
      <h3 className="text-xl font-semibold text-black mb-2">{props.name}</h3>
    </Box>
  );
};

export default Column;
