import React from "react";
import {
  Typography,
  Grid,
  Box,
  Chip,
  TextField
} from "../../../Shared/components";
import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { Link } from "react-router-dom";
import { getStatusColor } from "../../../Shared/containers/getStatusColor";
import banner from "../../../assets/images/mountains.jpg";
import { CircularProgress } from "../../../Shared/components";

const CardHolderComponent = ({
  documents,
  loading,
  statusFilter,
  handleFilterChange,
  type,
  searchQuery,
  handleSearchChange,
}) => {
  const showDropdown = type === "all-docs" || type === "user";

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="50vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>

        <TextField
          label="Search documents by title or author"
          variant="outlined"
          size="small" 
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ width: 300 }}
        />


        {showDropdown && (
          <FormControl variant="outlined" size="small">
            <InputLabel id="status-filter-label">Status</InputLabel>
            <Select
              labelId="status-filter-label"
              value={statusFilter}
              onChange={handleFilterChange}
              label="filter"
            >
              <MenuItem value="APPROVED">Approved</MenuItem>
              <MenuItem value="PENDING">Pending</MenuItem>
              <MenuItem value="REJECTED">Rejected</MenuItem>
            </Select>
          </FormControl>
        )}
      </Box>

      {!documents.length ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="50vh"
        >
          <Typography variant="h4" gutterBottom>
            No docs Found
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={2} alignItems="stretch">
          {documents.map((item) => (
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
                    borderRadius: 3,
                    position: "relative",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    borderLeft: `6px solid ${
                      item.type === "GENERAL" ? "#1976D2" : "#D32F2F"
                    }`,
                    "&:hover": { transform: "scale(1.05)", boxShadow: 6 },
                  }}
                >
                  <Box sx={{ position: "absolute", top: 8, right: 8 }}>
                    <Chip
                      label={item.status}
                      color={getStatusColor(item.status)}
                      size="small"
                    />
                  </Box>
                  <CardMedia
                    component="img"
                    sx={{ height: 160, objectFit: "cover" }}
                    image={item.image || banner}
                    alt={item.title}
                  />
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      flexGrow: 1,
                    }}
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
                    <Box sx={{ mt: "auto" }}>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{ fontSize: "0.85rem", fontWeight: 500, mb: 0.5 }}
                        gutterBottom
                      >{`By ${item.author}`}</Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{ fontSize: "0.75rem", opacity: 0.7 }}
                      >
                        {item.createdAt.split("T")[0] +
                          " " +
                          item.createdAt.split("T")[1].substring(0, 8)}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default CardHolderComponent;
