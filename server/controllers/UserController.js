import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

// register
// hash password
// save user to db

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);

  try {
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: password,
      },
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// login
// check if user exists
// compare password
// generate token
// send token

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: {
        email: email,
        password: password,
      },
    });

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      {
        userId: user.id,
      },
      'kshajfbkjhgf!@$%$!%124151512AFSaf', // Replace with a strong secret key
      {
        expiresIn: '30d', // Token expiration time (adjust as needed)
      }
    );

    // Send the token and user data to the client except password

    res.status(200).json({
      token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// get user
// get user by id

export const getUserById = async (req, res) => {
  try {
    const userId = Number(req.params.id);

    // Retrieve the user's details
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Retrieve all posts created by the user
    const userPosts = await prisma.product.findMany({
      where: {
        authorId: userId,
      },
    });

    // Create a response object that includes user details and their posts
    const response = {
      user: user,
      posts: userPosts,
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// update user
// update user by id

export const updateUser = async (req, res) => {
  const { name, email, password } = req.body;
  const userId = Number(req.params.id); // Assuming you have the user's ID in the URL

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!existingUser) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Define the data object with updated fields
    const updateData = {};
    if (name) {
      updateData.name = name;
    }
    if (email) {
      updateData.email = email;
    }
    if (password) {
      // Hash the new password before updating
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    // Update the user with the provided fields
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: updateData,
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
