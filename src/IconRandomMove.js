//アイコンをランダムに動かす処理

function randomMoveTimer(object , time){
  let moveMax=5;
  return setInterval(()=>{
    randomMove(object , moveMax , moveMax);
  },time);
};

function randomMove(object , topmax , leftmax){
  let originalValue = window.getComputedStyle(object, null).getPropertyValue('transform');// transformの中身を取得。例えばこんな感じmatrix(1, 0, 0, 1, -1.5, 0.5) what!!!
  let originalSizeRot=originalValue.substr(7).split(',').slice(0, 4);//matrixのサイズと回転だけを取得
  object.style.transform ='matrix('+originalSizeRot[0]+','+originalSizeRot[1]+','+originalSizeRot[2]+','+originalSizeRot[3]+',' + getRandomInt( topmax ) + ','+ getRandomInt( leftmax ) +')';
}
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor( max ) ) - ( max / 2 );
}

export default randomMoveTimer;
