const mongoose = require('mongoose');
const connectdb = async () => {
    await mongoose.connect('mongodb+srv://anitkumarbanka:7EGctv6SKnjUDt0V@namastenode.jtyl8bk.mongodb.net/devTinder');
}
module.exports = connectdb;
