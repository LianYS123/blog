import React from "react";
import { useMedia } from "react-use";
import routers from "routers";
import NotFoundIcon from "./NotFoundIcon";
import { BREAKPOINT } from "constants/index";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";

function NotFound() {
  const history = useRouter();
  const isSM = useMedia(BREAKPOINT.sm);
  return (
    <div className="h-full overflow-auto container">
      {isSM ? (
        <Grid container className="overflow-auto">
          <Grid span="16">
            <div>
              <NotFoundIcon />
            </div>
          </Grid>
          <Grid span="8">
            <div className="mt-20">
              <h1>404</h1>
              <h4>UH OH! You‘re lost.</h4>
              <p className="my-2">
                The page you are looking for does not exist. How you got here is
                a mystery. But you can click the button below to go back to the
                homepage.
              </p>
              <button
                onClick={() => history.push(routers.HOME)}
                className="rounded border-gray-500 border px-3 py-1.5 hover:shadow mt-2"
              >
                HOME
              </button>
            </div>
          </Grid>
        </Grid>
      ) : (
        <div>
          <div className="mt-12">
            <NotFoundIcon />
          </div>
          <div className="mt-8">
            <h1>404</h1>
            <h4>UH OH! You`re lost.</h4>
            <p className="my-2">
              The page you are looking for does not exist. How you got here is a
              mystery. But you can click the button below to go back to the
              homepage.
            </p>
            <button
              onClick={() => history.push(routers.HOME)}
              className="rounded border-gray-500 border px-3 py-1.5 hover:shadow mt-2"
            >
              HOME
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default NotFound;
