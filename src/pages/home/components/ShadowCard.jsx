import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Avatar, CardHeader } from "@material-ui/core";

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
