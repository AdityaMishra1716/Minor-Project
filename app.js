import express from "express";
import { fileURLToPath } from 'url';
import path from 'path';
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { Console } from "console";
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
const electronicschema = {
    name: String,
    image: String,
    price: Number,
    description: String,
    rating: Number
};
const sportschema = {
    name: String,
    image: String,
    price: Number,
    description: String,
    rating: Number
};
const beautyschema = {
    name: String,
    image: String,
    price: Number,
    description: String,
    rating: Number
};
const beauty_item = mongoose.model("Beauty", beautyschema);
const sport_item = mongoose.model("sport", sportschema);
const electric_item = mongoose.model("electronic", electronicschema);


// routes work

app.get("/", async (req, res) => {
    const beauty_items = await beauty_item.find({}).exec();
    const electric_items = await electric_item.find({}).exec();
    const sport_items = await sport_item.find({}).exec();
    res.render("app.ejs", {
        beauty_items: beauty_items,
        electric_items: electric_items,
        sport_items: sport_items
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


    });
});

app.post("/wish/submit/:index", async (req, res) => {
    // wish.push(req.body.textToSubmit1);
    // console.log("wishlist", wish);
    const itemIndex = parseInt(req.params.index);
    const item1 = await sport_item.findOne().skip(itemIndex).exec();
    const item2 = await electric_item.findOne().skip(itemIndex).exec();
    const item = await beauty_item.findOne().skip(itemIndex).exec();
    if (item.name == req.body.textToSubmit1) {

        wish.push(item);

    }
    else if (item1.name == req.body.textToSubmit1) {
        wish.push(item1);
    } else if (item2.name == req.body.textToSubmit1) {
        wish.push(item2);
    }
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


app.post("/cart/submit/:index", async (req, res) => {
    // wish.push(req.body.textToSubmit1);
    // console.log("wishlist", wish);
    const itemIndex = parseInt(req.params.index);
    const item1 = await sport_item.findOne().skip(itemIndex).exec();
    const item2 = await electric_item.findOne().skip(itemIndex).exec();
    const item = await beauty_item.findOne().skip(itemIndex).exec();
    if (item.name == req.body.textToSubmit) {

        cart.push(item);
        quantity.push(req.body.quantval);

    }
    else if (item1.name == req.body.textToSubmit) {
        cart.push(item1);
        quantity.push(req.body.quantval);
    } else if (item2.name == req.body.textToSubmit) {
        cart.push(item2);
        quantity.push(req.body.quantval);
    }
    res.redirect("/");
});
app.post('/cart/remove/:index', (req, res) => {
    const itemIndex = parseInt(req.params.index);

    if (!isNaN(itemIndex) && itemIndex >= 0 && itemIndex < cart.length) {
        // Remove the item at the specified index from the cart array
        cart.splice(itemIndex, 1);
        quantity.splice(itemIndex, 1);
        console.log("cartlist after remove", cart);
        console.log("Quantity after remove", quantity);
    }

    res.redirect('/cart'); // Redirect back to the cart page
});

app.listen(port, () => {
    console.log("server on port:", port);
});



