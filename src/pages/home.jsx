import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../App.css";
import ToDoItem from "../assets/Components/task";
function App() {
  const [toDoList, setToDoList] = useState([]);
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));
  let name = useRef("");
  let isValid = true;
  let users = localStorage.getItem("users");
  if (users == null) {
    users = [];
  } else {
    users = JSON.parse(users);
  }
  useEffect(() => {
    if (users == null) {
      navigate("/login");
    }
  });

  useEffect(() => {
    if (token == null) {
      isValid = false;
      navigate("/login");
    }

    if (localStorage.getItem("users")) {
    } else {
      isValid = false;
      navigate("/login");
    }
    let index;
    users.forEach((value, i) => {
      if (value.email == user) {
        index = i;
      }
    });
    setToDoList(users[index].books);
  }, []);
  if ((isValid = false)) {
    navigate("/login");
    return;
  }

  let user = localStorage.getItem("userEmail");
  const inputRef = useRef();
  const desc = useRef("");
  const Author = useRef("");

  console.log(users);

  //

  const add = () => {
    const inputText = inputRef.current.value.trim();
    if (inputText.length <= 3) {
      alert("name must be more than three characters");
      return null;
    }
    if (Author == "") {
      alert("please upload Author");
      return null;
    }
    if (desc.current.value.length < 5) {
      alert("description must be more than 5 characters");
      return null;
    }

    //

    let index;
    users.forEach((value, i) => {
      if (value.email == user) {
        index = i;
      }
    });

    //

    const newTodo = {
      id: Date.now(),
      desc: desc.current.value,
      Author: Author.current.value,
      text: inputText,
    };
    users[index].books.push(newTodo);
    localStorage.setItem("users", JSON.stringify(users));

    //

    setToDoList((prev) => [...prev, newTodo]);
    let books = [];
    books.push(newTodo);
    setToDoList(users[index].books);
    location.reload();
    //
  };
  let deleteToDo = (e) => {
    console.log(e);
    let index;
    users.forEach((value, i) => {
      if (value.email == user) {
        index = i;
      }
    });
    users[index].books.forEach((element, i) => {
      if (element.id == e) {
        users[index].books.splice(i);
        console.log(users[index].books);
        localStorage.setItem("users", JSON.stringify(users));
        location.reload();
      }
    });
  };

  // const deleteToDo = (id) => {
  //   setToDoList((prvTodos) => {
  //     let index;
  //     users.forEach((value, i) => {
  //       if (value.email == user) {
  //         index = i;
  //       }
  //     });
  //     toDoList.forEach((value) => {
  //       if (value.id == id) {
  //         users[index].books.slice(value);
  //         localStorage.setItem("users", JSON.stringify(users));
  //       }
  //     });
  //     return prvTodos.filter((todo) => todo.id !== id);
  //   });
  // };
  const [iHelper, setIHelper] = useState(false);
  let i = 2;
  function ihelp() {
    i++;
    if (i % 2 == 0) {
      setIHelper(true);
    } else {
      setIHelper(false);
    }

    console.log(i);
  }
  function descHelper() {
    if (iHelper == false) {
      return null;
    } else {
      desc.current.value =
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos autem ipsum laudantium eius vitae, dolore numquam adipisci quasi aut magnam nobis fugit amet ducimus dolorum.";
    }
  }
  function changeAdmin(e) {
    if (e.target.value == "user") {
    } else {
      let timeUser = localStorage.getItem("userEmail");
      timeUser = e.target.value;
      localStorage.setItem("userEmail", timeUser);
      location.reload();
    }
  }

  return (
    <>
      <nav className="navbar">
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign up</Link>
        <Link to="/">Home</Link>
        <label>
          <select onChange={changeAdmin} id="">
            <option value="user">user</option>
            {users.length &&
              users.map((item, index) => {
                return <option value={item.email}>{item.email}</option>;
              })}
          </select>
        </label>
      </nav>
      <div className="home-container">
        <h1 className="heading">Library</h1>
        <label
          style={{ display: "flex", alignItems: "center", gap: "5px" }}
          onClick={ihelp}
        >
          input helper <input type="checkbox" />
        </label>
        <div className="creating">
          <input
            ref={inputRef}
            type="text"
            placeholder="Book name"
            name=""
            id=""
          />
          <input type="text" ref={Author} placeholder="Author" name="" id="" />
          <input
            type="text"
            ref={desc}
            onClick={descHelper}
            placeholder="description"
            name=""
            id=""
          />
          <button onClick={add} className="add-task">
            Add Book
          </button>
        </div>
        <div className="books">
          {toDoList.map((item, index) => {
            return (
              <ToDoItem
                key={index}
                text={item.text}
                Author={item.Author}
                desc={item.desc}
                id={item.id}
                deleteToDo={deleteToDo}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
