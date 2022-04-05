import {
  Card,
  CardActionArea,
  CardMedia,
  Container,
  Stack,
  Typography
} from "@mui/material";
import { getItemActionProps } from "../utils";

export const BigCardSection = ({ title, list, to, onItemClick }) => {
  return (
    <Container>
      <Stack spacing={8}>
        {list.map((item, index) => {
          const {
            itemId,
            itemName,
            itemImage,
            itemDesc,
            itemDetail,
            itemLink
          } = item;
          return (
            <div key={index}>
              <Typography variant="h4" gutterBottom>
                {itemName}
              </Typography>
              <Typography variant="subtitle1" mb={4}>
                {itemDesc}
              </Typography>
              <Card className="hero">
                <CardActionArea
                  {...getItemActionProps({ item, to, onItemClick })}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      minHeight: "80vh"
                    }}
                    src={itemImage}
                  />
                </CardActionArea>
              </Card>
            </div>
          );
        })}
      </Stack>
    </Container>
  );
};
