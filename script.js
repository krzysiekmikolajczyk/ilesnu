// Przełączanie motywu
document.getElementById('toggle-theme').addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
  });
  
  // Obliczanie godzin snu
  document.getElementById('sleepForm').addEventListener('submit', function (event) {
    event.preventDefault();
  
    const mode = document.getElementById('modeSelect').value;
    const inputTime = document.getElementById('bedtime').value;
  
    const now = new Date();
    let bedtime;
  
    if (mode === 'now') {
      const parts = inputTime.split(':');
      bedtime = new Date();
      bedtime.setHours(parts[0], parts[1], 0, 0);
    } else {
      bedtime = new Date(now.toDateString() + ' ' + inputTime);
    }
  
    let diff = (bedtime - now) / (1000 * 60 * 60);
  
    if (diff < 0) diff += 24; // dodaj dobę, jeśli czas już minął
  
    document.getElementById('result').textContent =
      `Pozostało ${diff.toFixed(2)} godziny(a) snu.`;
  });
  