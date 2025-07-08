const products = [
  {
    id: 1,
    name: "Nasi Goreng",
    price: 25000,
    image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
    categoryId: 1,
    ingredients: [{ id: 101, name: "Beras", stock: 100 }],
  },
  {
    id: 2,
    name: "Mie Ayam",
    price: 20000,
    image: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg",
    categoryId: 2,
    ingredients: [{ id: 102, name: "Mie", stock: 50 }],
  },
];

const categories = [
  { id: 1, name: "Makanan" },
  { id: 2, name: "Minuman" },
];

// Mock data for ingredients, tables, and orders
let ingredients = [
  { id: 101, name: "Beras", stock: 10, expired: false },
  { id: 102, name: "Mie", stock: 5, expired: false },
  { id: 103, name: "Telur", stock: 8, expired: false },
];

let tables = [
  { id: 1, name: "Meja 1" },
  { id: 2, name: "Meja 2" },
  { id: 3, name: "Meja 3" },
];

let orders = [];

export const getProducts = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (products) resolve(products);
      else reject("Failed to load products.");
    }, 500);
  });
};

export const getCategories = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (categories) resolve(categories);
      else reject("Failed to load categories.");
    }, 500);
  });
};

export const getIngredients = () => {
  return Promise.resolve(ingredients);
};

export const getTables = () => {
  return Promise.resolve(tables);
};

export const createOrder = (orderData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (orderData && orderData.items.length > 0) {
        const newOrder = {
          ...orderData,
          id: Date.now(),
          status: "waiting",
          createdAt: new Date().toISOString(),
        };
        orders.push(newOrder);
        resolve({ success: true, order: newOrder });
      } else reject("Order creation failed.");
    }, 700);
  });
};

export const getOrders = (status) => {
  return Promise.resolve(
    status ? orders.filter((o) => o.status === status) : orders
  );
};

export const verifyOrder = (orderId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const order = orders.find((o) => o.id === orderId);
      if (order) {
        // Reduce stock for each ingredient in the order
        order.items.forEach((item) => {
          (item.ingredients || []).forEach((ing) => {
            const stockItem = ingredients.find((i) => i.id === ing.id);
            if (stockItem) stockItem.stock -= (ing.qty || 1) * (item.qty || 1);
          });
        });
        order.status = "verified";
        resolve({ success: true, order });
      } else {
        reject("Order not found");
      }
    }, 700);
  });
};

export const processPayment = (paymentData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (paymentData && paymentData.amount > 0) {
        // Mark order as finished
        const order = orders.find((o) => o.id === paymentData.orderId);
        if (order) order.status = "done";
        resolve({ success: true, transactionId: Date.now() });
      } else reject("Payment processing failed.");
    }, 800);
  });
};

export const getStockNotifications = () => {
  return Promise.resolve(
    ingredients
      .filter((i) => i.stock < 3 || i.expired)
      .map((i) => ({
        message: i.expired
          ? `Bahan ${i.name} sudah expired!`
          : `Stok ${i.name} hampir habis!`,
        type: i.expired ? "error" : "warning",
      }))
  );
};
