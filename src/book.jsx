import React from "react";
import { useState } from "react";

function Book(props) {
  const [height, setHeight] = useState("92px");
  function hover(e) {
    console.log(e);
    setHeight("112px");

    document.querySelector("#p").style.height = height;
  }
  function outHover(e) {
    console.log(e);
    setHeight("68px");
    document.querySelector("#p").style.height = height;
  }
  const { name, desc, img, id } = props;
  return (
    <div
      id={id}
      style={{ background: img }}
      className="Book"
      onMouseOver={outHover}
      onMouseOut={hover}
    >
      <div className="book-cont">
        <h3>{name}</h3>
        <p
          id="p"
          style={{ height: { height } }}
          onMouseOver={outHover}
          onMouseOut={hover}
        >
          {desc}
        </p>
      </div>
    </div>
  );
}

export default Book;
