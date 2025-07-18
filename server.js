const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// ตัวอย่างรายการอาหาร
const menuItems = [
  { id: 1, name: "ข้าวกะเพรา", price: 60 },
  { id: 2, name: "ต้มยำกุ้ง", price: 90 },
  { id: 3, name: "ชาเย็น", price: 25 }
];

// ออเดอร์ที่ถูกส่งมา
let orders = [];

// ส่งเมนูให้ frontend
app.get('/menu', (req, res) => {
  res.json(menuItems);
});

// เพิ่มออเดอร์ใหม่
app.post('/order', (req, res) => {
  const { table, items, note } = req.body;
  const newOrder = {
    id: orders.length + 1,
    table,
    items,
    note,
    status: 'pending',
    time: new Date().toLocaleTimeString()
  };
  orders.push(newOrder);
  console.log('New order:', newOrder);
  res.sendStatus(200);
});

// ✅ เพิ่ม endpoint นี้สำหรับดึงรายการออเดอร์ทั้งหมด
app.get('/order', (req, res) => {
  res.json(orders);
});

// เริ่มต้นเซิร์ฟเวอร์
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
