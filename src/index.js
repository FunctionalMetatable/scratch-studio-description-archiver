const STUDIO_ID = 26371714; // Replace 0 with your studio id
const fs = require("fs")
const https = require("https")
function getJSON(url) {
  return new Promise((resolve, reject) => {
    const urlobj = new URL(url);
    const req = https
      .request(urlobj, (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", () => {
          resolve(JSON.parse(data));
        });

        res.on("error", (err) => {
          reject(err);
        });
      })
      .end();
  });
}

fs.readFile("./description.txt", "utf-8", (err, oldDescription) => {
  getJSON(`https://api.scratch.mit.edu/studios/${STUDIO_ID}/`)
  .then(studioJson => {
    if (studioJson.description !== oldDescription) {
      fs.writeFileSync("./description.txt", studioJson.description)
    } else {
      console.log("No new changes to the description")
    }
  })
})
