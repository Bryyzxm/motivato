const hambugerMenu = document.getElementById('hamburger-menu');
const menu = document.getElementById('navbar-language');

hambugerMenu.addEventListener('click', function () {
 event.stopPropagation();
 menu.classList.toggle('hidden');
});

document.addEventListener('click', function () {
 if (!hambugerMenu.contains(event.target) && !menu.contains(event.target)) {
  menu.classList.add('hidden');
 }
});

// Simple language selector implementation
document.addEventListener('DOMContentLoaded', function () {
 const selector = document.getElementById('language-selector');
 const menu = document.getElementById('language-menu');
 const displayText = document.getElementById('selected-lang-text');
 const displayIcon = document.getElementById('selected-lang-icon');
 const options = document.querySelectorAll('#language-menu button');

 // Initialize with saved preference or default
 const savedLang = localStorage.getItem('site-language') || 'id';
 setLanguageDisplay(savedLang);

 function setLanguageDisplay(lang) {
  if (lang === 'en') {
   displayText.textContent = 'English (US)';
   displayIcon.innerHTML = `<g fill-rule="evenodd"><g stroke-width="1pt"><path fill="#bd3d44" d="M0 0h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0z" transform="scale(3.9385)"/><path fill="#fff" d="M0 10h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0z" transform="scale(3.9385)"/></g><path fill="#192f5d" d="M0 0h98.8v70H0z" transform="scale(3.9385)"/><path fill="#fff" d="M8.2 3l1 2.8H12L9.7 7.5l.9 2.7-2.4-1.7L6 10.2l.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3z" transform="scale(3.9385)"/></g>`;
  } else {
   displayText.textContent = 'Bahasa Indonesia';
   displayIcon.innerHTML = `<path fill="#fff" d="M0 0h512v512H0z"/><path fill="#f00" d="M0 0h512v256H0z"/>`;
  }
 }

 // Toggle menu on button click
 selector.addEventListener('click', function (e) {
  e.stopPropagation();
  menu.classList.toggle('hidden');
 });

 // Close when clicking elsewhere
 document.addEventListener('click', function (e) {
  if (!selector.contains(e.target) && !menu.contains(e.target)) {
   menu.classList.add('hidden');
  }
 });

 // Handle language selection
 options.forEach((option) => {
  option.addEventListener('click', function () {
   const lang = this.getAttribute('data-lang');
   localStorage.setItem('site-language', lang);
   setLanguageDisplay(lang);
   menu.classList.add('hidden');
  });
 });
});

const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

// Change the icons inside the button based on previous settings
if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
 themeToggleLightIcon.classList.remove('hidden');
} else {
 themeToggleDarkIcon.classList.remove('hidden');
}

const themeToggleBtn = document.getElementById('theme-toggle');

themeToggleBtn.addEventListener('click', function () {
 // toggle icons inside button
 themeToggleDarkIcon.classList.toggle('hidden');
 themeToggleLightIcon.classList.toggle('hidden');

 // if set via local storage previously
 if (localStorage.getItem('color-theme')) {
  if (localStorage.getItem('color-theme') === 'light') {
   document.documentElement.classList.add('dark');
   localStorage.setItem('color-theme', 'dark');
  } else {
   document.documentElement.classList.remove('dark');
   localStorage.setItem('color-theme', 'light');
  }
 } else {
  // if NOT set via local storage previously
  if (document.documentElement.classList.contains('dark')) {
   document.documentElement.classList.remove('dark');
   localStorage.setItem('color-theme', 'light');
  } else {
   document.documentElement.classList.add('dark');
   localStorage.setItem('color-theme', 'dark');
  }
 }
});

// Fungsi untuk menyimpan data
function saveHabitData() {
 localStorage.setItem('habitData', JSON.stringify(habitData));
 renderAll();
}

// Fungsi untuk memuat data
function loadHabitData() {
 const saved = localStorage.getItem('habitData');
 habitData = saved ? JSON.parse(saved) : {habits: []};
 habitData.habits = habitData.habits.map(normalizeHabit);
}

// Fungsi untuk membuat habit baru
function createHabit(name, color, selectedDays, reminderTime) {
 habitData.habits.push(
  normalizeHabit({
   id: Date.now(),
   name,
   color,
   selectedDays,
   days: Array(selectedDays.length).fill(false),
   targetDays: selectedDays.length,
   completedDays: 0,
   reminderTime: reminderTime || '',
  })
 );
 saveHabitData();
}

// Fungsi untuk memperbarui habit
function updateHabit(id, {name, color, selectedDays, reminderTime}) {
 const h = habitData.habits.find((h) => h.id === id);
 if (!h) return;
 h.name = name;
 h.color = color;
 h.selectedDays = selectedDays;
 h.targetDays = selectedDays.length;
 h.reminderTime = reminderTime;
 if (!h.days || h.days.length !== selectedDays.length) {
  h.days = Array(selectedDays.length).fill(false);
  h.completedDays = 0;
 }
 saveHabitData();
}

// Fungsi untuk menghapus habit
function deleteHabit(id) {
 habitData.habits = habitData.habits.filter((h) => h.id !== id);
 saveHabitData();
}

// Render utama
function renderAll() {
 renderHabitList();
 updateStats();
 updateWeeklyChart();
 updatePieChart();
}

