const Menu = require("../Models/menu");
const cloudinary = require("../config/cloudinary")

// 👉 Get all products
exports.createproduct = async (req, res) => {
  try {
    const { name, price, description, category, isAvailable } = req.body;
    const filePath = req?.file?.path || null;

    let imgUrl = "";
    if (filePath) {
      const result = await cloudinary.uploader.upload(filePath, { folder: "products" });
      imgUrl = result.secure_url;
    }

    const newProduct = await Menu.create({
      name: name?.trim() || "",
      price: Number(price) || 0,
      description: description?.trim() || "",
      category: category?.trim() || "",
      isAvailable: isAvailable === "IN-STOCK" ? true : false,
      image: imgUrl
    });

    res.status(201).json({ success: true, product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getproduct = async (req, res) => {
  try {
    const products = await Menu.find();
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 👉 Update product
exports.updateproduct = async (req, res) => {
  try {
    const updated = await Menu.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated)
      return res.status(404).json({ success: false, message: "Product not found" });

    res.status(200).json({ success: true, product: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 👉 Delete product
exports.deleteproduct = async (req, res) => {
  try {
    const deleted = await Menu.findByIdAndDelete(req.params.id);

    if (!deleted)
      return res.status(404).json({ success: false, message: "Product not found" });

    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
