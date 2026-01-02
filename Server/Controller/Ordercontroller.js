const Order = require("../Models/order");
const Cart = require("../Models/cart");
const Coupan = require("../Models/coupen");
const Table = require("../Models/table");
const User= require("../Models/User")

const calculateOrderNumber = () => {
    const date = Date.now();
    const randomNumber = Math.floor(Math.random() * 10000000);
    return `ORDER-${date * randomNumber}`;
};

exports.createOrder = async (req, res, next) => {
    try {
        const {
            coupanCode,
            TableNumber, // optional now
          
            notes,
            paymentMode,
        } = req.body || {};

        // ✅ Optional table
        let tableDoc = null;
        if (TableNumber) {
            tableDoc = await Table.findOne({ tablenumber:TableNumber });
            if (!tableDoc) {
                return res.status(404).json({ message: "Table not found" });
            }
        }

        // ✅ User ID
        const userId = req.user?.id;

        // ✅ Fetch cart
        const cartItems = await Cart.findOne({ userId }).populate("items.menuItemId");
        if (!cartItems || !cartItems.items.length) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        // ✅ Prepare order items & subtotal
        const orderItems = [];
        let subTotal = 0;

        cartItems.items.forEach((item) => {
            const total = item.quantity * item.menuItemId.price;
            subTotal += total;

            orderItems.push({
                menuItemId: item.menuItemId._id,
                name: item.menuItemId.name,
                price: item.menuItemId.price,
                quantity: item.quantity,
                subTotal: total,
            });
        });

        const totalCartPrice = subTotal;

        // ✅ Fetch coupon (safe trim + case-insensitive)
        let coupan = null;
        let CoupansAfterCalculation = null;

        if (coupanCode) {
            coupan = await Coupan.findOne({
                code: new RegExp(`^${coupanCode.trim()}$`, "i"),
                isActive: true,
            });

            if (coupan) {
                const now = new Date();
                const validFrom = coupan.validFrom ? new Date(coupan.validFrom) : new Date("1970-01-01");
                const validTo = coupan.validTo ? new Date(coupan.validTo) : new Date("9999-12-31");

                const minOrderMet = totalCartPrice >= (coupan.minOrderAmount || 0);
                const valid = now >= validFrom && now <= validTo;
                const firstOrderValid = true; // TODO: implement first order logic if needed

                const isAvailable = coupan.isActive && minOrderMet && valid && firstOrderValid;

                let discountAmount = 0;
                if (coupan.discountType === "fixedAmount") {
                    discountAmount = coupan.discountValue;
                }
                if (coupan.discountType === "percentage") {
                    discountAmount = (totalCartPrice * coupan.discountValue) / 100;
                    if (coupan.maxDiscount && discountAmount > coupan.maxDiscount) {
                        discountAmount = coupan.maxDiscount;
                    }
                }

                CoupansAfterCalculation = {
                    ...coupan._doc,
                    finalAmount: totalCartPrice - discountAmount,
                    discountAmount,
                    isAvailable,
                };
            }
        }
       const user =await User.findById(userId)
 
            const CustomerName=user.name  ;
            const CustomerEmail=user.email;
            const CustomerPhone=user.phone;
           

        // ✅ Generate order number
        const orderNumber = calculateOrderNumber();

        // ✅ Prepare order data
        const dataOfOrder = {
            orderNumber,
            userId,
            items: orderItems,
            subTotal,
            coupanCode: coupanCode || null,
            tableNumber: TableNumber || null,
            customerEmail:CustomerEmail||null,
            CustomerName,
            customerPhone:CustomerPhone||null,
            notes,
            paymentMode,
        };

        // ✅ Save order to DB
        const newOrder = await Order.create(dataOfOrder);

        // ✅ Response
        res.json({
            order: newOrder,
            cartItems,
            CustomerName,
            TableNumber,
            CustomerEmail,
            CustomerPhone,
            CoupansAfterCalculation,
            table: tableDoc,
        });

    } catch (error) {
        next(error);
    }
};
