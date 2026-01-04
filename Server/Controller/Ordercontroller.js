const Order = require("../Models/order");
const Cart = require("../Models/cart");
const Coupan = require("../Models/coupen");
const User = require("../Models/User");

const calculateOrderNumber = () => {
    const date = Date.now();
    const randomNumber = Math.floor(Math.random() * 100000);
    return `ORDER-${date}-${randomNumber}`;
};

exports.createOrder = async (req, res, next) => {
    try {
        const { coupanCode, tableNumber, notes, paymentMethod } = req.body || {};
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // 🛒 Cart
        const cartItems = await Cart.findOne({ userId }).populate("items.menuItemId");
        if (!cartItems || !cartItems.items.length) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        // 📦 Order items
        let subTotal = 0;
        const orderItems = cartItems.items.map(item => {
            const total = item.quantity * item.menuItemId.price;
            subTotal += total;

            return {
                menuItemId: item.menuItemId._id,
                name: item.menuItemId.name,
                price: item.menuItemId.price,
                quantity: item.quantity,
                subTotal: total
            };
        });

        let totalCartPrice = subTotal;
        let CoupansAfterCalculation = null;

        // 🎟 Coupon
        if (coupanCode) {
            const coupan = await Coupan.findOne({
                code: new RegExp(`^${coupanCode.trim()}$`, "i"),
                isActive: true
            });

            if (coupan) {
                let discountAmount = 0;

                if (coupan.discountType === "fixedAmount") {
                    discountAmount = coupan.discountValue;
                } else if (coupan.discountType === "percentage") {
                    discountAmount = (subTotal * coupan.discountValue) / 100;
                    if (coupan.maxDiscount) {
                        discountAmount = Math.min(discountAmount, coupan.maxDiscount);
                    }
                }

                totalCartPrice = subTotal - discountAmount;

                CoupansAfterCalculation = {
                    code: coupan.code,
                    discountAmount,
                    finalAmount: totalCartPrice
                };
            }
        }

        // 👤 User
        const user = await User.findById(userId);

        // 📄 Order data
        const dataOfOrder = {
            orderNumber: calculateOrderNumber(),
            userId,
            items: orderItems,
            subTotal,
            finalAmount: totalCartPrice,
            coupanCode: coupanCode || null,
            tableNumber: tableNumber || null,
            customerEmail: user.email,
            customerName: user.name,
            customerPhone: user.phone,
            notes,
            paymentMethod
        };

        // 💾 Save Order
        const order = await Order.create(dataOfOrder);

        // 🔄 Update user & cart
     user.totalOrders = (user.totalOrders || 0) + 1;
await user.save();


        cartItems.items = [];
        cartItems.totalCartPrices = 0;
        await cartItems.save();

        res.status(201).json({
            message: "Order placed successfully",
            order,
            coupon: CoupansAfterCalculation
        });

    } catch (error) {
        next(error);
    }
};
