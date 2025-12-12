const Cart = require("../Models/cart");
const Menu = require("../Models/menu");


exports.addToCart = async (req, res) => {
    try {
        const { menuItemId, userId, quantity = 1 } = req.body;
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, items: [], totalCartPrice: 0 });
        }

        const menuItem = await Menu.findById(menuItemId);
        if (!menuItem) return res.status(404).json({ message: "Menu item not found" });

        const existingItem = cart.items.find(i => i.menuItemId.toString() === menuItemId);
        if (existingItem) existingItem.quantity += quantity;
        else cart.items.push({ menuItemId, quantity });

        cart.totalCartPrice = await recalcTotal(cart);
        await cart.save();

        res.status(201).json({ success: true, message: "Item added to cart", cart });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get Cart by userId
exports.getCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const cart = await Cart.findOne({ userId }).populate("items.menuItemId");
        if (!cart) return res.status(404).json({ message: "Cart not found" });
        res.json({ success: true, cart });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Increment quantity
exports.incrementQuantity = async (req, res) => {
    try {
        const { menuItemId, userId } = req.body;
        const cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const item = cart.items.find(i => i.menuItemId.toString() === menuItemId);
        if (!item) return res.status(404).json({ message: "Item not in cart" });

        item.quantity += 1;
        cart.totalCartPrice = await recalcTotal(cart);
        await cart.save();

        res.json({ success: true, message: "Quantity increased", cart });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Decrement quantity
exports.decrementQuantity = async (req, res) => {
    try {
        const { menuItemId, userId } = req.body;
        const cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const item = cart.items.find(i => i.menuItemId.toString() === menuItemId);
        if (!item) return res.status(404).json({ message: "Item not in cart" });

        if (item.quantity > 1) item.quantity -= 1;
        else cart.items = cart.items.filter(i => i.menuItemId.toString() !== menuItemId);

        cart.totalCartPrice = await recalcTotal(cart);
        await cart.save();

        res.json({ success: true, message: "Quantity decreased", cart });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Remove item
exports.removeItem = async (req, res) => {
    try {
        const { menuItemId, userId } = req.body;
        const cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        cart.items = cart.items.filter(i => i.menuItemId.toString() !== menuItemId);
        cart.totalCartPrice = await recalcTotal(cart);
        await cart.save();

        res.json({ success: true, message: "Item removed", cart });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};