// Fungsi untuk render daftar kebiasaan dengan checkbox harian
function renderHabitList() {
 const container = document.getElementById('habit-list-container');
 if (!container) return;

 container.innerHTML = '';

 if (!habitData.habits || habitData.habits.length === 0) {
  container.innerHTML = `
        <div class="text-center py-8 text-gray-500 dark:text-gray-400">
          Belum ada kebiasaan. Klik tombol "Tambah" untuk mulai mencatat kebiasaan Anda.
        </div>
      `;
  return;
 }

 habitData.habits.forEach((habit) => {
  const h = normalizeHabit(habit);
  const el = document.createElement('div');
  el.className = 'bg-gray-50 dark:bg-gray-800 rounded-lg p-4 flex flex-col gap-4 mb-3';
  el.innerHTML = `
        <div class='flex items-center justify-between'>
          <div class='flex items-center gap-3 flex-1'>
            <div>
              <h4 class='font-medium text-gray-900 dark:text-white'>${h.name}</h4>
              <p class='text-sm text-gray-500 dark:text-gray-400'>${h.completedDays}/${h.targetDays} hari</p>
            </div>
          </div>
          <div class='flex items-center gap-4'>
            <div class='w-16 sm:w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2'>
              <div class='${h.color} h-2 rounded-full transition-all duration-300' style='width: ${(h.completedDays / h.targetDays) * 100}%'></div>
            </div>
            <button onclick='showEditHabit(${
             h.id
            })' aria-label='Edit kebiasaan' class='p-2 rounded hover:bg-blue-100 dark:hover:bg-blue-900 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-400'>
              <svg xmlns='http://www.w3.org/2000/svg' class='w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor' stroke-width='2'><path stroke-linecap='round' stroke-linejoin='round' d='M12 20h9'/><path stroke-linecap='round' stroke-linejoin='round' d='M16.5 3.5a2.121 2.121 0 113 3L7 19.5 3 21l1.5-4L16.5 3.5z'/></svg>
            </button>
            <button onclick='showDeleteConfirmation(${
             h.id
            })' aria-label='Hapus kebiasaan' class='p-2 rounded hover:bg-red-100 dark:hover:bg-red-900 text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-red-400'>
              <svg xmlns='http://www.w3.org/2000/svg' class='w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor' stroke-width='2'><polyline points='3 6 5 6 21 6'/><path d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2'/><line x1='10' y1='11' x2='10' y2='17'/><line x1='14' y1='11' x2='14' y2='17'/></svg>
            </button>
          </div>
        </div>
        <div class='flex flex-row flex-wrap gap-10'>
          ${h.selectedDays
           .map(
            (dayIdx, i) => `
            <div class='flex flex-col items-center'>
              <div class='w-8 h-8 flex items-center justify-center rounded-lg cursor-pointer ${
               h.days[i] ? h.color + ' text-white' : 'bg-gray-100 dark:bg-gray-700'
              } hover:opacity-80 transition-all duration-200' onclick='toggleHabitCompletion(${h.id},${i})'>
                ${h.days[i] ? `<svg class='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 13l4 4L19 7'></path></svg>` : ''}
              </div>
              <span class='text-xs text-gray-500 dark:text-white mt-1'>${daysOfWeek[dayIdx]}</span>
            </div>
          `
           )
           .join('')}
        </div>
      `;
  container.appendChild(el);
 });

 // Update diagrams after rendering
 updateStats();
 updateWeeklyChart();
 updatePieChart();
}

// Fungsi untuk memperbarui statistik
function updateStats() {
 const totalHabits = habitData.habits.length;
 let totalCompleted = 0,
  totalTarget = 0;
 habitData.habits.forEach((h) => {
  totalCompleted += h.completedDays;
  totalTarget += h.targetDays;
 });
 const percent = totalTarget > 0 ? Math.round((totalCompleted / totalTarget) * 100) : 0;
 const pieChartPath = document.querySelector('svg path.text-primary');
 if (pieChartPath) pieChartPath.setAttribute('stroke-dasharray', `${percent}, 100`);
 const completionText = document.querySelector('svg text');
 if (completionText) completionText.textContent = `${percent}%`;
}

// Fungsi untuk memperbarui diagram batang mingguan
function updateWeeklyChart() {
 const chartContainer = document.getElementById('chart-bars');
 if (!chartContainer) return;
 chartContainer.innerHTML = '';
 const dailyProgress = Array(7).fill(0),
  dailyTargets = Array(7).fill(0);
 habitData.habits.forEach((h) => {
  h.selectedDays.forEach((d, i) => {
   dailyTargets[d]++;
   if (h.days[i]) dailyProgress[d]++;
  });
 });
 const barsContainer = document.createElement('div');
 barsContainer.className = 'flex justify-between items-end w-full h-full gap-x-1 sm:gap-x-2';
 for (let i = 0; i < 7; i++) {
  const progress = dailyTargets[i] > 0 ? Math.round((dailyProgress[i] / dailyTargets[i]) * 100) : 0;
  const barContainer = document.createElement('div');
  barContainer.className = 'flex flex-col items-center relative h-full';
  barContainer.style.width = '12%';
  const barsWrapper = document.createElement('div');
  barsWrapper.className = 'relative w-full h-full';
  const targetBar = document.createElement('div');
  targetBar.className = 'absolute inset-0 border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 bg-opacity-30 rounded-t-md';
  const progressBar = document.createElement('div');
  progressBar.className = 'absolute bottom-0 inset-x-0 bg-primary rounded-t-md transition-all duration-300';
  progressBar.style.height = `${progress}%`;
  const percentLabel = document.createElement('div');
  percentLabel.className = 'absolute -top-6 text-xs font-medium text-gray-600 dark:text-gray-300';
  percentLabel.textContent = `${progress}%`;
  const dayLabel = document.createElement('div');
  dayLabel.className = 'absolute -bottom-6 text-xs text-gray-600 dark:text-gray-400';
  dayLabel.textContent = daysOfWeek[i];
  barsWrapper.appendChild(targetBar);
  barsWrapper.appendChild(progressBar);
  barContainer.appendChild(percentLabel);
  barContainer.appendChild(barsWrapper);
  barContainer.appendChild(dayLabel);
  barsContainer.appendChild(barContainer);
 }
 chartContainer.appendChild(barsContainer);
}

