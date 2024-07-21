import firebase from '../firebase.js';
import axios from 'axios';
// import Product from '../models/productModel.js';
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

const db = getFirestore(firebase);

// create new skills assessment test
export const assessment = async (req, res, next) => {
  try {
    const skill = req.body.skill
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyBK9A3pPDR_lduTqoiBFFn4DUe-P9y8Kk4`,
      {
        contents: [
          {
            parts: [
              { text: `Generate 10 multiple choice questions related to ${skill}. Ensure the result is in json format, with questions and answers correctly nested. Make sure to not include answers.
` },
            ],
          },
        ],
      }
    );
    res.status(200).send(response);
  } catch (error) {
    console.log(error)
  }
}

export const getProject = async (req, res, next) => {
  try {
    const id = req.params.id;
    const project = doc(db, 'projects', id);
    const data = await getDoc(project);
    if (data.exists()) {
      res.status(200).send(data.data());
    } else {
      res.status(404).send('projectnot found');
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

//create new product

// export const createProduct = async (req, res, next) => {
//   try {
//     const data = req.body;
//     await addDoc(collection(db, 'products'), data);
//     res.status(200).send('product created successfully');
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// };

// //get get all products

// export const getProducts = async (req, res, next) => {
//   try {
//     const products = await getDocs(collection(db, 'products'));
//     const productArray = [];

//     if (products.empty) {
//       res.status(400).send('No Products found');
//     } else {
//       products.forEach((doc) => {
//         const product = new Product(
//           doc.id,
//           doc.data().name,
//           doc.data().price,
//           doc.data().retailer,
//           doc.data().amountInStock,
//         );
//         productArray.push(product);
//       });

//       res.status(200).send(productArray);
//     }
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// };

// //get product by id

// export const getProduct = async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     const product = doc(db, 'products', id);
//     const data = await getDoc(product);
//     if (data.exists()) {
//       res.status(200).send(data.data());
//     } else {
//       res.status(404).send('product not found');
//     }
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// };

// //update product (with id)

// export const updateProduct = async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     const data = req.body;
//     const product = doc(db, 'products', id);
//     await updateDoc(product, data);
//     res.status(200).send('product updated successfully');
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// };

// //delete product (with id)

// export const deleteProduct = async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     await deleteDoc(doc(db, 'products', id));
//     res.status(200).send('product deleted successfully');
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// };
