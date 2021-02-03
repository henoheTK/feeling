const defaultIcons=[
  {
    'face'      : {posX : 0   , posY : 0   , sizeX : 300 , sizeY : 300 , rot : 0 , kind : 'nomal'},
    'hair'      : {posX : 0   , posY : 0   , sizeX : 300 , sizeY : 300 , rot : 0 , kind : 'nomal'},
    'leftEye'   : {posX : 90  , posY : 150 , sizeX : 50  , sizeY : 50  , rot : 0 , kind : 'nomal'},
    'rightEye'  : {posX : 160 , posY : 150 , sizeX : 50  , sizeY : 50  , rot : 0 , kind : 'nomal'},
    'nose'      : {posX : 120 , posY : 180 , sizeX : 50  , sizeY : 50  , rot : 0 , kind : 'nomal'},
    'mouth'     : {posX : 120 , posY : 210 , sizeX : 50  , sizeY : 50  , rot : 0 , kind : 'nomal'},
    'other'     : {posX : 0   , posY : 0   , sizeX : 300 , sizeY : 300 , rot : 0 , kind : 'none'},
  },
  {
    'face'      : {posX : 0   , posY : 0   , sizeX : 300 , sizeY : 300 , rot : 0 , kind : 'henoheno'},
    'hair'      : {posX : 0   , posY : 0   , sizeX : 300 , sizeY : 300 , rot : 0 , kind : 'none'},
    'leftEye'   : {posX : 90  , posY : 150 , sizeX : 50  , sizeY : 50  , rot : 0 , kind : 'henoheno'},
    'rightEye'  : {posX : 160 , posY : 150 , sizeX : 50  , sizeY : 50  , rot : 0 , kind : 'henoheno'},
    'nose'      : {posX : 120 , posY : 180 , sizeX : 50  , sizeY : 50  , rot : 0 , kind : 'henoheno'},
    'mouth'     : {posX : 120 , posY : 210 , sizeX : 50  , sizeY : 50  , rot : 0 , kind : 'henoheno'},
    'other'     : {posX : 0   , posY : 0   , sizeX : 300 , sizeY : 300 , rot : 0 , kind : 'henoheno'},
  },
  {
    'face'      : {posX : 0   , posY : 0   , sizeX : 300 , sizeY : 300 , rot : 0 , kind : 'maru'},
    'hair'      : {posX : 0   , posY : 0   , sizeX : 300 , sizeY : 300 , rot : 0 , kind : 'cat'},
    'leftEye'   : {posX : 90  , posY : 150 , sizeX : 50  , sizeY : 50  , rot : 0 , kind : 'cat'},
    'rightEye'  : {posX : 160 , posY : 150 , sizeX : 50  , sizeY : 50  , rot : 0 , kind : 'cat'},
    'nose'      : {posX : 120 , posY : 180 , sizeX : 50  , sizeY : 50  , rot : 0 , kind : 'cat'},
    'mouth'     : {posX : 120 , posY : 210 , sizeX : 50  , sizeY : 50  , rot : 0 , kind : 'cat'},
    'other'     : {posX : 0   , posY : 0   , sizeX : 300 , sizeY : 300 , rot : 0 , kind : 'hige'},
  },
  {
    'face'      : {posX : 0   , posY : 0   , sizeX : 300 , sizeY : 300 , rot : 0 , kind : 'komugi'},
    'hair'      : {posX : 0   , posY : 0   , sizeX : 300 , sizeY : 300 , rot : 0 , kind : 'kaku'},
    'leftEye'   : {posX : 90  , posY : 150 , sizeX : 50  , sizeY : 50  , rot : 0 , kind : 'red'},
    'rightEye'  : {posX : 160 , posY : 150 , sizeX : 50  , sizeY : 50  , rot : 0 , kind : 'blue'},
    'nose'      : {posX : 120 , posY : 180 , sizeX : 50  , sizeY : 50  , rot : 0 , kind : 'pig'},
    'mouth'     : {posX : 120 , posY : 210 , sizeX : 50  , sizeY : 50  , rot : 0 , kind : 'fang'},
    'other'     : {posX : 0   , posY : 0   , sizeX : 300 , sizeY : 300 , rot : 0 , kind : 'horns'},
  },
  {
    'face'      : {posX : 0   , posY : 0   , sizeX : 300 , sizeY : 300 , rot : 0 , kind : 'monster'},
    'hair'      : {posX : 0   , posY : 0   , sizeX : 300 , sizeY : 290 , rot : 0 , kind : 'tyuni'},
    'leftEye'   : {posX : 90  , posY : 150 , sizeX : 50  , sizeY : 50  , rot : 0 , kind : 'tyome'},
    'rightEye'  : {posX : 160 , posY : 150 , sizeX : 50  , sizeY : 50  , rot : 0 , kind : 'tyome'},
    'nose'      : {posX : 120 , posY : 180 , sizeX : 50  , sizeY : 50  , rot : 0 , kind : 'hole'},
    'mouth'     : {posX : 120 , posY : 210 , sizeX : 50  , sizeY : 50  , rot : 0 , kind : 'tooth'},
    'other'     : {posX : 0   , posY : 0   , sizeX : 300 , sizeY : 300 , rot : 0 , kind : 'glasses'},
  },
];
function GetIconRandom(){
  return defaultIcons[Math.floor(Math.random() * Math.floor(defaultIcons.length))]
}

