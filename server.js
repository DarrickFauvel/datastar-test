import { ServerSentEventGenerator } from "datastar-ssegen"
import express from "express"

const port = 3000
const app = new express()

app.use(express.static("public"))

app.get("/quote", async (req, res) => {
  setTimeout(async () => {
    const sse = ServerSentEventGenerator(req, res)
    const quotes = [
      "Any app that can be written in JavaScript, will eventually be written in JavaScript. - Jeff Atwood",
      "JavaScript is the world's most misunderstood programming language. - Douglas Crockford",
      "The strength of JavaScript is that you can do anything. The weakness is that you will. - Reg Braithwaite",
    ]
    const randomQuote = (arr) => arr[Math.floor(Math.random() * arr.length)]

    sse.MergeFragments(`<div id="quote">${randomQuote(quotes)}</div>`)
    sse.MergeSignals({ lastUpdate: Date.now() })
    res.end()
  }, 1000)
})

app.use("/time", async (req, res) => {
  const sse = ServerSentEventGenerator(req, res)

  const time = new Date().toLocaleTimeString()

  sse.MergeFragments(`<div id="time">${time}</div>`)
  sse.MergeSignals({ lastUpdate: Date.now() })
  res.end()
})

app.listen(port, () => console.log(`Server listening on port ${port}`))
