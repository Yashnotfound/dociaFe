import React from "react";
import showdown from "showdown";
import showdownHighlight from "showdown-highlight";
import "highlight.js/styles/github.css";
import { Box } from "../../../Shared/components";

const converter = new showdown.Converter({
  tables: true,
  tasklists: true,
  strikethrough: true,
  simplifiedAutoLink: true,
  openLinksInNewWindow: true,
  emoji: true,
  underline: true,
  parseImgDimensions: true,
  literalMidWordUnderscores: true,
  ghCompatibleHeaderId: true,
  smartIndentationFix: true,
  disableForced4SpacesIndentedSublists: true,
  metadata: true,
  extensions: [showdownHighlight],
});

const MarkdownViewer = ({ markdown }) => {
  const html = converter.makeHtml(markdown);

  return (
    <Box
      sx={{
        wordBreak: "break-word",
        overflowWrap: "break-word",
        padding: "16px",
        backgroundColor: "transparent",
        borderRadius: "4px",
        "& h1": { fontSize: "1.8rem", fontWeight: "bold" },
        "& h2": { fontSize: "1.5rem", fontWeight: "bold" },
        "& h3": { fontSize: "1.3rem", fontWeight: "bold" },
        "& p": { fontSize: "1rem", lineHeight: "1.6" },
        "& pre": {
          backgroundColor: "#000",
          color: "#fff",
          fontSize: "0.95rem",
          padding: "10px",
          borderRadius: "6px",
          overflowX: "auto",
        },
        "& code": {
          backgroundColor: "#000",
          color: "#fff",
          fontSize: "0.95rem",
          padding: "3px 6px",
          borderRadius: "4px",
        },
        "& blockquote": {
          borderLeft: "3px solid #ccc",
          paddingLeft: "8px",
          margin: "8px 0",
          fontStyle: "italic",
        },
        "& table": { width: "100%", borderCollapse: "collapse" },
        "& th, td": { border: "1px solid #ddd", padding: "6px" },
        "& th": { backgroundColor: "#f4f4f4", fontWeight: "bold" },
      }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default MarkdownViewer;
