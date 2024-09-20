/* eslint-disable no-undef */
"use client";
// import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect, createContext, useContext, useReducer } from "react";

const init = false;
const init1 = {
  name: "",
  city: "",
};

const data0 = createContext();
const data1 = createContext();

function App() {
  // <h1>useState</h1>
  const [toggletext, setToggletext] = useState(init);

  const [formdata, setFormdata] = useState(init1);
// <h1>useEffect</h1>
  const [count, setCount] = useState(0);

  const [text, setText] = useState(init);

  const [product, setProduct] = useState([]);

  // <h1>useContext</h1>
  const name = "mainak";
  const gender = "mainak";

  const handleText = () => {
    setToggletext(!toggletext);
  };
  console.log(toggletext);

  const handleNameFormData = (event) => {
    setFormdata({
      ...formdata,
      name: event.target.value,
    });
  };

  const handleCityFormData = (e) => {
    setFormdata({
      ...formdata,
      city: e.target.value,
    });
  };
  console.log(formdata);

  const handleCount = () => {
    setCount(count + 1);
  };
  console.log(count);

  // call api

  async function Product() {
    try {
      const Responce = await fetch("https://dummyjson.com/products");

      const result = await Responce.json();

      if (result && result.products) setProduct(result.products);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (count === 10) Product();
  }, [count]);

  useEffect(() => {
    if (count === 5) setText(true);
  }, [count]);


  // useReducer
  const initialstate=0;
  const reducer=(current,action)=>{
    switch(action){
      case "Increment":
        return current+1;
       case "Decrement":
        return current-1;
        default :
        return current 
    }

  }
  const [counter,dispatch]=useReducer(reducer,initialstate);

  return (
    <div className="App">
      <h1>useState</h1>
      <div>
        {toggletext ? <h1>Hello world</h1> : <h1>bye world</h1>}
        <button onClick={handleText}>Toggle Text</button>
      </div>
      <br></br>
      <div>
        <input
          onChange={handleNameFormData}
          className="inputForm"
          placeholder="enter the name"
          type="text"
        ></input>
        <select onChange={handleCityFormData}>
          <option>select city</option>
          <option>kolkata</option>
          <option>mumbai</option>
          <option>delhi</option>
        </select>
        {formdata ? (
          <>
            <h1>{formdata.name}</h1>
            <h1>{formdata.city}</h1>
          </>
        ) : null}
      </div>
      <h1>useEffect</h1>

      <div>
        <p>The count is {count}</p>
        {text ? <p>Nice Work</p> : null}
        <button onClick={handleCount}>Increasing the count</button>
      </div>
      <ul>
        {product.map((items) => (
          <li>{items.title}</li>
        ))}
      </ul>


      <div>
      <h1>useContext</h1>
        <data0.Provider value={name}>
          <data1.Provider value={gender}>
            <Component2 />
          </data1.Provider>
        </data0.Provider>
      </div>

      <div>
        <h1>useReducer</h1>
        <h3>counter={counter}</h3>
        <button onClick={()=>dispatch("Increment")}>Increment</button>
        <button onClick={()=>dispatch("Decrement")}>Decrement</button>
      </div>
    </div>
  );
}

function Component2() {
  return (
    <>
      <h1>Component 2</h1>
      <Component3 />
    </>
  );
}

function Component3() {
  return (
    <>
      <h1>Component 3</h1>
      <Component4 />
    </>
  );
}

function Component4() {
  const name = useContext(data0);
  // eslint-disable-next-line no-undef
  const gender = useContext(data1);
  return (
    <>
      <h1>Component 4</h1>
      <p>
        Hi My name is {name} and my gender is {gender}
      </p>
    </>
  );
}

export default App;
