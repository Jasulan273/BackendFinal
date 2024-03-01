const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const User = require('./models/user');
const path = require('path');
const router = express.Router();


const app = express();
app.use(session({
    secret: 'ваш-секретный-ключ',
    resave: false,
    saveUninitialized: false
}));
const PORT = process.env.PORT || 3000;
app.set('view engine', 'ejs');
app.use((req, res, next) => {

    res.locals = res.locals || {};

    res.locals.username = req.session.username || null;

    next();
});
mongoose.connect('mongodb+srv://texnop30618:Jasik2004@cluster0.7qf5jtn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Подключено к MongoDB');
    })
    .catch((err) => {
        console.error('Ошибка подключения к MongoDB:', err);
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, 'public')));




module.exports = router;




const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const foodRoutes = require('./routes/food');
const orderRoutes = require('./routes/order');
const adminRoutes = require('./routes/admin');
const menuRoutes = require('./routes/menu');
const cartRoutes = require('./routes/cart');
const aboutRoutes = require('./routes/about')
const mapRoutes = require('./routes/map')


app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/food', foodRoutes);
app.use('/order', orderRoutes);
app.use('/admin', adminRoutes);
app.use('/menu', menuRoutes);
app.use('/cart', cartRoutes);
app.use('/about', aboutRoutes)
app.use('/map', mapRoutes)


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(`Что-то пошло не так! Ошибка: ${err.message}`);
});

app.listen(PORT, () => {
    console.log(`Сервер работает на http://localhost:${PORT}`);
});
