// Product data stored as JavaScript objects for easy updates.
const products = [
    {
        id: 1,
        name: "Premium Casual Shirt",
        category: "Men",
        subcategory: "Shirts",
        brand: "Lazy Panda",
        price: 2500,
        originalPrice: 3000,
        description: "A premium quality casual shirt made from breathable cotton. Perfect for everyday wear.",
        material: "100% Cotton",
        colors: ["Black", "White", "Blue"],
        sizes: ["S", "M", "L", "XL"],
        images: [
            "https://picsum.photos/seed/lp-shirt1/600/800",
            "https://picsum.photos/seed/lp-shirt2/600/800",
            "https://picsum.photos/seed/lp-shirt3/600/800"
        ],
        featured: true,
        status: "in-stock"
    },
    {
        id: 2,
        name: "Classic Denim Jacket",
        category: "Men",
        subcategory: "Jackets",
        brand: "Lazy Panda",
        price: 4500,
        originalPrice: 5500,
        description: "Timeless denim jacket with a modern fit. Durable and stylish.",
        material: "Denim",
        colors: ["Blue", "Black"],
        sizes: ["M", "L", "XL"],
        images: [
            "https://picsum.photos/seed/lp-jacket1/600/800",
            "https://picsum.photos/seed/lp-jacket2/600/800"
        ],
        featured: true,
        status: "in-stock"
    },
    {
        id: 3,
        name: "Slim Fit Chinos",
        category: "Men",
        subcategory: "Pants",
        brand: "Lazy Panda",
        price: 2200,
        originalPrice: null,
        description: "Comfortable slim fit chinos ideal for both casual and semi-formal occasions.",
        material: "Cotton Blend",
        colors: ["Beige", "Navy", "Olive"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        images: [
            "https://picsum.photos/seed/lp-pants1/600/800",
            "https://picsum.photos/seed/lp-pants2/600/800"
        ],
        featured: false,
        status: "out-of-stock"
    },
    {
        id: 4,
        name: "Graphic Print T-Shirt",
        category: "Men",
        subcategory: "T-Shirts",
        brand: "Lazy Panda",
        price: 1500,
        originalPrice: 1800,
        description: "Soft cotton t-shirt with unique graphic print.",
        material: "100% Cotton",
        colors: ["White", "Black", "Gray"],
        sizes: ["S", "M", "L", "XL"],
        images: [
            "https://picsum.photos/seed/lp-tshirt1/600/800",
            "https://picsum.photos/seed/lp-tshirt2/600/800"
        ],
        featured: true,
        status: "in-stock"
    },
    {
        id: 5,
        name: "Cargo Half Pants",
        category: "Men",
        subcategory: "Half Pants",
        brand: "Lazy Panda",
        price: 1800,
        originalPrice: null,
        description: "Stylish cargo half pants with multiple pockets.",
        material: "Cotton",
        colors: ["Khaki", "Black", "Green"],
        sizes: ["S", "M", "L", "XL"],
        images: [
            "https://picsum.photos/seed/lp-halfpants1/600/800"
        ],
        featured: false,
        status: "in-stock"
    },
    {
        id: 6,
        name: "Leather Belt",
        category: "Men",
        subcategory: "Belts",
        brand: "Lazy Panda",
        price: 1200,
        originalPrice: 1500,
        description: "Premium genuine leather belt with metal buckle.",
        material: "Genuine Leather",
        colors: ["Brown", "Black"],
        sizes: ["One Size"],
        images: [
            "https://picsum.photos/seed/lp-belt1/600/800"
        ],
        featured: false,
        status: "coming-soon"
    },
    {
        id: 7,
        name: "Midnight Oud Perfume",
        category: "Men",
        subcategory: "Perfumes",
        brand: "Lazy Panda",
        price: 3500,
        originalPrice: 4000,
        description: "Long-lasting oriental fragrance with notes of oud and amber.",
        material: "Eau de Parfum",
        colors: ["N/A"],
        sizes: ["50ml", "100ml"],
        images: [
            "https://picsum.photos/seed/lp-perfume1/600/800",
            "https://picsum.photos/seed/lp-perfume2/600/800"
        ],
        featured: true,
        status: "in-stock"
    },
    {
        id: 8,
        name: "Women's Elegant Dress",
        category: "Women",
        subcategory: "Clothing Collection",
        brand: "Lazy Panda",
        price: 3200,
        originalPrice: 3800,
        description: "An elegant dress for special occasions. Flowy and comfortable.",
        material: "Polyester Blend",
        colors: ["Red", "Black", "Navy"],
        sizes: ["XS", "S", "M", "L"],
        images: [
            "https://picsum.photos/seed/lp-wdress1/600/800",
            "https://picsum.photos/seed/lp-wdress2/600/800"
        ],
        featured: true,
        status: "in-stock"
    },
    {
        id: 9,
        name: "Women's Casual Top",
        category: "Women",
        subcategory: "Clothing Collection",
        brand: "Lazy Panda",
        price: 1800,
        originalPrice: 2000,
        description: "Soft and breathable casual top for everyday wear.",
        material: "Cotton",
        colors: ["White", "Pink", "Blue"],
        sizes: ["S", "M", "L"],
        images: [
            "https://picsum.photos/seed/lp-wtop1/600/800"
        ],
        featured: false,
        status: "in-stock"
    },
    {
        id: 10,
        name: "Women's Denim Jacket",
        category: "Women",
        subcategory: "Clothing Collection",
        brand: "Lazy Panda",
        price: 4200,
        originalPrice: 4800,
        description: "Classic denim jacket tailored for women.",
        material: "Denim",
        colors: ["Blue", "Black"],
        sizes: ["S", "M", "L", "XL"],
        images: [
            "https://picsum.photos/seed/lp-wjacket1/600/800",
            "https://picsum.photos/seed/lp-wjacket2/600/800"
        ],
        featured: false,
        status: "in-stock"
    }
];