const admin = require('firebase-admin');
const serviceAccount = require('./lista-nascita-bc16a-firebase-adminsdk-fbsvc-0fcc29cb10.json');
admin.initializeApp({credential: admin.credential.cert(serviceAccount)});
const firestore = admin.firestore();

async function updateFirestoreStock(productName, newStock) {
  const ref = firestore.collection('products').doc(productName);
  await ref.set({ stock: newStock }, { merge: true });
  console.log(`[FIRESTORE] Stock aggiornato: ${productName} = ${newStock}`);
}

module.exports = { updateFirestoreStock };
