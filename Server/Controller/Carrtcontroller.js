const Cart = require("../Models/cart");
const Menu = require("../Models/menu");

// Helper to calculate total cart price
const calculateTotal = async (cart) => {
  let total = 0;
  for (const item of cart.items) {
    const menu = await Menu.findById(item.menuItemId);
    if (menu) total += Number(menu.price) * Number(item.quantity);
  }
  return total;
};

// Add item to cart
exports.addToCart = async (req, res) => {
  try {
    const { menuItemId, userId, quantity = 1 } = req.body;
    if (!userId || !menuItemId) return res.status(400).json({ message: "Missing data" });

    let cart = await Cart.findOne({ userId });
    if (!cart) cart = new Cart({ userId, items: [], totalCartPrice: 0 });

    const menuItem = await Menu.findById(menuItemId);
    if (!menuItem) return res.status(404).json({ message: "Menu item not found" });

    const existingItem = cart.items.find(i => i.menuItemId.toString() === menuItemId);
    if (existingItem) existingItem.quantity += quantity;
    else cart.items.push({ menuItemId, quantity });

    cart.totalCartPrice = await calculateTotal(cart);
    await cart.save();

    return res.status(201).json({ success: true, message: "Item added", cart });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get Cart
exports.getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId }).populate("items.menuItemId");
    if (!cart) return res.json({ success: true, cart: { items: [], totalCartPrice: 0 } });

    res.json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Increment
exports.incrementQuantity = async (req, res) => {
  try {
    const { menuItemId, userId } = req.body;
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(i => i.menuItemId.toString() === menuItemId);
    if (!item) return res.status(404).json({ message: "Item not in cart" });

    item.quantity += 1;
    cart.totalCartPrice = await calculateTotal(cart);
    await cart.save();

    res.json({ success: true, message: "Quantity increased", cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Decrement
exports.decrementQuantity = async (req, res) => {
  try {
    const { menuItemId, userId } = req.body;
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(i => i.menuItemId.toString() === menuItemId);
    if (!item) return res.status(404).json({ message: "Item not in cart" });

    if (item.quantity > 1) item.quantity -= 1;
    else cart.items = cart.items.filter(i => i.menuItemId.toString() !== menuItemId);

    cart.totalCartPrice = await calculateTotal(cart);
    await cart.save();

    res.json({ success: true, message: "Quantity decreased", cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Remove
exports.removeItem = async (req, res) => {
  try {
    const { menuItemId, userId } = req.body;
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(i => i.menuItemId.toString() !== menuItemId);
    cart.totalCartPrice = await calculateTotal(cart);
    await cart.save();

    res.json({ success: true, message: "Item removed", cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
