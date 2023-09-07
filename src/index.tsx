import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client"
import App from "./view/App"

let rootElement:HTMLElement = document.getElementById("root")!
let root = ReactDOM.createRoot(rootElement)
root.render(
    // <StrictMode>
        <App/>
    // </StrictMode>
)


//
/*
var id = '1xtyKiwP_R44mjSd5TTo5I8R0ThMCSU88QN8pAunhrx0';
var gid = '1231608566';
var url = 'https://docs.google.com/spreadsheets/d/'+id+'/gviz/tq?tqx=out:json&tq&gid='+gid;
fetch(url)
.then(response => {
    // Check if the response status code indicates success (e.g., 200 OK)
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    // Parse the JSON response
    return response.text();
    })
    .then(data => {
    // Use the data returned from the API
    console.log('Data from the API:', data);
})
*/
// const inputString = 'Data from the API: /*O_o*/google.visualization.Query.setResponse({"version":"0.6","reqId":"0","status":"ok","sig":"552412440","table":{"cols":[{"id":"A","label":"","type":"number","pattern":"General"},{"id":"B","label":"Name","type":"string"},{"id":"C","label":"Image","type":"string"},{"id":"D","label":"ChannelGroupsId","type":"number","pattern":"General"}],"rows":[{"c":[{"v":0.0,"f":"0"},{"v":"Valhalla"},{"v":"sdasd"},{"v":0.0,"f":"0"}]},{"c":[{"v":1.0,"f":"1"},{"v":"Valhalla1"},{"v":"asdasd"},{"v":1.0,"f":"1"}]}],"parsedNumHeaders":1}});';

// const regex = /google\.visualization\.Query\.setResponse\(([\s\S]*?)\);/;

// const match = regex.exec(inputString);

// if (match) {
//   const jsonString = match[1];
//   console.log('Extracted JSON:', JSON.parse(jsonString));
// } else {
//   console.log('JSON not found in the input string.');
// }

