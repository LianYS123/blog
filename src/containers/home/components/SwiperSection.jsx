import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Typography
} from "@mui/material";
import { SwiperList } from "../components/SwiperList";
import { getItemActionProps } from "../utils";

export const SwiperSection = ({ title, list, to, onItemClick }) => {
  return (
    <>
      <SwiperList
        title={title}
        list={list}
        renderItem={item => {
          const { itemId, itemName, itemDesc, itemDetail, itemImage } = item;
          return (
            <Card
              sx={{
                width: { sm: 405, xs: 300 },
                height: { sm: 560, xs: 480 }
              }}
            >
              <CardActionArea
                {...getItemActionProps({ item, to, onItemClick })}
              >
                <CardHeader title={itemName} subheader={item.subTitle} />
                <CardContent>
                  <Typography variant="body1">{itemDesc}</Typography>
                </CardContent>
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {itemDetail}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          );
        }}
      />
    </>
  );
};
