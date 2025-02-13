import React, { useState } from "react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import YAML from "yaml";
import { Box, Button, Typography } from "@mui/material";

const ApiContractViewer = ({content}) => {
  const [yamlContent, setYamlContent] = useState(content);
  const [jsonSpec, setJsonSpec] = useState(YAML.parse(content));

  return (
    <Box sx={{ padding: 2 }}>
      <Button
        variant="contained"
        sx={{ marginLeft: 2 }}
        onClick={() => {
          setJsonSpec(YAML.parse(yamlContent));
        }}
      >
        Reload Spec
      </Button>
      <Box sx={{ marginTop: 2 }}>
        <SwaggerUI spec={jsonSpec} />
      </Box>
    </Box>
  );
};

export default ApiContractViewer;
