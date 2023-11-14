import express from "express";
import { fileURLToPath } from 'url';
import path from 'path';
import bodyParser from "body-parser";
import mongoose from "mongoose";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cart = [];
const quantity = [];
const wish = [];
const app = express();
const port = 3000;
// Set 'ejs' as the view engine
app.set('view engine', 'ejs');

// Specify the directory where your views are located
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({ extended: true }));
// Serve static assets from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));
// Serve jQuery from the 'node_modules' directory
app.use('/scripts', express.static(path.join(__dirname, 'node_modules/jquery/dist')));

// database work
mongoose.connect('mongodb://127.0.0.1:27017/Product_list', { useNewUrlParser: true });
const productschema = {
    name: String
};
const Product = mongoose.model("product", productschema);
// const bat=new Product({
//     name:"Bat"
// });
// const football=new Product({
//     name:"football"
// });
// const ball=new Product({
//     name:"ball"
// });
// const defaultproducts=[bat,football,ball];
// Product.insertMany(defaultproducts,(err)=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log("updated")
//     }

// })

// routes work

app.get("/", (req, res) => {
    Product.find({}, (err, foundproducts) => {
        if (foundproducts.length === 0) {
            if (err) {
                console.log(err);
            } else {
                console.log("updated");
            }
            res.redirect("/");
        }
        else {
            const arr = foundproducts;
            res.render("app.ejs", {
                productName: arr,
            })
        }
    });

});

app.get("/profile", (req, res) => {

    res.render('pages/profile.ejs');
});
app.get("/order", (req, res) => {

    res.render('pages/order.ejs');
});

app.get("/wish", (req, res) => {

    res.render('pages/wish.ejs', {
        productName: wish,
        productquantity: quantity
    });
});

app.post("/wishsubmit", (req, res) => {
    wish.push(req.body.textToSubmit1);
    console.log("wishlist", wish);
    res.redirect("/");
});
app.post('/wish/remove/:index', (req, res) => {
    const itemIndex = parseInt(req.params.index);
    
    if (!isNaN(itemIndex) && itemIndex >= 0 && itemIndex < wish.length) {
        // Remove the item at the specified index from the cart array
        wish.splice(itemIndex, 1);
        
        console.log("wishlist after remove", wish);

   
    }
    
    res.redirect('/wish'); // Redirect back to the cart page
});
app.get("/cart", (req, res) => {

    res.render('pages/cart.ejs', {
        productName: cart,
        productquantity: quantity
    });

});

app.post("/submit", (req, res) => {
    // const text =req.body.textToSubmit;
    cart.push(req.body.textToSubmit);
    quantity.push(req.body.quantval);
    console.log("cartlist", cart);
    console.log("Quantity", quantity);
   
    res.redirect("/");
    
});
app.post('/cart/remove/:index', (req, res) => {
    const itemIndex = parseInt(req.params.index);
    
    if (!isNaN(itemIndex) && itemIndex >= 0 && itemIndex < cart.length) {
        // Remove the item at the specified index from the cart array
        cart.splice(itemIndex, 1);
        quantity.splice(itemIndex,1);
        console.log("cartlist after remove", cart);
    console.log("Quantity after remove", quantity);
    }
    
    res.redirect('/cart'); // Redirect back to the cart page
});

app.listen(port, () => {
    console.log("server on port:", port);
});



