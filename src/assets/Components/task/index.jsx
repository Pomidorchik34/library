import React from "react";
import { useState, useRef } from "react";

function Book(props) {
  const [height, setHeight] = useState("92px");
  const { text, desc, avatar, id, deleteToDo, Author } = props;
  return (
    <div id={id} className="Book">
      <div className="book-cont">
        <h3>{text}</h3>
        <p id="p" style={{ height: { height } }}>
          <p>Author: {Author}</p>
          {desc}
          <button
            onClick={() => {
              deleteToDo(id);
            }}
            id={id}
            className="del"
          >
            delete
          </button>
        </p>
      </div>
    </div>
  );
}

export default Book;
{
}
