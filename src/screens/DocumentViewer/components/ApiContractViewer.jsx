import React, { useState } from "react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import { Box} from "@mui/material";

const ApiContractViewer = ({content}) => {

  return (
    <Box sx={{ padding: 2 }}>
      <Box sx={{ marginTop: 2 }}>
        <SwaggerUI spec={content} />
      </Box>
    </Box>
  );
};

export default ApiContractViewer;
