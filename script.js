function toggleSleepTime() {
    const mode = document.querySelector('input[name="mode"]:checked').value;
    const sleepTimeContainer = document.getElementById("sleepTimeContainer");
  
    if (mode === "custom") {
      sleepTimeContainer.style.display = "block";
    } else {
      sleepTimeContainer.style.display = "none";
    }
  }
  
  function calculateSleep() {
    const mode = document.querySelector('input[name="mode"]:checked').value;
    const wakeTimeInput = document.getElementById("wakeTime").value;
    const resultElement = document.getElementById("result");
  
    if (!wakeTimeInput) {
      resultElement.textContent = "Podaj godzinę pobudki!";
      return;
    }
  
    let sleepTime;
  
    if (mode === "now") {
      sleepTime = new Date();
    } else {
      const sleepTimeInput = document.getElementById("sleepTime").value;
      if (!sleepTimeInput) {
        resultElement.textContent = "Podaj godzinę zaśnięcia!";
        return;
      }
      const [h, m] = sleepTimeInput.split(":").map(Number);
      sleepTime = new Date();
      sleepTime.setHours(h, m, 0, 0);
      if (sleepTime > new Date()) {
        // OK, jeszcze dziś
      } else {
        // zasypianie już minęło – zakładamy, że chodzi o jutro
        sleepTime.setDate(sleepTime.getDate() + 1);
      }
    }
  
    const [wakeH, wakeM] = wakeTimeInput.split(":").map(Number);
    const wakeTime = new Date(sleepTime);
    wakeTime.setHours(wakeH, wakeM, 0, 0);
  
    if (wakeTime <= sleepTime) {
      wakeTime.setDate(wakeTime.getDate() + 1);
    }
  
    const diffMs = wakeTime - sleepTime;
    const diffH = Math.floor(diffMs / (1000 * 60 * 60));
    const diffM = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  
    resultElement.textContent = `Będziesz spać ${diffH} godzin i ${diffM} minut. 🛌`;
  }
  