import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Rating,
  CardActionArea,
} from "@mui/material";
import { TMDB_IMAGE_BASE_URL } from "../config/tmdb";

function MovieCard({ title, releaseDate, posterPath,rating }) {
  return (
    <Card sx={{ maxWidth: 200, m: 2 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="250"
          image={`${TMDB_IMAGE_BASE_URL}${posterPath}`}
          alt={title}
        />
        <CardContent sx={{background:"black",color:"white"}}>
          <Typography gutterBottom variant="h6" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="white">
            Release Date: {releaseDate}
          </Typography>
          <Rating value={rating / 2} precision={0.5} readOnly /> 
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default MovieCard;