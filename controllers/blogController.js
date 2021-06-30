const Blog = require('../models/blogs')
var fs = require('fs');

const blog_index = (req,res)=>{
    Blog.find().sort({createdAt: -1})
    .then((result)=>{
        res.render('index', {title:'All Blogs',blogs:result})
    })
    .catch((err)=>{
        console.log(err)
    })
}
const blog_single = (req,res)=>{
    const id = req.params.id
    console.log(id)
    Blog.findById(id)
    .then((result)=>{
        res.render('blogs/single',{title:'details', blogs:result})
    })
    .catch((err)=>{
        console.log(err)
    })
}   
const blog_create_get = (req, res)=> {
    res.render('blogs/create',{title:'New Blog',blogs:null})
}

const blog_create_post = (req, res)=> {
    const blog = new Blog(req.body)
    if(req.file){
        blog.image = req.file.filename
    }
    
    blog.save()
    .then((result)=>{
        res.redirect('/')
    })
    .catch((err)=>{
        console.log(err)
    })
}

const blog_delete = (req,res)=>{
    const id = req.params.id
    let image_name = ''
    Blog.findById(id)
    .then((result)=>{
        image_name = result.image
        fs.unlink(`public/uploads/${image_name}`, function(err) {
            if(err && err.code == 'ENOENT') {
                console.info("File doesn't exist, won't remove it.");
            } else if (err) {
                console.error("Error occurred while trying to remove file");
            } else {
                console.info(`removed`);
            }
        });
    })
    .catch((err)=>{
        console.log(err)
    })
  
    Blog.findByIdAndDelete(id)
    .then((result)=>{
        res.redirect('/')
    })
    .catch((err)=>{
        console.log(err)
    })
}

const blog_edit = (req,res)=>{
    const id = req.params.id
    Blog.findById(id)
    .then((reuslt)=>{
    res.render('blogs/create',{title:"edit blog", blogs:reuslt})
    })
    .catch((err)=>{
        console.log(err)
    })
}
const blog_update = (req,res)=>{
    const id = req.params.id
    Blog.findByIdAndUpdate(id,req.body)
    .then((result)=>{
        res.redirect('/')
    })
    .catch((err)=>{
        console.log(err)
    })

}

module.exports = {
    blog_index,
    blog_create_get,
    blog_create_post,
    blog_single,
    blog_edit,
    blog_update,
    blog_delete,
}