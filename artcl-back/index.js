const express = require("express");
const cors = require("cors");
const app = express();
const corsOptions = {
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: 'GET,POST, DEL', // Allow these HTTP methods
  };
app.use(cors(corsOptions));
app.use(express.json());

require('./routes/authRoutes')(app);
app.use('/api/articles', require('./routes/articleRoutes'));
app.use('/api/comments', require('./routes/commentRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.get("/", (req, res) => {
    res.json({ message: "Welcome to Articles RESTful API!" });
});

const PORT = process.env.PORT || 9898;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});