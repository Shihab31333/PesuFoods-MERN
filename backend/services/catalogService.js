const Canteen = require('../models/Canteen');
const Menu = require('../models/Menu');

const catalog = [
    { name: 'Bengaluru Kitchen', image: '/images1/BengalurKitchen.jpg', items: [['Masala Dosa', 50], ['Paneer Butter Masala', 150], ['Palav', 80], ['Idli Vada', 40], ['Biryani', 120], ['Chole Bhature', 100], ['Parota', 90]] },
    { name: 'Cantina', image: '/images1/Cantina.jpg', items: [['Parota', 50], ['Maggi', 40], ['Vada Pav', 30], ['Fried Rice', 70], ['Noodles', 60]] },
    { name: 'Food Court', image: '/images1/FoodCourt.jpg', items: [['Dosa', 30], ['Burger', 100], ['Pizza', 200], ['Pasta', 180], ['Samosa', 20]] },
];

const ensureCatalog = async () => {
    for (const canteenData of catalog) {
        const canteen = await Canteen.findOneAndUpdate(
            { name: canteenData.name },
            { $setOnInsert: { name: canteenData.name, image: canteenData.image } },
            { upsert: true, new: true },
        );
        for (const [name, price] of canteenData.items) {
            await Menu.findOneAndUpdate(
                { canteen: canteen._id, name },
                { $setOnInsert: { canteen: canteen._id, name, price, stock: 100, image: '/images/palav.jpeg' } },
                { upsert: true },
            );
        }
    }
};

module.exports = { ensureCatalog };
