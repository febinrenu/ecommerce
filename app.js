// ECommerce Pro - Professional E-commerce Application (Fixed Version)
// Complete Implementation for Hackathon Submission

// Application State Management
let currentUser = null;
let currentPage = 'homepage';
let cart = JSON.parse(localStorage.getItem('ecommerce_cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('ecommerce_wishlist')) || [];
let isAuthMode = 'login';
let otpTimer = null;
let currentOtpEmail = '';
let currentViewMode = 'grid';

// Complete Product Database with Real Data
const products = [
  {
    "id": 1, "name": "iPhone 15 Pro Max", "category": "Electronics", "subcategory": "Smartphones", 
    "brand": "Apple", "price": 1199, "originalPrice": 1399, "rating": 4.8, "reviews": 2847, 
    "image": "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400", 
    "description": "The ultimate iPhone with titanium design, A17 Pro chip, and professional camera system with advanced computational photography", 
    "stock": 25, "specifications": [
      {"key": "Display", "value": "6.7-inch Super Retina XDR with ProMotion"},
      {"key": "Chip", "value": "A17 Pro with 6-core GPU"},
      {"key": "Storage", "value": "256GB"},
      {"key": "Camera", "value": "48MP Main + 12MP Ultra Wide + 12MP Telephoto with 5x zoom"}
    ], 
    "features": ["5G Connectivity", "Face ID", "MagSafe Wireless Charging", "IP68 Water Resistant"], 
    "isFeatured": true, "isOnSale": true
  },
  {
    "id": 2, "name": "Samsung Galaxy S24 Ultra", "category": "Electronics", "subcategory": "Smartphones", 
    "brand": "Samsung", "price": 999, "originalPrice": 1199, "rating": 4.7, "reviews": 1923, 
    "image": "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400", 
    "description": "Flagship Android phone with S Pen, AI features, and revolutionary 200MP camera system", 
    "stock": 18, "specifications": [
      {"key": "Display", "value": "6.8-inch Dynamic AMOLED 2X 120Hz"},
      {"key": "Processor", "value": "Snapdragon 8 Gen 3"},
      {"key": "RAM", "value": "12GB LPDDR5X"},
      {"key": "Storage", "value": "512GB UFS 4.0"}
    ], 
    "features": ["S Pen Included", "100x Space Zoom", "AI Photo Editing", "5000mAh Battery"], 
    "isFeatured": true, "isOnSale": true
  },
  {
    "id": 3, "name": "MacBook Air M3", "category": "Electronics", "subcategory": "Laptops", 
    "brand": "Apple", "price": 1299, "originalPrice": 1399, "rating": 4.9, "reviews": 3421, 
    "image": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400", 
    "description": "Ultra-thin laptop with M3 chip, all-day battery life, and stunning Liquid Retina display", 
    "stock": 12, "specifications": [
      {"key": "Display", "value": "13.6-inch Liquid Retina with True Tone"},
      {"key": "Chip", "value": "Apple M3 with 8-core CPU"},
      {"key": "Memory", "value": "16GB Unified Memory"},
      {"key": "Storage", "value": "512GB SSD"}
    ], 
    "features": ["18-hour battery life", "Fanless design", "Touch ID", "Two Thunderbolt ports"], 
    "isFeatured": true, "isOnSale": true
  },
  {
    "id": 4, "name": "Sony WH-1000XM5", "category": "Electronics", "subcategory": "Headphones", 
    "brand": "Sony", "price": 299, "originalPrice": 399, "rating": 4.6, "reviews": 2156, 
    "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400", 
    "description": "Industry-leading noise canceling wireless headphones with premium sound quality and 30-hour battery", 
    "stock": 45, "specifications": [
      {"key": "Battery Life", "value": "30 hours with ANC"},
      {"key": "Noise Canceling", "value": "Advanced Active Noise Canceling"},
      {"key": "Connectivity", "value": "Bluetooth 5.2 with LDAC"},
      {"key": "Weight", "value": "250g lightweight design"}
    ], 
    "features": ["Quick Charge 3min=3hrs", "Multipoint Connection", "Speak-to-Chat", "Touch Controls"], 
    "isFeatured": false, "isOnSale": true
  },
  {
    "id": 5, "name": "iPad Pro 12.9-inch M2", "category": "Electronics", "subcategory": "Tablets", 
    "brand": "Apple", "price": 1099, "originalPrice": 1199, "rating": 4.8, "reviews": 1567, 
    "image": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400", 
    "description": "The ultimate iPad experience with M2 chip, Liquid Retina XDR display, and Apple Pencil support", 
    "stock": 32, "specifications": [
      {"key": "Display", "value": "12.9-inch Liquid Retina XDR"},
      {"key": "Chip", "value": "Apple M2"},
      {"key": "Storage", "value": "256GB"},
      {"key": "Camera", "value": "12MP Wide + 10MP Ultra Wide"}
    ], 
    "features": ["Apple Pencil support", "Magic Keyboard compatible", "5G capable", "All-day battery"], 
    "isFeatured": false, "isOnSale": true
  },
  {
    "id": 6, "name": "Nike Air Jordan 1 High", "category": "Clothing", "subcategory": "Shoes", 
    "brand": "Nike", "price": 170, "originalPrice": 200, "rating": 4.5, "reviews": 892, 
    "image": "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400", 
    "description": "Iconic basketball shoes with premium leather construction and classic Chicago colorway", 
    "stock": 67, "specifications": [
      {"key": "Material", "value": "Premium Leather Upper"},
      {"key": "Sole", "value": "Rubber Cupsole"},
      {"key": "Closure", "value": "Lace-up"},
      {"key": "Style", "value": "High-top Basketball"}
    ], 
    "features": ["Air cushioning", "Durable construction", "Classic colorways", "Premium materials"], 
    "isFeatured": false, "isOnSale": true
  },
  {
    "id": 7, "name": "Levi's 501 Original Jeans", "category": "Clothing", "subcategory": "Pants", 
    "brand": "Levi's", "price": 89, "originalPrice": 120, "rating": 4.3, "reviews": 1567, 
    "image": "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400", 
    "description": "The original blue jean with authentic straight-leg fit and button fly closure", 
    "stock": 156, "specifications": [
      {"key": "Fabric", "value": "100% Cotton Denim"},
      {"key": "Fit", "value": "Straight Leg"},
      {"key": "Rise", "value": "Mid Rise"},
      {"key": "Closure", "value": "Button Fly"}
    ], 
    "features": ["Shrink-to-fit", "Classic 5-pocket styling", "Multiple wash options", "Timeless design"], 
    "isFeatured": false, "isOnSale": true
  },
  {
    "id": 8, "name": "Champion Reverse Weave Hoodie", "category": "Clothing", "subcategory": "Hoodies", 
    "brand": "Champion", "price": 65, "originalPrice": 85, "rating": 4.4, "reviews": 734, 
    "image": "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400", 
    "description": "Classic heavyweight hoodie with reverse weave construction for reduced shrinkage", 
    "stock": 89, "specifications": [
      {"key": "Material", "value": "Cotton/Polyester Blend"},
      {"key": "Weight", "value": "Heavyweight 12oz"},
      {"key": "Construction", "value": "Reverse Weave"},
      {"key": "Fit", "value": "Regular Fit"}
    ], 
    "features": ["Reduced shrinkage", "Kangaroo pocket", "Ribbed cuffs", "Iconic C logo"], 
    "isFeatured": false, "isOnSale": true
  },
  {
    "id": 9, "name": "The Psychology of Money", "category": "Books", "subcategory": "Business", 
    "brand": "Harriman House", "price": 16, "originalPrice": 20, "rating": 4.7, "reviews": 12847, 
    "image": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400", 
    "description": "Timeless lessons on wealth, greed, and happiness by Morgan Housel - a modern classic", 
    "stock": 89, "specifications": [
      {"key": "Pages", "value": "304 pages"},
      {"key": "Format", "value": "Paperback"},
      {"key": "Publisher", "value": "Harriman House"},
      {"key": "Language", "value": "English"}
    ], 
    "features": ["Wall Street Journal Bestseller", "Financial wisdom", "Easy to understand", "Practical insights"], 
    "isFeatured": true, "isOnSale": true
  },
  {
    "id": 10, "name": "Atomic Habits", "category": "Books", "subcategory": "Self-Help", 
    "brand": "Avery", "price": 14, "originalPrice": 18, "rating": 4.8, "reviews": 23156, 
    "image": "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400", 
    "description": "An easy and proven way to build good habits and break bad ones by James Clear", 
    "stock": 134, "specifications": [
      {"key": "Pages", "value": "320 pages"},
      {"key": "Format", "value": "Hardcover"},
      {"key": "Publisher", "value": "Avery Publishing"},
      {"key": "ISBN", "value": "978-0735211292"}
    ], 
    "features": ["#1 New York Times Bestseller", "Practical strategies", "Scientific approach", "Life-changing methods"], 
    "isFeatured": true, "isOnSale": true
  },
  {
    "id": 11, "name": "Think and Grow Rich", "category": "Books", "subcategory": "Business", 
    "brand": "Tribeca Books", "price": 12, "originalPrice": 15, "rating": 4.6, "reviews": 8921, 
    "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400", 
    "description": "Napoleon Hill's timeless classic on success principles and wealth building", 
    "stock": 78, "specifications": [
      {"key": "Pages", "value": "238 pages"},
      {"key": "Format", "value": "Paperback"},
      {"key": "Publisher", "value": "Tribeca Books"},
      {"key": "Year", "value": "Original 1937, Reprint 2023"}
    ], 
    "features": ["Classic success principles", "Millionaire interviews", "Proven strategies", "Timeless wisdom"], 
    "isFeatured": false, "isOnSale": true
  },
  {
    "id": 12, "name": "Instant Pot Duo Plus", "category": "Home & Garden", "subcategory": "Kitchen", 
    "brand": "Instant Pot", "price": 89, "originalPrice": 120, "rating": 4.5, "reviews": 5678, 
    "image": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400", 
    "description": "9-in-1 multi-use programmable pressure cooker with smart programs", 
    "stock": 34, "specifications": [
      {"key": "Capacity", "value": "6 Quart"},
      {"key": "Functions", "value": "9-in-1 Multi-Cooker"},
      {"key": "Material", "value": "Stainless Steel"},
      {"key": "Power", "value": "1000 Watts"}
    ], 
    "features": ["Pressure cook", "Slow cook", "Rice cooker", "Steamer"], 
    "isFeatured": false, "isOnSale": true
  },
  {
    "id": 13, "name": "Dyson V15 Detect", "category": "Home & Garden", "subcategory": "Cleaning", 
    "brand": "Dyson", "price": 599, "originalPrice": 749, "rating": 4.6, "reviews": 2876, 
    "image": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400", 
    "description": "Intelligent cordless vacuum with laser dust detection and powerful suction", 
    "stock": 23, "specifications": [
      {"key": "Runtime", "value": "60 minutes"},
      {"key": "Weight", "value": "3.1kg"},
      {"key": "Dustbin", "value": "0.76L capacity"},
      {"key": "Filtration", "value": "Advanced 5-stage HEPA"}
    ], 
    "features": ["Laser dust detection", "LCD screen", "Auto mode", "Whole-machine HEPA filtration"], 
    "isFeatured": false, "isOnSale": true
  },
  {
    "id": 14, "name": "KitchenAid Stand Mixer", "category": "Home & Garden", "subcategory": "Kitchen", 
    "brand": "KitchenAid", "price": 379, "originalPrice": 449, "rating": 4.7, "reviews": 3421, 
    "image": "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400", 
    "description": "Professional 5-quart stand mixer with 10 speeds and multiple attachments", 
    "stock": 45, "specifications": [
      {"key": "Capacity", "value": "5 Quart Bowl"},
      {"key": "Speeds", "value": "10-Speed"},
      {"key": "Motor", "value": "325 Watts"},
      {"key": "Attachments", "value": "3 Included"}
    ], 
    "features": ["Planetary mixing", "Tilt-head design", "Dishwasher-safe bowl", "Multiple colors"], 
    "isFeatured": false, "isOnSale": true
  },
  {
    "id": 15, "name": "Wilson Pro Staff Tennis Racket", "category": "Sports", "subcategory": "Tennis", 
    "brand": "Wilson", "price": 189, "originalPrice": 229, "rating": 4.4, "reviews": 567, 
    "image": "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400", 
    "description": "Professional tennis racket used by Roger Federer with precision control", 
    "stock": 78, "specifications": [
      {"key": "Weight", "value": "315g unstrung"},
      {"key": "Head Size", "value": "97 square inches"},
      {"key": "String Pattern", "value": "16x19"},
      {"key": "Balance", "value": "315mm"}
    ], 
    "features": ["Pro player choice", "Precision control", "Premium feel", "Tournament ready"], 
    "isFeatured": false, "isOnSale": true
  },
  {
    "id": 16, "name": "Adidas Ultraboost 23", "category": "Sports", "subcategory": "Running", 
    "brand": "Adidas", "price": 160, "originalPrice": 190, "rating": 4.3, "reviews": 1234, 
    "image": "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400", 
    "description": "Premium running shoes with Boost midsole technology and Primeknit upper", 
    "stock": 92, "specifications": [
      {"key": "Drop", "value": "10mm heel-to-toe"},
      {"key": "Weight", "value": "310g"},
      {"key": "Upper", "value": "Primeknit"},
      {"key": "Midsole", "value": "Boost Technology"}
    ], 
    "features": ["Energy return", "Adaptive fit", "Continental rubber outsole", "Responsive cushioning"], 
    "isFeatured": false, "isOnSale": true
  },
  {
    "id": 17, "name": "Fitbit Charge 5", "category": "Sports", "subcategory": "Fitness", 
    "brand": "Fitbit", "price": 149, "originalPrice": 179, "rating": 4.2, "reviews": 2156, 
    "image": "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400", 
    "description": "Advanced fitness tracker with built-in GPS and health monitoring", 
    "stock": 67, "specifications": [
      {"key": "Battery", "value": "7 days"},
      {"key": "Display", "value": "Color AMOLED"},
      {"key": "Water Resistance", "value": "50 meters"},
      {"key": "Sensors", "value": "Multi-sensor array"}
    ], 
    "features": ["Built-in GPS", "Heart rate tracking", "Sleep monitoring", "Stress management"], 
    "isFeatured": false, "isOnSale": true
  },
  {
    "id": 18, "name": "Olay Regenerist Serum", "category": "Beauty", "subcategory": "Skincare", 
    "brand": "Olay", "price": 28, "originalPrice": 35, "rating": 4.2, "reviews": 3456, 
    "image": "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400", 
    "description": "Anti-aging serum with amino-peptides and niacinamide for smoother skin", 
    "stock": 167, "specifications": [
      {"key": "Size", "value": "50ml bottle"},
      {"key": "Type", "value": "Anti-aging serum"},
      {"key": "Key Ingredient", "value": "Amino-peptides"},
      {"key": "Skin Type", "value": "All skin types"}
    ], 
    "features": ["Firms skin texture", "Reduces fine lines", "Improves elasticity", "Fragrance-free formula"], 
    "isFeatured": false, "isOnSale": true
  },
  {
    "id": 19, "name": "Urban Decay Eyeshadow Palette", "category": "Beauty", "subcategory": "Makeup", 
    "brand": "Urban Decay", "price": 54, "originalPrice": 65, "rating": 4.6, "reviews": 2890, 
    "image": "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400", 
    "description": "12-shade eyeshadow palette with matte and shimmer finishes in neutral tones", 
    "stock": 45, "specifications": [
      {"key": "Shades", "value": "12 coordinated colors"},
      {"key": "Finishes", "value": "Matte & Shimmer"},
      {"key": "Formula", "value": "Highly pigmented"},
      {"key": "Cruelty-free", "value": "Yes, certified"}
    ], 
    "features": ["Blendable formula", "Long-lasting wear", "Versatile looks", "Professional mirror"], 
    "isFeatured": false, "isOnSale": true
  },
  {
    "id": 20, "name": "Fenty Beauty Foundation", "category": "Beauty", "subcategory": "Makeup", 
    "brand": "Fenty Beauty", "price": 36, "originalPrice": 42, "rating": 4.5, "reviews": 4521, 
    "image": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400", 
    "description": "Full coverage foundation with 40 shades for all skin tones", 
    "stock": 89, "specifications": [
      {"key": "Coverage", "value": "Full coverage"},
      {"key": "Finish", "value": "Matte"},
      {"key": "Shades", "value": "40 available"},
      {"key": "Size", "value": "32ml"}
    ], 
    "features": ["Inclusive shade range", "Transfer-resistant", "Oil-free formula", "All-day wear"], 
    "isFeatured": false, "isOnSale": true
  }
];

// User Database
const users = [
  {
    "id": 1, "name": "John Customer", "email": "user@ecommerce.com", "password": "User@123", 
    "role": "customer", "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150", 
    "phone": "+1 (555) 123-4567", "address": {
      "street": "123 Main Street", "city": "New York", "state": "NY", "zipCode": "10001", "country": "USA"
    }, "joined": "2024-01-15"
  },
  {
    "id": 2, "name": "Admin User", "email": "admin@ecommerce.com", "password": "Admin@123", 
    "role": "admin", "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150", 
    "phone": "+1 (555) 987-6543", "joined": "2023-06-01"
  },
  {
    "id": 3, "name": "Sarah Wilson", "email": "sarah@example.com", "password": "Sarah@456", 
    "role": "customer", "avatar": "https://images.unsplash.com/photo-1494790108755-2616b332c3a7?w=150", 
    "phone": "+1 (555) 246-8135", "address": {
      "street": "456 Oak Avenue", "city": "Los Angeles", "state": "CA", "zipCode": "90210", "country": "USA"
    }, "joined": "2024-03-22"
  }
];

// Orders Database
let orders = [
  {
    "id": 1001, "userId": 1, "status": "Delivered", "total": 1199, 
    "items": [{"productId": 1, "name": "iPhone 15 Pro Max", "quantity": 1, "price": 1199, "image": "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=100"}], 
    "date": "2025-08-15", "deliveryDate": "2025-08-18", "address": {"street": "123 Main Street", "city": "New York", "state": "NY", "zipCode": "10001"}, 
    "paymentMethod": "Credit Card", "trackingNumber": "TRK001234567"
  },
  {
    "id": 1002, "userId": 1, "status": "Shipped", "total": 340, 
    "items": [{"productId": 6, "name": "Nike Air Jordan 1 High", "quantity": 2, "price": 170, "image": "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=100"}], 
    "date": "2025-08-28", "estimatedDelivery": "2025-09-03", "address": {"street": "123 Main Street", "city": "New York", "state": "NY", "zipCode": "10001"}, 
    "paymentMethod": "PayPal", "trackingNumber": "TRK001234568"
  },
  {
    "id": 1003, "userId": 1, "status": "Processing", "total": 89, 
    "items": [{"productId": 12, "name": "Instant Pot Duo Plus", "quantity": 1, "price": 89, "image": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=100"}], 
    "date": "2025-09-01", "estimatedDelivery": "2025-09-05", "address": {"street": "123 Main Street", "city": "New York", "state": "NY", "zipCode": "10001"}, 
    "paymentMethod": "Credit Card"
  },
  {
    "id": 1004, "userId": 3, "status": "Delivered", "total": 599, 
    "items": [{"productId": 13, "name": "Dyson V15 Detect", "quantity": 1, "price": 599, "image": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100"}], 
    "date": "2025-08-20", "deliveryDate": "2025-08-25", "address": {"street": "456 Oak Avenue", "city": "Los Angeles", "state": "CA", "zipCode": "90210"}, 
    "paymentMethod": "Credit Card", "trackingNumber": "TRK001234569"
  }
];

// Reviews Database
const reviews = [
  {"id": 1, "productId": 1, "userId": 1, "rating": 5, "comment": "Amazing phone! The camera quality is incredible and the battery lasts all day.", "date": "2025-08-20", "helpful": 24, "verified": true},
  {"id": 2, "productId": 1, "userId": 3, "rating": 4, "comment": "Great phone but expensive. Worth it for the features though.", "date": "2025-08-18", "helpful": 12, "verified": true},
  {"id": 3, "productId": 9, "userId": 1, "rating": 5, "comment": "Life-changing book! Really helps understand money psychology.", "date": "2025-08-25", "helpful": 8, "verified": true}
];

// Utility Functions
function showToast(message, type = 'success', title = '') {
    const toast = document.getElementById('toast');
    if (!toast) return;
    
    const toastTitle = document.getElementById('toastTitle');
    const toastMessage = document.getElementById('toastMessage');
    const toastIcon = toast.querySelector('.toast-icon i');
    
    if (toastTitle) toastTitle.textContent = title || (type === 'success' ? 'Success!' : 
                                      type === 'error' ? 'Error!' : 
                                      type === 'warning' ? 'Warning!' : 'Info!');
    if (toastMessage) toastMessage.textContent = message;
    
    if (toastIcon) {
        toastIcon.className = `fas ${type === 'success' ? 'fa-check-circle' : 
                              type === 'error' ? 'fa-exclamation-circle' : 
                              type === 'warning' ? 'fa-exclamation-triangle' : 
                              'fa-info-circle'}`;
    }
    
    toast.className = `toast ${type}`;
    
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 4000);
}

function saveCart() {
    localStorage.setItem('ecommerce_cart', JSON.stringify(cart));
}

function saveWishlist() {
    localStorage.setItem('ecommerce_wishlist', JSON.stringify(wishlist));
}

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const count = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = count;
        cartCount.style.display = count > 0 ? 'flex' : 'none';
    }
}

function updateWishlistUI() {
    const wishlistCount = document.getElementById('wishlistCount');
    if (wishlistCount) {
        wishlistCount.textContent = wishlist.length;
        wishlistCount.style.display = wishlist.length > 0 ? 'flex' : 'none';
    }
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Modal Management
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

function hideAllModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => modal.classList.add('hidden'));
    document.body.style.overflow = 'auto';
}

// Page Navigation - FIXED
function showPage(pageId) {
    console.log('Switching to page:', pageId);
    
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
        page.classList.add('hidden');
    });
    
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        targetPage.classList.remove('hidden');
        currentPage = pageId;
        window.scrollTo(0, 0);
        
        // Force re-render if going back to homepage
        if (pageId === 'homepage') {
            renderProducts();
            renderFeaturedProducts();
        }
    }
}

