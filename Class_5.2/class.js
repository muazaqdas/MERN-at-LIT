
// let profile = {
//     name:'Lokesh',
//     class:'B.Tech',
//     classDuration: 3,
// }
// const requiredKey = "classDuration";

// console.log("name:", profile.name);
// console.log("class", profile[requiredKey]);
// // Array
// let courses = [
//     {coiurseName: "BBA", courseStrength:120 },
//     {coiurseName: "MMCA", courseStrength:80 },
//     {coiurseName: "BCA", courseStrength:12},
//     {coiurseName: "B.Tech", courseStrength: 100},
//     ];
//     for(c of courses){
//         console.log("course:", c["courseStrength"]);
//     }


// let profile = {
//     name:'Lokesh',
//     class:'B.Tech',
//     classDuration: 3,
// }

// let keyArray = Object.keys(profile);

// for ( individualKey of keyArray){
//     console.log("key",individualKey, "value:",  profile[individualKey]);

// }
// console.log("Object.keys", Object.keys(profile))
// console.log("Object.values", Object.values(profile))

const products = [
  {
    id: 1,
    name: "Laptop",
    price: 1200
  },
  {
    id: 2,
    name: "Mouse",
    price: 25
  },
  {
    id: 3,
    name: "Keyboard",
    price: 75
  },
  {
    id: 4,
    name: "Monitor",
    price: 300
  }
];
// Reduce

const handleReduce = (paramOne, parameterTwo)=>{
    console.log("paramOne", ++paramOne);
    console.log("parameterTwo", parameterTwo.id);
    return paramOne;
}
products.reduce(handleReduce, 12);
