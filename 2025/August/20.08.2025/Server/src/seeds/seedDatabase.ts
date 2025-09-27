import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User';
import Restaurant from '../models/Restaurant';
import MenuItem from '../models/MenuItem';
import { seedUsers } from './userData';
import { seedRestaurants } from './restaurantData';
import { seedMenuItems } from './menuData';

// Load environment variables
dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://lironefit:nfrCkw6H4NBgtVLz@cluster0.cqjeagn.mongodb.net/restaurent?retryWrites=true&w=majority&appName=Cluster0';
    await mongoose.connect(mongoURI);
    console.log('✅ MongoDB Connected for seeding');
    console.log(`📍 Database: ${mongoURI.includes('mongodb+srv') ? 'MongoDB Atlas' : 'Local MongoDB'}`);
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

const clearDatabase = async (): Promise<void> => {
  try {
    console.log('🧹 Clearing existing data...');
    await Promise.all([
      MenuItem.deleteMany({}),
      Restaurant.deleteMany({}),
      User.deleteMany({})
    ]);
    console.log('✅ Database cleared');
  } catch (error) {
    console.error('❌ Error clearing database:', error);
    throw error;
  }
};

const seedUsersData = async (): Promise<Map<string, string>> => {
  try {
    console.log('👥 Seeding users...');
    const userEmailToIdMap = new Map<string, string>();
    
    for (const userData of seedUsers) {
      const user = new User(userData);
      const savedUser = await user.save();
      userEmailToIdMap.set(userData.email, savedUser._id.toString());
      console.log(`  ✅ Created user: ${userData.name} (${userData.email})`);
    }
    
    console.log(`✅ Seeded ${seedUsers.length} users`);
    return userEmailToIdMap;
  } catch (error) {
    console.error('❌ Error seeding users:', error);
    throw error;
  }
};

const seedRestaurantsData = async (userEmailToIdMap: Map<string, string>): Promise<Map<string, string>> => {
  try {
    console.log('🏪 Seeding restaurants...');
    const restaurantNameToIdMap = new Map<string, string>();
    
    for (const restaurantData of seedRestaurants) {
      const { ownerEmail, ...restaurantInfo } = restaurantData;
      const ownerId = userEmailToIdMap.get(ownerEmail);
      
      if (!ownerId) {
        console.warn(`⚠️  Owner not found for email: ${ownerEmail}, skipping restaurant: ${restaurantData.name}`);
        continue;
      }
      
      const restaurant = new Restaurant({
        ...restaurantInfo,
        owner: ownerId
      });
      
      const savedRestaurant = await restaurant.save();
      restaurantNameToIdMap.set(restaurantData.name, savedRestaurant._id.toString());
      console.log(`  ✅ Created restaurant: ${restaurantData.name}`);
    }
    
    console.log(`✅ Seeded ${restaurantNameToIdMap.size} restaurants`);
    return restaurantNameToIdMap;
  } catch (error) {
    console.error('❌ Error seeding restaurants:', error);
    throw error;
  }
};

const seedMenuItemsData = async (restaurantNameToIdMap: Map<string, string>): Promise<void> => {
  try {
    console.log('🍽️  Seeding menu items...');
    let totalMenuItems = 0;
    
    for (const [restaurantName, menuItems] of Object.entries(seedMenuItems)) {
      const restaurantId = restaurantNameToIdMap.get(restaurantName);
      
      if (!restaurantId) {
        console.warn(`⚠️  Restaurant not found: ${restaurantName}, skipping menu items`);
        continue;
      }
      
      for (const menuItemData of menuItems) {
        const menuItem = new MenuItem({
          ...menuItemData,
          restaurant: restaurantId
        });
        
        await menuItem.save();
        totalMenuItems++;
        console.log(`  ✅ Created menu item: ${menuItemData.name} for ${restaurantName}`);
      }
    }
    
    console.log(`✅ Seeded ${totalMenuItems} menu items`);
  } catch (error) {
    console.error('❌ Error seeding menu items:', error);
    throw error;
  }
};

const seedDatabase = async (): Promise<void> => {
  try {
    console.log('🌱 Starting database seeding...');
    console.log('=====================================');
    
    // Connect to database
    await connectDB();
    
    // Clear existing data
    await clearDatabase();
    
    // Seed data in order (users first, then restaurants, then menu items)
    const userEmailToIdMap = await seedUsersData();
    const restaurantNameToIdMap = await seedRestaurantsData(userEmailToIdMap);
    await seedMenuItemsData(restaurantNameToIdMap);
    
    console.log('=====================================');
    console.log('🎉 Database seeding completed successfully!');
    console.log('');
    console.log('📊 Summary:');
    console.log(`   👥 Users: ${seedUsers.length}`);
    console.log(`   🏪 Restaurants: ${restaurantNameToIdMap.size}`);
    console.log(`   🍽️  Menu Items: ${Object.values(seedMenuItems).reduce((total, items) => total + items.length, 0)}`);
    console.log('');
    console.log('🔐 Demo Login Credentials:');
    console.log('   Customer: customer@demo.com / password123');
    console.log('   Manager: manager@demo.com / password123');
    console.log('   Admin: admin@foodie.com / admin123');
    
  } catch (error) {
    console.error('❌ Database seeding failed:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
    process.exit(0);
  }
};

// Run seeding if this file is executed directly
if (require.main === module) {
  seedDatabase();
}

export default seedDatabase;
