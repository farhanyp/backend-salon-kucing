import mongoose from "mongoose"
import { Category } from "../model/Category";
import { Product } from "../model/Product"
import { logger } from "../application/logger";
import { User } from "../model/User";
import { AvailableTimes } from "../model/availableTime";
import { Lodging } from "../model/Lodging";

export const connectMongoDB = async () => {

    const DB_URL = 'mongodb://localhost:27017/db_salon_hewan';
        mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => {
            console.log('Connected to MongoDB')
        })
        .catch((err) => {
            console.error('Error connecting to MongoDB:', err)
        });

}

export const closedMongoDB = async () => {

    await mongoose.connection.close();

}

export const deleteAllCategory = async () => {
    return await Category.deleteMany({});
}

export const deleteOneCategory = async () => {
    return await Category.deleteOne({name: "test"});
}

export const createManyCategory = async () => {
    const categories = [
            { name: "Makanan Kucing 1"},
            { name: "Makanan Kucing 2"},
            { name: "Makanan Kucing 3"},
            { name: "Makanan Kucing 4"},
            { name: "Makanan Kucing 5"}
        ]
    return await Category.create(categories);
}

export const deleteManyCategory = async () => {

    return await Category.deleteMany();
}

export const getManyCategory = async () => {
    return await Category.findOne();
}

export const getCategory = async () => {
    return await Category.findOne({
        name: "Makanan Kucing"
    });
}

export const createProduct = async () => {
    const testCategory = await getCategory()
    const newProduct = await Product.create({
        name: "Wiskas",
        qty: 3,
        desc: "Wiskas GG",
        price: 2000,
        categoryId: testCategory.id
    });

    const updateCategory = await Category.updateOne({_id: newProduct.categoryId}, {productId: newProduct._id})
}

export const createManyProduct = async () => {
    const testCategory = await getManyCategory()

    const products = []

    for (let i = 1; i <= 3; i++) {
        var obj = {
            "name": `Wiskas ${i}`,
            "qty": i,
            "desc": `Wiskas GG ${i}`,
            "price": i,
            categoryId: testCategory._id
        }
        products.push(obj)
    }
    return await Product.create(products);   
}

export const getOneProduct = async () => {

    return await Product.findOne();

}

export const deleteManyProduct = async () => {
    return await Product.deleteMany();
}


export const getUser = async () => {
    return await User.findOne({username: "admin-salon-hewan-admin"})
}

export const createTimes = async () => {
    const currentDate = new Date();
    const futureDate = new Date(currentDate);
    futureDate.setDate(currentDate.getDate() + 3);

    return await AvailableTimes.create({
        startTime: currentDate,
        endTime: futureDate,
    })
}

export const deleteManyTimes = async () => {
    return await AvailableTimes.deleteMany()
}

export const createLodging = async () => {
    const currentDate = new Date();
    const futureDate = new Date(currentDate);
    futureDate.setDate(currentDate.getDate() + 3)

    return await Lodging.create({
        ownerName: "test",
        phoneNumber: "084563125699",
        email: "test@gmail.com",
        petName: "test",
        petTypes: "test",
        startTime: currentDate,
        endTime: futureDate,
        specialNeeds: false,
        paymentStatus: false,
    })
}

export const getLodging = async () => {
    return await Lodging.findOne()
}

export const deleteManyLodging = async () => {
    return await Lodging.deleteMany()
}