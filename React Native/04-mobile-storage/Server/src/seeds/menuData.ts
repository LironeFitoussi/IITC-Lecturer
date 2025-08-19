export const seedMenuItems = {
  // Pizza Palace Menu Items
  'Pizza Palace': [
    {
      name: 'Margherita Pizza',
      description: 'Classic pizza with fresh mozzarella, tomato sauce, and basil leaves',
      price: 18.99,
      category: 'Pizza',
      ingredients: ['Pizza dough', 'Tomato sauce', 'Fresh mozzarella', 'Fresh basil', 'Olive oil'],
      allergens: ['Wheat', 'Milk'],
      image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=400',
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: false,
      isAvailable: true,
      preparationTime: 15
    },
    {
      name: 'Pepperoni Pizza',
      description: 'Traditional pizza topped with pepperoni slices and mozzarella cheese',
      price: 21.99,
      category: 'Pizza',
      ingredients: ['Pizza dough', 'Tomato sauce', 'Mozzarella cheese', 'Pepperoni'],
      allergens: ['Wheat', 'Milk'],
      image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400',
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: false,
      isAvailable: true,
      preparationTime: 15
    },
    {
      name: 'Caesar Salad',
      description: 'Crisp romaine lettuce with parmesan cheese, croutons, and Caesar dressing',
      price: 12.99,
      category: 'Salads',
      ingredients: ['Romaine lettuce', 'Parmesan cheese', 'Croutons', 'Caesar dressing'],
      allergens: ['Milk', 'Eggs', 'Wheat'],
      image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400',
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: false,
      isAvailable: true,
      preparationTime: 10
    },
    {
      name: 'Tiramisu',
      description: 'Classic Italian dessert with coffee-soaked ladyfingers and mascarpone',
      price: 8.99,
      category: 'Desserts',
      ingredients: ['Ladyfingers', 'Espresso', 'Mascarpone', 'Cocoa powder', 'Sugar'],
      allergens: ['Wheat', 'Eggs', 'Milk'],
      image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400',
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: false,
      isAvailable: true,
      preparationTime: 5
    }
  ],

  // Golden Dragon Menu Items
  'Golden Dragon': [
    {
      name: 'Sweet & Sour Chicken',
      description: 'Crispy chicken pieces with bell peppers and pineapple in sweet and sour sauce',
      price: 16.99,
      category: 'Main Course',
      ingredients: ['Chicken breast', 'Bell peppers', 'Pineapple', 'Sweet and sour sauce', 'Rice'],
      allergens: ['Soybeans', 'Wheat'],
      image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400',
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: false,
      isAvailable: true,
      preparationTime: 20
    },
    {
      name: 'Kung Pao Chicken',
      description: 'Spicy stir-fried chicken with peanuts, vegetables, and chili peppers',
      price: 17.99,
      category: 'Main Course',
      ingredients: ['Chicken', 'Peanuts', 'Vegetables', 'Chili peppers', 'Kung Pao sauce'],
      allergens: ['Peanuts', 'Soybeans'],
      image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400',
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: false,
      isAvailable: true,
      preparationTime: 18
    },
    {
      name: 'Vegetable Spring Rolls',
      description: 'Crispy spring rolls filled with fresh vegetables and served with dipping sauce',
      price: 8.99,
      category: 'Appetizers',
      ingredients: ['Spring roll wrapper', 'Cabbage', 'Carrots', 'Bean sprouts', 'Mushrooms'],
      allergens: ['Wheat', 'Soybeans'],
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400',
      isVegetarian: true,
      isVegan: true,
      isGlutenFree: false,
      isAvailable: true,
      preparationTime: 12
    },
    {
      name: 'Hot & Sour Soup',
      description: 'Traditional Chinese soup with tofu, mushrooms, and bamboo shoots',
      price: 6.99,
      category: 'Soups',
      ingredients: ['Tofu', 'Mushrooms', 'Bamboo shoots', 'Eggs', 'Vinegar', 'White pepper'],
      allergens: ['Eggs', 'Soybeans'],
      image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400',
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: true,
      isAvailable: true,
      preparationTime: 15
    }
  ],

  // Spice Palace Menu Items
  'Spice Palace': [
    {
      name: 'Chicken Tikka Masala',
      description: 'Tender chicken pieces in a creamy tomato-based curry sauce',
      price: 19.99,
      category: 'Main Course',
      ingredients: ['Chicken', 'Tomatoes', 'Cream', 'Onions', 'Garam masala', 'Ginger', 'Garlic'],
      allergens: ['Milk'],
      image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400',
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: true,
      isAvailable: true,
      preparationTime: 25
    },
    {
      name: 'Vegetable Biryani',
      description: 'Aromatic basmati rice cooked with mixed vegetables and traditional spices',
      price: 16.99,
      category: 'Main Course',
      ingredients: ['Basmati rice', 'Mixed vegetables', 'Saffron', 'Biryani spices', 'Yogurt'],
      allergens: ['Milk'],
      image: 'https://images.unsplash.com/photo-1563379091339-03246963d51a?w=400',
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: true,
      isAvailable: true,
      preparationTime: 30
    },
    {
      name: 'Samosas',
      description: 'Crispy pastries filled with spiced potatoes and peas',
      price: 7.99,
      category: 'Appetizers',
      ingredients: ['Flour', 'Potatoes', 'Green peas', 'Cumin', 'Coriander', 'Turmeric'],
      allergens: ['Wheat'],
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400',
      isVegetarian: true,
      isVegan: true,
      isGlutenFree: false,
      isAvailable: true,
      preparationTime: 15
    },
    {
      name: 'Mango Lassi',
      description: 'Refreshing yogurt-based drink blended with sweet mango pulp',
      price: 4.99,
      category: 'Beverages',
      ingredients: ['Yogurt', 'Mango pulp', 'Sugar', 'Cardamom'],
      allergens: ['Milk'],
      image: 'https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=400',
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: true,
      isAvailable: true,
      preparationTime: 5
    }
  ],

  // El Taco Loco Menu Items
  'El Taco Loco': [
    {
      name: 'Carnitas Tacos',
      description: 'Slow-cooked pork carnitas with onions, cilantro, and salsa verde',
      price: 12.99,
      category: 'Main Course',
      ingredients: ['Pork shoulder', 'Corn tortillas', 'Onions', 'Cilantro', 'Salsa verde'],
      allergens: [],
      image: 'https://images.unsplash.com/photo-1565299585323-38174c4a6b52?w=400',
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: true,
      isAvailable: true,
      preparationTime: 10
    },
    {
      name: 'Veggie Burrito Bowl',
      description: 'Rice bowl with black beans, grilled vegetables, guacamole, and salsa',
      price: 11.99,
      category: 'Main Course',
      ingredients: ['Rice', 'Black beans', 'Bell peppers', 'Onions', 'Avocado', 'Salsa'],
      allergens: [],
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
      isVegetarian: true,
      isVegan: true,
      isGlutenFree: true,
      isAvailable: true,
      preparationTime: 12
    },
    {
      name: 'Guacamole & Chips',
      description: 'Fresh guacamole made daily served with crispy tortilla chips',
      price: 8.99,
      category: 'Appetizers',
      ingredients: ['Avocados', 'Lime', 'Onions', 'Tomatoes', 'Cilantro', 'Tortilla chips'],
      allergens: [],
      image: 'https://images.unsplash.com/photo-1541544181051-e46607bc22a4?w=400',
      isVegetarian: true,
      isVegan: true,
      isGlutenFree: true,
      isAvailable: true,
      preparationTime: 8
    },
    {
      name: 'Horchata',
      description: 'Traditional Mexican rice drink with cinnamon and vanilla',
      price: 3.99,
      category: 'Beverages',
      ingredients: ['Rice', 'Milk', 'Cinnamon', 'Vanilla', 'Sugar'],
      allergens: ['Milk'],
      image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400',
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: true,
      isAvailable: true,
      preparationTime: 3
    }
  ],

  // Sakura Sushi Menu Items
  'Sakura Sushi': [
    {
      name: 'Salmon Nigiri',
      description: 'Fresh Atlantic salmon over seasoned sushi rice',
      price: 6.99,
      category: 'Seafood',
      ingredients: ['Fresh salmon', 'Sushi rice', 'Wasabi', 'Pickled ginger'],
      allergens: ['Fish'],
      image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400',
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: true,
      isAvailable: true,
      preparationTime: 5
    },
    {
      name: 'California Roll',
      description: 'Crab, avocado, and cucumber rolled in seaweed and rice',
      price: 12.99,
      category: 'Seafood',
      ingredients: ['Crab meat', 'Avocado', 'Cucumber', 'Nori', 'Sushi rice'],
      allergens: ['Shellfish'],
      image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=400',
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: true,
      isAvailable: true,
      preparationTime: 8
    },
    {
      name: 'Miso Soup',
      description: 'Traditional Japanese soup with tofu, seaweed, and green onions',
      price: 4.99,
      category: 'Soups',
      ingredients: ['Miso paste', 'Tofu', 'Wakame seaweed', 'Green onions', 'Dashi'],
      allergens: ['Soybeans'],
      image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400',
      isVegetarian: true,
      isVegan: true,
      isGlutenFree: true,
      isAvailable: true,
      preparationTime: 10
    },
    {
      name: 'Tempura Vegetables',
      description: 'Lightly battered and fried seasonal vegetables with dipping sauce',
      price: 14.99,
      category: 'Appetizers',
      ingredients: ['Mixed vegetables', 'Tempura batter', 'Tempura sauce'],
      allergens: ['Wheat', 'Eggs'],
      image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400',
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: false,
      isAvailable: true,
      preparationTime: 12
    }
  ],

  // Bistro Café Menu Items
  'Bistro Café': [
    {
      name: 'Croque Monsieur',
      description: 'Classic French grilled ham and cheese sandwich with béchamel sauce',
      price: 13.99,
      category: 'Sandwiches',
      ingredients: ['Ham', 'Gruyère cheese', 'Bread', 'Béchamel sauce', 'Butter'],
      allergens: ['Wheat', 'Milk'],
      image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400',
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: false,
      isAvailable: true,
      preparationTime: 15
    },
    {
      name: 'French Onion Soup',
      description: 'Traditional soup with caramelized onions, topped with cheese and croutons',
      price: 9.99,
      category: 'Soups',
      ingredients: ['Onions', 'Beef broth', 'Gruyère cheese', 'Bread', 'Thyme'],
      allergens: ['Milk', 'Wheat'],
      image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400',
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: false,
      isAvailable: true,
      preparationTime: 20
    },
    {
      name: 'Croissant',
      description: 'Buttery, flaky French pastry perfect for breakfast or snack',
      price: 3.99,
      category: 'Breakfast',
      ingredients: ['Flour', 'Butter', 'Yeast', 'Milk', 'Sugar'],
      allergens: ['Wheat', 'Milk'],
      image: 'https://images.unsplash.com/photo-1555507036-ab794f4aaab3?w=400',
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: false,
      isAvailable: true,
      preparationTime: 2
    },
    {
      name: 'Espresso',
      description: 'Strong, rich Italian coffee served in traditional small cup',
      price: 2.99,
      category: 'Coffee',
      ingredients: ['Espresso beans'],
      allergens: [],
      image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400',
      isVegetarian: true,
      isVegan: true,
      isGlutenFree: true,
      isAvailable: true,
      preparationTime: 3
    }
  ]
};
