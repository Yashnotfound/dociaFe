import React from "react";
import Showdown from "showdown";

const MarkdownViewer = ({ markdown }) => {
  debugger;
  const converter = new Showdown.Converter();
  const html = converter.makeHtml(markdown);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
      style={{ padding: "10px", border: "1px solid #ddd", borderRadius: "5px" }}
    />
  );
};

export default MarkdownViewer;