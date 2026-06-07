import axios from "axios";
import { useRef, useState } from "react";
import { useEffect } from "react";


// function App() {
//   return <div>
//     <b>hi  there</b>
//     <br /><br />
//     <LinkedinPost name={"Shubhasheesh"} content={"Hi, this is my first post "} />
//     <LinkedinPost name={"Shubham"} content={"Hi, there "}   />
//     <LinkedinPost backgrundColor={"red"}    name={"Shubham"} content={"Hi, there "} />
//   </div>
// }

// component
// function => argument
// component -> props

/*
props = {
name: "Shubhasheesh",
content: "Hi.."
}
 
 */

// function LinkedinPost(props){
//   return <div style={{margin:10,padding: 20, border:"1px solid black",borderRadius:5, backgroundColor: props.backgrundColor}}>
//     <div>{props.name}</div>
//     <div>{props.content}</div>
//   </div>

// }




// function App(){
//   let [data, setData] = useState([]);

//   axios.get("https://jsonplaceholder.typicode.com/todos")
//   .then(response => {
//     setData(response.data);
//   })

  // convert array of objects in array of component
// [{title: "go to gym"}, {title: "east"}]
// [<Todo title ={"go to gym"}]

//   return <div>
//     {data.map(todo=> <Todo title={todo.title}  />)}
//   </div>

//   // Problem with useState - triggering infinite render loops

// }


// function Todo(props){
//   return <div style={{margin:10,padding: 20, border:"1px solid black",borderRadius:5, backgroundColor: props.backgrundColor}}>
//     <div>{props.title}</div>
//   </div>

// }


//2. useEffect  hook
/**
* useEffect is a React Hook that lets you perform side effects in a functional component.

What are Side Effects?

Side effects are operations that interact with things outside the component, such as:
         * Fetching data from an API
         * Updating the DOM
         * Setting timers (setTimeout, setInterval)
         * Adding event listeners
         * Accessing local storage

* Without useEffect, React components would re-run their code every time they render, making it difficult to control when side effects happen.

* Mounting means a component is created and inserted into the DOM (web page) for the first time. When React displays a component on the screen for the first time, that component is said to be mounted.

* When Do We Use useEffect?
1. Component Mounting - Run code once after the component loads.
2. State Change- Run code whenever a state changes.

#  Dependency Array in useEffect
1. Empty Dependency Array []
The effect runs only once when the component is mounted (loaded).
2. No Dependency Array
If you don't provide a dependency array, the effect runs after every render.
3. Single Dependency [count]
The effect runs when the value of count changes.
4. Multiple Dependencies
The effect runs whenever any dependency changes.



 */

// function App() {
//   const [count, setCount] = useState(0);
//   const [name, setName] = useState("");

//   // 1. Runs after every render
//   useEffect(() => {
//     console.log("1. Runs after every render");
//   });

//   // 2. Runs only once when component mounts
//   useEffect(() => {
//     console.log("2. Component Mounted");

//     return () => {
//       console.log("Component Unmounted");
//     };
//   }, []);

//   // 3. Runs when count changes
//   useEffect(() => {
//     console.log("3. Count Changed:", count);

//     document.title = `Count: ${count}`;
//   }, [count]);

//   // 4. Runs when count OR name changes
//   useEffect(() => {
//     console.log("4. Count or Name Changed");
//   }, [count, name]);

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>useEffect Complete Example</h1>

//       <h2>Count: {count}</h2>

//       <button onClick={() => setCount(count + 1)}>
//         Increment Count
//       </button>

//       <br />
//       <br />

//       <input
//         type="text"
//         placeholder="Enter Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />

//       <h2>Name: {name}</h2>
//     </div>
//   );
// }



// 3. useRef Hook
function App(){
  const [inputValue,setInputValue]=useState("");
  const inputRef= useRef(null)

  // want so run code as soon as loaded
  useEffect(()=>{
    inputRef.current && inputRef.current.focus();
  },[])

  return(
    <div>
      <input 
      type="text"
      placeholder="Type something"
      value={inputValue}
      onChange={(e)=>setInputValue(e.target.value)} 
      ref={inputRef}
      />
      <p>
        Youtyped: <strong>{inputValue}</strong>
      </p>
    </div>
  )
}


export default App;