// Fungsi untuk memperbarui pie chart
function updatePieChart() {
 let totalCompleted = 0,
  totalTarget = 0;
 habitData.habits.forEach((h) => {
  totalCompleted += h.completedDays;
  totalTarget += h.targetDays;
 });
 const percent = totalTarget > 0 ? Math.round((totalCompleted / totalTarget) * 100) : 0;
 const weeklyFocus = document.querySelector('.text-2xl.font-bold');
 if (weeklyFocus) weeklyFocus.textContent = `${((totalCompleted * 24) / 7).toFixed(1)} jam`;
 const progressBar = document.querySelector('.bg-primary.h-4');
 if (progressBar) progressBar.style.width = `${percent}%`;
}

// Modal utilitas
function showDeleteConfirmation(id) {
 habitIdToDelete = id;
 document.getElementById('konfirmasi-hapus-modal').classList.remove('opacity-0', 'pointer-events-none');
}
document.getElementById('konfirmasi-hapus').onclick = function () {
 if (habitIdToDelete !== null) {
  deleteHabit(habitIdToDelete);
  habitIdToDelete = null;
 }
 document.getElementById('konfirmasi-hapus-modal').classList.add('opacity-0', 'pointer-events-none');
};
document.getElementById('batal-hapus').onclick = document.getElementById('close-konfirmasi').onclick = function () {
 habitIdToDelete = null;
 document.getElementById('konfirmasi-hapus-modal').classList.add('opacity-0', 'pointer-events-none');
};

function showEditHabit(id) {
 habitIdToEdit = id;
 const h = habitData.habits.find((h) => h.id === id);
 if (!h) return;
 document.getElementById('habit-name').value = h.name;
 document.getElementById('habit-reminder').value = h.reminderTime || '';
 const colorInputs = document.querySelectorAll('input[name="habit-color"]');
 colorInputs.forEach((input) => {
  input.checked = input.value === h.color;
 });
 const dayCheckboxes = document.querySelectorAll('input[name="habit-days"]');
 dayCheckboxes.forEach((cb) => {
  cb.checked = h.selectedDays.includes(parseInt(cb.value));
 });
 document.getElementById('tambah-kebiasaan-modal').classList.remove('hidden');
}

// Sumber data utama
let habitData = {habits: []};
let habitIdToDelete = null;
let habitIdToEdit = null;
const DEFAULT_DAYS = [0, 1, 2, 3, 4, 5, 6];
const daysOfWeek = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
const tambahKebiasaanForm = document.getElementById('tambah-kebiasaan-form');

// Utilitas: normalisasi habit agar selalu valid
function normalizeHabit(habit) {
 if (!habit.selectedDays) habit.selectedDays = [...DEFAULT_DAYS];
 if (!habit.days || habit.days.length !== habit.selectedDays.length) habit.days = Array(habit.selectedDays.length).fill(false);
 if (!habit.targetDays) habit.targetDays = habit.selectedDays.length;
 if (!habit.completedDays) habit.completedDays = habit.days.filter(Boolean).length;
 if (!habit.streakCount) habit.streakCount = 0;
 if (!habit.longestStreak) habit.longestStreak = 0;
 if (!habit.lastCompletedDate) habit.lastCompletedDate = null;
 if (!habit.badges) habit.badges = [];
 return habit;
}

// CRUD utama
function saveHabitData() {
 localStorage.setItem('habitData', JSON.stringify(habitData));
 renderAll();
}
function loadHabitData() {
 const saved = localStorage.getItem('habitData');
 habitData = saved ? JSON.parse(saved) : {habits: []};
 habitData.habits = habitData.habits.map(normalizeHabit);
}
function createHabit(name, color, selectedDays, reminderTime) {
 habitData.habits.push(
  normalizeHabit({
   id: Date.now(),
   name,
   color,
   selectedDays,
   days: Array(selectedDays.length).fill(false),
   targetDays: selectedDays.length,
   completedDays: 0,
   reminderTime: reminderTime || '',
   streakCount: 0,
   longestStreak: 0,
   lastCompletedDate: null,
   badges: [],
  })
 );
 saveHabitData();
}
function updateHabit(id, {name, color, selectedDays, reminderTime}) {
 const h = habitData.habits.find((h) => h.id === id);
 if (!h) return;
 h.name = name;
 h.color = color;
 h.selectedDays = selectedDays;
 h.targetDays = selectedDays.length;
 h.reminderTime = reminderTime;
 if (!h.days || h.days.length !== selectedDays.length) {
  h.days = Array(selectedDays.length).fill(false);
  h.completedDays = 0;
 }
 saveHabitData();
}
function deleteHabit(id) {
 habitData.habits = habitData.habits.filter((h) => h.id !== id);
 saveHabitData();
}
function toggleHabitCompletion(habitId, dayIndex) {
 const h = habitData.habits.find((h) => h.id === habitId);
 if (!h) return;
 h.days[dayIndex] = !h.days[dayIndex];
 h.completedDays = h.days.filter(Boolean).length;

 // Update streak saat habit diselesaikan
 if (h.days[dayIndex]) {
  const today = new Date().toISOString().split('T')[0];

  // Jika ini penyelesaian pertama atau ada penyelesaian sebelumnya kemarin
  if (!h.lastCompletedDate || isConsecutiveDay(h.lastCompletedDate, today)) {
   h.streakCount++;

   // Update streak terpanjang jika streak saat ini lebih panjang
   if (h.streakCount > h.longestStreak) {
    h.longestStreak = h.streakCount;

    // Berikan badge berdasarkan milestone streak
    checkAndAwardBadges(h);
   }
  } else {
   // Reset streak jika tidak berurutan
   h.streakCount = 1;
  }

  h.lastCompletedDate = today;
 } else {
  // Jika menandai sebagai belum selesai untuk hari ini, potensial mengurangi streak
  const today = new Date().toISOString().split('T')[0];
  if (h.lastCompletedDate === today) {
   h.streakCount = Math.max(0, h.streakCount - 1);

   // Cari tanggal penyelesaian sebelumnya
   const previousDate = findPreviousCompletionDate(h);
   h.lastCompletedDate = previousDate;
  }
 }
 saveHabitData();

 renderCalendar();
}

