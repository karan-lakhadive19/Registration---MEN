const express = require('express')
const app = express()
const port = 3000
const empCollection = require("./model/model")

const templatePath = `${__dirname}/template/views`

app.set("view engine", "hbs")
app.set("views", templatePath)

app.use(express.urlencoded({extended: false}))

require("./db/db")

app.get("/", (req, res)=> {
    res.render("signup")
})

app.post("/empdata", async (req, res)=> {
    try {
        const password = req.body.password;
        const cpassword = req.body.cpassword;
        if(password===cpassword) {
            const empData = new empCollection({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                password: req.body.password,
                cpassword: req.body.cpassword,
            })
            const postData = await empData.save()
            res.send(postData)
        } else {
            res.send("Password not matching")
        }
    } catch (error) {
        res.send(error)
    }
})

app.get("/login", (req, res)=> {
    res.render("login")
})

app.post("/loginPage", async(req, res)=> {
    try {
        const email = req.body.email
        const password = req.body.loginpassword

        const getEmail = await empCollection.findOne({
            email: email
        })
        if(getEmail.password===password) {
            res.render("index")
        }else {
            res.send("No account")
        }
        
    } catch (error) {
        res.send(error)
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})