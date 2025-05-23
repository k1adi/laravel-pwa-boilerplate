# Laravel PWA Boilerplate Installation Instructions

## Prerequisites
- PHP 8.1 or higher
- Composer
- Node.js 20 or higher
- npm or yarn
- MySQL/PostgreSQL/SQLite database

## Installation Steps

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/laravel-pwa-boilerplate.git
cd laravel-pwa-boilerplate
```

### 2. Install PHP Dependencies
```bash
composer install
```

### 3. Set Up Environment Variables
```bash
cp .env.example .env
php artisan key:generate
```

### 4. Configure Database
Edit the `.env` file and update the database connection details:
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_database_username
DB_PASSWORD=your_database_password
```

### 5. Run Migrations
```bash
php artisan migrate
```

### 6. Install Node Dependencies
```bash
npm install
# or
yarn install
```

### 7. Build Assets
```bash
npm run build
# or
yarn build
```

### 8. Start the Development Server
```bash
php artisan serve
```

### 9. Access the Application
Open your browser and navigate to `http://localhost:8000`

## PWA Installation (for Users)
1. Open the application in a compatible browser (Chrome, Edge, Firefox, etc.)
2. Look for the install prompt in the address bar or menu
3. Click "Install" to add the application to your device

## Development Commands

### Compile and Hot-Reload for Development
```bash
npm run dev
# or
yarn dev
```

### Compile and Minify for Production
```bash
npm run build
# or
yarn build
```

### Run Tests
```bash
php artisan test
```

## Troubleshooting

### Service Worker Issues
If you encounter issues with the service worker:
1. Clear your browser cache
2. Unregister the service worker through browser developer tools
3. Reload the application

### Database Connection Issues
1. Verify database credentials in the `.env` file
2. Ensure the database server is running
3. Check if the database exists and is accessible

### Dependency Issues
1. Try clearing dependency caches:
```bash
composer clear-cache
npm cache clean --force
```
2. Update dependencies:
```bash
composer update
npm update
```