// Authentication System
function login(email, password) {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        currentUser = user;
        updateUserUI();
        hideAllModals();
        showToast(`Welcome back, ${user.name}!`, 'success', 'Login Successful');
        return true;
    }
    return false;
}

function signup(name, email, password) {
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        return false;
    }
    
    const newUser = {
        id: users.length + 1,
        name,
        email,
        password,
        role: 'customer',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
        phone: '',
        joined: new Date().toISOString().split('T')[0]
    };
    
    users.push(newUser);
    currentUser = newUser;
    updateUserUI();
    hideAllModals();
    showToast(`Account created successfully! Welcome, ${name}!`, 'success', 'Registration Complete');
    return true;
}

function logout() {
    currentUser = null;
    updateUserUI();
    showPage('homepage');
    resetFilters();
    renderProducts();
    showToast('You have been logged out successfully', 'info', 'Logged Out');
}

function updateUserUI() {
    const loginBtn = document.getElementById('loginBtn');
    const userMenu = document.getElementById('userMenu');
    const userName = document.getElementById('userName');
    const userRole = document.getElementById('userRole');
    const dashboardBtn = document.getElementById('dashboardBtn');
    const userAvatar = document.getElementById('userAvatar');
    
    if (currentUser) {
        if (loginBtn) loginBtn.style.display = 'none';
        if (userMenu) userMenu.classList.remove('hidden');
        if (userName) userName.textContent = `${currentUser.name}`;
        if (userRole) userRole.textContent = currentUser.role;
        if (userAvatar) userAvatar.src = currentUser.avatar;
        
        if (currentUser.role === 'admin') {
            if (dashboardBtn) dashboardBtn.style.display = 'flex';
        } else {
            if (dashboardBtn) dashboardBtn.style.display = 'none';
        }
    } else {
        if (loginBtn) loginBtn.style.display = 'flex';
        if (userMenu) userMenu.classList.add('hidden');
    }
}

