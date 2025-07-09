const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

app.use(cors());
app.use(express.json());

// เมนูอาหารจำลอง
const menuItems = [
  { id: 1, name: "ข้าวกระเพรา", price: 60, category: "อาหารจานเดียว" },
  { id: 2, name: "ต้มยำกุ้ง", price: 90, category: "ต้ม/แกง" },
  { id: 3, name: "ชาเย็น", price: 25, category: "เครื่องดื่ม" }
];

// ออเดอร์จำลอง
let orders = [];

// ส่งเมนูให้ Frontend
app.get('/menu', (req, res) => {
  res.json(menuItems);
});

// รับออเดอร์
app.post('/order', (req, res) => {
  const { table, items, note } = req.body;
  const newOrder = {
    id: orders.length + 1,
    table,
    items,
    note,
    status: "pending",
    created_at: new Date()
  };
  orders.push(newOrder);
  res.json({ success: true, order: newOrder });
});

// ดูออเดอร์ทั้งหมด
app.get('/orders', (req, res) => {
  res.json(orders);
});

// เริ่มต้น server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
