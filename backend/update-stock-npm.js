// Script Node.js per aggiornare lo stock di un prodotto su Firestore
// Esegui con: node update-stock-npm.js "Nome prodotto" 1

const admin = require('firebase-admin');
const serviceAccount = require('./lista-nascita-bc16a-firebase-adminsdk-fbsvc-0fcc29cb10.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'lista-nascita-bc16a',
});

const db = admin.firestore();

async function updateStock(productName, newStock) {
  try {
    const docRef = db.collection('products').doc(productName);
    await docRef.update({ stock: newStock });
    console.log(`Stock aggiornato: ${productName} = ${newStock}`);
  } catch (error) {
    if (error.code === 5 || (error.message && error.message.includes('No document to update'))) {
      // Documento non esiste, lo creo
      await db.collection('products').doc(productName).set({
        product_name: productName,
        stock: newStock,
        price: 49.90,
        description: 'Cuscino ergonomico per allattamento, rivestimento morbido e lavabile.',
        image: 'BOPPY CUSCINO ALLATTAMENTO DELUXE HELLO BABY prezzo 49.90.jpg'
      });
      console.log(`Documento creato: ${productName} con stock ${newStock}`);
    } else {
      console.error(`Errore aggiornamento stock per ${productName}:`, error);
    }
  }
}

const args = process.argv.slice(2);
const productName = args[0];
const newStock = parseInt(args[1], 10);

if (!productName || isNaN(newStock)) {
  console.error("Uso: node update-stock-npm.js 'Nome prodotto' <stock>");
  process.exit(1);
}

updateStock(productName, newStock);