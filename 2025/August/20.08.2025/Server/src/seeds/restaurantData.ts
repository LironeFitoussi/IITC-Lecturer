export const seedRestaurants = [
  {
    name: 'Pizza Palace',
    description: 'Authentic Italian pizzas made with fresh ingredients and traditional recipes. Family-owned since 1985.',
    cuisine: ['Italian', 'Pizza'],
    address: {
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    },
    contact: {
      phone: '+1-555-774-9921',
      email: 'info@pizzapalace.com'
    },
    hours: {
      monday: { open: '11:00', close: '22:00', closed: false },
      tuesday: { open: '11:00', close: '22:00', closed: false },
      wednesday: { open: '11:00', close: '22:00', closed: false },
      thursday: { open: '11:00', close: '22:00', closed: false },
      friday: { open: '11:00', close: '23:00', closed: false },
      saturday: { open: '12:00', close: '23:00', closed: false },
      sunday: { open: '12:00', close: '21:00', closed: false }
    },
    images: [
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800',
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800'
    ],
    rating: 4.5,
    priceRange: 2,
    features: ['Delivery', 'Takeout', 'Dine-in', 'Wi-Fi', 'Parking'],
    ownerEmail: 'manager@pizzapalace.com',
    isActive: true
  },

  {
    name: 'Golden Dragon',
    description: 'Exquisite Chinese cuisine featuring traditional Cantonese and Szechuan dishes with modern presentation.',
    cuisine: ['Chinese'],
    address: {
      street: '456 Oak Avenue',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94102',
      country: 'USA'
    },
    contact: {
      phone: '+1-555-372-4661',
      email: 'info@goldendragon.com'
    },
    hours: {
      monday: { open: '11:30', close: '21:30', closed: false },
      tuesday: { open: '11:30', close: '21:30', closed: false },
      wednesday: { open: '11:30', close: '21:30', closed: false },
      thursday: { open: '11:30', close: '21:30', closed: false },
      friday: { open: '11:30', close: '22:30', closed: false },
      saturday: { open: '12:00', close: '22:30', closed: false },
      sunday: { open: '12:00', close: '21:00', closed: false }
    },
    images: [
      'https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=800',
      'https://images.unsplash.com/photo-1563379091339-03246963d51a?w=800'
    ],
    rating: 4.7,
    priceRange: 3,
    features: ['Delivery', 'Takeout', 'Dine-in', 'Private Dining', 'Bar', 'Parking'],
    ownerEmail: 'manager@goldendragon.com',
    isActive: true
  },

  {
    name: 'Spice Palace',
    description: 'Authentic Indian cuisine with aromatic spices and traditional cooking methods. Vegetarian and vegan options available.',
    cuisine: ['Indian', 'Vegetarian'],
    address: {
      street: '789 Curry Lane',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      country: 'USA'
    },
    contact: {
      phone: '+1-555-774-2311',
      email: 'info@spicepalace.com'
    },
    hours: {
      monday: { open: '11:00', close: '22:00', closed: false },
      tuesday: { open: '11:00', close: '22:00', closed: false },
      wednesday: { open: '11:00', close: '22:00', closed: false },
      thursday: { open: '11:00', close: '22:00', closed: false },
      friday: { open: '11:00', close: '23:00', closed: false },
      saturday: { open: '12:00', close: '23:00', closed: false },
      sunday: { open: '12:00', close: '22:00', closed: false }
    },
    images: [
      'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800',
      'https://images.unsplash.com/photo-1574484284002-952d92456975?w=800'
    ],
    rating: 4.3,
    priceRange: 2,
    features: ['Delivery', 'Takeout', 'Dine-in', 'Wi-Fi'],
    ownerEmail: 'manager@spicepalace.com',
    isActive: true
  },

  {
    name: 'El Taco Loco',
    description: 'Fresh Mexican street food and authentic tacos made with locally sourced ingredients and traditional recipes.',
    cuisine: ['Mexican', 'Fast Food'],
    address: {
      street: '321 Fiesta Street',
      city: 'Austin',
      state: 'TX',
      zipCode: '73301',
      country: 'USA'
    },
    contact: {
      phone: '+1-555-822-6991',
      email: 'info@eltaco.com'
    },
    hours: {
      monday: { open: '10:00', close: '23:00', closed: false },
      tuesday: { open: '10:00', close: '23:00', closed: false },
      wednesday: { open: '10:00', close: '23:00', closed: false },
      thursday: { open: '10:00', close: '23:00', closed: false },
      friday: { open: '10:00', close: '24:00', closed: false },
      saturday: { open: '10:00', close: '24:00', closed: false },
      sunday: { open: '11:00', close: '22:00', closed: false }
    },
    images: [
      'https://images.unsplash.com/photo-1565299585323-38174c4a6b52?w=800',
      'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800'
    ],
    rating: 4.2,
    priceRange: 1,
    features: ['Delivery', 'Takeout', 'Outdoor Seating', 'Wi-Fi', 'Cash Only'],
    ownerEmail: 'manager@eltaco.com',
    isActive: true
  },

  {
    name: 'Sakura Sushi',
    description: 'Fresh sushi and Japanese cuisine crafted by expert chefs using the finest ingredients and traditional techniques.',
    cuisine: ['Japanese', 'Sushi', 'Seafood'],
    address: {
      street: '555 Bamboo Drive',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90210',
      country: 'USA'
    },
    contact: {
      phone: '+1-555-787-4411',
      email: 'info@sakurasushi.com'
    },
    hours: {
      monday: { open: '17:00', close: '22:00', closed: false },
      tuesday: { open: '17:00', close: '22:00', closed: false },
      wednesday: { open: '17:00', close: '22:00', closed: false },
      thursday: { open: '17:00', close: '22:00', closed: false },
      friday: { open: '17:00', close: '23:00', closed: false },
      saturday: { open: '12:00', close: '23:00', closed: false },
      sunday: { open: '12:00', close: '21:00', closed: false }
    },
    images: [
      'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800',
      'https://images.unsplash.com/photo-1553621042-f6e147245754?w=800'
    ],
    rating: 4.8,
    priceRange: 4,
    features: ['Takeout', 'Dine-in', 'Bar', 'Reservations', 'Credit Cards', 'Wi-Fi'],
    ownerEmail: 'manager@sakurasushi.com',
    isActive: true
  },

  {
    name: 'Bistro Café',
    description: 'Cozy French café serving artisanal coffee, fresh pastries, and classic bistro fare in a warm atmosphere.',
    cuisine: ['French', 'Cafe', 'Bakery'],
    address: {
      street: '888 Paris Boulevard',
      city: 'Seattle',
      state: 'WA',
      zipCode: '98101',
      country: 'USA'
    },
    contact: {
      phone: '+1-555-247-8761',
      email: 'info@bistrocafe.com'
    },
    hours: {
      monday: { open: '07:00', close: '20:00', closed: false },
      tuesday: { open: '07:00', close: '20:00', closed: false },
      wednesday: { open: '07:00', close: '20:00', closed: false },
      thursday: { open: '07:00', close: '20:00', closed: false },
      friday: { open: '07:00', close: '21:00', closed: false },
      saturday: { open: '08:00', close: '21:00', closed: false },
      sunday: { open: '08:00', close: '19:00', closed: false }
    },
    images: [
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800',
      'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800'
    ],
    rating: 4.4,
    priceRange: 2,
    features: ['Takeout', 'Dine-in', 'Wi-Fi', 'Outdoor Seating'],
    ownerEmail: 'manager@bistrocafe.com',
    isActive: true
  }
];
