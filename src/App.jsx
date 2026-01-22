import { useState,useEffect } from "react";
import { FormControl , InputGroup , Container , Button  } from "react-bootstrap";
import "./App.css"
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
    <InputGroup className="">
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
        background: "gray"
      }}/>
        <Button onClick={execute}>Search</Button>
    </InputGroup>

    <Container>
  <ul className="grid grid-cols-3 gap-4">
    {data.map((item) => {
      const videoUrl = `https://www.youtube.com/watch?v=${item.id.videoId}`;
      
      return (
        <li 
          key={item.id.videoId} 
          className="group relative m-4 p-4 rounded-2xl bg-gradient-to-b from-gray-600 to-black hover:from-gray-700 hover:to-gray-900 transition-all duration-300"
        >
          {/* Hover Banner */}
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto z-10">
            <div className="bg-black text-white px-4 py-2 rounded-lg shadow-xl whitespace-nowrap">
              <a href={videoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-medium">Watch Video </a>
            </div>
            {/* Arrow */}
            <div className="w-3 h-3 bg-gray-600 transform rotate-45 mx-auto -mt-1"></div>
          </div>

          <img 
            src={item.snippet.thumbnails.default.url} 
            alt={item.snippet.title}
            className="w-full rounded-xl mb-4 transform group-hover:scale-[1.02] transition-transform duration-300"/>
          
          <div className="space-y-2">
            <p className="text-gray-300 font-semibold text-sm line-clamp-2">
              {item.snippet.title}
            </p>
            <p className="text-gray-400 text-xs">
              {item.snippet.channelTitle}
            </p>
          </div>
        </li>
      );
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