// OTP System
function sendOTP(email) {
    currentOtpEmail = email;
    const otp = Math.floor(100000 + Math.random() * 900000);
    
    showModal('otpModal');
    showToast(`OTP sent to ${email}. Use code: ${otp}`, 'info', 'OTP Sent');
    
    // Store OTP in session (for demo purposes)
    sessionStorage.setItem('current_otp', otp);
    
    startOTPTimer();
}

function startOTPTimer() {
    let timeLeft = 30;
    const timerElement = document.getElementById('otpTimer');
    const resendButton = document.getElementById('resendOtp');
    
    if (otpTimer) clearInterval(otpTimer);
    
    otpTimer = setInterval(() => {
        timeLeft--;
        if (timerElement) timerElement.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(otpTimer);
            if (timerElement) timerElement.parentElement.classList.add('hidden');
            if (resendButton) resendButton.classList.remove('hidden');
        }
    }, 1000);
}

function verifyOTP(enteredOTP) {
    const storedOTP = sessionStorage.getItem('current_otp');
    if (enteredOTP === storedOTP) {
        const user = users.find(u => u.email === currentOtpEmail) || users[0]; // Default to first user
        currentUser = user;
        updateUserUI();
        hideAllModals();
        sessionStorage.removeItem('current_otp');
        showToast(`Welcome ${user.name}! Logged in via OTP`, 'success', 'OTP Verified');
        return true;
    }
    return false;
}