// helper function untuk mengecek apakah dua tanggal berurutan
function isConsecutiveDay(date1, date2) {
 const d1 = new Date(date1);
 const d2 = new Date(date2);

 // reset waktu untuk membandingkan hanya tanggal
 d1.setHours(0, 0, 0, 0);
 d2.setHours(0, 0, 0, 0);

 // hitung selisih hari
 const diffTime = d2.getTime() - d1.getTime();
 const diffDays = diffTime / (1000 * 60 * 60 * 24);

 return diffDays === 1;
}

// helper function untuk mencari tanggal penyelesaian sebelumnya
function findPreviousCompletionDate(habit) {
 // Dalam implementasi sederhana, kita bisa mengembalikan null
 return null;
}

// Function untuk memeriksa milestone streak dan memberikan badge
function checkAndAwardBadges(habit) {
 const badgeMilestones = [
  {streak: 3, id: 'streak-3', name: 'Konsisten 3 Hari', icon: '🔥'},
  {streak: 7, id: 'streak-7', name: 'Seminggu Berturut-turut', icon: '🏆'},
  {streak: 14, id: 'streak-14', name: 'Dua Minggu Solid', icon: '⭐'},
  {streak: 30, id: 'streak-30', name: 'Sebulan Penuh', icon: '🌟'},
  {streak: 60, id: 'streak-60', name: 'Dua Bulan Hebat', icon: '💎'},
  {streak: 100, id: 'streak-100', name: 'Ratusan Hari', icon: '👑'},
 ];

 badgeMilestones.forEach((badge) => {
  if (habit.streakCount >= badge.streak && !habit.badges.some((b) => b.id === badge.id)) {
   habit.badges.push({
    id: badge.id,
    name: badge.name,
    icon: badge.icon,
    earnedAt: new Date().toISOString(),
   });

   // Tampilkan notifikasi badge
   showBadgeNotification(habit.name, badge);
  }
 });
}

// Function untuk menampilkan notifikasi badge
function showBadgeNotification(habitName, badge) {
 const notification = document.createElement('div');
 notification.className = 'fixed bottom-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex items-center z-50';
 notification.innerHTML = `
      <div class="text-2xl mr-3">${badge.icon}</div>
      <div>
        <h4 class="font-bold text-gray-900 dark:text-white">Badge Baru!</h4>
        <p class="text-sm text-gray-600 dark:text-gray-300">${habitName}: ${badge.name}</p>
      </div>
    `;

 document.body.appendChild(notification);

 // Hapus notifikasi setelah 5 detik
 setTimeout(() => {
  notification.remove();
 }, 5000);
}

// Render utama
function renderAll() {
 renderHabitList();
 updateStats();
 updateWeeklyChart();
 updatePieChart();
}

function renderHabitList() {
 const container = document.getElementById('habit-list-container');
 if (!container) return;

 container.innerHTML = '';

 if (!habitData.habits || habitData.habits.length === 0) {
  container.innerHTML = `
    <div class="text-center py-8 text-gray-500 dark:text-gray-400">
      Belum ada kebiasaan. Klik tombol "Tambah" untuk mulai mencatat kebiasaan Anda.
    </div>
  `;
  return;
 }

 habitData.habits.forEach((habit) => {
  const h = normalizeHabit(habit);
  const el = document.createElement('div');
  el.className = 'bg-gray-50 dark:bg-gray-800 rounded-lg p-4 flex flex-col gap-4 mb-3';
  el.innerHTML = `
        <div class='flex items-center justify-between'>
          <div class='flex items-center gap-3 flex-1'>
            <div>
              <h4 class='font-medium text-gray-900 dark:text-white'>${h.name}</h4>
              <p class='text-sm text-gray-500 dark:text-gray-400'>${h.completedDays}/${h.targetDays} hari</p>
            </div>
          </div>
          <div class='flex items-center gap-4'>
            <div class='w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2'>
              <div class='${h.color} h-2 rounded-full transition-all duration-300' style='width: ${(h.completedDays / h.targetDays) * 100}%'></div>
            </div>
            <button onclick='showEditHabit(${
             h.id
            })' aria-label='Edit kebiasaan' class='p-2 rounded hover:bg-blue-100 dark:hover:bg-blue-900 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-400'>
              <svg xmlns='http://www.w3.org/2000/svg' class='w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor' stroke-width='2'><path stroke-linecap='round' stroke-linejoin='round' d='M12 20h9'/><path stroke-linecap='round' stroke-linejoin='round' d='M16.5 3.5a2.121 2.121 0 113 3L7 19.5 3 21l1.5-4L16.5 3.5z'/></svg>
            </button>
            <button onclick='showDeleteConfirmation(${
             h.id
            })' aria-label='Hapus kebiasaan' class='p-2 rounded hover:bg-red-100 dark:hover:bg-red-900 text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-red-400'>
              <svg xmlns='http://www.w3.org/2000/svg' class='w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor' stroke-width='2'><polyline points='3 6 5 6 21 6'/><path d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2'/><line x1='10' y1='11' x2='10' y2='17'/><line x1='14' y1='11' x2='14' y2='17'/></svg>
            </button>
          </div>
        </div>
        <div class='flex flex-row flex-wrap gap-10'>
          ${h.selectedDays
           .map(
            (dayIdx, i) => `
            <div class='flex flex-col items-center'>
              <div class='w-8 h-8 flex items-center justify-center rounded-lg cursor-pointer ${
               h.days[i] ? h.color + ' text-white' : 'bg-gray-100 dark:bg-gray-700'
              } hover:opacity-80 transition-all duration-200' onclick='toggleHabitCompletion(${h.id},${i})'>
                ${h.days[i] ? `<svg class='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 13l4 4L19 7'></path></svg>` : ''}
              </div>
              <span class='text-xs text-gray-500 dark:text-white mt-1'>${daysOfWeek[dayIdx]}</span>
            </div>
          `
           )
           .join('')}
        </div>
      `;
  container.appendChild(el);
 });

 // Update diagrams after rendering
 updateStats();
 updateWeeklyChart();
 updatePieChart();
}

