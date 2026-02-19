const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const basicAuth = require('express-basic-auth');
require('dotenv').config(); // Load environment variables from .env

const app = express();
const port = process.env.PORT || 3000;

// ========== MongoDB Connection ==========
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/shedfactory';
mongoose.connect(MONGODB_URI).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// ========== Mongoose Models ==========
const subscriberSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  subscribedAt: { type: Date, default: Date.now }
});

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  subject: String,
  message: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now }
});

const Subscriber = mongoose.model('Subscriber', subscriberSchema);
const Contact = mongoose.model('Contact', contactSchema);

// Set global variables for views
app.locals.baseUrl = process.env.BASE_URL || 'https://shedfactory.co';

// ========== Middleware ==========
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ========== PUBLIC ROUTES ==========

// Home page
app.get('/', (req, res) => {
  res.render('index', {
    currentPath: req.path,
    title: 'Home',
    description: 'Shedfactory Digital Creative Agency - Bringing dreams to life through exceptional digital experiences.'
  });
});

// About page
app.get('/about', (req, res) => {
  res.render('about', {
    currentPath: req.path,
    title: 'About Us',
    description: 'Learn about Shedfactory\'s 10-year journey, our mission, and the team that brings dreams to digital life.'
  });
});

// Services main page
app.get('/services', (req, res) => {
  res.render('services', {
    currentPath: req.path,
    title: 'Our Services',
    description: 'Explore our full range of digital creative services including brand strategy, web development, UI/UX design, and digital marketing.'
  });
});

// Brand Strategy page
app.get('/brand-strategy', (req, res) => {
  res.render('brand-strategy', {
    currentPath: req.path,
    title: 'Brand Strategy & Identity',
    description: 'Develop compelling brand narratives and visual identities that connect with your audience.'
  });
});

// Web Development page
app.get('/web-development', (req, res) => {
  res.render('web-development', {
    currentPath: req.path,
    title: 'Web & App Development',
    description: 'Custom websites and applications built with cutting-edge technologies for exceptional user experiences.'
  });
});

// Digital Marketing page
app.get('/digital-marketing', (req, res) => {
  res.render('digital-marketing', {
    currentPath: req.path,
    title: 'Digital Marketing',
    description: 'Data-driven marketing strategies that increase visibility, drive engagement, and convert visitors.'
  });
});

// UI/UX Design page
app.get('/ui-ux', (req, res) => {
  res.render('ui-ux', {
    currentPath: req.path,
    title: 'UI/UX Design',
    description: 'Creating intuitive, beautiful interfaces that engage users and drive conversions.'
  });
});

// Content Creation page
app.get('/content', (req, res) => {
  res.render('content', {
    currentPath: req.path,
    title: 'Content Creation',
    description: 'Compelling content that tells your story, engages your audience, and establishes authority.'
  });
});

// Portfolio page
app.get('/portfolio', (req, res) => {
  res.render('portfolio', {
    currentPath: req.path,
    title: 'Our Portfolio',
    description: 'Browse our recent projects and see how we\'ve brought dreams to life for our clients.'
  });
});

// Case Studies page
app.get('/case-studies', (req, res) => {
  res.render('case-studies', {
    currentPath: req.path,
    title: 'Case Studies',
    description: 'Detailed insights into our most impactful projects and the results we delivered.'
  });
});

// Contact page

app.get('/contact', (req, res) => {
  res.render('contact', {
    currentPath: req.path,
    title: 'Contact Us',
    description: 'Ready to bring your dream to life? Get in touch with Shedfactory to start your project.',
    success: req.query.success,
    error: req.query.error
  });
});

// ========== CONTACT FORM SUBMISSION ==========
app.post('/contact', async (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  
  // Basic validation
  if (!name || !email || !message) {
    return res.redirect('/contact?error=missing-fields');
  }

  try {
    const newContact = new Contact({
      name,
      email,
      phone: phone || '',
      subject: subject || '',
      message
    });
    await newContact.save();
    console.log('Contact saved:', newContact);
    res.redirect('/contact?success=true');
  } catch (err) {
    console.error('Error saving contact:', err);
    res.redirect('/contact?error=server');
  }
});

