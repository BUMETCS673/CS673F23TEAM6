import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
const prisma = new PrismaClient();

export const getProducts = async (req, res) => {
  try {
    const { search } = req.query;
    if (search !== undefined || search !== null) {
      const products = await prisma.product.findMany({
        where: {
          OR: [
            {
              title: {
                contains: search,
                mode: 'insensitive',
              },
            },
            {
              description: {
                contains: search,
                mode: 'insensitive',
              },
            },
          ],
        },
        include: {
          author: {
            select: {
              name: true, // Include the user's name
            },
          },
        },
      });
      return res.status(200).json(products);
    } else {
      const products = await prisma.product.findMany({
        include: {
          author: {
            select: {
              name: true, // Include the user's name
            },
          },
        },
      });
      return res.status(200).json(products);
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getProductById = async (req, res) => {
  try {
    const response = await prisma.product.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

export const createProduct = async (req, res) => {
  const { title, description, price, images, authorId } = req.body;
  try {
    const product = await prisma.product.create({
      data: {
        title: title,
        description: description,
        price: price,
        images: images,
        authorId: authorId,
      },
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const { title, description, price, images } = req.body;
  try {
    const product = await prisma.product.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        title: title,
        description: description,
        price: price,
        images: images,
      },
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'Unauthorized' });
  }

  const token = authorization.split(' ')[1]; // Extract the token from the Authorization header

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, 'kshajfbkjhgf!@$%$!%124151512AFSaf'); // Replace with your actual secret key
    console.log(decoded);
    const fetchedProduct = await prisma.product.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!fetchedProduct) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    // Check if the decoded user ID matches the authorId of the product
    if (decoded.userId !== Number(fetchedProduct.authorId)) {
      return res.status(403).json({
        msg: 'Forbidden - User ID does not match the product authorId',
      });
    }

    // If the user is authorized, proceed with product deletion
    const product = await prisma.product.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res.status(200).json(product);
  } catch (error) {
    res.status(401).json({ msg: 'Unauthorized - Invalid token' });
  }
};
