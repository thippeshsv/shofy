// let express = require('express');
// let mysql = require('mysql2')
// let formidable  = require('express-formidable')
// let bcrypt  = require('bcrypt')


// let app = express()

// connection_string = {
//   host : 'localhost',
//   user : 'root',
//   password : '7090',
//   database : 'shofy'
// }


// let connncetion = mysql.createConnection(connection_string);

// app.use(formidable());

// app.post('/Signup', async(req, res) => {

//   let {name, email, password} = req.fields

//   if(!(name && email && password )){
//     res.send('enter valid inputs to register')
// }

// let salt = 5
//  let hashed_password = bcrypt.hashSync(password[0],salt)

//  let query = `INSERT INTO registered_users (name, email, password) VALUES ('${name}', '${email}', '${hashed_password}')`

//  connection.execute(query, (err, results, fields) => {
//   if(err) {
//     console.error('Error executing query:',err)
//     return res.status(500).send('Error creating account. Please try again later.');
//   }
// })
// res.status(201).send('regested successfully')
// }
// )

// app.listen(3001)





const express = require('express');
const mysql = require('mysql2');
const formidable = require('express-formidable');
const bcrypt = require('bcrypt');
let cors = require('cors');
const jwt = require('jsonwebtoken');
let multer = require('multer');
const fs = require('fs');
const path = require('path'); // For working with file paths

let mongoose  = require('mongoose')
let nodemailer = require('nodemailer')
const braintree = require('braintree');


const app = express();




// const upload = multer({ storage: storage });


app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL
  methods: ['GET', 'POST'], // Specify the HTTP methods allowed
  credentials: true // Allow sending cookies from the frontend
}))

const connection_string = {
  host: 'localhost',
  user: 'root',
  password: '7090',
  database: 'shofy'
};

const connection = mysql.createConnection(connection_string);

app.use(express.json());

app.use(formidable());

app.post('/Signup', (req, res) => {
  const { name, email, password } = req.fields;
  const imageFile = req.files.image;
if (!imageFile) {
  return res.status(400).send('No image file provided');
}

const imageFileName = imageFile.name;

  if (!name || !email || !password || !imageFile) {
    return res.status(400).send('Please provide all required fields');
  }

  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
    if (err) {
      console.error('Error hashing password:', err);
      return res.status(500).send('Error creating account. Please try again later.');
    }

    const query = `INSERT INTO registered_users (name, email, password, image) VALUES (?, ?, ?, ?)`;
    connection.query(query, [name, email, hashedPassword, imageFileName ], (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).send('Error creating account. Please try again later.');
      }

      const imageExtension = imageFile.name.split('.').pop();
      const imageFileName = imageFile.name; 
      const imagePath = path.join(__dirname, 'uploads', imageFileName);

      fs.copyFile(imageFile.path, imagePath, (err) => {
        if (err) {
          console.error('Error saving image:', err);
          return res.status(500).send('Error saving image.');
        }

        res.status(201).send('Registered successfully');
      });
    });
  });
});

app.post('/Login', (req, res) => {
  let  { email, password } = req.fields;

  // console.log(email);
  // console.log(password)

  if (!email || !password) {
    return res.status(400).send('Please provide email and password');
  }

  const query = `SELECT  * FROM registered_users WHERE email = '${email}'`;
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).send('Error logging in. Please try again later.');
    }

    if (results.length === 0) {
      return res.status(401).send('Invalid email or password');
    }

    const user = results[0];
    bcrypt.compare(password, user.password, (err, isPasswordValid) => {
      if (err) {
        console.error('Error comparing passwords:', err);
        return res.status(500).send('Error logging in. Please try again later.');
      }

      if (!isPasswordValid) {
        return res.status(401).send('Invalid email or password');
      }
     

      const token = jwt.sign({ userId: user.id }, 'dfbhdbcb121wnjsdx');
      res.json({
        token,
        user: {
         
          email: user.email,
          name: user.name,
          profile_pic: user.image
        }
      });
    });
    console.log(user.name)
    console.log(user.image)
  });
});



// /// ADMIN

