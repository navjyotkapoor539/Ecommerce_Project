import Product from "../models/Product.js";
import Category from "../models/Category.js";
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category,discount=0 } = req.body;
    if (!name || !description || price == null) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const imageUrls =
  req.files?.map((file) => file.path) ||
  (req.body.images ? req.body.images : []);

    const product = await Product.create({
      name,
      description,
      price,
      stock,
      discount,
      images:imageUrls,
      category,
      createdBy: req.user._id,
    });
    res.status(201).json(product);
  } catch (error) {
    console.error("Create product error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getProducts = async (req, res) => {
  try {
    const {
      search,
      minPrice,
      maxPrice,
      category,
      sale,
      sort = "latest",
      page = 1,
      limit = 15,
    } = req.query;

    const query = { isActive: true };

    // 🔍 Search
    if (search) {
      query.$text = { $search: search };
    }

    // 💰 Price Filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // 🏷 Category Filter
   if (category) {
      const categoryDoc = await Category.findOne({ slug: category });

      if (!categoryDoc) {
        return res.json({
          total: 0,
          page: 1,
          pages: 0,
          products: [],
        });
      }

      query.category = categoryDoc._id;
    }

    if (sale === "true") {
  query.discount = { $gt: 0 };
}

    // 🔃 Sorting
    let sortOption = {};
    switch (sort) {
      case "price_asc":
        sortOption.price = 1;
        break;
      case "price_desc":
        sortOption.price = -1;
        break;
      default:
        sortOption.createdAt = -1;
    }

    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      Product.find(query).populate("category", "name slug").sort(sortOption).skip(skip).limit(Number(limit)),
      Product.countDocuments(query),
    ]);

    res.json({
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      products,
    });
  } catch (error) {
    console.error("Get products error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "category",
      "name"
    );
    if (!product || !product.isActive) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    Object.assign(product, req.body);
    await product.save();

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.isActive = false;
    await product.save();

    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
