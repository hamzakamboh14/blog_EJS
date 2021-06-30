const express = require('express')
const blogController = require('../controllers/blogController')

const route = express()

route.get('/',blogController.blog_index)
route.get('/create',blogController.blog_create_get)
route.post('/',blogController.blog_create_post)
route.get('/single/:id',blogController.blog_single)
route.get('/edit/:id',blogController.blog_edit)
route.post('/update/:id',blogController.blog_update)
route.get('/delete/:id',blogController.blog_delete)

module.exports = route