const Menu=require("../Models/menu")
const cloudinary=require("../config/cloudinary")


exports.createMenu = async (req, res) => {
  try {
    const { name, price, description, category, isAvailable } = req.body;
    const filePath = req?.file?.path || null;

    let imgUrl = "";
    if (filePath) {
      const result = await cloudinary.uploader.upload(filePath, { folder: "menu" });
      imgUrl = result.secure_url;
    }

    const menuItem = await Menu.create({
      name: name?.trim() || "",
      price: Number(price) || 0,
      description: description?.trim() || "",
      category: category?.trim() || "",
      isAvailable: isAvailable === "IN-STOCK" ? true : false,
      image: imgUrl
    });

    res.status(201).json({ success: true, data: menuItem, message: "New menu item added" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getcategory = async (req, res, next) => {
  try {
    const { category } = req.query;
    const filter = category ? { category, isAvailable: true } : { isAvailable: true };
    const menuCategory = await Menu.find(filter);
    res.status(200).json({ success: true, data: menuCategory });
  } catch (error) {
    next(error);
  }
};