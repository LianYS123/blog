import React from "react";

export const PanelList = ({ panels = [] }) => {
  return (
    <section className="page-content">
      {panels.map(it => (
        <div key={it.id} className="card">
          <div className="content">
            <h2 className="title">{it.title}</h2>
            <p className="copy">{it.subTitle}</p>
            <button className="btn">View</button>
          </div>
        </div>
      ))}
    </section>
  );
};
