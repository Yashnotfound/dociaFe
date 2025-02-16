import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

const UploadYaml = ({ onUpload }) => {

  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        let content = e.target.result;
        
        content = content.replace(/\r\n/g, "\n");
        
        onUpload(content);
      };
      return reader.readAsText(file);
    }
  };

  return (
    <>
      <Button variant="contained" component="label">
        Upload Config File
        <input
          type="file"
          accept=".yaml"
          hidden
          onChange={handleChange}
        />
      </Button>
    </>
  );
};

export default UploadYaml;
