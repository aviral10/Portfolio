// private id = '1xtyKiwP_R44mjSd5TTo5I8R0ThMCSU88QN8pAunhrx0';
// private gidList = ['0','1231608566'];
// private url:string = 'https://docs.google.com/spreadsheets/d/'+this.id+'/gviz/tq?tqx=out:json&tq&gid=';
// private regex = /google\.visualization\.Query\.setResponse\(([\s\S]*?)\);/;
// function x(){
//     return this.gidList.map(async (gid)=>{
//             return fetch(this.url+gid)
//             .then(res => {
//                 // Check if the response status code indicates success (e.g., 200 OK)
//                 if (!res.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 // Parse the JSON response
//                 return res.text();
//             })
//             .then(data => {
//                 // parse this data
//                 const match = this.regex.exec(data);
//                 if (match) {
//                   const jsonString = match[1];
//                   return JSON.parse(jsonString);
//                 } else {
//                     throw new Error('JSON not found in the input string.');
//                 }
//             })
//         })
// }