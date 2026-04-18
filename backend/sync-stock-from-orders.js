const admin = require('firebase-admin');
const serviceAccount = require('./lista-nascita-bc16a-firebase-adminsdk-fbsvc-0fcc29cb10.json');
admin.initializeApp({credential: admin.credential.cert(serviceAccount)});
const db = admin.firestore();

async function syncStockFromOrders() {
    // Lista prodotti Luna
    const luna = [
      "Zaino Mustela","Organizer passeggino","Scatola in latta Mustela","Set Mustela crema solare con borsa frigo","Bagno corpo Mustela da 150 ml","Mustela acqua detergente 300ml","Stick Mustela labbra","Crema solare 50+","Repellente zanzare","Dissuasore zanzare portatile","Zanzariera Chicco per passeggino","Fascia porta bimbo Chicco","Giostrina Next to Dreams Chicco","Giraffa Chicco","Set igiene panda","Set spazzola e pettine Chicco","Carillon Chicco a forma di luna","Massaggia gengive Chicco refrigerante","Set dentifricio spazzolino Chicco","Gel gengivale Chicco + massaggia gengive da dito","Dentinale","Seggiolino auto Chicco Quizy","Seggiolino auto Chicco Fold & Go"
    ];
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
        if (luna.includes(name)) {
          productQuantities[name] = (productQuantities[name] || 0) + qty;
        }
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
  const updatePromises = [];
  productsSnap.forEach(doc => {
    const product = doc.data();
    const name = product.product_name;
    if (!luna.includes(name)) return;
    const purchased = productQuantities[name] || 0;
    let newStock = product.stock;
    if (purchased > 0) {
      newStock = Math.max(product.stock - purchased, 0);
      updates.push({ name, oldStock: product.stock, purchased, newStock });
      updatePromises.push(db.collection('products').doc(name).set({ stock: newStock }, { merge: true }));
    }
  });

  // Attendi che tutti gli aggiornamenti siano completati
  await Promise.all(updatePromises);

  // Log di debug
  console.log('Aggiornamento stock da acquisti utenti:');
  updates.forEach(u => {
    console.log(`Prodotto: ${u.name} | Stock precedente: ${u.oldStock} | Acquistati: ${u.purchased} | Nuovo stock: ${u.newStock}`);
  });
  process.exit(0);
}

syncStockFromOrders();