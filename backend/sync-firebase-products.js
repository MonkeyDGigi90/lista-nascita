const admin = require('firebase-admin');
const serviceAccount = require('./lista-nascita-bc16a-firebase-adminsdk-fbsvc-0fcc29cb10.json');
admin.initializeApp({credential: admin.credential.cert(serviceAccount)});
const db = admin.firestore();
const luna=["Zaino Mustela","Organizer passeggino","Scatola in latta Mustela","Set Mustela crema solare con borsa frigo","Bagno corpo Mustela da 150 ml","Mustela acqua detergente 300ml","Stick Mustela labbra","Crema solare 50+","Repellente zanzare","Dissuasore zanzare portatile","Zanzariera Chicco per passeggino","Fascia porta bimbo Chicco","Giostrina Next to Dreams Chicco","Giraffa Chicco","Set igiene panda","Set spazzola e pettine Chicco","Carillon Chicco a forma di luna","Massaggia gengive Chicco refrigerante","Set dentifricio spazzolino Chicco","Gel gengivale Chicco + massaggia gengive da dito","Dentinale","Seggiolino auto Chicco Quizy","Seggiolino auto Chicco Fold & Go"];
const lorenzo=["Boppy Cuscino Allattamento Deluxe hello baby","chicco baby manicure set","Chicco EasyFit Marsupio Ergonomico","Chicco gioco baby orsetto azzurro","Chicco gioco giostra CONIGL-ORSO","Chicco Indicatore Temperatura bagno","Chicco My Sweet doudou","Chicco natural feeling","Chicco Palestrina Attività 0Mesi+ 3 in 1 Morbida","Chicco pettinino crosta lattea","Chicco scaldabiberon casa-auto","Chicco Thermos Portapappa 6Mesi+","Clementoni BABY MICKEY PRIME","Mam comfort 3-12","Mam Dentaruolo cooler","Mam sterilizzatore elettrico e scaldabiberon 6 in 1","Mustela Cofanetto Koala","Mustela Mustì Cofanetto Regalo Acqua Profumata 50ml + Orsetto","Mustela organizer passeggino","MUSTELA VANITY SET","Mustela zaino prime coccole","Narhinel Aspiratore Nasale per Neonato e Bambini","Pampers Baby Dry Pannolini Taglia 2 Mini","Pampers Progressi 1","Portabebè ComfyFit Boppy grigioprezzo","TIRALATTE ELETTRICO LORELLI DAILY COMFORT TOUCHSCR"];
async function sync(){
  const batch=db.batch();
  const all=[...luna,...lorenzo];
  const snap=await db.collection('products').get();
  const existing = {};
  snap.forEach(doc=>{
    existing[doc.id] = doc.data();
    if(!all.includes(doc.id)){batch.delete(doc.ref);}
  });
  for(const name of all){
    const ref=db.collection('products').doc(name);
    if(existing[name]){
      // Prodotto già esistente: mantieni lo stock attuale
      batch.set(ref,{product_name:name,stock:existing[name].stock || 1}, {merge:true});
    }else{
      // Prodotto nuovo: crea con stock 1
      batch.set(ref,{product_name:name,stock:1});
    }
  }
  await batch.commit();
  console.log('Sincronizzazione completata (stock preservato)');
  process.exit(0);
}
sync();
