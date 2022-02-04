import React from "react";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar, CardHeader } from "@mui/material";

export const ShadowCard = ({ source, title, subTitle, content, ...rest }) => {
  return (
    <Card className="max-w-sm">
      <CardActionArea>
        <CardHeader
          avatar={<Avatar className="bg-pink-500">R</Avatar>}
          title={title}
          subheader={subTitle}
        />
        <CardMedia className="h-64" image={source} title={title} />
        <CardContent>
          <Typography component="p">{content}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default ShadowCard;
