const section = document.getElementById("container");

const noOfFloors = 6;
const noOfLifts = 2;

const liftsState = [];

for (let i = 0; i < noOfLifts; i++) {
  liftsState.push({
    currentFloor: 1,
    status: "free",
  });
}

console.log("liftsState initially:");
console.log(liftsState);

const findMin = (freeLiftArr) => {
  let min = freeLiftArr[0].gap;
  for (let i = 0; i < freeLiftArr.length; i++) {
    if (freeLiftArr[i].gap < min) {
      min = freeLiftArr[i].gap;
    }
  }
  return min;
};

const checkIfLiftAlreadyOnFloor = (floorNumber) => {
  return liftsState.some((lift) => lift.currentFloor === floorNumber);
};

const getFreeLifts = (floorNumber) => {
  return liftsState.reduce((acc, lift) => {
    if (lift.status === "free") {
      return [
        ...acc,
        {
          floor: lift.currentFloor,
          gap: Math.abs(lift.currentFloor - floorNumber),
        },
      ];
    }
    return acc;
  }, []);
};

const findMinGapFreeLift = (freeLiftArr) => {
  const minGap = findMin(freeLiftArr);
  return freeLiftArr.find((lift) => lift.gap === minGap);
};

const getFreeLiftsWithFloor = (floor) => {
  return liftsState.find(
    (lift) => lift.currentFloor === floor && lift.status === "free"
  );
};

const updateLiftStatusAndFloor = (lift, floorNumber) => {
  lift.status = "busy";

  const liftContainer = document.querySelector(".lift-container");
  const liftDiv = liftContainer.querySelector(`.lift-${lift.currentFloor}`);
  const floorHeight = 6.5; // Adjust this value based on your CSS

  const distance = Math.abs(lift.currentFloor - floorNumber) * floorHeight;
  const animationDuration = distance * 100; // Adjust the animation speed as needed

  liftDiv.style.transitionDuration = `${animationDuration}ms`;
  liftDiv.style.transform = `translateY(-${distance}rem)`;

  setTimeout(() => {
    liftDiv.style.transitionDuration = "0ms";
    liftDiv.style.transform = "";
    lift.currentFloor = floorNumber;
    lift.status = "free";
    renderFloors();
  }, animationDuration);
};

const createFloor = (floorNumber) => {
  const floor = document.createElement("div");
  floor.classList.add("floor");
  floor.innerText = floorNumber;

  const buttonContainer = document.createElement("div");
  const upButton = document.createElement("button");
  const downButton = document.createElement("button");
  upButton.innerText = "up";
  downButton.innerText = "down";
  upButton.addEventListener("click", () => handleClick(floorNumber));
  downButton.addEventListener("click", () => handleClick(floorNumber));
  buttonContainer.appendChild(upButton);
  buttonContainer.appendChild(downButton);
  buttonContainer.classList.add("button-container");
  floor.appendChild(buttonContainer);

  const liftContainer = document.createElement("div");
  liftContainer.classList.add("lift-container");
  liftsState.forEach((lift) => {
    if (lift.currentFloor === floorNumber) {
      const liftDiv = document.createElement("div");
      liftDiv.classList.add("lift");
      liftDiv.innerText = "Lift";
      liftContainer.appendChild(liftDiv);
    } else {
      const liftDiv = document.createElement("div");
      liftDiv.classList.add("lift");
      liftDiv.classList.add(`lift-${lift.currentFloor}`);
      liftDiv.innerText = "";
      liftContainer.appendChild(liftDiv);
    }
  });

  floor.appendChild(liftContainer);

  section.appendChild(floor);
};

const renderFloors = () => {
  section.innerHTML = "";
  for (let i = noOfFloors; i > 0; i--) {
    createFloor(i);
  }
};

const handleClick = (floorNumber) => {
  const isLiftAlreadyOnFloor = checkIfLiftAlreadyOnFloor(floorNumber);

  if (isLiftAlreadyOnFloor) {
    console.log("lift already on the floor");
    return;
  }

  const freeLiftArr = getFreeLifts(floorNumber);
  const minGapFreeLift = findMinGapFreeLift(freeLiftArr);
  const freeLifts = getFreeLiftsWithFloor(minGapFreeLift.floor);

  if (freeLifts) {
    updateLiftStatusAndFloor(freeLifts, floorNumber);
  }
};

renderFloors();
