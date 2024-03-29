import { Col, Row, Typography } from "@douyinfe/semi-ui";
import React from "react";
import { useHistory } from "react-router";
import { useMedia } from "react-use";
import routers from "routers";
import NotFoundIcon from "./NotFoundIcon";
import { BREAKPOINT } from "constants/index";
import { useAppTitle } from "hooks/app";

function NotFound() {
  useAppTitle();
  const history = useHistory();
  const isSM = useMedia(BREAKPOINT.sm);
  return (
    <div className="h-full overflow-auto container">
      {isSM ? (
        <Row className="overflow-auto">
          <Col span="16">
            <div>
              <NotFoundIcon />
            </div>
          </Col>
          <Col span="8">
            <div className="mt-20">
              <Typography.Title heading={1}>404</Typography.Title>
              <Typography.Title heading={4}>
                UH OH! You're lost.
              </Typography.Title>
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
          </Col>
        </Row>
      ) : (
        <div>
          <div className="mt-12">
            <NotFoundIcon />
          </div>
          <div className="mt-8">
            <Typography.Title heading={1}>404</Typography.Title>
            <Typography.Title heading={4}>UH OH! You're lost.</Typography.Title>
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
