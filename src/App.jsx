import { useState,useEffect } from "react";
import { FormControl , InputGroup , Container , Button  } from "react-bootstrap";
//import "./App.css"
// App.jsx
const apikey = import.meta.env.VITE_API_KEY;


function App() {
  
  const [data,setData]=useState([]);
  const [input,setInput]=useState("");
  useEffect(() => { const initClient = async () => { 
    if (window.gapi) 
      { window.gapi.load("client", async () => 
        { try { 
          await window.gapi.client.init({ 
            apiKey: import.meta.env.VITE_API_KEY, discoveryDocs: [ "https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest", ], 
          }); 
          console.log("YouTube API client initialized"); 
          } catch (err) { 
            console.error("Error initializing YouTube API client", err); } 
          }); 
        } else { 
          console.error("gapi not loaded yet"); 
        } 
      }; 
      initClient(); 
    }, []);

    function execute() {
    return window.gapi.client.youtube.search.list({
      "part": [
        "snippet"
      ],
      "maxResults": 25,
      "order": "relevance",
      "q": input,
      "type": [
        "videos"
      ]
    })
    .then(function(response){
      console.log(response)
      setData(response.result.items)
    },
    function(err) { console.error("Execute error", err); 
    });
  };



  return (
   <>
    <InputGroup>
        <FormControl 
        placeholder="Search YT"
        onKeyDown={(event)=>{
          if(event.key==="Enter"){
            execute();
          }
        }}
        onChange={(event) => setInput(event.target.value)} // setSearch
      style={{
        width: "300px",
        height: "35px",
        borderWidth: "0px",
        borderStyle: "solid",
        borderRadius: "5px",
        marginRight: "10px",
        paddingLeft: "10px",
      }}/>
        <Button onClick={execute}>Search</Button>
    </InputGroup>

    <Container>
      <ul style={{
        display: "grid",
        gridTemplateColumns: "repeat(1, 1fr)",
        gap: "16px",
        listStyle: "none",
        padding: "0",
        margin: "20px 0",
        "@media (min-width: 640px)": {
          gridTemplateColumns: "repeat(2, 1fr)"
        },
        "@media (min-width: 1024px)": {
          gridTemplateColumns: "repeat(3, 1fr)"
        },
        "@media (min-width: 1280px)": {
          gridTemplateColumns: "repeat(4, 1fr)"
        }
      }}>
        {data.map((item)=>{
          return(
            <li key={item.id.videoId} className="card">
              <p>Channel:{item.snippet.channelTitle}</p>
              <p>Title: {item.snippet.title}</p>
              <img src={item.snippet.thumbnails.default.url} className="image"/>
            </li>
        )
      })}
      </ul>
    </Container>

    </>
   
  )
}

  // function loadClient() {
  //   window.gapi.client.setApiKey(apikey);
  //    if (!window.gapi) {
  //     alert("gapi not loaded. Check console for script tag.");
  //     return;
  //   }
  //   return window.gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
  //       .then(function() { console.log("GAPI client loaded for API"); },
  //             function(err) { console.error("Error loading GAPI client for API", err); });
  // }
  // Make sure the client is loaded and sign-in is complete before calling this method.
  
  




export default App