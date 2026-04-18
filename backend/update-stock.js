// Script per aggiornare lo stock di un prodotto su Firestore
// Esegui con: node backend/update-stock.js "Nome prodotto" 1

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDTMKNgFSxyCD24gC-qMWdvEvVEeLj9jM4",
  authDomain: "lista-nascita-bc16a.firebaseapp.com",
  projectId: "lista-nascita-bc16a",
  storageBucket: "lista-nascita-bc16a.firebasestorage.app",
  messagingSenderId: "369160057605",
  appId: "1:369160057605:web:650a6a68d9acce07a0bd6c",
  measurementId: "G-QMJ24771MV"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function updateStock(productName, newStock) {
  try {
    await updateDoc(doc(db, "products", productName), {
      stock: newStock
    });
    console.log(`Stock aggiornato: ${productName} = ${newStock}`);
  } catch (error) {
    console.error(`Errore aggiornamento stock per ${productName}:`, error);
  }
}

const args = process.argv.slice(2);
const productName = args[0];
const newStock = parseInt(args[1], 10);

if (!productName || isNaN(newStock)) {
  console.error("Uso: node update-stock.js 'Nome prodotto' <stock>");
  process.exit(1);
}

updateStock(productName, newStock);