mongoose.connect('mongodb://localhost:27017/shofy')


let db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to MongoDB');
});


let adminSchema = new mongoose.Schema({
  name: {type: String,required: true, unique: true },
  email: {type: String,required: true, unique: true },
  password: {type: String,required: true}
})


const Admin = mongoose.model('Admin', adminSchema);

app.use(express.json());
app.use(formidable());

app.post('/adminSignup', async (req, res)=>{
  let {name, email, password} = req.fields


  const existingAdmin = await Admin.findOne({ $or: [{ name }, { email }] });
  if (existingAdmin) {
    return res.status(400).send('name or email already exists');
  }


  let salt= 10;
  let encrypted_password = await bcrypt.hash(password, salt);




  let newAdmin = new Admin({
    name,
    email,
    password : encrypted_password
  })

  
  try {
    await newAdmin.save();
    res.status(201).send('Admin registered successfully');
  } catch (error) {
    console.error('Error registering admin:', error);
    res.status(500).send('Error registering admin. Please try again later.');
  }
})


app.post('/adminLogin', async (req, res)=>{

  let {email, password} = req.fields;

  let admin = await Admin.findOne({email})
  if (!admin) {
    return res.status(401).send('Invalid email or password');
  }


  let isPasswordValid = await bcrypt.compare(password,admin.password)
  if (!isPasswordValid) {
    return res.status(401).send('Invalid email or password');
  }

  const token = jwt.sign({ adminId: admin._id }, 'secret_key');
  res.json({ 
    token,
    user: {
         
      name: admin.name,
      // profile_pic: user.image
    } });
})

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ['men', 'women', 'kids'], required: true },
  oldPrice: { type: Number, required: true },
  newPrice: { type: Number, required: true },
  image: { type: String } // Save the filename of the uploaded image
}, { collection: 'products' });

const Product = mongoose.model('Product', productSchema);

app.post('/adminPage', (req, res) => {
  const { name, category, oldPrice, newPrice } = req.fields;
  const imageFile = req.files.image;

  const imageFileName = imageFile.name;
  const imagePath = path.join(__dirname, 'adminProducts', imageFileName);

  fs.copyFile(imageFile.path, imagePath, (err) => {
    if (err) {
      console.error('Error saving image:', err);
      return res.status(500).send('Error saving image.');
    }


  const product = new Product({
    name,
    category,
    oldPrice,
    newPrice,
    image: imageFileName
  });
  console.log(product)

  product.save()
  .then(() => {
    res.status(201).send('Product added successfully');
    
  })
  .catch((error) => {
    console.error('Error adding product:', error);
    res.status(500).send('Error adding product. Please try again later.');
  });

})
})


// TO GET DATA FROM THE DATABASE
app.use('/adminProducts', express.static(path.join(__dirname, 'adminProducts')));

app.get('/products', async (req, res) => {
  try {
    // Retrieve products from the database
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error('Error retrieving products:', error);
    res.status(500).json({ error: 'Failed to retrieve products' });
  }
});

app.use(express.json());

app.post('/send-email', async (req, res) => {
  try {
      const { from, to, subject, text } = req.body;

      let transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
              user: "thippeshsv0@gmail.com",
              pass: "pfksduoqaopetbxf",
          }
      });

      let mailOptions = {
        from : "thippeshsv0@gmail.com",
        to: to,
       subject : "Testing",
        text : "TESTING MAIL"
      };

 
      console.log('Mail Options:', mailOptions);

      await transporter.sendMail(mailOptions);

      console.log('Email sent successfully');

      res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    
      console.error('Error occurred while sending email:', error);
   
      res.status(500).json({ error: 'Internal server error' });
  }
});


const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: 'h49ctcd2tw79ggrd',
  publicKey: 'jwswckmfnrzrhcw7',
  privateKey: 'a78644f2dded29e296049d60479336bc'
});


app.get('/client_token', async (req, res) => {
  try {
    const response = await gateway.clientToken.generate({});
    res.send(response.clientToken);
  } catch (error) {
    console.error('Error generating client token:', error);
    res.status(500).send('Error generating client token');
  }
});





const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
