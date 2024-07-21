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

function fixJsonText(jsonText) {
  // Replace escaped characters
  jsonText = jsonText.replace(/\n/g, "\n"); // Replace \n with actual newline
  jsonText = jsonText.replace(/\t/g, "\t"); // Replace \t with tab
  jsonText = jsonText.replace(/\"/g, '"');  // Replace " with "

  // Normalize line breaks
  jsonText = jsonText.replace(/\r\n/g, "\n"); // Convert Windows line breaks to Unix
  jsonText = jsonText.replace(/\r/g, "\n");   // Convert old Mac line breaks to Unix

  // Ensure all property names and string values are in double quotes
  jsonText = jsonText.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2": '); // Fix property names
  jsonText = jsonText.replace("```json","");
  jsonText = jsonText.replace("```","");


  return jsonText;
}

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
              { text: `Generate 10 multiple choice questions related to ${skill}. Ensure the result is in json format, with questions, options, and correct answers correctly nested.` },
            ],
          },
        ],
      }
    );
    const fixedJsonText = fixJsonText(response.data.candidates[0].content.parts[0].text);
    const quizData = JSON.parse(fixedJsonText);

     // Save to Firestore
    const docRef = await addDoc(collection(db, 'assessment'), {
      skill,
      quizData,
    });

    console.log(fixJsonText(response.data.candidates[0].content.parts[0].text))
    res.status(200).send({ id: docRef.id, ...quizData }
  );
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