// Chart & statistik
function updateStats() {
 const totalHabits = habitData.habits.length;
 let totalCompleted = 0,
  totalTarget = 0;
 habitData.habits.forEach((h) => {
  totalCompleted += h.completedDays;
  totalTarget += h.targetDays;
 });
 const percent = totalTarget > 0 ? Math.round((totalCompleted / totalTarget) * 100) : 0;
 const pieChartPath = document.querySelector('svg path.text-primary');
 if (pieChartPath) pieChartPath.setAttribute('stroke-dasharray', `${percent}, 100`);
 const completionText = document.querySelector('svg text');
 if (completionText) completionText.textContent = `${percent}%`;
}
function updateWeeklyChart() {
 const chartContainer = document.getElementById('chart-bars');
 if (!chartContainer) return;
 chartContainer.innerHTML = '';
 const dailyProgress = Array(7).fill(0),
  dailyTargets = Array(7).fill(0);
 habitData.habits.forEach((h) => {
  h.selectedDays.forEach((d, i) => {
   dailyTargets[d]++;
   if (h.days[i]) dailyProgress[d]++;
  });
 });
 const barsContainer = document.createElement('div');
 barsContainer.className = 'flex justify-between items-end w-full h-full gap-x-1 sm:gap-x-2';
 for (let i = 0; i < 7; i++) {
  const progress = dailyTargets[i] > 0 ? Math.round((dailyProgress[i] / dailyTargets[i]) * 100) : 0;
  const barContainer = document.createElement('div');
  barContainer.className = 'flex flex-col items-center relative h-full';
  barContainer.style.width = '12%';
  const barsWrapper = document.createElement('div');
  barsWrapper.className = 'relative w-5 h-full';
  const targetBar = document.createElement('div');
  targetBar.className = 'absolute inset-0 border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 bg-opacity-30 rounded-t-md';
  const progressBar = document.createElement('div');
  progressBar.className = 'absolute bottom-0 inset-x-0 bg-primary rounded-t-md transition-all duration-300';
  progressBar.style.height = `${progress}%`;
  const percentLabel = document.createElement('div');
  percentLabel.className = 'absolute -top-6 text-xs font-medium text-gray-600 dark:text-gray-300';
  percentLabel.textContent = `${progress}%`;
  const dayLabel = document.createElement('div');
  dayLabel.className = 'absolute -bottom-6 text-xs text-gray-600 dark:text-gray-400';
  dayLabel.textContent = daysOfWeek[i];
  barsWrapper.appendChild(targetBar);
  barsWrapper.appendChild(progressBar);
  barContainer.appendChild(percentLabel);
  barContainer.appendChild(barsWrapper);
  barContainer.appendChild(dayLabel);
  barsContainer.appendChild(barContainer);
 }
 chartContainer.appendChild(barsContainer);
}
function updatePieChart() {
 let totalCompleted = 0,
  totalTarget = 0;
 habitData.habits.forEach((h) => {
  totalCompleted += h.completedDays;
  totalTarget += h.targetDays;
 });
 const percent = totalTarget > 0 ? Math.round((totalCompleted / totalTarget) * 100) : 0;
 const weeklyFocus = document.querySelector('.text-2xl.font-bold');
 if (weeklyFocus) weeklyFocus.textContent = `${((totalCompleted * 24) / 7).toFixed(1)} jam`;
 const progressBar = document.querySelector('.bg-primary.h-4');
 if (progressBar) progressBar.style.width = `${percent}%`;
}

// Modal utilitas
function showDeleteConfirmation(id) {
 habitIdToDelete = id;
 document.getElementById('konfirmasi-hapus-modal').classList.remove('opacity-0', 'pointer-events-none');
}
document.getElementById('konfirmasi-hapus').onclick = function () {
 if (habitIdToDelete !== null) {
  deleteHabit(habitIdToDelete);
  habitIdToDelete = null;
 }
 document.getElementById('konfirmasi-hapus-modal').classList.add('opacity-0', 'pointer-events-none');
};
document.getElementById('batal-hapus').onclick = document.getElementById('close-konfirmasi').onclick = function () {
 habitIdToDelete = null;
 document.getElementById('konfirmasi-hapus-modal').classList.add('opacity-0', 'pointer-events-none');
};

function showEditHabit(id) {
 habitIdToEdit = id;
 const h = habitData.habits.find((h) => h.id === id);
 if (!h) return;
 document.getElementById('habit-name').value = h.name;
 document.getElementById('habit-reminder').value = h.reminderTime || '';
 const colorInputs = document.querySelectorAll('input[name="habit-color"]');
 colorInputs.forEach((input) => {
  input.checked = input.value === h.color;
 });
 const dayCheckboxes = document.querySelectorAll('input[name="habit-days"]');
 dayCheckboxes.forEach((cb) => {
  cb.checked = h.selectedDays.includes(parseInt(cb.value));
 });
 document.getElementById('tambah-kebiasaan-modal').classList.remove('hidden');
}

