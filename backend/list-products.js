// Script Node.js per elencare tutti i documenti della collezione products su Firestore
// Esegui con: node list-products.js

const admin = require('firebase-admin');
const serviceAccount = require('./lista-nascita-bc16a-firebase-adminsdk-fbsvc-0fcc29cb10.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'lista-nascita-bc16a',
});

const db = admin.firestore();

async function listProducts() {
  const snapshot = await db.collection('products').get();
  if (snapshot.empty) {
    console.log('Nessun prodotto trovato.');
    return;
  }
  snapshot.forEach(doc => {
    console.log(`ID: ${doc.id}`);
    console.log(doc.data());
    console.log('-------------------');
  });
}

listProducts();