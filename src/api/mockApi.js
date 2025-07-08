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

export const createOrder = (orderData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (orderData && orderData.items.length > 0)
        resolve({ success: true, orderId: Date.now() });
      else reject("Order creation failed.");
    }, 700);
  });
};

export const processPayment = (paymentData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (paymentData && paymentData.amount > 0)
        resolve({ success: true, transactionId: Date.now() });
      else reject("Payment processing failed.");
    }, 800);
  });
};
