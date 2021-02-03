import { db } from "./Firebase/Firebase";

async function deleteRoomSubCollection(roomId,subCollection) {
  const deleteDocs = await db.collection('rooms').doc(roomId).collection(subCollection).get();
  if(!deleteDocs.empty){
    let batchIndex=0;
    let operationCounter=0;
    let batchArray=[];

    batchArray.push(db.batch());
    deleteDocs.docs.forEach((doc) => {
      batchArray[batchIndex].delete(doc.ref);
      operationCounter++;

      if (operationCounter === 499) {
        batchArray.push(db.batch());
        batchIndex++;
        operationCounter = 0;
      }
    });
    batchArray.forEach(async (batch) => {await batch.commit()});
  }
  return true;
}

export {deleteRoomSubCollection};
