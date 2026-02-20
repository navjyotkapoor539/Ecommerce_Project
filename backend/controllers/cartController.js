import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const addToCart=async(req,res)=>{
    try {
        const { productId, quantity } = req.body;
        const userId=req.user._id;
        
        // Find or create cart for user
        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
        }
        
        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        
        // Check stock
        if (product.stock < quantity) {
            return res.status(400).json({ message: "Insufficient stock" });
        }
        
        // Update cart
        const existingItemIndex = cart.items.findIndex(item => item.product.toString() === productId);
        if (existingItemIndex >= 0) {
            cart.items[existingItemIndex].quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity });
        }
        
        await cart.save();
        res.status(200).json({ message: "Item added to cart", cart });
    } catch (error) {
        console.error("Error in addToCart:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

export const removeFromCart=async(req,res)=>{
    try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product",
      "name price images"
    );

    if (!cart) {
      return res.json({ items: [] });
    }

    const totalAmount = cart.items.reduce((total, item) => {
  return total + item.product.price * item.quantity;
}, 0);

res.json({ ...cart.toObject(), totalAmount });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


export const updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(
      (i) => i.product.toString() === productId
    );

    if (!item) return res.status(404).json({ message: "Item not in cart" });

    if (quantity <= 0) {
      cart.items = cart.items.filter(
        (i) => i.product.toString() !== productId
      );
    } else {
      item.quantity = quantity;
    }

    await cart.save();
    res.json(cart);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};
