import { Container, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ArrowBackRounded, ArrowForwardRounded } from "@mui/icons-material";

import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { useRef } from "react";
import Link from "next/link";

export const SwiperList = ({ list = [], title, to, renderItem }) => {
  const swiperRef = useRef();
  // const swiper = useSwiper();
  // const swiper = swiperRef.current;

  return (
    <Box className="bg-neutral py-20">
      <Container>
        <div className="flex justify-between items-center">
          {to ? (
            <Typography sx={{ color: "white" }} variant="h4">
              <Link href={to}>{title}</Link>
            </Typography>
          ) : (
            <Typography sx={{ color: "white" }} variant="h4">
              {title}
            </Typography>
          )}
          <div className="flex space-x-2 text-white">
            <IconButton
              sx={{ color: "white" }}
              // disabled={swiper?.allowSlidePrev}
              onClick={() => {
                //
                swiperRef.current.slidePrev();
                // swiper.slidePrev();
              }}
            >
              <ArrowBackRounded />
            </IconButton>
            <IconButton
              sx={{ color: "white" }}
              // disabled={swiper?.allowSlideNext}
              onClick={() => {
                //
                swiperRef.current.slideNext();
              }}
            >
              <ArrowForwardRounded />
            </IconButton>
          </div>
        </div>
      </Container>

      {/* <Divider /> */}
      <Box sx={{ py: 6, pl: { xs: 2, sm: 4 } }}>
        <Swiper
          onSwiper={s => {
            swiperRef.current = s;
          }}
          slidesPerView={"auto"}
          spaceBetween={30}
        >
          {list.map((item, index) => (
            <SwiperSlide style={{ width: "auto" }} key={index}>
              {renderItem(item)}
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
};
