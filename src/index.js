const STUDIO_ID = 26371714; // Replace 0 with your studio id
const fs = require("fs")
const fetch = require("node-fetch")

fs.readFile("./description.txt", "utf-8", (err, oldDescription) => {
  fetch(`https://api.scratch.mit.edu/studios/${STUDIO_ID}/`)
  .then(res => res.json())
  .then(studioJson => {
    if (studioJson.description !== oldDescription) {
      fs.writeFileSync("./description.txt", studioJson.description)
    } else {
      console.log("No new changes to the description")
    }
  })
})