// Form tambah/edit habit
tambahKebiasaanForm?.addEventListener('submit', function (e) {
 e.preventDefault();
 const name = document.getElementById('habit-name').value;
 const colorInput = document.querySelector('input[name="habit-color"]:checked');
 const color = colorInput ? colorInput.value : 'bg-primary';
 const dayCheckboxes = document.querySelectorAll('input[name="habit-days"]:checked');
 const selectedDays = Array.from(dayCheckboxes).map((cb) => parseInt(cb.value));
 if (selectedDays.length === 0) {
  alert('Pilih minimal satu hari!');
  return;
 }
 const reminderTime = document.getElementById('habit-reminder').value;
 if (habitIdToEdit !== null) {
  updateHabit(habitIdToEdit, {name, color, selectedDays, reminderTime});
  habitIdToEdit = null;
 } else {
  createHabit(name, color, selectedDays, reminderTime);
 }
 document.getElementById('tambah-kebiasaan-modal').classList.add('hidden');
 this.reset();
});

// Modal tambah
const openModalBtn = document.getElementById('tambah-kebiasaan-btn');
const closeModalBtn = document.getElementById('close-modal');
const modalBackdrop = document.getElementById('modal-backdrop');
openModalBtn?.addEventListener('click', () => document.getElementById('tambah-kebiasaan-modal').classList.remove('hidden'));
closeModalBtn?.addEventListener('click', () => document.getElementById('tambah-kebiasaan-modal').classList.add('hidden'));
modalBackdrop?.addEventListener('click', () => document.getElementById('tambah-kebiasaan-modal').classList.add('hidden'));

// Inisialisasi
function initializeApp() {
 loadHabitData();
 renderAll();

 // event listeners untuk navigasi kalender
 document.getElementById('prev-month')?.addEventListener('click', function () {
  currentMonth--;
  if (currentMonth < 0) {
   currentMonth = 11;
   currentYear--;
  }
  renderCalendar();
 });

 document.getElementById('next-month')?.addEventListener('click', function () {
  currentMonth++;
  if (currentMonth > 11) {
   currentMonth = 0;
   currentYear++;
  }
  renderCalendar();
 });
}
document.addEventListener('DOMContentLoaded', initializeApp);

// Initialize color picker behavior
document.addEventListener('DOMContentLoaded', function () {
 const colorInputs = document.querySelectorAll('input[name="habit-color"]');
 const colorLabels = document.querySelectorAll('input[name="habit-color"] + div');

 colorInputs.forEach((input, index) => {
  input.addEventListener('change', function () {
   // Remove border from all labels
   colorLabels.forEach((label) => {
    label.classList.remove('border-gray-900', 'dark:border-white');
    label.classList.add('border-transparent');
   });

   // Add border to selected label
   if (this.checked) {
    colorLabels[index].classList.remove('border-transparent');
    colorLabels[index].classList.add('border-gray-900', 'dark:border-white');
   }
  });

  // Initialize selected state
  if (input.checked) {
   colorLabels[index].classList.remove('border-transparent');
   colorLabels[index].classList.add('border-gray-900', 'dark:border-white');
  }
 });
});

// Notifikasi & Pengingat Dasar
if ('Notification' in window && Notification.permission !== 'granted') {
 Notification.requestPermission();
}

document.getElementById('habit-reminder-modal-close').onclick = function () {
 const modal = document.getElementById('habit-reminder-modal');
 const habitId = modal.dataset.habitId;
 if (habitId) {
  const dismissed = getDismissedHabits();
  if (!dismissed.includes(Number(habitId))) {
   dismissed.push(Number(habitId));
   setDismissedHabits(dismissed);
  }
 }
 modal.classList.add('hidden');
 modal.dataset.habitId = '';
};

setInterval(() => {
 const now = new Date();
 habitData.habits?.forEach((habit) => {
  if (!habit.reminderTime) return;
  const [h, m] = habit.reminderTime.split(':');
  if (parseInt(h) === now.getHours() && parseInt(m) === now.getMinutes()) {
   // Cek jika hari ini adalah hari habit
   const dayIdx = now.getDay() === 0 ? 6 : now.getDay() - 1;
   if (habit.selectedDays?.includes(dayIdx) && !habit.days[habit.selectedDays.indexOf(dayIdx)]) {
    showHabitReminder(habit);
   }
  }
 });
}, 5000);

function getDismissedHabits() {
 return JSON.parse(localStorage.getItem('dismissedHabits') || '[]');
}
function setDismissedHabits(arr) {
 localStorage.setItem('dismissedHabits', JSON.stringify(arr));
}

function playNotificationSound() {
 const audio = new Audio('../public/notif.wav');
 audio.play();
}

function showHabitReminder(habit) {
 const dismissed = getDismissedHabits();
 if (dismissed.includes(habit.id)) return;

 playNotificationSound();

 if ('Notification' in window && Notification.permission === 'granted') {
  new Notification('Pengingat Kebiasaan', {
   body: `Saatnya melakukan: ${habit.name}`,
   icon: '/favicon.ico',
  });
 } else {
  const modal = document.getElementById('habit-reminder-modal');
  const modalText = document.getElementById('habit-reminder-modal-text');
  modalText.textContent = `Saatnya melakukan: ${habit.name}`;
  modal.classList.remove('hidden');
  modal.dataset.habitId = habit.id;
 }
}

document.addEventListener('DOMContentLoaded', function () {
 flatpickr('#habit-reminder', {
  enableTime: true,
  noCalendar: true,
  dateFormat: 'H:i',
  time_24hr: true,
  minuteIncrement: 1,
  allowInput: true,
 });
});

// kalender
let shakeTimeoutId = null;
dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);
dayjs.extend(window.dayjs_plugin_weekday);
dayjs.extend(window.dayjs_plugin_localeData);
dayjs.extend(window.dayjs_plugin_customParseFormat);
dayjs.locale('id');

let currentDate = dayjs();
let selectedDate = dayjs();