// パーツボタンの情報ズ。一応拡張性のためにKindsの中身2次元連想配列(？)にしてるけどいらないかも。
const partsData=
{ 
  'face'      : { displayName : '顔'   , Kinds : {'henoheno' : {displayKind : 'じ'}, 'nomal' : {displayKind : 'フツー'} ,'monster' : {displayKind : '化物'},'komugi' : {displayKind : '小麦色'},'maru' : {displayKind : 'まる'} }} ,
  'hair'      : { displayName : '髪'   , Kinds : { 'none' : {displayKind : 'なし'}   ,'nomal' : {displayKind : 'フツー'} ,'cat' : {displayKind : 'ケモミミ'},'tyuni' : {displayKind : '厨二'} ,'kaku' : {displayKind : 'カクガリ'}} } ,
  'leftEye'   : { displayName : '左目' , Kinds : { 'henoheno' : {displayKind : 'への'},'no' : {displayKind : 'の'},'nomal' : {displayKind : 'フツー'} ,'cat' : {displayKind : 'ねこ'},'red' : {displayKind : '紅'},'blue' : {displayKind : '蒼'} ,'tyome' : {displayKind : 'コメ'}}} ,
  'rightEye'  : { displayName : '右目' , Kinds : { 'henoheno' : {displayKind : 'への'},'no' : {displayKind : 'の'},'nomal' : {displayKind : 'フツー'},'cat' : {displayKind : 'ねこ'},'red' : {displayKind : '紅'},'blue' : {displayKind : '蒼'} ,'tyome' : {displayKind : 'コメ'}}} ,
  'nose'      : { displayName : '鼻'   , Kinds : { 'henoheno' : {displayKind : 'も'},'nomal' : {displayKind : 'フツー'} ,'cat' : {displayKind : '逆三角'},'pig' : {displayKind : 'ぶたっぱな'} } },
  'mouth'     : { displayName : '口'   , Kinds : { 'henoheno' : {displayKind : 'へ'},'nomal' : {displayKind : 'フツー'} ,'cat' : {displayKind : 'ダブリュー'},'fang' : {displayKind : '牙'},'tooth' : {displayKind : '歯'} }} ,
  'other'     : { displayName : 'その他', Kinds : { 'none' : {displayKind : 'なし'},'horns' : {displayKind : 'ツノ'} ,'glasses' : {displayKind : 'めがね'},'henoheno' : {displayKind : 'へのへの'} }} ,
}
function GetPartsAll(){
  return partsData;
}
function GetPartsData(partsName) {
  return partsData[partsName];
}
function GetPartsKinds(partsName) {
  console.log(partsName)
  return partsData[partsName]['Kinds'];
}
// これがデータベースに保存される。今の値。stateが読み込まれたとき自動で上書きされてる。
let imgsInfo={
  'face'      : {posX : 0 , posY : 0 , sizeX : 300 , sizeY : 300 , rot : 0 , kind : 'nomal'},
  'hair'      : {posX : 0 , posY : 0 , sizeX : 300 , sizeY : 300 , rot : 0 , kind : 'nomal'},
  'leftEye'   : {posX : 0 , posY : 0 , sizeX : 50  , sizeY : 50  , rot : 0 , kind : 'nomal'},
  'rightEye'  : {posX : 0 , posY : 0 , sizeX : 50  , sizeY : 50  , rot : 0 , kind : 'nomal'},
  'nose'      : {posX : 0 , posY : 0 , sizeX : 50  , sizeY : 50  , rot : 0 , kind : 'nomal'},
  'mouth'     : {posX : 0 , posY : 0 , sizeX : 50  , sizeY : 50  , rot : 0 , kind : 'nomal'},
  'other'     : {posX : 0 , posY : 0 , sizeX : 50  , sizeY : 50  , rot : 0 , kind : 'nomal'},
};
function GetImgsInfoEach(partsName,eachPram) {
  return imgsInfo[partsName][eachPram];
}
function GetImgsInfoAll(partsName) {
  return imgsInfo[partsName];
}
function GetImgsInfoAllAll() {
  return imgsInfo;
}
function SetImgsInfoEach(partsName,eachPram,value) {
  imgsInfo[partsName][eachPram]=value;
}
function SetImgsInfoAll(partsName,values) {
  imgsInfo[partsName]=values;
}
function SetImgsInfoAllAll(values) {
  imgsInfo=values;
}

