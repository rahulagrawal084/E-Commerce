const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()

const app = express()
app.use(cors())
app.use(express.json({limit : "10mb"}))

const PORT = process.env.PORT || 8080

// mongodb connection
// console.log(process.env.MONGODB_URL)
mongoose.set("strictQuery", false)
mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log("Db Connected"))
.catch((err) => console.log(err))

// schema
const userSchema = mongoose.Schema({
    firstName : String,
    lastName : String,
    email : {
        type : String,
        unique : true
    },
    password : String,
    confirmPassword : String,
    image : String
})

// mongoose model
const userModel = mongoose.model("user", userSchema)

// api
app.get("/", (req,res) => {
    res.send("Server is running")
})


//sign up
app.post("/signup", async(req,res) => {
    console.log(req.body) //data is coming from frontend
    const { email } = req.body

    // check if email is already available in db
    let user = await userModel.findOne({ email : email });
    if(!user){
        const data = userModel(req.body)
        const save = await data.save()
        return res.status(200).send({ message : "Registered successfully", alert : true})
    }else{
        return res.status(400).send({ message : "Email id already exists", alert: true})
    }

})

//login
app.post("/login", async(req,res) => {
    // console.log(req.body) //data is coming from frontend
    const { email, password } = req.body

    let user = await userModel.findOne({ email : email, password : password }); //correction, wrong logic,email correct & password incorrect also accepting
    if(user){
        const dataSend = {
            _id : user._id,
            firstName : user.firstName,
            lastName : user.lastName,
            email : user.email,
            image : user.image
        }
        console.log(dataSend)
        return res.status(200).send({ message : "Login successfully", alert : true, data : dataSend})
    }else{
        return res.status(400).send({ message : "Either email id or Password incorrect", alert : false})
    }
})

// product section
const schemaProduct = mongoose.Schema({
    name : String,
    image : String,
    category : String,
    price : String,
    description : String
})

const productModel = mongoose.model("product", schemaProduct)


// save product in database
// api
app.post("/uploadProduct", async(req,res) => {
    console.log(req.body) //data is coming from frontend
    const data = await productModel(req.body)
    const dataSave = await data.save()
    res.send({message : "Upload successfully"})
})


// 
app.get("/product", async (req,res) => {
    // console.log("here")
    const data = await productModel.find({})
    return res.send(JSON.stringify(data))
})

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`)
})