import MasalaDosa from './Mysore Masala Dosa .jpg'
import Biriyani from './ChickenBiryani.jpg';
import chole from './choleBhaturi.avif';
import Palav from './hq720.jpg'
import idly from './idlyVada.webp';
import Paneer from './Paneer-Butter-Masala.webp';
import parota from './parota.jpg'
const data = {
  canteens: [
    {
      id: 1,
      name: "Bengaluru Kitchen",
      menuItems: [
        { id: 11, name: "Masala Dosa",img:MasalaDosa , price: 50 },
        { id: 12, name: "Paneer Butter Masala", img: Paneer, price: 150 },
        { id: 13, name: "Palav", img: Palav, price: 80 },
        { id: 14, name: "Idli Vada", img: idly, price: 40 },
        { id: 15, name: "Biryani", img: Biriyani, price: 120 },
        { id: 16, name: "Chole Bhature", img: chole, price: 100 },
        { id: 17, name: "Parota", img: parota, price: 90 },
      ],
    },
    {
      id: 2,
      name: "Canteena",
      menuItems: [
        { id: 21, name: "Parota", price: 50, img: '/images/palav.jpeg' },
        { id: 22, name: "Maggi", price: 40, img: '/images/palav.jpeg' },
        { id: 23, name: "Vada Pav", price: 30, img: '/images/palav.jpeg' },
        { id: 24, name: "Fried Rice", price: 70, img: '/images/palav.jpeg' },
        { id: 25, name: "Noodles", price: 60, img: '/images/palav.jpeg' },
      ],
    },
    {
      id: 3,
      name: "Food Court",
      menuItems: [
        { id: 31, name: "Dosa", price: 30, img: '/images/palav.jpeg' },
        { id: 32, name: "Burger", price: 100, img: '/images/palav.jpeg' },
        { id: 33, name: "Pizza", price: 200, img: '/images/palav.jpeg' },
        { id: 34, name: "Pasta", price: 180, img: '/images/palav.jpeg' },
        { id: 35, name: "Samosa", price: 20, img: '/images/palav.jpeg' },
      ],
    },
  ],
};

export default data;