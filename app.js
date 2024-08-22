const path = require('path');
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');

const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config')

const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById(1)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);


app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);

sequelize
//.sync({ force: true })
    .sync()
    .then(results => {
        return User.findByPk(1)
    })
    .then(user => {
        if (!user) {
            return User.create({ name: 'jorge', email: 'test@gmai.com' })
        }
        return user;
    })
    .then(user => {
        //console.log(user)
        app.listen(config.port, () => {
            console.log(config.messague)
        });
    })
    .catch(err => {
        console.log(err)
    })