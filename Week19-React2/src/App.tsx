

function App() {
  return <div>
    <b>hi  there</b>
    <br /><br />
    <LinkedinPost name={"Shubhasheesh"} content={"Hi, this is my first post "} />
    <LinkedinPost name={"Shubham"} content={"Hi, there "}   />
    <LinkedinPost backgrundColor={"red"}    name={"Shubham"} content={"Hi, there "} />
  </div>
}

// component
// function => argument
// component -> props

/*
props = {
name: "Shubhasheesh",
content: "Hi.."
}
 
 */

function LinkedinPost(props){
  return <div style={{margin:10,padding: 20, border:"1px solid black",borderRadius:5, backgroundColor: props.backgrundColor}}>
    <div>{props.name}</div>
    <div>{props.content}</div>
  </div>

}


export default App
