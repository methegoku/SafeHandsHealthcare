#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 SafeHands Healthcare Platform Setup');
console.log('=====================================\n');

// Check if Node.js version is compatible
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);

if (majorVersion < 18) {
  console.error('❌ Node.js 18 or higher is required. Current version:', nodeVersion);
  process.exit(1);
}

console.log('✅ Node.js version check passed:', nodeVersion);

// Function to run commands
function runCommand(command, description) {
  console.log(`\n📦 ${description}...`);
  try {
    execSync(command, { stdio: 'inherit' });
    console.log(`✅ ${description} completed`);
  } catch (error) {
    console.error(`❌ ${description} failed:`, error.message);
    process.exit(1);
  }
}

// Function to check if file exists
function fileExists(filePath) {
  return fs.existsSync(path.join(process.cwd(), filePath));
}

// Function to create .env file if it doesn't exist
function createEnvFile() {
  const envPath = path.join(process.cwd(), 'server', '.env');
  
  if (!fileExists('server/.env')) {
    console.log('\n📝 Creating server/.env file...');
    
    const envContent = `# Server Configuration
NODE_ENV=development
PORT=5000

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=safehands_db
DB_USER=postgres
DB_PASSWORD=password

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d

# Email Configuration (for notifications)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# SMS Configuration (Twilio)
TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE_NUMBER=your-twilio-phone-number

# File Upload Configuration
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=5242880

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
`;
    
    fs.writeFileSync(envPath, envContent);
    console.log('✅ server/.env file created');
    console.log('⚠️  Please update the database credentials in server/.env');
  } else {
    console.log('✅ server/.env file already exists');
  }
}

// Main setup process
async function setup() {
  try {
    // Install root dependencies
    runCommand('npm install', 'Installing root dependencies');
    
    // Install client dependencies
    if (fileExists('client/package.json')) {
      runCommand('cd client && npm install', 'Installing client dependencies');
    }
    
    // Install server dependencies
    if (fileExists('server/package.json')) {
      runCommand('cd server && npm install', 'Installing server dependencies');
    }
    
    // Create .env file
    createEnvFile();
    
    console.log('\n🎉 Setup completed successfully!');
    console.log('\n📋 Next steps:');
    console.log('1. Set up PostgreSQL database');
    console.log('2. Update database credentials in server/.env');
    console.log('3. Run database migrations: cd server && npm run db:migrate');
    console.log('4. Seed the database: cd server && npm run db:seed');
    console.log('5. Start the application: npm run dev');
    console.log('\n📚 For detailed instructions, see README.md');
    
  } catch (error) {
    console.error('\n❌ Setup failed:', error.message);
    process.exit(1);
  }
}

// Run setup
setup(); 