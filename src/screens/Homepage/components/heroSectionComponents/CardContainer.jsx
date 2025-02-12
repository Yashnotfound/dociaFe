import React from "react";
import { Card, CardContent, CardMedia, Typography, Grid } from "@mui/material";

const items = [
  {
    title: "Item One",
    description: "This is item one",
  },
  {
    title: "Item Two",
    description:
      "This is item two. This description is quite long and will be truncated properly.",
  },
  {
    title: "Item Three",
    description: "This is item three",
  },
  {
    title: "Item Four",
    description: "This is item four",
  },
  {
    title: "Item Five",
    description: "This is item five",
  },
  {
    title: "Item Six",
    description: "This is item six",
  }
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
            <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
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
              >
                {item.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default CardHolder;
