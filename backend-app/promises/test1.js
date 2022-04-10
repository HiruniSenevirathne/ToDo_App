const axios = require("axios");
//execute parallely
const runApiCall1 = async () => {
  console.log("start method 1");
  const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
  console.log(res.data[0]);

  console.log("end method 1");
};

const runApiCall2 = async () => {
  console.log("start method 2");
  const res = await axios.get("https://jsonplaceholder.typicode.com/todos/1");
  console.log(res.data);
  console.log("end method 2");
};
// runApiCall1();
// runApiCall2();

//execute one after the other
const Method3 = async () => {
  try {
    console.log("c1");
    await runApiCall1();
    console.log("c2");
    await runApiCall2();
    console.log("c3");
  } catch (err) {
    console.error("Error occered!", err);
  }
};
// Method3();

//execute both. End at once
const Method4 = async () => {
  try {
    console.log("loading...");
    await Promise.all([runApiCall1(), runApiCall2()]);
    console.log("end.");
  } catch (err) {
    console.error("Error occered!", err);
  }
};
Method4();

// console.log("aaa1");
// Method3();
// console.log("aaa2");
