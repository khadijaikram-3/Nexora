import Product from "../models/product.model.js";

export const getCartProducts = async (req, res) => {
  try {
    const user = req.user;

    // Remove legacy/broken cart items which have no product reference
    const validCartItems = user.cartItems.filter((item) => item.product);

    if (validCartItems.length !== user.cartItems.length) {
      user.cartItems = validCartItems;
      await user.save();
    }

    const productIds = validCartItems.map((item) => item.product);

    const products = await Product.find({
      _id: { $in: productIds },
    });

    const cartItems = products.map((product) => {
      const cartItem = validCartItems.find(
        (item) =>
          item.product &&
          item.product.toString() === product._id.toString()
      );

      return {
        ...product.toJSON(),
        quantity: cartItem ? cartItem.quantity : 1,
      };
    });

    res.json(cartItems);
  } catch (error) {
    console.log("Error in getCartProducts controller:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;

    if (!productId) {
      return res.status(400).json({
        message: "Product ID is required",
      });
    }

    const productExists = await Product.findById(productId);

    if (!productExists) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // Clean legacy malformed entries first
    user.cartItems = user.cartItems.filter((item) => item.product);

    const existingItem = user.cartItems.find(
      (item) =>
        item.product &&
        item.product.toString() === productId.toString()
    );

    if (existingItem) {
      existingItem.quantity = Number(existingItem.quantity) + 1;
    } else {
      user.cartItems.push({
        product: productId,
        quantity: 1,
      });
    }

    await user.save();

    res.json(user.cartItems);
  } catch (error) {
    console.log("Error in addToCart controller:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const removeAllFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;

    if (!productId) {
      user.cartItems = [];
    } else {
      user.cartItems = user.cartItems.filter(
        (item) =>
          item.product &&
          item.product.toString() !== productId.toString()
      );
    }

    await user.save();

    res.json(user.cartItems);
  } catch (error) {
    console.log("Error in removeAllFromCart controller:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const updateQuantity = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const quantity = Number(req.body.quantity);
    const user = req.user;

    if (!Number.isInteger(quantity) || quantity < 0) {
      return res.status(400).json({
        message: "Invalid quantity",
      });
    }

    // Clean legacy entries
    user.cartItems = user.cartItems.filter((item) => item.product);

    const existingItem = user.cartItems.find(
      (item) =>
        item.product &&
        item.product.toString() === productId.toString()
    );

    if (!existingItem) {
      return res.status(404).json({
        message: "Product not found in cart",
      });
    }

    if (quantity === 0) {
      user.cartItems = user.cartItems.filter(
        (item) =>
          item.product &&
          item.product.toString() !== productId.toString()
      );
    } else {
      existingItem.quantity = quantity;
    }

    await user.save();

    res.json(user.cartItems);
  } catch (error) {
    console.log("Error in updateQuantity controller:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};