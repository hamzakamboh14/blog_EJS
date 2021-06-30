const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const blogRoutes = require('./routes/blogRoutes')

const app = new express()

const dbURI = 'mongodb+srv://root:Root!123@nodejs.mfnnf.mongodb.net/My-Practice?retryWrites=true&w=majority'
mongoose.connect(dbURI,{useNewUrlParser:true , useUnifiedTopology:true})
.then((result)=>app.listen(3001))
.catch((err)=>{
    console.log(err)
})


app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))

app.set('view engine', 'ejs')

app.get('/',(req,res)=>{
    res.redirect('/blogs')
})
app.get('/about',(req,res)=>{
    res.render('about')
})

app.use('/blogs', blogRoutes)

app.use((req,res)=>{
    res.status(404).render('404',{title:"404"})
})