// Product Management
function renderProducts(productsToRender = null, containerId = 'productsGrid') {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    let filteredProducts = productsToRender || getFilteredProducts();
    
    if (filteredProducts.length === 0) {
        const noProducts = document.getElementById('noProducts');
        if (noProducts) noProducts.classList.remove('hidden');
        container.innerHTML = '';
        return;
    }
    
    const noProducts = document.getElementById('noProducts');
    if (noProducts) noProducts.classList.add('hidden');
    
    container.innerHTML = filteredProducts.map(product => {
        const discount = product.originalPrice && product.originalPrice > product.price ? 
            Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
        
        const isInWishlist = wishlist.includes(product.id);
        const isInCart = cart.some(item => item.productId === product.id);
        
        return `
            <div class="product-card" onclick="showProductDetail(${product.id})">
                ${product.isFeatured ? '<div class="product-badge featured">Featured</div>' : ''}
                ${discount > 0 ? `<div class="product-badge">${discount}% OFF</div>` : ''}
                
                <button class="wishlist-toggle ${isInWishlist ? 'active' : ''}" 
                        onclick="event.stopPropagation(); toggleWishlist(${product.id})">
                    <i class="fas fa-heart"></i>
                </button>
                
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy" 
                         onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                    <div style="display: none; width: 100%; height: 100%; background: linear-gradient(135deg, #f0f0f0, #e0e0e0); align-items: center; justify-content: center; font-size: 48px;">
                        📱
                    </div>
                </div>
                
                <div class="product-info">
                    <div class="product-category">${product.category}</div>
                    <h3 class="product-name">${product.name}</h3>
                    <div class="product-rating">
                        <div class="rating-stars">${generateStars(product.rating)}</div>
                        <span class="rating-value">${product.rating}</span>
                        <span class="rating-count">(${product.reviews})</span>
                    </div>
                    <div class="product-price">
                        <span class="price-current">${formatCurrency(product.price)}</span>
                        ${product.originalPrice && product.originalPrice > product.price ? 
                            `<span class="price-original">${formatCurrency(product.originalPrice)}</span>` : ''}
                        ${discount > 0 ? `<span class="price-discount">${discount}% OFF</span>` : ''}
                    </div>
                    <div class="product-actions" onclick="event.stopPropagation()">
                        <button class="btn-add-cart" onclick="addToCart(${product.id})" 
                                ${product.stock === 0 ? 'disabled' : ''}>
                            <i class="fas fa-shopping-cart"></i>
                            ${product.stock === 0 ? 'Out of Stock' : isInCart ? 'In Cart' : 'Add to Cart'}
                        </button>
                        <button class="btn-quick-view" onclick="showProductDetail(${product.id})">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function renderFeaturedProducts() {
    const featuredProducts = products.filter(p => p.isFeatured).slice(0, 6);
    const container = document.getElementById('featuredGrid');
    
    if (!container || featuredProducts.length === 0) return;
    
    container.innerHTML = featuredProducts.map(product => {
        const discount = product.originalPrice && product.originalPrice > product.price ? 
            Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
        
        return `
            <div class="product-card featured" onclick="showProductDetail(${product.id})">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy"
                         onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                    <div style="display: none; width: 100%; height: 100%; background: linear-gradient(135deg, #f0f0f0, #e0e0e0); align-items: center; justify-content: center; font-size: 48px;">
                        📱
                    </div>
                </div>
                <div class="product-info">
                    <div class="product-category">${product.category}</div>
                    <h3 class="product-name">${product.name}</h3>
                    <div class="product-rating">
                        <div class="rating-stars">${generateStars(product.rating)}</div>
                        <span class="rating-value">${product.rating}</span>
                        <span class="rating-count">(${product.reviews})</span>
                    </div>
                    <div class="product-price">
                        <span class="price-current">${formatCurrency(product.price)}</span>
                        ${discount > 0 ? `<span class="price-discount">${discount}% OFF</span>` : ''}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function showProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const content = document.getElementById('productDetailContent');
    if (!content) return;
    
    const discount = product.originalPrice && product.originalPrice > product.price ? 
        Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
    
    const isInWishlist = wishlist.includes(product.id);
    const isInCart = cart.some(item => item.productId === product.id);
    
    content.innerHTML = `
        <div class="product-detail-image">
            <img src="${product.image}" alt="${product.name}"
                 onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
            <div style="display: none; width: 100%; height: 400px; background: linear-gradient(135deg, #f0f0f0, #e0e0e0); align-items: center; justify-content: center; font-size: 120px; border-radius: 12px;">
                📱
            </div>
        </div>
        <div class="product-detail-info">
            <div class="product-category">
                <i class="fas fa-tag"></i> ${product.category} > ${product.subcategory || product.category}
            </div>
            <h1>${product.name}</h1>
            <div class="product-rating">
                <div class="rating-stars">${generateStars(product.rating)}</div>
                <span class="rating-value">${product.rating}</span>
                <span class="rating-count">(${product.reviews} reviews)</span>
            </div>
            <div class="product-price">
                <span class="price-current">${formatCurrency(product.price)}</span>
                ${product.originalPrice && product.originalPrice > product.price ? 
                    `<span class="price-original">${formatCurrency(product.originalPrice)}</span>` : ''}
                ${discount > 0 ? `<span class="price-discount">${discount}% OFF</span>` : ''}
            </div>
            
            <div class="product-description">
                <p>${product.description}</p>
            </div>
            
            ${product.specifications && product.specifications.length ? `
            <div class="product-specifications">
                <h3><i class="fas fa-clipboard-list"></i> Specifications</h3>
                <ul class="spec-list">
                    ${product.specifications.map(spec => `
                        <li class="spec-item">
                            <span class="spec-key">${spec.key}:</span>
                            <span class="spec-value">${spec.value}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
            ` : ''}
            
            ${product.features && product.features.length ? `
            <div class="product-features">
                <h3><i class="fas fa-star"></i> Key Features</h3>
                <div class="features-list">
                    ${product.features.map(feature => `
                        <div class="feature-item">
                            <i class="fas fa-check"></i>
                            <span>${feature}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            ` : ''}
            
            <div class="product-actions">
                <button class="btn btn--primary btn--lg" onclick="addToCart(${product.id})" 
                        ${product.stock === 0 ? 'disabled' : ''} style="flex: 1;">
                    <i class="fas fa-shopping-cart"></i>
                    ${product.stock === 0 ? 'Out of Stock' : isInCart ? 'Added to Cart' : 'Add to Cart'}
                </button>
                <button class="btn btn--outline btn--lg" onclick="toggleWishlist(${product.id})">
                    <i class="fas fa-heart ${isInWishlist ? '' : 'far'}"></i>
                    ${isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                </button>
            </div>
            
            <div class="product-stock-info" style="margin-top: 20px; color: var(--color-text-secondary); font-size: 14px;">
                <p><i class="fas fa-box"></i> <strong>${product.stock}</strong> items in stock</p>
                <p><i class="fas fa-truck"></i> Free shipping on orders over $50</p>
                <p><i class="fas fa-undo"></i> 30-day return policy</p>
            </div>
        </div>
    `;
    
    showPage('productDetail');
}

// Shopping Cart Functions - FIXED
function addToCart(productId) {
    if (!currentUser) {
        showModal('authModal');
        showToast('Please login to add items to cart', 'warning', 'Login Required');
        return;
    }
    
    const product = products.find(p => p.id === productId);
    if (!product || product.stock === 0) return;
    
    const existingItem = cart.find(item => item.productId === productId);
    
    if (existingItem) {
        if (existingItem.quantity < product.stock) {
            existingItem.quantity += 1;
            showToast(`${product.name} quantity updated in cart`, 'success');
        } else {
            showToast('Cannot add more items - stock limit reached', 'warning');
            return;
        }
    } else {
        cart.push({
            productId: productId,
            quantity: 1,
            price: product.price,
            name: product.name,
            image: product.image
        });
        showToast(`${product.name} added to cart!`, 'success');
    }
    
    saveCart();
    updateCartUI();
    renderProducts();
}

function removeFromCart(productId) {
    const product = products.find(p => p.id === productId);
    cart = cart.filter(item => item.productId !== productId);
    saveCart();
    updateCartUI();
    renderCart();
    renderProducts();
    
    if (product) {
        showToast(`${product.name} removed from cart`, 'info');
    }
}

function updateCartQuantity(productId, newQuantity) {
    const product = products.find(p => p.id === productId);
    const item = cart.find(item => item.productId === productId);
    
    if (item && product) {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else if (newQuantity > product.stock) {
            showToast(`Only ${product.stock} items available`, 'warning');
        } else {
            item.quantity = newQuantity;
            saveCart();
            updateCartUI();
            renderCart();
        }
    }
}

function toggleWishlist(productId) {
    if (!currentUser) {
        showModal('authModal');
        showToast('Please login to manage wishlist', 'warning', 'Login Required');
        return;
    }
    
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const index = wishlist.indexOf(productId);
    
    if (index > -1) {
        wishlist.splice(index, 1);
        showToast(`${product.name} removed from wishlist`, 'info');
    } else {
        wishlist.push(productId);
        showToast(`${product.name} added to wishlist`, 'success');
    }
    
    saveWishlist();
    updateWishlistUI();
    renderProducts();
    
    if (currentPage === 'productDetail') {
        showProductDetail(productId);
    }
}

function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const cartSubtotal = document.getElementById('cartSubtotal');
    const cartTotal = document.getElementById('cartTotal');
    
    if (!cartItems) return;
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h3>Your cart is empty</h3>
                <p>Add some products to get started!</p>
            </div>
        `;
        if (cartSubtotal) cartSubtotal.textContent = '$0.00';
        if (cartTotal) cartTotal.textContent = '$10.00';
        return;
    }
    
    let subtotal = 0;
    
    cartItems.innerHTML = cart.map(item => {
        const product = products.find(p => p.id === item.productId);
        if (!product) return '';
        
        const itemTotal = product.price * item.quantity;
        subtotal += itemTotal;
        
        return `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${product.image}" alt="${product.name}"
                         onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                    <div style="display: none; width: 80px; height: 80px; background: linear-gradient(135deg, #f0f0f0, #e0e0e0); align-items: center; justify-content: center; font-size: 24px; border-radius: 8px;">
                        📱
                    </div>
                </div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${product.name}</div>
                    <div class="cart-item-details">${product.brand} • ${product.category}</div>
                    <div class="cart-item-price">${formatCurrency(product.price)}</div>
                </div>
                <div class="cart-item-controls">
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateCartQuantity(${item.productId}, ${item.quantity - 1})">
                            <i class="fas fa-minus"></i>
                        </button>
                        <input type="number" class="quantity-input" value="${item.quantity}" 
                               min="1" max="${product.stock}" 
                               onchange="updateCartQuantity(${item.productId}, parseInt(this.value))">
                        <button class="quantity-btn" onclick="updateCartQuantity(${item.productId}, ${item.quantity + 1})"
                                ${item.quantity >= product.stock ? 'disabled' : ''}>
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    <button class="btn btn--outline btn--sm" onclick="removeFromCart(${item.productId})">
                        <i class="fas fa-trash"></i> Remove
                    </button>
                </div>
            </div>
        `;
    }).join('');
    
    const shipping = 10;
    const total = subtotal + shipping;
    
    if (cartSubtotal) cartSubtotal.textContent = formatCurrency(subtotal);
    if (cartTotal) cartTotal.textContent = formatCurrency(total);
    
    updateCheckoutTotals(subtotal);
}

function updateCheckoutTotals(subtotal) {
    const orderSubtotal = document.getElementById('orderSubtotal');
    const orderTax = document.getElementById('orderTax');
    const orderTotal = document.getElementById('orderTotal');
    
    const shipping = 10;
    const tax = subtotal * 0.18;
    const total = subtotal + shipping + tax;
    
    if (orderSubtotal) orderSubtotal.textContent = formatCurrency(subtotal);
    if (orderTax) orderTax.textContent = formatCurrency(tax);
    if (orderTotal) orderTotal.textContent = formatCurrency(total);
}

// Search and Filter Functions - FIXED
function getFilteredProducts() {
    const searchInput = document.getElementById('searchInput');
    const sortSelect = document.getElementById('sortSelect');
    const priceRange = document.getElementById('priceRange');
    const ratingFilter = document.getElementById('ratingFilter');
    const brandFilter = document.getElementById('brandFilter');
    const activeCategory = document.querySelector('.nav-item.active');
    
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    const selectedCategory = activeCategory ? activeCategory.dataset.category : 'all';
    const sortBy = sortSelect ? sortSelect.value : 'default';
    const maxPrice = priceRange ? parseInt(priceRange.value) : 2000;
    const minRating = ratingFilter ? parseFloat(ratingFilter.value) : 0;
    const selectedBrand = brandFilter ? brandFilter.value : '';
    
    let filtered = products.filter(product => {
        const matchesSearch = !searchTerm || 
            product.name.toLowerCase().includes(searchTerm) || 
            product.description.toLowerCase().includes(searchTerm) ||
            product.brand.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm);
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        const matchesPrice = product.price <= maxPrice;
        const matchesRating = product.rating >= minRating;
        const matchesBrand = !selectedBrand || product.brand === selectedBrand;
        
        return matchesSearch && matchesCategory && matchesPrice && matchesRating && matchesBrand;
    });
    
    // Sort products
    switch (sortBy) {
        case 'price-low':
            filtered.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filtered.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filtered.sort((a, b) => b.rating - a.rating);
            break;
        case 'newest':
            filtered.sort((a, b) => b.id - a.id);
            break;
        case 'popular':
            filtered.sort((a, b) => b.reviews - a.reviews);
            break;
        default:
            filtered.sort((a, b) => {
                if (a.isFeatured && !b.isFeatured) return -1;
                if (!a.isFeatured && b.isFeatured) return 1;
                return b.rating - a.rating;
            });
    }
    
    return filtered;
}

function populateBrandFilter() {
    const brandFilter = document.getElementById('brandFilter');
    if (!brandFilter) return;
    
    const brands = [...new Set(products.map(p => p.brand))].sort();
    
    brandFilter.innerHTML = '<option value="">All Brands</option>' + 
        brands.map(brand => `<option value="${brand}">${brand}</option>`).join('');
}

function resetFilters() {
    const searchInput = document.getElementById('searchInput');
    const sortSelect = document.getElementById('sortSelect');
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');
    const ratingFilter = document.getElementById('ratingFilter');
    const brandFilter = document.getElementById('brandFilter');
    
    if (searchInput) searchInput.value = '';
    if (sortSelect) sortSelect.value = 'default';
    if (priceRange) priceRange.value = '2000';
    if (priceValue) priceValue.textContent = '$0 - $2000';
    if (ratingFilter) ratingFilter.value = '0';
    if (brandFilter) brandFilter.value = '';
    
    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
    const allProducts = document.querySelector('.nav-item[data-category="all"]');
    if (allProducts) allProducts.classList.add('active');
}

// Admin Functions
function renderAdminAnalytics() {
    const totalProductsEl = document.getElementById('totalProducts');
    const totalOrdersEl = document.getElementById('totalOrders');
    const totalRevenueEl = document.getElementById('totalRevenue');
    const totalUsersEl = document.getElementById('totalUsers');
    
    if (totalProductsEl) totalProductsEl.textContent = products.length;
    if (totalOrdersEl) totalOrdersEl.textContent = orders.length;
    if (totalUsersEl) totalUsersEl.textContent = users.length;
    
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    if (totalRevenueEl) totalRevenueEl.textContent = formatCurrency(totalRevenue);
    
    const totalProductsDisplay = document.getElementById('totalProductsDisplay');
    if (totalProductsDisplay) totalProductsDisplay.textContent = `${products.length}+`;
    
    renderSalesChart();
}

function renderSalesChart() {
    const chartCanvas = document.getElementById('salesChart');
    if (!chartCanvas) return;
    
    const ctx = chartCanvas.getContext('2d');
    
    if (window.salesChart) {
        window.salesChart.destroy();
    }
    
    const categories = ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports', 'Beauty'];
    const categoryData = categories.map(category => {
        const categoryOrders = orders.filter(order => 
            order.items.some(item => {
                const product = products.find(p => p.id === item.productId);
                return product && product.category === category;
            })
        );
        
        return categoryOrders.reduce((sum, order) => {
            const categoryRevenue = order.items.reduce((itemSum, item) => {
                const product = products.find(p => p.id === item.productId);
                return itemSum + (product && product.category === category ? 
                    product.price * item.quantity : 0);
            }, 0);
            return sum + categoryRevenue;
        }, 0);
    });
    
    window.salesChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: categories,
            datasets: [{
                label: 'Revenue ($)',
                data: categoryData,
                backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545'],
                borderColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Revenue by Category'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value;
                        }
                    }
                }
            }
        }
    });
}

function renderAdminProducts() {
    const container = document.getElementById('adminProductsList');
    if (!container) return;
    
    container.innerHTML = products.map(product => `
        <div class="admin-product-item">
            <div class="admin-product-image">
                <img src="${product.image}" alt="${product.name}"
                     onerror="this.style.display='none'; this.parentElement.innerHTML='📱';">
            </div>
            <div class="admin-info">
                <div class="admin-name">${product.name}</div>
                <div class="admin-details">
                    ${product.brand} • ${product.category} • ${formatCurrency(product.price)} • Stock: ${product.stock}
                </div>
            </div>
            <div class="admin-actions">
                <button class="btn btn--sm btn--outline" onclick="editProduct(${product.id})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn btn--sm btn--outline" onclick="deleteProduct(${product.id})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        </div>
    `).join('');
}

function renderAdminOrders() {
    const container = document.getElementById('adminOrdersList');
    if (!container) return;
    
    const statusFilter = document.getElementById('orderStatusFilter');
    const selectedStatus = statusFilter ? statusFilter.value : 'all';
    
    const filteredOrders = selectedStatus === 'all' ? 
        orders : orders.filter(order => order.status === selectedStatus);
    
    container.innerHTML = filteredOrders.map(order => {
        const user = users.find(u => u.id === order.userId);
        return `
            <div class="admin-order-item">
                <div class="admin-info">
                    <div class="admin-name">Order #${order.id}</div>
                    <div class="admin-details">
                        Customer: ${user ? user.name : 'Unknown'} • 
                        Date: ${order.date} • 
                        Total: ${formatCurrency(order.total)} • 
                        Items: ${order.items.length}
                    </div>
                </div>
                <div class="order-status ${order.status.toLowerCase()}">${order.status}</div>
                <div class="admin-actions">
                    <button class="btn btn--sm btn--outline" onclick="updateOrderStatus(${order.id})">
                        <i class="fas fa-edit"></i> Update Status
                    </button>
                    <button class="btn btn--sm btn--outline" onclick="viewOrderDetails(${order.id})">
                        <i class="fas fa-eye"></i> View Details
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function renderAdminUsers() {
    const container = document.getElementById('adminUsersList');
    if (!container) return;
    
    container.innerHTML = users.map(user => `
        <div class="admin-user-item">
            <div class="admin-user-avatar">
                <img src="${user.avatar}" alt="${user.name}"
                     onerror="this.style.display='none'; this.parentElement.innerHTML='👤';">
            </div>
            <div class="admin-info">
                <div class="admin-name">${user.name}</div>
                <div class="admin-details">
                    ${user.email} • ${user.role} • Joined: ${user.joined || 'N/A'}
                </div>
            </div>
            <div class="admin-actions">
                <button class="btn btn--sm btn--outline" onclick="viewUserOrders(${user.id})">
                    <i class="fas fa-shopping-cart"></i> Orders
                </button>
                ${user.role !== 'admin' ? `
                <button class="btn btn--sm btn--outline" onclick="toggleUserStatus(${user.id})">
                    <i class="fas fa-user-times"></i> Suspend
                </button>
                ` : ''}
            </div>
        </div>
    `).join('');
}

// Product Management
function addProduct(productData) {
    const newProduct = {
        id: Math.max(...products.map(p => p.id)) + 1,
        name: productData.name,
        category: productData.category,
        brand: productData.brand,
        price: parseFloat(productData.price),
        originalPrice: productData.originalPrice ? parseFloat(productData.originalPrice) : null,
        rating: 4.0 + Math.random() * 1,
        reviews: Math.floor(Math.random() * 1000) + 1,
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
        description: productData.description,
        stock: parseInt(productData.stock),
        specifications: [],
        features: [],
        isFeatured: false,
        isOnSale: productData.originalPrice && productData.originalPrice > productData.price
    };
    
    products.push(newProduct);
    renderAdminProducts();
    renderProducts();
    renderFeaturedProducts();
    showToast('Product added successfully!', 'success');
    hideModal('productFormModal');
}

function editProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    document.getElementById('productFormId').value = product.id;
    document.getElementById('productFormName').value = product.name;
    document.getElementById('productFormCategory').value = product.category;
    document.getElementById('productFormBrand').value = product.brand;
    document.getElementById('productFormPrice').value = product.price;
    document.getElementById('productFormOriginalPrice').value = product.originalPrice || '';
    document.getElementById('productFormStock').value = product.stock;
    document.getElementById('productFormDescription').value = product.description;
    
    document.getElementById('productFormTitle').textContent = 'Edit Product';
    showModal('productFormModal');
}

function deleteProduct(productId) {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    const index = products.findIndex(p => p.id === productId);
    if (index > -1) {
        products.splice(index, 1);
        renderAdminProducts();
        renderProducts();
        renderFeaturedProducts();
        showToast('Product deleted successfully!', 'success');
    }
}

// Checkout Process
function processCheckout(formData) {
    if (cart.length === 0) {
        showToast('Your cart is empty', 'error', 'Checkout Failed');
        return;
    }
    
    const subtotal = cart.reduce((sum, item) => {
        const product = products.find(p => p.id === item.productId);
        return sum + (product.price * item.quantity);
    }, 0);
    
    const shipping = 10;
    const tax = subtotal * 0.18;
    const total = subtotal + shipping + tax;
    
    const newOrder = {
        id: Math.max(...orders.map(o => o.id)) + 1,
        userId: currentUser.id,
        items: cart.map(item => {
            const product = products.find(p => p.id === item.productId);
            return {
                productId: item.productId,
                name: product.name,
                quantity: item.quantity,
                price: product.price,
                image: product.image
            };
        }),
        total: total,
        subtotal: subtotal,
        shipping: shipping,
        tax: tax,
        status: 'Processing',
        date: new Date().toISOString().split('T')[0],
        paymentMethod: formData.paymentMethod,
        address: {
            name: formData.name,
            street: formData.street,
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode
        }
    };
    
    orders.push(newOrder);
    
    // Simulate payment processing
    showToast('Processing your payment...', 'info', 'Please Wait');
    
    setTimeout(() => {
        // Update stock
        cart.forEach(item => {
            const product = products.find(p => p.id === item.productId);
            if (product) {
                product.stock = Math.max(0, product.stock - item.quantity);
            }
        });
        
        cart = [];
        saveCart();
        updateCartUI();
        hideAllModals();
        
        showToast(`Order placed successfully! Order ID: #${newOrder.id}`, 'success', 'Order Confirmed');
        renderProducts();
        showPage('homepage');
    }, 2000);
}

// Global functions for onclick handlers
window.showProductDetail = showProductDetail;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartQuantity = updateCartQuantity;
window.toggleWishlist = toggleWishlist;
window.editProduct = editProduct;
window.deleteProduct = deleteProduct;
window.updateOrderStatus = function(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    
    const statuses = ['Processing', 'Shipped', 'Delivered'];
    const currentIndex = statuses.indexOf(order.status);
    const nextIndex = (currentIndex + 1) % statuses.length;
    
    order.status = statuses[nextIndex];
    renderAdminOrders();
    showToast(`Order #${orderId} status updated to ${order.status}`, 'success');
};

window.viewOrderDetails = function(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    
    showToast(`Order Details: ${order.items.length} items, Total: ${formatCurrency(order.total)}`, 'info', `Order #${orderId}`);
};

window.viewUserOrders = function(userId) {
    const userOrders = orders.filter(o => o.userId === userId);
    const user = users.find(u => u.id === userId);
    
    showToast(`${user ? user.name : 'User'} has ${userOrders.length} orders`, 'info', 'User Orders');
};

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    // Initial render
    renderProducts();
    renderFeaturedProducts();
    populateBrandFilter();
    updateCartUI();
    updateWishlistUI();
    showPage('homepage');
    
    // Setup event listeners
    setupEventListeners();
});

function setupEventListeners() {
    // Logo click to go home - FIXED
    const logo = document.querySelector('.logo h1');
    if (logo) {
        logo.addEventListener('click', () => {
            showPage('homepage');
        });
        logo.style.cursor = 'pointer';
    }
    
    // Header actions - FIXED
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showModal('authModal');
        });
    }
    
    const cartBtn = document.getElementById('cartBtn');
    if (cartBtn) {
        cartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            renderCart();
            showModal('cartModal');
        });
    }
    
    const wishlistBtn = document.getElementById('wishlistBtn');
    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (!currentUser) {
                showModal('authModal');
                showToast('Please login to view your wishlist', 'warning', 'Login Required');
                return;
            }
            
            const wishlistProducts = products.filter(p => wishlist.includes(p.id));
            renderProducts(wishlistProducts);
            showPage('homepage');
            showToast(`Showing ${wishlistProducts.length} wishlist items`, 'info', 'Wishlist View');
        });
    }
    
    // User menu actions - FIXED
    const dashboardBtn = document.getElementById('dashboardBtn');
    if (dashboardBtn) {
        dashboardBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentUser && currentUser.role === 'admin') {
                showPage('adminDashboard');
                setTimeout(() => {
                    renderAdminAnalytics();
                    renderAdminProducts();
                    renderAdminOrders();
                    renderAdminUsers();
                }, 100);
            }
        });
    }
    
    const ordersBtn = document.getElementById('ordersBtn');
    if (ordersBtn) {
        ordersBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentUser) {
                const userOrders = orders.filter(o => o.userId === currentUser.id);
                showToast(`You have ${userOrders.length} orders`, 'info', 'My Orders');
            }
        });
    }
    
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            logout();
        });
    }
    
    // Navigation - FIXED
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
            e.target.classList.add('active');
            renderProducts();
        });
    });
    
    // Search and filters with debounce - FIXED
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        const debouncedRender = debounce(() => renderProducts(), 300);
        searchInput.addEventListener('input', debouncedRender);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                renderProducts();
            }
        });
    }
    
    const searchBtn = document.getElementById('searchBtn');
    if (searchBtn) {
        searchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            renderProducts();
        });
    }
    
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', () => renderProducts());
    }
    
    const ratingFilter = document.getElementById('ratingFilter');
    if (ratingFilter) {
        ratingFilter.addEventListener('change', () => renderProducts());
    }
    
    const brandFilter = document.getElementById('brandFilter');
    if (brandFilter) {
        brandFilter.addEventListener('change', () => renderProducts());
    }
    
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');
    if (priceRange && priceValue) {
        priceRange.addEventListener('input', (e) => {
            priceValue.textContent = `$0 - $${e.target.value}`;
            debounce(() => renderProducts(), 300)();
        });
    }
    
    const clearFilters = document.getElementById('clearFilters');
    if (clearFilters) {
        clearFilters.addEventListener('click', (e) => {
            e.preventDefault();
            resetFilters();
            renderProducts();
        });
    }
    
    // View toggle
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            const grid = document.getElementById('productsGrid');
            if (grid) {
                currentViewMode = e.target.dataset.view;
                grid.className = `products-grid ${currentViewMode === 'list' ? 'list-view' : ''}`;
            }
        });
    });
    
    // Back buttons - FIXED
    const backToProducts = document.getElementById('backToProducts');
    if (backToProducts) {
        backToProducts.addEventListener('click', (e) => {
            e.preventDefault();
            showPage('homepage');
        });
    }
    
    const backToShop = document.getElementById('backToShop');
    if (backToShop) {
        backToShop.addEventListener('click', (e) => {
            e.preventDefault();
            showPage('homepage');
        });
    }
    
    // Modal handlers - FIXED
    document.querySelectorAll('.modal-close, .modal-backdrop').forEach(element => {
        element.addEventListener('click', (e) => {
            if (e.target === element) {
                hideAllModals();
            }
        });
    });
    
    // Toast close
    const toastClose = document.getElementById('toastClose');
    if (toastClose) {
        toastClose.addEventListener('click', () => {
            document.getElementById('toast').classList.add('hidden');
        });
    }
    
    // Auth form - FIXED
    const authForm = document.getElementById('authForm');
    if (authForm) {
        authForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('authEmail').value;
            const password = document.getElementById('authPassword').value;
            const name = document.getElementById('authName').value;
            
            if (isAuthMode === 'login') {
                if (!login(email, password)) {
                    showToast('Invalid credentials. Try the demo accounts from the form.', 'error', 'Login Failed');
                }
            } else {
                if (!signup(name, email, password)) {
                    showToast('Email already exists', 'error', 'Registration Failed');
                }
            }
        });
    }
    
    // OTP login
    const otpLoginBtn = document.getElementById('otpLoginBtn');
    if (otpLoginBtn) {
        otpLoginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const email = document.getElementById('authEmail').value;
            if (!email) {
                showToast('Please enter your email first', 'warning');
                return;
            }
            hideModal('authModal');
            sendOTP(email);
        });
    }
    
    // OTP form
    const otpForm = document.getElementById('otpForm');
    if (otpForm) {
        otpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const otpInputs = document.querySelectorAll('.otp-input');
            const otp = Array.from(otpInputs).map(input => input.value).join('');
            
            if (otp.length !== 6) {
                showToast('Please enter complete 6-digit OTP', 'warning');
                return;
            }
            
            if (!verifyOTP(otp)) {
                showToast('Invalid OTP. Please try again.', 'error', 'Verification Failed');
            }
        });
    }
    
    // OTP input navigation
    document.querySelectorAll('.otp-input').forEach((input, index, inputs) => {
        input.addEventListener('input', (e) => {
            if (e.target.value.length === 1 && index < inputs.length - 1) {
                inputs[index + 1].focus();
            }
        });
        
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
                inputs[index - 1].focus();
            }
        });
    });
    
    // Resend OTP
    const resendOtp = document.getElementById('resendOtp');
    if (resendOtp) {
        resendOtp.addEventListener('click', (e) => {
            e.preventDefault();
            sendOTP(currentOtpEmail);
            resendOtp.classList.add('hidden');
            document.querySelector('.otp-timer').classList.remove('hidden');
        });
    }
    
    // Auth mode switching
    const authSwitchLink = document.getElementById('authSwitchLink');
    if (authSwitchLink) {
        authSwitchLink.addEventListener('click', (e) => {
            e.preventDefault();
            
            const title = document.getElementById('authModalTitle');
            const submitBtn = document.getElementById('authSubmit');
            const switchText = document.getElementById('authSwitchText');
            const switchLink = document.getElementById('authSwitchLink');
            const nameGroup = document.getElementById('nameGroup');
            
            if (isAuthMode === 'login') {
                isAuthMode = 'signup';
                if (title) title.textContent = 'Create Your Account';
                if (submitBtn) submitBtn.textContent = 'Sign Up';
                if (switchText) switchText.innerHTML = 'Already have an account? ';
                if (switchLink) switchLink.textContent = 'Login';
                if (nameGroup) nameGroup.style.display = 'block';
            } else {
                isAuthMode = 'login';
                if (title) title.textContent = 'Login to Your Account';
                if (submitBtn) submitBtn.textContent = 'Login';
                if (switchText) switchText.innerHTML = "Don't have an account? ";
                if (switchLink) switchLink.textContent = 'Sign up';
                if (nameGroup) nameGroup.style.display = 'none';
            }
        });
    }
    
    // Forgot password
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', (e) => {
            e.preventDefault();
            showToast('Password reset functionality would be implemented here', 'info', 'Feature Demo');
        });
    }
    
    // Checkout - FIXED
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (cart.length === 0) {
                showToast('Your cart is empty', 'error', 'Checkout Error');
                return;
            }
            if (!currentUser) {
                hideModal('cartModal');
                showModal('authModal');
                showToast('Please login to proceed with checkout', 'warning', 'Login Required');
                return;
            }
            hideModal('cartModal');
            showModal('checkoutModal');
            
            if (currentUser) {
                const shippingName = document.getElementById('shippingName');
                const shippingPhone = document.getElementById('shippingPhone');
                if (shippingName) shippingName.value = currentUser.name;
                if (shippingPhone) shippingPhone.value = currentUser.phone || '';
            }
            
            const subtotal = cart.reduce((sum, item) => {
                const product = products.find(p => p.id === item.productId);
                return sum + (product.price * item.quantity);
            }, 0);
            updateCheckoutTotals(subtotal);
        });
    }
    
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('shippingName').value,
                phone: document.getElementById('shippingPhone').value,
                street: document.getElementById('shippingStreet').value,
                city: document.getElementById('shippingCity').value,
                state: document.getElementById('shippingState').value,
                zipCode: document.getElementById('shippingZip').value,
                paymentMethod: document.querySelector('input[name="payment"]:checked').value
            };
            
            processCheckout(formData);
        });
    }
    
    // Admin dashboard tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const tabName = e.target.dataset.tab;
            
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
                content.classList.add('hidden');
            });
            
            e.target.classList.add('active');
            const targetContent = document.getElementById(`${tabName}-tab`);
            if (targetContent) {
                targetContent.classList.add('active');
                targetContent.classList.remove('hidden');
            }
            
            // Render appropriate content
            switch(tabName) {
                case 'analytics':
                    renderAdminAnalytics();
                    break;
                case 'products':
                    renderAdminProducts();
                    break;
                case 'orders':
                    renderAdminOrders();
                    break;
                case 'users':
                    renderAdminUsers();
                    break;
            }
        });
    });
    
    // Add product button
    const addProductBtn = document.getElementById('addProductBtn');
    if (addProductBtn) {
        addProductBtn.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('productForm').reset();
            document.getElementById('productFormId').value = '';
            document.getElementById('productFormTitle').textContent = 'Add New Product';
            showModal('productFormModal');
        });
    }
    
    // Product form
    const productForm = document.getElementById('productForm');
    if (productForm) {
        productForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const productData = {
                name: document.getElementById('productFormName').value,
                category: document.getElementById('productFormCategory').value,
                brand: document.getElementById('productFormBrand').value,
                price: document.getElementById('productFormPrice').value,
                originalPrice: document.getElementById('productFormOriginalPrice').value,
                stock: document.getElementById('productFormStock').value,
                description: document.getElementById('productFormDescription').value
            };
            
            const productId = document.getElementById('productFormId').value;
            
            if (productId) {
                // Edit existing product
                const product = products.find(p => p.id === parseInt(productId));
                if (product) {
                    Object.assign(product, {
                        name: productData.name,
                        category: productData.category,
                        brand: productData.brand,
                        price: parseFloat(productData.price),
                        originalPrice: productData.originalPrice ? parseFloat(productData.originalPrice) : null,
                        stock: parseInt(productData.stock),
                        description: productData.description
                    });
                    
                    renderAdminProducts();
                    renderProducts();
                    showToast('Product updated successfully!', 'success');
                }
            } else {
                // Add new product
                addProduct(productData);
            }
            
            hideModal('productFormModal');
        });
    }
    
    // Order status filter
    const orderStatusFilter = document.getElementById('orderStatusFilter');
    if (orderStatusFilter) {
        orderStatusFilter.addEventListener('change', renderAdminOrders);
    }
}