// ========== NEWSLETTER SIGNUP ==========
app.post('/newsletter', async (req, res) => {
  const { email } = req.body;
  
  // Validate email
  const isValidEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  if (!email || !isValidEmail(email)) {
    if (req.xhr || (req.headers.accept && req.headers.accept.includes('json'))) {
      return res.status(400).json({ success: false, message: 'Invalid email address' });
    }
    return res.redirect(req.get('Referer') || '/?newsletter=error');
  }

  try {
    // Check for duplicate
    const existing = await Subscriber.findOne({ email });
    if (existing) {
      if (req.xhr || (req.headers.accept && req.headers.accept.includes('json'))) {
        return res.json({ success: false, message: 'Email already subscribed' });
      }
      return res.redirect(req.get('Referer') || '/?newsletter=exists');
    }

    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();
    console.log('Newsletter subscriber added:', email);

    if (req.xhr || (req.headers.accept && req.headers.accept.includes('json'))) {
      return res.json({ success: true, message: 'Thank you for subscribing!' });
    }
    res.redirect(req.get('Referer') || '/?newsletter=success');
  } catch (err) {
    console.error('Error saving subscriber:', err);
    if (req.xhr || (req.headers.accept && req.headers.accept.includes('json'))) {
      return res.status(500).json({ success: false, message: 'Server error' });
    }
    res.redirect(req.get('Referer') || '/?newsletter=error');
  }
});

// ========== ADMIN AREA (BASIC AUTH) ==========
const adminUsers = {};
adminUsers[process.env.ADMIN_USERNAME || 'admin'] = process.env.ADMIN_PASSWORD || 'shedfactory2026';

app.use('/admin', basicAuth({
  users: adminUsers,
  challenge: true,
  realm: 'Shedfactory Admin'
}));

// Admin dashboard – list all subscribers and contacts
app.get('/admin', async (req, res) => {
  try {
    const subscribers = await Subscriber.find().sort({ subscribedAt: -1 });
    const contacts = await Contact.find().sort({ submittedAt: -1 });
    
    res.render('admin', {
      currentPath: req.path,
      title: 'Admin Dashboard',
      subscribers,
      contacts
    });
  } catch (err) {
    console.error('Error fetching admin data:', err);
    res.status(500).send('Database error');
  }
});

// Delete subscriber
app.post('/admin/subscriber/delete/:id', async (req, res) => {
  try {
    await Subscriber.findByIdAndDelete(req.params.id);
    res.redirect('/admin');
  } catch (err) {
    console.error('Error deleting subscriber:', err);
    res.redirect('/admin?error=delete');
  }
});

// Delete contact
app.post('/admin/contact/delete/:id', async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.redirect('/admin');
  } catch (err) {
    console.error('Error deleting contact:', err);
    res.redirect('/admin?error=delete');
  }
});

// ========== SEARCH ==========
// Simple in‑memory search index
const pages = [
  { url: '/', title: 'Home', description: 'Shedfactory Digital Creative Agency - Bringing dreams to life through exceptional digital experiences.' },
  { url: '/about', title: 'About Us', description: 'Learn about Shedfactory\'s 10-year journey, our mission, and the team.' },
  { url: '/services', title: 'Our Services', description: 'Brand strategy, web development, UI/UX design, digital marketing.' },
  { url: '/brand-strategy', title: 'Brand Strategy & Identity', description: 'Develop compelling brand narratives and visual identities.' },
  { url: '/web-development', title: 'Web & App Development', description: 'Custom websites and applications.' },
  { url: '/digital-marketing', title: 'Digital Marketing', description: 'Data-driven marketing strategies.' },
  { url: '/ui-ux', title: 'UI/UX Design', description: 'Creating intuitive, beautiful interfaces.' },
  { url: '/content', title: 'Content Creation', description: 'Compelling content that tells your story.' },
  { url: '/portfolio', title: 'Our Portfolio', description: 'Browse our recent projects.' },
  { url: '/case-studies', title: 'Case Studies', description: 'Detailed insights into impactful projects.' },
  { url: '/contact', title: 'Contact Us', description: 'Get in touch to start your project.' }
];

app.get('/search', (req, res) => {
  const query = req.query.q ? req.query.q.trim().toLowerCase() : '';
  let results = [];

  if (query) {
    results = pages.filter(page =>
      page.title.toLowerCase().includes(query) ||
      page.description.toLowerCase().includes(query)
    ).map(page => ({
      ...page,
      // Highlight matched words (simple)
      title: page.title.replace(new RegExp(`(${query})`, 'gi'), '<mark>$1</mark>'),
      description: page.description.replace(new RegExp(`(${query})`, 'gi'), '<mark>$1</mark>')
    }));
  }

  res.render('search', {
    currentPath: req.path,
    title: 'Search Results',
    description: `Search results for "${query}"`,
    query,
    results
  });
});

// ========== 404 HANDLER ==========
app.use((req, res) => {
  res.status(404).render('404', {
    currentPath: req.path,
    title: 'Page Not Found',
    description: 'The page you are looking for does not exist.'
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Shedfactory app is running at http://localhost:${port}`);
});