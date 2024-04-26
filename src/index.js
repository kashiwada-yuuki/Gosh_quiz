//IDをランダムに並び替える
function RandomID(dataTotal) {
  var max = dataTotal;
  var numbers = [];
  //0～max-1までの配列を作成
  for (i = 0; i < max; i++) {
    numbers.push(i);
  }
  for (i = max - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }
  console.log(numbers);
  return numbers;
}

//ID取得処理の関数
function GetIDsSearch(conditionl) {
  var url =
    "https://collectionapi.metmuseum.org/public/collection/v1/search?" +
    conditionl;
  fetch(url)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error("データなし");
      }
    })
    .then((data) => {
      var objectIDs = data.objectIDs;
      return objectIDs;
    })
    .catch((error) => {
      console.error("ID取得通信失敗");
      alert("API通信に失敗しました。もう一度やり直してください。");
    });
}

//データ取得関数
function GetObject(IDs) {
  var ObjectsArry = [];
  var promises = [];

  IDs.forEach((ID) => {
    var url =
      "https://collectionapi.metmuseum.org/public/collection/v1/objects/" + ID;
    var promise = fetch(url)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          console.error("オブジェクト取得通信失敗");
          alert("API通信に失敗しました。もう一度やり直してください。");
          return null;
        }
      })
      .catch((error) => {
        console.error("オブジェクト取得通信失敗");
        alert("API通信に失敗しました。もう一度やり直してください。");
        return null;
      });
    promises.push(promise);
  });
  return Promise.all(promises).then((results) => {
    results.forEach((data) => {
      if (data !== null) {
        ObjectsArry.push(data);
      }
    });
    return ObjectsArry;
  });
}

//APIのバグ対策フィルター
function IDFilter(IDArry) {
  //APIの総件数以上のIDを削除する
  var thresho = 488023;
  var IDArry = IDArry.filter((num) => num < thresho);
  console.log("IDArry:件数 " + IDArry.length + "  " + IDArry);
  //ハイライトのID取得
  var isHighlightIDs = GetIDsSearch("isHighlight=true");

  //IDとハイライトIDの積を取得する

  return IDarry;
}

//画像を取得する（作成中）
function getPicture(IDNumberArry, objectIDs) {
  const promises = IDNumberArry.map((id) => {
    return fetch(
      "https://collectionapi.metmuseum.org/public/collection/v1/objects/" +
        objectIDs[id]
    ).then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error("データなし");
      }
    });
  });
  return Promise.all(promises);
}

function main() {
  var conditionl = "q=Gogh";
  var dataIDs = GetIDsSearch(conditionl);
  console.log(dataIDs);
  dataIDs = IDFilter(dataIDs);
  const dataTotal = dataIDs.length;
  console.log("受信トータル： " + data.total);
  console.log("dataTotal: " + dataTotal);
  console.log("dataIDs: " + dataIDs);
  const RandomIDArry = RandomID(dataTotal);
  const quizCreateID = RandomIDArry.slice(0, 20);
  console.log("quizCreateID: " + quizCreateID);
  getPicture(quizCreateID, dataIDs);
}

window.addEventListener("load", main);

// function main() {
//   GoshID = [];
//   artistGoshID = [];
//     fetch(
//     "https://collectionapi.metmuseum.org/public/collection/v1/search?q=Gogh"
//   )
//     .then((response) => {
//       if (response.status === 200) {
//         return response.json();
//       } else {
//         throw new Error("通信に失敗しました");
//       }
//     })
//     .then((data) => {
//       GoshTotal = data.total;
//       console.log("GoshTotal: " +GoshTotal);
//       GoshID = data.objectIDs;
//       console.log(GoshID);
//     })

//     fetch(
//       "https://collectionapi.metmuseum.org/public/collection/v1/search?artistOrCulture=true&q=Gogh"
//     )
//       .then((response) => {
//         if (response.status === 200) {
//           return response.json();
//         } else {
//           throw new Error("通信に失敗しました");
//         }
//       })
//       .then((data) => {
//         artistGosh = data.total;
//         console.log("artistGosh: "+ artistGosh);
//         artistGoshID = data.objectIDs;
//         console.log(artistGoshID);
//       })

//       arry = symmetricDifference(artistGoshID,GoshID);
//       console.log(arry);
// }

// function symmetricDifference(setA, setB) {
//   let difference = new Set(setA);

//   for (let elem of setB) {
//       if (difference.has(elem)) {
//           difference.delete(elem);
//       } else {
//           difference.add(elem);
//       }
//   }

//   return difference;
// }
