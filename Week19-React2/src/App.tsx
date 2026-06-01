import axios from "axios";
import { useState } from "react";


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




function App(){
  let [data, setData] = useState([]);

  axios.get("https://jsonplaceholder.typicode.com/todos")
  .then(response => {
    setData(response.data);
  })

  // convert array of objects in array of component
// [{title: "go to gym"}, {title: "east"}]
// [<Todo title ={"go to gym"}]

  return <div>
    {data.map(todo=> <Todo title={todo.title}  />)}
  </div>

  // Problem with useState - triggering infinite render loops

}


function Todo(props){
  return <div style={{margin:10,padding: 20, border:"1px solid black",borderRadius:5, backgroundColor: props.backgrundColor}}>
    <div>{props.title}</div>
  </div>

}








export default App
