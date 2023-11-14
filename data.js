import mongoose from "mongoose";
mongoose.connect('mongodb://127.0.0.1:27017/Product_list', { useNewUrlParser: true });
const productschema = {
    name: String
};
const Product = mongoose.model("product", productschema);
// const foundproducts=Product.find({});

export const foundproduct = Product.find({}, (err, foundproducts) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log(foundproducts);

    }
});




const sports_items = [
    {
        name: "bat",
        image: "img/sports/bat.jpg",
        price: 45,
        quantity: 1,
        desp: "",
        review: 4,
    },

]
