# Restaurant Mobile App

A comprehensive React Native mobile application for restaurant ordering built with Expo and TypeScript. This app provides a complete food ordering experience with user authentication, restaurant browsing, menu exploration, cart management, and order placement.

## Features

### 🔐 User Authentication
- User registration and login
- JWT token-based authentication
- Secure token storage with AsyncStorage
- Profile management and editing
- Role-based access (Customer, Manager, Admin)

### 🏪 Restaurant Discovery
- Browse restaurants with search and filtering
- Filter by cuisine, price range, and location
- Restaurant details with hours, contact info, and features
- High-quality restaurant images and ratings

### 🍽️ Menu Browsing
- Comprehensive menu with categories
- Item details with ingredients and allergens
- Dietary filters (Vegetarian, Vegan, Gluten-free)
- Price and preparation time information

### 🛒 Shopping Cart
- Add items to cart with quantity selection
- Special instructions for items
- Cart persistence across app sessions
- Real-time cart total calculation
- Cross-restaurant cart management

### 📦 Order Management
- Complete order flow from cart to confirmation
- Delivery and pickup options
- Address management for deliveries
- Order history and tracking (demo)
- Order status updates

### 🎨 Modern UI/UX
- Clean, intuitive interface design
- Consistent design system with custom components
- Smooth animations and transitions
- Toast notifications for user feedback
- Loading states and error handling

## Tech Stack

### Frontend
- **React Native** with Expo SDK 53
- **TypeScript** for type safety
- **Expo Router** for file-based navigation
- **React Navigation** for tab and stack navigation
- **Expo Vector Icons** for consistent iconography
- **React Native Toast Message** for notifications

### State Management
- **React Context API** for authentication and cart state
- **AsyncStorage** for data persistence
- **Custom hooks** for reusable logic

### Networking
- **Axios** for HTTP requests
- **Interceptors** for automatic token attachment
- **Error handling** with user-friendly messages

### Development Tools
- **ESLint** for code linting
- **TypeScript** configuration
- **Expo development tools**

## Project Structure

```
Mobile-App/
├── app/                          # Expo Router app directory
│   ├── (tabs)/                   # Tab-based navigation
│   │   ├── index.tsx            # Home (Restaurant list)
│   │   ├── orders.tsx           # Order history
│   │   └── profile.tsx          # User profile
│   ├── auth/                    # Authentication screens
│   │   ├── login.tsx           # Login screen
│   │   └── register.tsx        # Registration screen
│   ├── restaurant/             # Restaurant-specific screens
│   │   └── [restaurantId].tsx  # Restaurant detail screen
│   ├── cart.tsx               # Shopping cart screen
│   ├── order-summary.tsx      # Order checkout screen
│   ├── order-confirmation.tsx # Order confirmation
│   └── _layout.tsx            # Root layout with providers
├── components/                 # Reusable UI components
│   ├── ui/                    # Base UI components
│   │   ├── Button.tsx         # Custom button component
│   │   └── Input.tsx          # Custom input component
│   └── RestaurantCard.tsx     # Restaurant card component
├── contexts/                  # React Context providers
│   ├── AuthContext.tsx       # Authentication state
│   └── CartContext.tsx       # Shopping cart state
├── screens/                  # Screen components
│   ├── auth/                 # Authentication screens
│   ├── RestaurantListScreen.tsx
│   ├── RestaurantDetailScreen.tsx
│   ├── CartScreen.tsx
│   └── OrderSummaryScreen.tsx
├── services/                 # API and external services
│   └── api.ts               # API service with Axios
├── types/                   # TypeScript type definitions
│   └── index.ts            # Shared interfaces and types
└── package.json           # Dependencies and scripts
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS development)
- Android Studio/Emulator (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Mobile-App
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure backend connection**
   Update the `BASE_URL` in `services/api.ts`:
   ```typescript
   const BASE_URL = 'http://your-backend-url:5000/api';
   ```
   
   For local development:
   - iOS Simulator: `http://localhost:5000/api`
   - Android Emulator: `http://10.0.2.2:5000/api`
   - Physical device: `http://YOUR_COMPUTER_IP:5000/api`

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Run on device/simulator**
   ```bash
   # iOS
   npm run ios
   
   # Android
   npm run android
   
   # Web
   npm run web
   ```

## Key Features Explained

### Authentication Flow
- JWT tokens stored securely in AsyncStorage
- Automatic token refresh on app startup
- Protected routes that require authentication
- Seamless login/logout experience

### Cart Management
- Persistent cart across app sessions
- Smart restaurant switching (clears cart when switching restaurants)
- Real-time total calculations including tax and delivery fees
- Item quantity management with intuitive controls

### Restaurant Discovery
- Advanced filtering by cuisine, price, location
- Search functionality across restaurant names and descriptions
- Pagination for efficient data loading
- Pull-to-refresh for updated restaurant data

### Order Flow
- Multi-step checkout process
- Delivery address management
- Order type selection (delivery/pickup)
- Order confirmation with tracking information

## Demo Features

The app includes several demo features for learning purposes:

- **Demo Login Credentials**: Pre-filled customer and manager accounts
- **Mock Data**: Sample restaurants and menu items
- **Simulated Orders**: Order history with various statuses
- **No Payment Processing**: Orders complete without actual payment

## API Integration

The app is designed to work with the Restaurant Backend API. Key endpoints used:

- `POST /auth/login` - User authentication
- `POST /auth/register` - User registration
- `GET /restaurants` - Restaurant listing with filters
- `GET /restaurants/:id` - Restaurant details
- `GET /restaurants/:id/menu` - Restaurant menu items
- `GET /auth/profile` - User profile information

## Development Guidelines

### Code Organization
- Components are organized by feature and reusability
- Contexts provide global state management
- Services handle external API communication
- Types ensure type safety across the application

### State Management
- Authentication state managed globally via AuthContext
- Cart state persisted and managed via CartContext
- Local component state for UI-specific data

### Error Handling
- Comprehensive error handling with user-friendly messages
- Network error handling with retry mechanisms
- Form validation with real-time feedback

## Customization

### Styling
- Consistent design system with shared colors and typography
- Responsive design that works on various screen sizes
- Platform-specific styling where appropriate

### Configuration
- Easy backend URL configuration
- Customizable app theme and branding
- Configurable features and settings

## Building for Production

### iOS
```bash
expo build:ios
```

### Android
```bash
expo build:android
```

### Web
```bash
npm run build
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly on multiple platforms
5. Submit a pull request

## License

This project is for educational purposes and is not intended for commercial use.

## Support

For questions or issues, please refer to the Expo documentation or create an issue in the repository.