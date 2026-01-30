// Script per inizializzare Firestore con i prodotti
// Esegui questo file una sola volta per popolare il database

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, collection, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

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

const products = [
  { product_name: 'Zaino Mustela', price: 45.00, stock: 1, sku: 'MU-001', brand: 'Mustela', description: 'Contenuto: Fluido detergente senza risciaquo 300ml, Detergente delicato 200ml, Hydra bébè crema viso 40 ml, Pasta cambio 50ml.', image: 'Zaino-Mustela.jpg' },
  { product_name: 'Organizer passeggino', price: 25.00, stock: 1, sku: 'MU-002', brand: 'Mustela', description: 'Pratico organizer da agganciare al passeggino con tasche multiple per biberon, pannolini e accessori.', image: 'Organizer-passeggino.jpg' },
  { product_name: 'Scatola in latta Mustela', price: 15.00, stock: 1, sku: 'MU-003', brand: 'Mustela', description: 'Scatola in latta con design elegante, perfetta per confezionare piccoli regali.', image: 'Scatola-in-latta.jpg' },
  { product_name: 'Set Mustela crema solare con borsa frigo', price: 25.00, stock: 1, sku: 'MU-004', brand: 'Mustela', description: 'Mustela Kit Solare per tutta la famiglia.', image: 'Mustela-borsa-frigo.jpg' },
  { product_name: 'Bagno corpo Mustela da 150 ml', price: 18.00, stock: 1, sku: 'MU-005', brand: 'Mustela', description: 'Detergente Delicato Corpo e Capelli.', image: 'Bagno-corpo-Mustela.jpg' },
  { product_name: 'Mustela acqua detergente 300ml', price: 14.00, stock: 1, sku: 'MU-006', brand: 'Mustela', description: 'Acqua detergente con avocado biologico.', image: 'Mustela acqua.jpg' },
  { product_name: 'Stick Mustela labbra', price: 7.00, stock: 0, sku: 'MU-007', brand: 'Mustela', description: 'Protezione e nutrimento per labbra e zigomi.', image: 'Stick-labbra.jpg' },
  { product_name: 'Crema solare 50+', price: 19.00, stock: 1, sku: 'MU-008', brand: 'BioNike', description: 'Offre una tripla fotoprotezione dai raggi UVA-UVB.', image: 'Crema-solare-50plus.jpg' },
  { product_name: 'Repellente zanzare', price: 13.00, stock: 1, sku: 'MU-009', brand: 'Mustela', description: 'Durata fino a 8 ore di protezione contro zanzare.', image: 'Mustela zanzare.jpg' },
  { product_name: 'Dissuasore zanzare portatile', price: 15.00, stock: 1, sku: 'CH-001', brand: 'Chicco', description: 'Dispositivo antizanzare portatile con ultrasuoni.', image: 'Dissuasore.jpg' },
  { product_name: 'Zanzariera Chicco per passeggino', price: 10.00, stock: 1, sku: 'CH-002', brand: 'Chicco', description: 'Zanzariera Chicco utilissima per proteggere il passeggino.', image: 'Zanzariera-Chicco.jpg' },
  { product_name: 'Fascia porta bimbo Chicco', price: 70.00, stock: 1, sku: 'CH-003', brand: 'Chicco', description: 'Chicco Boppy Comfyfit Portabebè BL.', image: 'Fascia-porta-bimbo.jpg' },
  { product_name: 'Giostrina Next to Dreams Chicco', price: 35.00, stock: 1, sku: 'CH-004', brand: 'Chicco', description: 'Giostrina musicale progettata per adattarsi alla culla Next2Me.', image: 'Giostrina-Chicco.png' },
  { product_name: 'Giraffa Chicco', price: 20.00, stock: 1, sku: 'CH-005', brand: 'Chicco', description: 'Fune Passeggio Mrs Giraffa realizzata in morbido tessuto.', image: 'Chicco-Giraffa.jpg' },
  { product_name: 'Set igiene panda', price: 10.00, stock: 1, sku: 'CH-006', brand: 'Chicco', description: 'Kit completo per l\'igiene e la cura delle unghie dei bambini.', image: 'Set-igiene-panda.jpg' },
  { product_name: 'Set spazzola e pettine Chicco', price: 10.00, stock: 1, sku: 'CH-007', brand: 'Chicco', description: 'Set spazzola e pettine Chicco per la cura delicata dei capelli.', image: 'Set-spazzola-chicco.jpg' },
  { product_name: 'Carillon Chicco a forma di luna', price: 15.00, stock: 1, sku: 'CH-008', brand: 'Chicco', description: 'Carillon Chicco a forma di luna con melodie rilassanti.', image: 'Carillon-Chicco.jpg' },
  { product_name: 'Massaggia gengive Chicco refrigerante', price: 10.00, stock: 1, sku: 'CH-009', brand: 'Chicco', description: 'Massaggia gengive Chicco refrigerante per la dentizione.', image: 'Massaggia-gengive.jpg' },
  { product_name: 'Chicco Gioco Orsetto Sweet Heart Rosa', price: 25.00, stock: 1, sku: 'CH-010', brand: 'Chicco', description: 'L\'Orsetto Sweet Heart di Chicco è un tenero compagno.', image: 'Orso-proiettore-luce.jpg' },
  { product_name: 'Set dentifricio spazzolino Chicco', price: 10.00, stock: 1, sku: 'CH-011', brand: 'Chicco', description: 'Set Primi Dentini di Chicco con custodia e cerniera.', image: 'Set-dentifricio-spazzolino.jpg' },
  { product_name: 'Gel gengivale Chicco + massaggia gengive da dito', price: 13.00, stock: 1, sku: 'CH-012', brand: 'Chicco', description: 'Set per l\'igiene orale dei bambini indicato dai 4m+.', image: 'set-gengive.jpg' },
  { product_name: 'Dentinale', price: 13.00, stock: 1, sku: 'CH-013', brand: 'Prodotto farmaceutico', description: 'DENTINALE pasta gengivale per il trattamento dei dolori alle gengive.', image: 'dentinale.jpg' },
  { product_name: 'Seggiolino auto Chicco Quizy', price: 95.00, stock: 0, sku: 'CH-014', brand: 'Chicco', description: 'Rialzo auto con schienale ultra-leggero.', image: 'Seggiolino-Chicco.jpg' },
  { product_name: 'Seggiolino auto Chicco Fold & Go', price: 170.00, stock: 1, sku: 'CH-015', brand: 'Chicco', description: 'Seggiolino auto chicco che accompagnerà il tuo bambino.', image: 'Seggiolino-Chicco2.png' },
];

async function initializeProducts() {
  console.log('Inizio inizializzazione prodotti su Firestore...');
  
  for (const product of products) {
    try {
      await setDoc(doc(db, "products", product.product_name), product);
      console.log(`✅ Prodotto aggiunto: ${product.product_name}`);
    } catch (error) {
      console.error(`❌ Errore aggiunta prodotto ${product.product_name}:`, error);
    }
  }
  
  console.log('✅ Inizializzazione completata!');
}

initializeProducts();
