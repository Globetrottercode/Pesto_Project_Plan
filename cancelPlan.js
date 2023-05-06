function getCancelDates(eDay) {
  let arr = [];
  let date = new Date();
  let month = date.getMonth() + 1;
  let pDay = date.getDate() + "/" + month + "/" + date.getFullYear();
  let curr = pDay;
  let i = 0;
  while (curr !== eDay) {
    date.setDate(date.getDate() + 1);

    curr =
      date.getDate() +
      "/" +
      (date.getMonth() + 1).toString() +
      "/" +
      date.getFullYear();
    // console.log(curr);
    arr.push(curr);
    i++;
  }
  return arr;
}
let eDay = "10/6/2023";
console.log(getCancelDates(eDay));
