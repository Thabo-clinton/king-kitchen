// King Kitchen - Product Data

// Sample product data for the website
const products = [
    {
        id: 1,
        name: "Professional Espresso Machine",
        category: "Espresso Machines",
        subcategory: "Automatic",
        price: 799.99,
        originalPrice: 999.99,
        discountPercentage: 20,
        image: "images/Keurig K-Express Single Serve K-Cup Pod Coffee….jpeg",
        badge: "Best Seller",
        rating: 4.8,
        description: "Create barista-quality espresso at home with this professional-grade machine. Features programmable settings, a built-in grinder, and a powerful steam wand for perfect milk frothing.",
        specifications: {
            dimensions: "13.8 x 11 x 15.8 inches",
            weight: "26.4 pounds",
            wattage: "1450W",
            capacity: "2L water tank",
            material: "Stainless Steel",
            warranty: "2 years"
        },
        isBestSeller: true,
        isHotSale: true,
        isDiscount: true
    },
    {
        id: 2,
        name: "Stand Mixer with Attachments",
        category: "Blenders & Mixers",
        subcategory: "Stand Mixers",
        price: 349.99,
        originalPrice: 449.99,
        discountPercentage: 22,
        image: "images/Make holiday baking a breeze with @cuisinart….jpeg",
        badge: "Hot Sale",
        rating: 4.9,
        description: "Versatile stand mixer with 10 speeds and multiple attachments. Perfect for baking, cooking, and food preparation. Includes dough hook, flat beater, and wire whip.",
        specifications: {
            dimensions: "14.1 x 8.7 x 14 inches",
            weight: "25 pounds",
            wattage: "325W",
            capacity: "5 quart bowl",
            material: "Die-cast metal",
            warranty: "1 year"
        },
        isBestSeller: true,
        isHotSale: true,
        isDiscount: true
    },
    {
        id: 3,
        name: "Digital Air Fryer",
        category: "Air Fryers",
        subcategory: "Basket Air Fryers",
        price: 129.99,
        originalPrice: 179.99,
        discountPercentage: 28,
        image: "images/Sleek, modern air fryer for healthier, delicious….jpeg",
        badge: "30% Off",
        rating: 4.7,
        description: "Cook healthier meals with 85% less oil. Digital touchscreen with 8 preset cooking programs. Large capacity perfect for family meals.",
        specifications: {
            dimensions: "11.8 x 14.3 x 12.7 inches",
            weight: "11.9 pounds",
            wattage: "1700W",
            capacity: "5.8 quart",
            material: "Plastic with stainless steel basket",
            warranty: "1 year"
        },
        isBestSeller: false,
        isHotSale: true,
        isDiscount: true
    },
    {
        id: 4,
        name: "Copper Cookware Set",
        category: "Cookware",
        subcategory: "Pots & Pans",
        price: 249.99,
        originalPrice: 299.99,
        discountPercentage: 17,
        image: "images/59a331c6-5e28-4800-9886-a595973ef410.jpeg",
        badge: "New",
        rating: 4.6,
        description: "Premium 10-piece copper cookware set with stainless steel interior. Excellent heat conductivity and elegant design for your kitchen.",
        specifications: {
            dimensions: "Varies by piece",
            weight: "18 pounds (set)",
            material: "Copper exterior, stainless steel interior",
            includes: "2 saucepans, 1 stockpot, 2 frying pans, 5 lids",
            dishwasherSafe: "No",
            warranty: "Lifetime"
        },
        isBestSeller: false,
        isHotSale: true,
        isDiscount: true
    },
    {
        id: 5,
        name: "Smart Toaster",
        category: "Small Appliances",
        subcategory: "Toasters",
        price: 79.99,
        originalPrice: 89.99,
        discountPercentage: 11,
        image: "images/Toaster 2 Scheiben Edelstahl Toaster Retro mit 6….jpeg",
        badge: "10% Off",
        rating: 4.5,
        description: "Smart 2-slice toaster with digital display and precise browning control. Features defrost, reheat, and bagel functions.",
        specifications: {
            dimensions: "11.4 x 7.1 x 8.4 inches",
            weight: "4.1 pounds",
            wattage: "900W",
            material: "Stainless Steel",
            slots: "2 wide slots",
            warranty: "1 year"
        },
        isBestSeller: false,
        isHotSale: false,
        isDiscount: true
    },
    {
        id: 6,
        name: "Premium Chef's Knife",
        category: "Cookware",
        subcategory: "Knife Sets",
        price: 89.99,
        originalPrice: 119.99,
        discountPercentage: 25,
        image: "images/Premium Ceramic Knife Set 5 Pieces Chef….jpeg",
        badge: "Best Seller",
        rating: 4.9,
        description: "Professional 8-inch chef's knife with Damascus steel blade. Ergonomic handle and perfect balance for precision cutting.",
        specifications: {
            dimensions: "13 x 1.8 x 0.1 inches",
            weight: "8.5 ounces",
            material: "Damascus steel blade, G10 handle",
            bladeLength: "8 inches",
            dishwasherSafe: "No",
            warranty: "Lifetime"
        },
        isBestSeller: true,
        isHotSale: false,
        isDiscount: true
    },
    {
        id: 7,
        name: "Electric Kettle",
        category: "Small Appliances",
        subcategory: "Kettles",
        price: 59.99,
        originalPrice: 69.99,
        discountPercentage: 14,
        image: "images/Hazel Quinn Retro X Eduardo Recife Collaboration….jpeg",
        badge: "Hot Sale",
        rating: 4.7,
        description: "Fast-boiling electric kettle with temperature control. Perfect for tea, coffee, and other hot beverages.",
        specifications: {
            dimensions: "8.7 x 6.3 x 9.8 inches",
            weight: "2.6 pounds",
            wattage: "1500W",
            capacity: "1.7 liters",
            material: "Stainless Steel",
            warranty: "1 year"
        },
        isBestSeller: false,
        isHotSale: true,
        isDiscount: true
    },
    {
        id: 8,
        name: "Manual Espresso Maker",
        category: "Espresso Machines",
        subcategory: "Manual",
        price: 149.99,
        originalPrice: 179.99,
        discountPercentage: 17,
        image: "images/74c97d77-34b0-4816-8c6b-dfa1fe52c373.jpeg",
        badge: "Best Seller",
        rating: 4.6,
        description: "Portable manual espresso maker for authentic espresso anywhere. No electricity required, just hot water and ground coffee.",
        specifications: {
            dimensions: "8.1 x 2.8 x 2.8 inches",
            weight: "0.8 pounds",
            capacity: "80ml water",
            material: "Stainless Steel",
            pressure: "18 bar",
            warranty: "1 year"
        },
        isBestSeller: true,
        isHotSale: false,
        isDiscount: true
    },
    {
        id: 9,
        name: "Food Processor",
        category: "Small Appliances",
        subcategory: "Food Processors",
        price: 119.99,
        originalPrice: 149.99,
        discountPercentage: 20,
        image: "images/99bb3a38-d862-48ab-96b6-fc2d1a3cf9ee.jpeg",
        badge: "20% Off",
        rating: 4.5,
        description: "Versatile food processor with multiple attachments for chopping, slicing, shredding, and mixing. Large capacity bowl for family meals.",
        specifications: {
            dimensions: "10.2 x 8.4 x 15.9 inches",
            weight: "9.8 pounds",
            wattage: "720W",
            capacity: "9 cup bowl",
            material: "Plastic with stainless steel blades",
            warranty: "1 year"
        },
        isBestSeller: false,
        isHotSale: true,
        isDiscount: true
    },
    {
        id: 10,
        name: "Cast Iron Dutch Oven",
        category: "Cookware",
        subcategory: "Pots & Pans",
        price: 89.99,
        originalPrice: 119.99,
        discountPercentage: 25,
        image: "images/82cc0ba9-b298-43c6-9ecd-c27631b59ef2.jpeg",
        badge: "Hot Sale",
        rating: 4.8,
        description: "Enameled cast iron dutch oven for slow cooking, braising, and baking. Excellent heat retention and distribution.",
        specifications: {
            dimensions: "13.5 x 11 x 6 inches",
            weight: "13.5 pounds",
            capacity: "6 quart",
            material: "Enameled Cast Iron",
            ovenSafe: "Up to 500°F",
            warranty: "Lifetime"
        },
        isBestSeller: false,
        isHotSale: true,
        isDiscount: true
    },
    {
        id: 11,
        name: "Hand Blender Set",
        category: "Blenders & Mixers",
        subcategory: "Hand Mixers",
        price: 69.99,
        originalPrice: 89.99,
        discountPercentage: 22,
        image: "images/One 850-watt base powers a hand blender & hand….jpeg",
        badge: "20% Off",
        rating: 4.4,
        description: "Versatile hand blender set with multiple attachments. Includes blending wand, whisk, and chopper for various kitchen tasks.",
        specifications: {
            dimensions: "15.8 x 4.8 x 4.5 inches",
            weight: "3.1 pounds",
            wattage: "300W",
            speeds: "5 speed settings",
            material: "Stainless Steel and Plastic",
            warranty: "1 year"
        },
        isBestSeller: false,
        isHotSale: false,
        isDiscount: true
    },
    {
        id: 12,
        name: "Toaster Oven Air Fryer Combo",
        category: "Air Fryers",
        subcategory: "Toaster Oven Air Fryers",
        price: 199.99,
        originalPrice: 249.99,
        discountPercentage: 20,
        image: "images/The best toaster ovens of 2019 - CNET.jpeg",
        badge: "Best Seller",
        rating: 4.7,
        description: "Multifunctional appliance combining toaster oven and air fryer. 12 cooking functions including bake, roast, toast, and air fry.",
        specifications: {
            dimensions: "16.7 x 16.4 x 14.6 inches",
            weight: "26.4 pounds",
            wattage: "1800W",
            capacity: "0.6 cubic feet",
            material: "Stainless Steel",
            warranty: "2 years"
        },
        isBestSeller: true,
        isHotSale: false,
        isDiscount: true
    },
    {
        id: 13,
        name: "Smart Rice Cooker",
        category: "Small Appliances",
        subcategory: "Rice Cookers",
        price: 129.99,
        originalPrice: 159.99,
        discountPercentage: 19,
        image: "images/Midea Smart Rice Cooker Mobile APP Control 4L….jpeg",
        badge: "Hot Sale",
        rating: 4.7,
        description: "Programmable rice cooker with multiple cooking functions. Makes perfect rice every time with smart technology and preset programs.",
        specifications: {
            dimensions: "11.8 x 10.1 x 11.0 inches",
            weight: "7.5 pounds",
            wattage: "860W",
            capacity: "5.5 cups uncooked rice",
            material: "Stainless Steel with non-stick inner pot",
            warranty: "1 year"
        },
        isBestSeller: false,
        isHotSale: true,
        isDiscount: true
    },
    {
        id: 14,
        name: "Sous Vide Precision Cooker",
        category: "Small Appliances",
        subcategory: "Specialty Appliances",
        price: 149.99,
        originalPrice: 199.99,
        discountPercentage: 25,
        image: "images/Anova Culinary Sous Vide Precision Cooker….jpeg",
        badge: "25% Off",
        rating: 4.8,
        description: "Professional-grade sous vide precision cooker for restaurant-quality results at home. Bluetooth connectivity and app control for perfect cooking.",
        specifications: {
            dimensions: "3.1 x 5.3 x 12.8 inches",
            weight: "2.5 pounds",
            wattage: "1000W",
            temperature: "32°F to 197°F (0°C to 92°C)",
            material: "Stainless Steel and plastic",
            warranty: "2 years"
        },
        isBestSeller: false,
        isHotSale: true,
        isDiscount: true
    },
    {
        id: 15,
        name: "Ceramic Knife Set",
        category: "Cookware",
        subcategory: "Knife Sets",
        price: 79.99,
        originalPrice: 99.99,
        discountPercentage: 20,
        image: "images/Equip your chef's kitchen with this set of….jpeg",
        badge: "Best Seller",
        rating: 4.6,
        description: "Ultra-sharp ceramic knife set that stays sharp 10x longer than steel knives. Includes chef's knife, santoku knife, utility knife, and paring knife.",
        specifications: {
            dimensions: "Varies by knife",
            weight: "1.8 pounds (set)",
            material: "Zirconium ceramic blades, ergonomic handles",
            includes: "4 knives and protective sheaths",
            dishwasherSafe: "No",
            warranty: "5 years"
        },
        isBestSeller: true,
        isHotSale: false,
        isDiscount: true
    },
    {
        id: 16,
        name: "Digital Kitchen Scale",
        category: "Kitchen Gadgets",
        subcategory: "Measuring Tools",
        price: 24.99,
        originalPrice: 34.99,
        discountPercentage: 29,
        image: "images/Weigh more of your ingredients at once with the….jpeg",
        badge: "Hot Sale",
        rating: 4.7,
        description: "Precision digital kitchen scale with multiple measurement units. Perfect for baking, cooking, and portion control.",
        specifications: {
            dimensions: "8.0 x 6.0 x 1.5 inches",
            weight: "0.8 pounds",
            capacity: "11 pounds (5kg)",
            accuracy: "0.05oz (1g)",
            material: "Stainless Steel platform, plastic base",
            warranty: "1 year"
        },
        isBestSeller: false,
        isHotSale: true,
        isDiscount: true
    },
    {
        id: 17,
        name: "Cold Brew Coffee Maker",
        category: "Small Appliances",
        subcategory: "Coffee Makers",
        price: 39.99,
        originalPrice: 49.99,
        discountPercentage: 20,
        image: "images/Reimagine your coffee experience with the new….jpeg",
        badge: "20% Off",
        rating: 4.5,
        description: "Make smooth, low-acid cold brew coffee at home. Glass carafe with stainless steel filter for pure flavor extraction.",
        specifications: {
            dimensions: "5.0 x 7.5 x 9.5 inches",
            weight: "1.5 pounds",
            capacity: "1 liter",
            material: "Borosilicate glass, stainless steel filter",
            dishwasherSafe: "Yes",
            warranty: "1 year"
        },
        isBestSeller: false,
        isHotSale: false,
        isDiscount: true
    },
    {
        id: 18,
        name: "Silicone Baking Mat Set",
        category: "Cookware",
        subcategory: "Bakeware",
        price: 19.99,
        originalPrice: 29.99,
        discountPercentage: 33,
        image: "images/PRICES MAY VARY_ DURABLE BAKING SOLUTION - Crafted….jpeg",
        badge: "30%+ Off",
        rating: 4.8,
        description: "Non-stick silicone baking mats for perfect cookies, pastries, and more. Eliminates the need for parchment paper or cooking sprays.",
        specifications: {
            dimensions: "16.5 x 11.6 inches each",
            weight: "0.6 pounds (set)",
            material: "Food-grade silicone, fiberglass core",
            temperature: "Heat resistant up to 480°F",
            dishwasherSafe: "Yes",
            warranty: "Lifetime"
        },
        isBestSeller: false,
        isHotSale: true,
        isDiscount: true
    },
    {
        id: 19,
        name: "Smart Instant Pot",
        category: "Small Appliances",
        subcategory: "Multi-Cookers",
        price: 129.99,
        originalPrice: 169.99,
        discountPercentage: 24,
        image: "images/Transform your cooking experience with these 10….jpeg",
        badge: "Best Seller",
        rating: 4.9,
        description: "10-in-1 smart multi-cooker with WiFi connectivity and app control. Functions include pressure cooking, slow cooking, rice cooking, steaming, and more.",
        specifications: {
            dimensions: "13.2 x 12.2 x 12.5 inches",
            weight: "11.8 pounds",
            wattage: "1200W",
            capacity: "6 quart",
            material: "Stainless Steel",
            warranty: "1 year"
        },
        isBestSeller: true,
        isHotSale: true,
        isDiscount: true
    },
    {
        id: 20,
        name: "Professional Mandoline Slicer",
        category: "Kitchen Gadgets",
        subcategory: "Utensils",
        price: 49.99,
        originalPrice: 69.99,
        discountPercentage: 29,
        image: "images/Effortless Precision_ Slice, Dice, and Julienne….jpeg",
        badge: "Hot Sale",
        rating: 4.6,
        description: "Professional-grade mandoline slicer with adjustable thickness settings. Perfect for slicing vegetables, fruits, and cheeses with precision.",
        specifications: {
            dimensions: "15.5 x 5.0 x 4.0 inches",
            weight: "1.9 pounds",
            material: "Stainless Steel blades, BPA-free plastic",
            settings: "5 thickness settings, 3 julienne options",
            dishwasherSafe: "Yes (except blades)",
            warranty: "1 year"
        },
        isBestSeller: false,
        isHotSale: true,
        isDiscount: true
    },
    {
        id: 21,
        name: "Copper Cocktail Set",
        category: "Kitchen Gadgets",
        subcategory: "Bar Tools",
        price: 69.99,
        originalPrice: 89.99,
        discountPercentage: 22,
        image: "images/VonShef Cocktail Shaker Set Copper, 550ml Parisian….jpeg",
        badge: "20% Off",
        rating: 4.7,
        description: "Premium 8-piece copper cocktail set for professional-quality drinks at home. Includes shaker, jigger, strainer, muddler, and more.",
        specifications: {
            dimensions: "Varies by piece",
            weight: "2.5 pounds (set)",
            material: "Stainless Steel with copper finish",
            includes: "Shaker, jigger, strainer, muddler, bar spoon, 2 pourers, ice tongs",
            dishwasherSafe: "No",
            warranty: "1 year"
        },
        isBestSeller: false,
        isHotSale: false,
        isDiscount: true
    },
    {
        id: 22,
        name: "Smart Coffee Grinder",
        category: "Small Appliances",
        subcategory: "Coffee Makers",
        price: 99.99,
        originalPrice: 129.99,
        discountPercentage: 23,
        image: "images/309835ea-5826-4ef4-9c32-536cf26e57cb.jpeg",
        badge: "Hot Sale",
        rating: 4.8,
        description: "Conical burr grinder with 40 precise grind settings. Digital display and programmable dosing for the perfect coffee every time.",
        specifications: {
            dimensions: "6.3 x 4.4 x 13.8 inches",
            weight: "4.5 pounds",
            wattage: "165W",
            capacity: "0.75 pounds of beans",
            material: "Stainless Steel and plastic",
            warranty: "1 year"
        },
        isBestSeller: false,
        isHotSale: true,
        isDiscount: true
    },
    {
        id: 23,
        name: "Vacuum Sealer System",
        category: "Small Appliances",
        subcategory: "Specialty Appliances",
        price: 89.99,
        originalPrice: 119.99,
        discountPercentage: 25,
        image: "images/[PRODUTO INTERNACIONAL_COMPRA INTERNACIONAL] Toda….jpeg",
        badge: "25% Off",
        rating: 4.6,
        description: "Preserve food up to 5x longer with this automatic vacuum sealer. Perfect for meal prep, sous vide cooking, and food storage.",
        specifications: {
            dimensions: "15.9 x 7.2 x 3.0 inches",
            weight: "4.2 pounds",
            wattage: "120W",
            material: "Stainless Steel and plastic",
            includes: "Starter kit with 10 bags",
            warranty: "1 year"
        },
        isBestSeller: false,
        isHotSale: false,
        isDiscount: true
    },
    {
        id: 24,
        name: "Premium Bamboo Cutting Board Set",
        category: "Kitchen Gadgets",
        subcategory: "Utensils",
        price: 39.99,
        originalPrice: 59.99,
        discountPercentage: 33,
        image: "images/Our 3-piece organic bamboo cutting board set is….jpeg",
        badge: "30%+ Off",
        rating: 4.7,
        description: "Set of 3 premium bamboo cutting boards in different sizes. Naturally antibacterial, knife-friendly, and environmentally sustainable.",
        specifications: {
            dimensions: "Large: 18x12 inches, Medium: 15x10 inches, Small: 12x8 inches",
            weight: "5.2 pounds (set)",
            material: "100% Moso bamboo",
            features: "Juice groove, handles, reversible design",
            care: "Hand wash only",
            warranty: "Lifetime"
        },
        isBestSeller: false,
        isHotSale: true,
        isDiscount: true
    }
];

// Function to get products by category
function getProductsByCategory(category) {
    return products.filter(product => product.category === category);
}

// Function to get products by subcategory
function getProductsBySubcategory(subcategory) {
    return products.filter(product => product.subcategory === subcategory);
}

// Function to get hot sales products
function getHotSales() {
    return products.filter(product => product.isHotSale);
}

// Function to get best seller products
function getBestSellers() {
    return products.filter(product => product.isBestSeller);
}

// Function to get discounted products
function getDiscountedProducts() {
    return products.filter(product => product.isDiscount);
}

// Function to get products by discount percentage
function getProductsByDiscountPercentage(percentage) {
    if (percentage === "all") {
        return getDiscountedProducts();
    }
    
    const minPercentage = parseInt(percentage);
    const maxPercentage = percentage === "30" ? 100 : parseInt(percentage) + 10;
    
    return products.filter(product => 
        product.discountPercentage >= minPercentage && 
        product.discountPercentage < maxPercentage
    );
}

// Function to search products
function searchProducts(query) {
    query = query.toLowerCase();
    return products.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.category.toLowerCase().includes(query) || 
        product.subcategory.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );
}

// Function to get product by ID
function getProductById(id) {
    return products.find(product => product.id === id);
}
