import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';
import Shopify from 'shopify-api-node';
import dotenv from 'dotenv';
dotenv.config();

const shopify = new Shopify({
  shopName: process.env.SHOPIFY_STORE_DOMAIN,
  apiKey: process.env.SHOPIFY_API_KEY,
  password: process.env.SHOPIFY_API_PASSWORD,
  autoLimit: true,
});

// @desc    Sync Product
// @route   POST /api/shopify
// @access  Private
const shopifyProductSync = asyncHandler(async (req, res) => {
  try {
    const productsFromShopify = await shopify.product.list();
    await Promise.all(
      productsFromShopify.map(async (product) => {
        const updateData = {
          shopifyId: product.id.toString(),
          name: product.title,
          description: product.body_html,
          category: product.product_type,
          status: product.status,
          image: product.image && product.image.src,
          brand: product.vendor,
          price: product.variants && product.variants[0].price,
          countInStock:
            product.variants && product.variants[0].inventory_quantity,
        };
        await Product.findOneAndUpdate(
          { shopifyId: product.id.toString() },
          updateData,
          { new: true, upsert: true }
        );
      })
    );
    res.status(200).json({ message: 'Products synced successfully' });
  } catch (error) {
    console.error('Failed to sync products:', error);
    res.status(500).json({ error: error.message });
  }
});

export { shopifyProductSync };
