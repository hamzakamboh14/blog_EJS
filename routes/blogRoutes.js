const express = require('express')
const blogController = require('../controllers/blogController')
const upload = require('../middleware/upload')

const route = express()
route.get('/',blogController.blog_index)
route.get('/create',blogController.blog_create_get)
route.post('/',upload.single('image'),blogController.blog_create_post)
route.get('/single/:id',blogController.blog_single)
route.get('/edit/:id',blogController.blog_edit)
route.post('/update/:id',upload.single('image'),blogController.blog_update)
route.get('/delete/:id',blogController.blog_delete)

module.exports = route