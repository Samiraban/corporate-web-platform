require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const User = require('../models/User');
const { ROLES } = require('./constants');

const seedSuperAdmin = async () => {
  await connectDB();

  const email = process.env.SUPER_ADMIN_EMAIL;
  const existing = await User.findOne({ email });

  if (existing) {
    console.log(`Super Admin already exists: ${email}`);
    process.exit(0);
  }

  const admin = await User.create({
    name: process.env.SUPER_ADMIN_NAME || 'Super Admin',
    email,
    password: process.env.SUPER_ADMIN_PASSWORD,
    role: ROLES.SUPER_ADMIN,
  });

  console.log('Super Admin created successfully:');
  console.log(`  Email:    ${admin.email}`);
  console.log('  Password: (as set in .env — please change after first login)');

  await mongoose.connection.close();
  process.exit(0);
};

seedSuperAdmin().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
