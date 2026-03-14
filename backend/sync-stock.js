// Script per aggiornare l'array dei prodotti in upload-firestore.js con gli stock attuali da Firestore
// Esegui con: node sync-stock.js

const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');
const serviceAccount = require('./lista-nascita-bc16a-firebase-adminsdk-fbsvc-320daf1433.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function syncStock() {
  const snapshot = await db.collection('products').get();
  const products = [];
  snapshot.forEach(doc => {
    const data = doc.data();
    products.push({
      product_name: data.product_name,
      price: data.price,
      stock: data.stock,
      sku: data.sku,
      brand: data.brand,
      description: data.description,
      image: data.image
    });
  });

  // Aggiorna l'array "products" in upload-firestore.js
  const uploadPath = path.join(__dirname, 'upload-firestore.js');
  let code = fs.readFileSync(uploadPath, 'utf8');
  code = code.replace(/const products = \[[\s\S]*?\];/,
    'const products = ' + JSON.stringify(products, null, 2) + ';');
  fs.writeFileSync(uploadPath, code, 'utf8');
  console.log('Stock sincronizzati in upload-firestore.js!');
}

syncStock();