const currentMonthYearEl = document.getElementById('currentMonthYear');
const calendarDatesEl = document.getElementById('calendarDates');
const prevMonthButton = document.getElementById('prevMonth');
const nextMonthButton = document.getElementById('nextMonth');
const dateCellTemplate = document.getElementById('dateCellTemplate');
const getQuoteButton = document.getElementById('getQuoteButton');
const quoteDisplayEl = document.getElementById('quoteDisplay');
const loadingSpinnerQuoteEl = document.getElementById('loadingSpinnerQuote');
const quoteSectionEl = document.getElementById('quoteSection');
const planDayButton = document.getElementById('planDayButton');
const planDayModalEl = document.getElementById('planDayModal');
const modalContentInnerEl = planDayModalEl.querySelector('.bg-bg-container-light');
const closeModalButton = document.getElementById('closeModalButton');
const modalSelectedDateEl = document.getElementById('modalSelectedDate');
const dayThemeInput = document.getElementById('dayTheme');
const getActivitiesButton = document.getElementById('getActivitiesButton');
const activitiesDisplayEl = document.getElementById('activitiesDisplay');
const loadingSpinnerActivitiesEl = document.getElementById('loadingSpinnerActivities');

function toggleLoadingSpinner(spinnerElement, show) {
 spinnerElement.classList.toggle('hidden', !show);
}

if (planDayModalEl) {
 // Pastikan elemen modal ada
 planDayModalEl.addEventListener('click', function (event) {
  // Cek apakah target klik adalah elemen overlay itu sendiri (planDayModalEl)
  if (event.target === planDayModalEl) {
   closeModal();
  }
 });
}

function displayMessage(element, message, isError = false) {
 element.innerHTML = message;
 const errorTextColorClass = 'text-red-500';
 const darkErrorTextColorClass = 'dark:text-red-400';

 element.classList.remove(errorTextColorClass, darkErrorTextColorClass, 'text-text-on-light', 'dark:text-text-on-dark', 'dark:text-text-on-light', 'animate-shake');
 element.classList.remove('text-center', 'text-left');

 if (isError) {
  element.classList.add(errorTextColorClass, darkErrorTextColorClass, 'text-center', 'animate-shake');
  if (shakeTimeoutId) clearTimeout(shakeTimeoutId);
  shakeTimeoutId = setTimeout(() => {
   element.classList.remove('animate-shake');
  }, 400);
 } else {
  element.classList.add('animate-fade-in-up');
  setTimeout(() => element.classList.remove('animate-fade-in-up'), 500);

  if (element.id === 'quoteDisplay' || element.id === 'activitiesDisplay') {
   element.classList.add('text-text-on-light');
  } else {
   element.classList.add('text-text-on-light', 'dark:text-text-on-dark');
  }

  if (message.includes('<ul>') || message.includes('<ol>')) {
   element.classList.add('text-left');
  } else {
   element.classList.add('text-center');
  }
 }
}

function renderCalendar() {
 currentMonthYearEl.textContent = currentDate.format('MMMM YYYY');
 calendarDatesEl.innerHTML = '';
 const firstDayOfMonth = currentDate.startOf('month');
 const daysInMonth = currentDate.daysInMonth();
 const firstDayOfWeek = firstDayOfMonth.day();

 for (let i = 0; i < firstDayOfWeek; i++) {
  const emptyCell = document.createElement('div');
  calendarDatesEl.appendChild(emptyCell);
 }

 for (let day = 1; day <= daysInMonth; day++) {
  const cellClone = dateCellTemplate.content.cloneNode(true);
  const dateCell = cellClone.querySelector('.date-cell');
  const dateNumber = cellClone.querySelector('.date-number');
  dateNumber.textContent = day;
  const dateObj = currentDate.date(day);

  dateCell.className =
   'date-cell p-1 sm:p-2 border rounded-md cursor-pointer transition-colors h-10 sm:h-12 flex items-center justify-center text-xs sm:text-sm border-border-default-light dark:border-border-default-dark/50 text-text-on-light dark:text-text-on-dark hover:bg-bg-interactive/80 dark:hover:bg-accent/20';
  dateNumber.className = 'date-number text-text-on-light dark:text-text-on-dark';

  if (dateObj.isSame(dayjs(), 'day') && (!selectedDate || !selectedDate.isSame(dayjs(), 'day'))) {
   dateCell.classList.add('text-primary', 'dark:text-primary', 'font-semibold', 'border-primary', 'dark:border-primary');
   dateNumber.classList.add('text-primary', 'dark:text-primary');
  }

  if (selectedDate && dateObj.isSame(selectedDate, 'day')) {
   dateCell.classList.remove('text-text-on-light', 'dark:text-text-on-dark', 'hover:bg-bg-interactive/80', 'dark:hover:bg-accent/20', 'border-border-default-light', 'dark:border-border-default-dark/50', 'text-primary', 'dark:text-primary');
   dateCell.classList.add('bg-primary', 'text-text-on-dark', 'font-semibold', 'border-primary', 'dark:border-primary', 'animate-pop-in');
   dateNumber.classList.remove('text-text-on-light', 'dark:text-text-on-dark', 'text-primary', 'dark:text-primary');
   dateNumber.classList.add('text-text-on-dark');
   setTimeout(() => dateCell.classList.remove('animate-pop-in'), 300);
  }

  dateCell.addEventListener('click', () => {
   selectedDate = dateObj;
   displayMessage(quoteDisplayEl, `Tanggal dipilih: ${selectedDate.format('DD MMMM YYYY')}. Klik tombol untuk kutipan atau rencana.`);
   quoteSectionEl.classList.remove('hidden');
   renderCalendar();
  });
  calendarDatesEl.appendChild(cellClone);
 }
}

prevMonthButton.addEventListener('click', () => {
 currentDate = currentDate.subtract(1, 'month');
 renderCalendar();
});

nextMonthButton.addEventListener('click', () => {
 currentDate = currentDate.add(1, 'month');
 renderCalendar();
});