// サイズの上限下限の設定
const partsSizeMaxMin={
  'face'      : {max : 350 , min : 200 },
  'hair'      : {max : 350 , min : 200 },
  'leftEye'   : {max : 70  , min : 15  },
  'rightEye'  : {max : 70  , min : 15  },
  'mouth'     : {max : 100 , min : 15  },
  'nose'      : {max : 100 , min : 15  },
  'other'     : {max : 400 , min : 30  },
};
function GetSizeMax(partsName) {
  return partsSizeMaxMin[partsName]['max'];
}
function GetSizeMin(partsName) {
  return partsSizeMaxMin[partsName]['min'];
}
function GetSizeMaxMin(partsName) {
  return partsSizeMaxMin[partsName];
}

// パーツの現在の大きさ。
let partsSizeNow={
  'face'      : {sizeX : 300 , sizeY : 300 },
  'hair'      : {sizeX : 300 , sizeY : 300 },
  'leftEye'   : {sizeX : 30  , sizeY : 30  },
  'rightEye'  : {sizeX : 30  , sizeY : 30  },
  'mouth'     : {sizeX : 40  , sizeY : 40  },
  'nose'      : {sizeX : 40  , sizeY : 40  },
  'other'      : {sizeX : 300  , sizeY : 300  },
}
function GetSizeXYNow(partsName) {
  return partsSizeNow[partsName];
}
function GetSizeXNow(partsName) {
  console.log(partsName,partsSizeNow[partsName]['sizeX']);
  return partsSizeNow[partsName]['sizeX'];
}
function GetSizeYNow(partsName) {
  return partsSizeNow[partsName]['sizeY'];
}
function SetSizeXYNow(partsName,sizeX,sizeY) {
  partsSizeNow[partsName]={sizeX : sizeX , sizeY : sizeY };
}
function SetSizeXNow(partsName,sizeX) {
  partsSizeNow[partsName]['sizeX'] = sizeX;
}
function SetSizeYNow(partsName,sizeY) {
  partsSizeNow[partsName]['sizeY'] = sizeY;
}

// パーツの回転の上限下限、今のところ意味ない
const partsRotMaxMin={
  'face'      : {max : 360 , min : 0 ,},
  'hair'      : {max : 360 , min : 0 ,},
  'leftEye'   : {max : 360 , min : 0 ,},
  'rightEye'  : {max : 360 , min : 0 ,},
  'mouth'     : {max : 360 , min : 0 ,},
  'nose'      : {max : 360 , min : 0 ,},
  'other'     : {max : 360 , min : 0 ,},
};
function GetRotMax(partsName) {
  return partsRotMaxMin[partsName]['max'];
}
function GetRotMin(partsName) {
  return partsRotMaxMin[partsName]['min'];
}
function GetRotMaxMin(partsName) {
  return partsRotMaxMin[partsName];
}

// パーツの現在の角度
let partsRotNow={
  'face'      : 0,
  'hair'      : 0,
  'leftEye'   : 0,
  'rightEye'  : 0,
  'mouth'     : 0,
  'nose'      : 0,
  'other'      : 0,
}
function GetRotNow(partsName) {
  return partsRotNow[partsName];
}
function SetRotNow(partsName,value) {
  console.log(value);
  partsRotNow[partsName]=value;
}

export {
  GetIconRandom,
  GetPartsAll,GetPartsData,GetPartsKinds,
  GetImgsInfoAllAll,GetImgsInfoAll,GetImgsInfoEach,SetImgsInfoAllAll,SetImgsInfoAll,SetImgsInfoEach,
  GetSizeXYNow,GetSizeYNow,GetSizeXNow,SetSizeXYNow,SetSizeYNow,SetSizeXNow,
  GetSizeMax,GetSizeMin,GetSizeMaxMin,
  GetRotNow,SetRotNow,
  GetRotMax,GetRotMin,GetRotMaxMin,
}