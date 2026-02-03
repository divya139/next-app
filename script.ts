import "dotenv/config";
import { prisma } from "./lib/prisma";

async function main() {
  try {
    // Create dummy products
    const product1 = await prisma.product.create({
      data: {
        title: "Wireless Headphones",
        description: "High-quality wireless headphones with noise cancellation",
        price: 99.99,
        image: "https://example.com/headphones.jpg",
        thumbnailUrl: "https://example.com/headphones-thumb.jpg",
        category: "Electronics",
        stock: 50,
      },
    });

    const product2 = await prisma.product.create({
      data: {
        title: "USB-C Cable",
        description: "Durable USB-C charging cable, 6ft length",
        price: 14.99,
        image: "https://example.com/cable.jpg",
        thumbnailUrl: "https://example.com/cable-thumb.jpg",
        category: "Accessories",
        stock: 200,
      },
    });

    const product3 = await prisma.product.create({
      data: {
        title: "Laptop Stand",
        description: "Adjustable aluminum laptop stand for better ergonomics",
        price: 49.99,
        image: "https://example.com/stand.jpg",
        thumbnailUrl: "https://example.com/stand-thumb.jpg",
        category: "Office",
        stock: 30,
      },
    });

    console.log("✅ Dummy products created successfully!");
    console.log(product1);
    console.log(product2);
    console.log(product3);
  } catch (error) {
    console.error("❌ Error creating products:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();