import * as express from "express"
import TypeService from "./wch/model/TypeService"
import ElementDefBuilder from "./wch/model/ElementDefinition"
const textDef = ElementDefBuilder.createTextElement
const createContentType = TypeService.create
const contentType = TypeService.createContentType
import { Environment } from "./wch/environment"
import login from "./wch/login"
import FeedFetcher from "./feedFetcher"
import Parser from "./parser/consumer"
import * as bodyParser from "body-parser"
import * as _ from "lodash"
import * as flatten from "flat"
const parser = new Parser()
console.log(login)
//console.log(login.login())

const app = express()
app.use(bodyParser.json())
app.get("/fetch", function (req, res) {
    let url = req.query["url"]
    fetch(url).then((data) => {
        res.send(data)
    })
})

app.post("/create", function (req, res) {
    let mappingRequest = req.body

    let elements = _.chain(flatten(mappingRequest.sample)).toPairs().filter((entry) => entry[1] === "__TEXT__" ).map(
        (entry) => textDef(entry[0])
    ).value()
    console.log(elements)

    //console.log(mapping)
    res.send("All Good")
})

app.post("/run", function (req, res) {
    let url = req.query["url"]
    let typeId = req.query["typeId"]
    let mapping = req.body
})

init().then(() => {
    let result = contentType(
        "myTypeName",
        [textDef("myText1"),
        textDef("myText2")]
    )
    //createContentType(result)
    console.log(result)
    app.listen(3000, function () {
        console.log("login here" + Environment.cookie)
        console.log('Example app listening on port 3000!')
    })
})

async function createMapping(data) {

}

async function fetch(url) {
    let dom = await FeedFetcher.fetch(url)
    let result = parser.parse(dom)
    console.log(JSON.stringify(result))
    return result
}

async function init() {
    await login()
}