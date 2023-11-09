import express from "express";
import { fileURLToPath } from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
const port = 3000;

// Serve static assets from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));
// Serve jQuery from the 'node_modules' directory
app.use('/scripts', express.static(path.join(__dirname, 'node_modules/jquery/dist')));


app.get("/", (req, res) => {

    const product1=arr[0].name;
    res.render("app.ejs",{productName:arr[0].name,
        productName1:arr[1].name,
        productName2:arr[2].name,
        productName3:arr[3].name,
        productName4:arr[4].name
        
    });
});
app.post("/submit",(req,res)=>{
    
   
    res.render('pages/cart.ejs', { productName:arr[0].name });

});
app.get("/profile", (req, res) => {

    res.render('pages/profile.ejs');
});
app.get("/order", (req, res) => {

    res.render('pages/order.ejs');
});

app.get("/wish", (req, res) => {

    res.render('pages/wish.ejs');
});

app.get("/cart", (req, res) => {

    res.render('pages/cart.ejs');
});
app.get('/cart', (req, res) => {
    const productName = req.query.productName;
    res.render('cart', { productName });
});


app.listen(port, () => {
    console.log("server on port:", port);
});
const arr = [{
    name: "bat",
    id: 1
},
{
    name: "Football",
    id: 2
},
{
    name: "Racket",
    id: 3
},
{
    name: "chess",
    id: 4
},
{
    name: "ludo",
    id: 5
}
];




