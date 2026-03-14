// Script per eliminare un prodotto da Firestore
// Esegui con: node delete-product.js <nome prodotto>

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

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

async function deleteProduct(productName) {
  try {
    await deleteDoc(doc(db, "products", productName));
    console.log(`✅ Prodotto eliminato: ${productName}`);
  } catch (error) {
    console.error(`❌ Errore eliminazione prodotto ${productName}:`, error);
  }
}

// Esempio di utilizzo: node delete-product.js "Chicco Gioco Orsetto Sweet Heart Rosa"
const productName = process.argv[2];
if (!productName) {
  console.error('❌ Specificare il nome del prodotto da eliminare!');
  process.exit(1);
}
deleteProduct(productName);