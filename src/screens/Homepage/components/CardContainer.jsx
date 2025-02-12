import React from "react";
import { Card, CardContent, CardMedia, Typography, Grid } from "@mui/material";

const items = [
  {
    title: "Item One",
    description: "This is item one",
    author: "John Doe",
    createdOn: "Feb 10, 2025",
  },
  {
    title: "Item Two",
    description:
      "This is item two. This description is quite long and will be truncated properly.",
    author: "Jane Smith",
    createdOn: "Feb 11, 2025",
  },
  {
    title: "Item Three",
    description: "This is item three",
    author: "Alice Johnson",
    createdOn: "Feb 12, 2025",
  },
  {
    title: "Item Four",
    description: "This is item four",
    author: "Bob Brown",
    createdOn: "Feb 13, 2025",
  },
  {
    title: "Item Five",
    description: "This is item five. This description is quite long and will be truncated properly.",
    author: "Charlie White",
    createdOn: "Feb 14, 2025",
  },
  {
    title: "Item Six",
    description: "This is item six",
    author: "David Black",
    createdOn: "Feb 15, 2025",
  },
];

const CardHolder = () => {
  return (
    <Grid container spacing={2} alignItems="stretch">
      {items.map((item, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%", // Ensures uniform height for all cards
              boxShadow: 3,
              overflow: "hidden",
            }}
          >
            <CardMedia
              component="img"
              sx={{
                height: 160,
                objectFit: "cover",
              }}
              image={item.image || "https://picsum.photos/300/160"}
              alt={item.title}
            />
            <CardContent sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
              <Typography variant="h6" gutterBottom>
                {item.title}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                  overflow: "hidden",
                }}
                gutterBottom
              >
                {item.description}
              </Typography>

              {/* Author and Created On */}
              <div>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ fontSize: "0.85rem", fontWeight: 500, marginBottom: 0.5 }}
                  gutterBottom
                >
                  {`By ${item.author}`}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ fontSize: "0.75rem", opacity: 0.7 }}
                >
                  {item.createdOn}
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default CardHolder;
