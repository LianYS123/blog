import { Card } from "./Card";
import React from "react";
import { useRequest } from "hooks";
import { ARTICLE_LIST } from "services/API";

const Home = () => {
  const { data } = useRequest({
    service: ARTICLE_LIST
  });
  console.log(data);
  const fakeData = [...Array(2)].map((_, index) => ({
    content: "some message",
    id: index,
    title: `TTT${index}`,
    info: "Lian",
    desc: "2020-10-04",
    src: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
  }));
  return (
    <div className="space-y-3">
      {fakeData.map(it => (
        <Card
          key={it.id}
          title={it.title}
          info={it.info}
          desc={it.desc}
          src={it.src}
        >
          {it.content}
        </Card>
      ))}
    </div>
  );
};
export default Home;
