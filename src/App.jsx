import { FormControl , InputGroup , Container , Button  } from "react-bootstrap";
// App.jsx
const clientId = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
function App() {
  

  return (
   <Container>
    <InputGroup>
        <FormControl onKeyDown={(event)=>{
          if(event.key==="Enter"){
            search();
          }
        }}/>
        <Button onClick={search}></Button>
    </InputGroup>
   </Container>
  )
}

function search(){

}



export default App