const express = require("express");
const hbs = require('hbs');
const fs = require('fs');
const app = express();

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname+ '/views/partials');
app.set('view engine', 'hbs');

app.use((req,res,next)=> {    
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log+'\n', (err)=> {
        if (err) {
            console.log("Coludn't log to server.log");
        }
    });
    next();
});


app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', ()=> {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text)=> {
    return text.toUpperCase();
})

app.get("/", (req,res)=> {
    res.render('home.hbs', {
        pageTitle: "Home Page 101",
        welcomeMessage: "Hello Shivam Kumar"
    })
});

app.get("/about", (req,res)=> {
    res.render('about.hbs', {
        pageTitle: 'About123 Page',
    });
});

app.get('/bad', (req,res)=> {
    res.send({
        errorMessage: "Couldn't find that!!"
    })
});
app.get("/projects", (req,res)=> {
    res.render("projects.hbs");
});

app.listen(port, ()=> {
    console.log(`Server has started on ${port}`);
    
});