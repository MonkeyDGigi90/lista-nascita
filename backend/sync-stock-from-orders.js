const admin = require('firebase-admin');
const serviceAccount = require('./lista-nascita-bc16a-firebase-adminsdk-fbsvc-0fcc29cb10.json');
admin.initializeApp({credential: admin.credential.cert(serviceAccount)});
const db = admin.firestore();

async function syncStockFromOrders() {
  // Recupera tutti gli ordini
  const ordersSnap = await db.collection('orders').get();
  const productQuantities = {};
  const debugOrders = [];

  ordersSnap.forEach(doc => {
    const order = doc.data();
    debugOrders.push({ id: doc.id, items: order.items });
    if (order.items && Array.isArray(order.items)) {
      order.items.forEach(item => {
        const name = item.name;
        const qty = parseInt(item.quantity) || 1;
        productQuantities[name] = (productQuantities[name] || 0) + qty;
      });
    }
  });

  // Log di debug: elenco ordini e prodotti
  console.log('ORDINI TROVATI SU FIRESTORE:');
  debugOrders.forEach(o => {
    console.log(`Ordine ${o.id}:`);
    if (o.items && Array.isArray(o.items)) {
      o.items.forEach(i => console.log(`  - ${i.name} x${i.quantity}`));
    } else {
      console.log('  Nessun prodotto');
    }
  });

  // Aggiorna lo stock dei prodotti
  const productsSnap = await db.collection('products').get();
  const updates = [];
  productsSnap.forEach(doc => {
    const product = doc.data();
    const name = product.product_name;
    const purchased = productQuantities[name] || 0;
    let newStock = product.stock;
    if (purchased > 0) {
      newStock = Math.max(product.stock - purchased, 0);
      updates.push({ name, oldStock: product.stock, purchased, newStock });
      db.collection('products').doc(name).set({ stock: newStock }, { merge: true });
    }
  });

  // Log di debug
  console.log('Aggiornamento stock da acquisti utenti:');
  updates.forEach(u => {
    console.log(`Prodotto: ${u.name} | Stock precedente: ${u.oldStock} | Acquistati: ${u.purchased} | Nuovo stock: ${u.newStock}`);
  });
  process.exit(0);
}

syncStockFromOrders();