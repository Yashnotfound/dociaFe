import React from "react";
import { Card, CardContent, CardMedia, Typography, Grid } from "@mui/material";
import { useCardHolderLogic } from "../containers/cardHodlerLogic";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";

const CardHolder = ({ type }) => {
  const { items } = useCardHolderLogic({ type: type });

  return !items.length ? (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Typography variant="h4" gutterBottom> No docs Found</Typography>
    </Box>
  ) : (
    <>
      <Toaster />
      <Grid container spacing={2} alignItems="stretch">
        {items.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
            <Link
              to={`/documents/${item.id}`}
              style={{ textDecoration: "none" }}
            >
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
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
                <CardContent
                  sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
                >
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
                      sx={{
                        fontSize: "0.85rem",
                        fontWeight: 500,
                        marginBottom: 0.5,
                      }}
                      gutterBottom
                    >
                      {`By ${item.author}`}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ fontSize: "0.75rem", opacity: 0.7 }}
                    >
                      {item.createdAt}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default CardHolder;
