import { ArrowForward, ArrowRightAltRounded } from "@mui/icons-material";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography
} from "@mui/material";
import { Link } from "react-router-dom";
import { getItemActionProps } from "../utils";

export const GridSection = ({ title, list, toMore, to, onItemClick }) => {
  return (
    <Container>
      <div className="flex justify-between items-center mb-6">
        <Typography variant="h4">{title}</Typography>
        <Link to={toMore} className="flex items-center text-lg">
          <span className="mr-2">查看全部</span>
          <ArrowForward />
        </Link>
      </div>
      <Grid container spacing={4}>
        {list.map(item => {
          const { itemId, itemName, itemImage } = item;
          return (
            <Grid xs={12} sm={6} md={4} item key={itemId}>
              <Card>
                <CardActionArea
                  {...getItemActionProps({ item, to, onItemClick })}
                >
                  <CardMedia
                    sx={{ height: 250 }}
                    component="img"
                    src={itemImage}
                  />
                  <CardContent>
                    <Typography variant="subtitle1">{itemName}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};
