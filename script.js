// Przełączanie motywu
const toggleBtn = document.getElementById('toggle-theme');
const icon = document.getElementById('theme-icon');

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  icon.textContent = document.body.classList.contains('light-mode') ? '☀️' : '🌙';
});

// Pokazywanie/ukrywanie pól zależnie od trybu
const modeSelect = document.getElementById('modeSelect');
const bedtimeContainer = document.getElementById('bedtime-container');

modeSelect.addEventListener('change', () => {
  if (modeSelect.value === 'custom') {
    bedtimeContainer.style.display = 'block';
  } else {
    bedtimeContainer.style.display = 'none';
  }
});

// Obliczanie godzin snu
document.getElementById('sleepForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const mode = modeSelect.value;
  const wakeupTimeValue = document.getElementById('wakeuptime').value;
  const bedtimeValue = document.getElementById('bedtime').value;

  if (!wakeupTimeValue) {
    alert('Wprowadź godzinę pobudki!');
    return;
  }

  const now = new Date();
  let sleepTime;

  if (mode === 'now') {
    sleepTime = new Date();
  } else {
    if (!bedtimeValue) {
      alert('Wprowadź godzinę snu!');
      return;
    }
    sleepTime = new Date(now.toDateString() + ' ' + bedtimeValue);
  }

  let wakeTime = new Date(now.toDateString() + ' ' + wakeupTimeValue);
  if (wakeTime <= sleepTime) {
    wakeTime.setDate(wakeTime.getDate() + 1); // Dodaj dzień, jeśli godzina pobudki jest "następnego dnia"
  }

  const diffMs = wakeTime - sleepTime;
const totalMinutes = Math.floor(diffMs / (1000 * 60));
const hours = Math.floor(totalMinutes / 60);
const minutes = totalMinutes % 60;

document.getElementById('result').textContent =
  `Będziesz spać przez około ${hours} ${godzinaSlowo(hours)} i ${minutes} ${minutaSlowo(minutes)}.`;

  function godzinaSlowo(h) {
    if (h === 1) return 'godzinę';
    if ([2, 3, 4].includes(h)) return 'godziny';
    return 'godzin';
  }
  
  function minutaSlowo(m) {
    if (m === 1) return 'minutę';
    if ([2, 3, 4].includes(m)) return 'minuty';
    return 'minut';
  }
  
});
