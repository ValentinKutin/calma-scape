const screensavers = [
  "Aurora Borealis",
  "Ocean Waves",
  "Starry Night",
  "Burning Forest",
  "City Lights",
];

const screensaverList = document.getElementById("screensaver-list");

screensavers.forEach((screensaver) => {
  const listItem = document.createElement("li");
  listItem.textContent = screensaver;
  screensaverList.appendChild(listItem);
});
