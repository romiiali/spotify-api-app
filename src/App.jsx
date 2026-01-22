import { useState,useEffect } from "react";
import { FormControl , InputGroup , Container , Button  } from "react-bootstrap";
// App.jsx
const apikey = import.meta.env.VITE_API_KEY;


function App() {
  
  const [data,setData]=useState([]);

  useEffect(() => { const initClient = async () => { if (window.gapi) { window.gapi.load("client", async () => { try { await window.gapi.client.init({ apiKey: import.meta.env.VITE_API_KEY, discoveryDocs: [ "https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest", ], }); console.log("YouTube API client initialized"); } catch (err) { console.error("Error initializing YouTube API client", err); } }); } else { console.error("gapi not loaded yet"); } }; initClient(); }, []);


  return (
   <Container>
    <InputGroup>
        <FormControl onKeyDown={(event)=>{
          if(event.key==="Enter"){
            execute();
          }
        }}/>
        <Button onClick={execute}>execute</Button>
    </InputGroup>
   </Container>
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
  
  function execute() {
    return window.gapi.client.youtube.search.list({
      "part": [
        "snippet"
      ],
      "maxResults": 25,
      "order": "relevance",
      "q": "surfing",
      "type": [
        "videos"
      ]
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
              },
              function(err) { console.error("Execute error", err); });
  };





export default App