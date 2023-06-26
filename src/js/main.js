// const section = document.getElementById("container");

const noOfFloors = 4;
const noOfLifts = 3;

const liftsState = [];

for (let i = 0; i < noOfLifts; i++) {
  liftsState.push({
    currentFloor: 0,
    status: "free",
  });
}

console.log("liftsState initially:");
console.log(liftsState);

const handleClick = (floorNumber) => {
  // check if lift is already on the floor

  const isLiftAlreadyOnFloor = liftsState.some(
    (lift) => lift.currentFloor == floorNumber
  );

  if (isLiftAlreadyOnFloor) return;

  // if lift is not on the desired platform, then move the lift there. for that, find the minimum distance between desired floor and any available lift
  const freeLiftArr = liftsState.reduce((acc, lift) => {
    if (lift.status === "free") {
      return [...acc, Math.abs(lift.currentFloor - floorNumber)];
    }
  }, []);

  console.log("freeLiftArr: ", freeLiftArr);

  const firstFreeLiftIndex = freeLiftArr.findIndex(
    (num) => num === Math.min(...freeLiftArr)
  );

  liftsState[firstFreeLiftIndex].status = "busy";
  liftsState[firstFreeLiftIndex].currentFloor = floorNumber;
  setTimeout(() => {
    liftsState[firstFreeLiftIndex].status = "free";
  }, 1000);
};

handleClick(1);
handleClick(3);

console.log("liftsState after handleClick:");
console.log(liftsState);

setTimeout(() => {
  console.log("liftsState after handleClick:");
  console.log(liftsState);
}, 1000);