getQuoteButton.addEventListener('click', async () => {
 if (!selectedDate) {
  displayMessage(quoteDisplayEl, 'Silakan pilih tanggal terlebih dahulu.', true);
  return;
 }
 quoteSectionEl.classList.remove('hidden');
 toggleLoadingSpinner(loadingSpinnerQuoteEl, true);
 displayMessage(quoteDisplayEl, '');

 const formattedDate = selectedDate.format('DD MMMM YYYY');
 const prompt = `Berikan saya satu kutipan motivasi singkat dan inspiratif dalam bahasa Indonesia untuk tanggal ${formattedDate}. Kutipan harus unik dan membangkitkan semangat.`;

 let chatHistory = [{role: 'user', parts: [{text: prompt}]}];
 const payload = {contents: chatHistory};
 const apiKey = 'AIzaSyBy05FZMWy7gfjOQKVY69G11EMwlbvItyQ';
 const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

 try {
  const response = await fetch(apiUrl, {
   method: 'POST',
   headers: {'Content-Type': 'application/json'},
   body: JSON.stringify(payload),
  });
  if (!response.ok) {
   const errorData = await response.json();
   throw new Error(`Gagal mendapatkan kutipan. Status: ${response.status}. ${errorData.error?.message || 'Tidak ada pesan error spesifik.'}`);
  }
  const result = await response.json();
  if (result.candidates?.[0]?.content?.parts?.[0]?.text) {
   displayMessage(quoteDisplayEl, result.candidates[0].content.parts[0].text.trim());
  } else {
   throw new Error('Gagal memproses respons dari API untuk kutipan.');
  }
 } catch (error) {
  console.error('Error saat mengambil kutipan:', error);
  displayMessage(quoteDisplayEl, `Terjadi kesalahan: ${error.message}`, true);
 } finally {
  toggleLoadingSpinner(loadingSpinnerQuoteEl, false);
 }
});

function openModal() {
 if (!selectedDate) {
  displayMessage(quoteDisplayEl, 'Silakan pilih tanggal terlebih dahulu untuk merencanakan hari.', true);
  return;
 }
 modalSelectedDateEl.textContent = selectedDate.format('DD MMMM YYYY');
 dayThemeInput.value = '';
 activitiesDisplayEl.innerHTML = 'Masukkan tema dan dapatkan ide kegiatan.';
 activitiesDisplayEl.className = 'mt-4 p-3 bg-bg-interactive dark:bg-tertiary rounded-lg text-text-on-light dark:text-text-on-light min-h-[70px] text-sm sm:text-base flex items-center justify-center text-center';

 planDayModalEl.classList.remove('hidden');
 requestAnimationFrame(() => {
  planDayModalEl.classList.remove('opacity-0');
  if (modalContentInnerEl) modalContentInnerEl.classList.remove('scale-95');
 });
}

function closeModal() {
 planDayModalEl.classList.add('opacity-0');
 if (modalContentInnerEl) modalContentInnerEl.classList.add('scale-95');
 setTimeout(() => {
  planDayModalEl.classList.add('hidden');
 }, 300);
}

planDayButton.addEventListener('click', openModal);
closeModalButton.addEventListener('click', closeModal);
planDayModalEl.addEventListener('click', (event) => {
 if (modalContentInnerEl && !modalContentInnerEl.contains(event.target) && event.target === planDayModalEl) {
  closeModal();
 }
});

getActivitiesButton.addEventListener('click', async () => {
 const theme = dayThemeInput.value.trim();
 if (!theme) {
  displayMessage(activitiesDisplayEl, 'Silakan masukkan tema untuk hari ini.', true);
  return;
 }

 toggleLoadingSpinner(loadingSpinnerActivitiesEl, true);
 displayMessage(activitiesDisplayEl, '');

 const formattedDate = selectedDate.format('DD MMMM YYYY');
 const prompt = `Saya ingin merencanakan kegiatan untuk tanggal ${formattedDate} dengan tema utama "${theme}". Berikan saya 3 sampai 5 ide kegiatan singkat, konkret, dan actionable dalam format daftar HTML (gunakan tag <ol> dan <li>). Pastikan bahasanya adalah Bahasa Indonesia.`;

 let chatHistory = [{role: 'user', parts: [{text: prompt}]}];
 const payload = {contents: chatHistory};
 const apiKey = '';
 const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

 try {
  const response = await fetch(apiUrl, {
   method: 'POST',
   headers: {'Content-Type': 'application/json'},
   body: JSON.stringify(payload),
  });
  if (!response.ok) {
   const errorData = await response.json();
   throw new Error(`Gagal mendapatkan ide kegiatan. Status: ${response.status}. ${errorData.error?.message || 'Tidak ada pesan error spesifik.'}`);
  }
  const result = await response.json();
  if (result.candidates?.[0]?.content?.parts?.[0]?.text) {
   let ideasText = result.candidates[0].content.parts[0].text.trim();
   if (!ideasText.match(/<\/?(ol|ul)>/i)) {
    const lines = ideasText.split('\n').filter((line) => line.trim() !== '');
    if (lines.length > 0) {
     ideasText = '<ol>' + lines.map((line) => `<li>${line.replace(/^\d+\.\s*/, '')}</li>`).join('') + '</ol>';
    } else {
     ideasText = '<p>Tidak ada ide kegiatan yang ditemukan.</p>';
    }
   }
   displayMessage(activitiesDisplayEl, ideasText);
  } else {
   throw new Error('Gagal memproses respons dari API untuk ide kegiatan.');
  }
 } catch (error) {
  console.error('Error saat mengambil ide kegiatan:', error);
  displayMessage(activitiesDisplayEl, `Terjadi kesalahan: ${error.message}`, true);
 } finally {
  toggleLoadingSpinner(loadingSpinnerActivitiesEl, false);
 }
});

renderCalendar();
displayMessage(quoteDisplayEl, `Tanggal dipilih: ${selectedDate.format('DD MMMM YYYY')}. Klik tombol untuk kutipan atau rencana.`);
quoteSectionEl.classList.remove('hidden');
