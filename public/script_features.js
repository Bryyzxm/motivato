// On page load or when changing themes, best to add inline in `head` to avoid FOUC
if (
  localStorage.getItem("color-theme") === "dark" ||
  (!("color-theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

const hambugerMenu = document.getElementById("hamburger-menu");
const menu = document.getElementById("navbar-language");

hambugerMenu.addEventListener("click", function () {
  event.stopPropagation();
  menu.classList.toggle("hidden");
});

document.addEventListener("click", function () {
  if (!hambugerMenu.contains(event.target) && !menu.contains(event.target)) {
    menu.classList.add("hidden");
  }
});

// Simple language selector implementation
document.addEventListener("DOMContentLoaded", function () {
  const selector = document.getElementById("language-selector");
  const menu = document.getElementById("language-menu");
  const displayText = document.getElementById("selected-lang-text");
  const displayIcon = document.getElementById("selected-lang-icon");
  const options = document.querySelectorAll("#language-menu button");

  // Initialize with saved preference or default
  const savedLang = localStorage.getItem("site-language") || "id";
  setLanguageDisplay(savedLang);

  function setLanguageDisplay(lang) {
    if (lang === "en") {
      displayText.textContent = "English (US)";
      displayIcon.innerHTML = `<g fill-rule="evenodd"><g stroke-width="1pt"><path fill="#bd3d44" d="M0 0h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0z" transform="scale(3.9385)"/><path fill="#fff" d="M0 10h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0z" transform="scale(3.9385)"/></g><path fill="#192f5d" d="M0 0h98.8v70H0z" transform="scale(3.9385)"/><path fill="#fff" d="M8.2 3l1 2.8H12L9.7 7.5l.9 2.7-2.4-1.7L6 10.2l.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3z" transform="scale(3.9385)"/></g>`;
    } else {
      displayText.textContent = "Bahasa Indonesia";
      displayIcon.innerHTML = `<path fill="#fff" d="M0 0h512v512H0z"/><path fill="#f00" d="M0 0h512v256H0z"/>`;
    }
  }

  // Toggle menu on button click
  selector.addEventListener("click", function (e) {
    e.stopPropagation();
    menu.classList.toggle("hidden");
  });

  // Close when clicking elsewhere
  document.addEventListener("click", function (e) {
    if (!selector.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.add("hidden");
    }
  });

  // Handle language selection
  options.forEach((option) => {
    option.addEventListener("click", function () {
      const lang = this.getAttribute("data-lang");
      localStorage.setItem("site-language", lang);
      setLanguageDisplay(lang);
      menu.classList.add("hidden");
    });
  });
});

const themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
const themeToggleLightIcon = document.getElementById("theme-toggle-light-icon");

// Change the icons inside the button based on previous settings
if (
  localStorage.getItem("color-theme") === "dark" ||
  (!("color-theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  themeToggleLightIcon.classList.remove("hidden");
} else {
  themeToggleDarkIcon.classList.remove("hidden");
}

const themeToggleBtn = document.getElementById("theme-toggle");

themeToggleBtn.addEventListener("click", function () {
  // toggle icons inside button
  themeToggleDarkIcon.classList.toggle("hidden");
  themeToggleLightIcon.classList.toggle("hidden");

  // if set via local storage previously
  if (localStorage.getItem("color-theme")) {
    if (localStorage.getItem("color-theme") === "light") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    }
  } else {
    // if NOT set via local storage previously
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    }
  }
});

// Fungsi untuk menyimpan data
function saveHabitData() {
  localStorage.setItem("habitData", JSON.stringify(habitData));
  renderAll();
}

// Fungsi untuk memuat data
function loadHabitData() {
  const saved = localStorage.getItem("habitData");
  habitData = saved ? JSON.parse(saved) : { habits: [] };
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
      reminderTime: reminderTime || "",
    })
  );
  saveHabitData();
}

// Fungsi untuk memperbarui habit
function updateHabit(id, { name, color, selectedDays, reminderTime }) {
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
  renderCalendar();
}

// Fungsi untuk render daftar kebiasaan dengan checkbox harian
function renderHabitList() {
  const container = document.getElementById("habit-list-container");
  if (!container) return;

  container.innerHTML = "";

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
    const el = document.createElement("div");
    el.className =
      "bg-gray-50 dark:bg-gray-800 rounded-lg p-4 flex flex-col gap-4 mb-3";
    el.innerHTML = `
        <div class='flex items-center justify-between'>
          <div class='flex items-center gap-3 flex-1'>
            <div>
              <h4 class='font-medium text-gray-900 dark:text-white'>${
                h.name
              }</h4>
              <p class='text-sm text-gray-500 dark:text-gray-400'>${
                h.completedDays
              }/${h.targetDays} hari</p>
            </div>
          </div>
          <div class='flex items-center gap-4'>
            <div class='w-16 sm:w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2'>
              <div class='${
                h.color
              } h-2 rounded-full transition-all duration-300' style='width: ${
      (h.completedDays / h.targetDays) * 100
    }%'></div>
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
                h.days[i]
                  ? h.color + " text-white"
                  : "bg-gray-100 dark:bg-gray-700"
              } hover:opacity-80 transition-all duration-200' onclick='toggleHabitCompletion(${
                h.id
              },${i})'>
                ${
                  h.days[i]
                    ? `<svg class='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 13l4 4L19 7'></path></svg>`
                    : ""
                }
              </div>
              <span class='text-xs text-gray-500 dark:text-white mt-1'>${
                daysOfWeek[dayIdx]
              }</span>
            </div>
          `
            )
            .join("")}
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
  const percent =
    totalTarget > 0 ? Math.round((totalCompleted / totalTarget) * 100) : 0;
  const pieChartPath = document.querySelector("svg path.text-primary");
  if (pieChartPath)
    pieChartPath.setAttribute("stroke-dasharray", `${percent}, 100`);
  const completionText = document.querySelector("svg text");
  if (completionText) completionText.textContent = `${percent}%`;
}

// Fungsi untuk memperbarui diagram batang mingguan
function updateWeeklyChart() {
  const chartContainer = document.getElementById("chart-bars");
  if (!chartContainer) return;
  chartContainer.innerHTML = "";
  const dailyProgress = Array(7).fill(0),
    dailyTargets = Array(7).fill(0);
  habitData.habits.forEach((h) => {
    h.selectedDays.forEach((d, i) => {
      dailyTargets[d]++;
      if (h.days[i]) dailyProgress[d]++;
    });
  });
  const barsContainer = document.createElement("div");
  barsContainer.className =
    "flex justify-between items-end w-full h-full gap-x-1 sm:gap-x-2";
  for (let i = 0; i < 7; i++) {
    const progress =
      dailyTargets[i] > 0
        ? Math.round((dailyProgress[i] / dailyTargets[i]) * 100)
        : 0;
    const barContainer = document.createElement("div");
    barContainer.className = "flex flex-col items-center relative h-full";
    barContainer.style.width = "12%";
    const barsWrapper = document.createElement("div");
    barsWrapper.className = "relative w-5 h-full";
    const targetBar = document.createElement("div");
    targetBar.className =
      "absolute inset-0 border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 bg-opacity-30 rounded-t-md";
    const progressBar = document.createElement("div");
    progressBar.className =
      "absolute bottom-0 inset-x-0 bg-primary rounded-t-md transition-all duration-300";
    progressBar.style.height = `${progress}%`;
    const percentLabel = document.createElement("div");
    percentLabel.className =
      "absolute -top-6 text-xs font-medium text-gray-600 dark:text-gray-300";
    percentLabel.textContent = `${progress}%`;
    const dayLabel = document.createElement("div");
    dayLabel.className =
      "absolute -bottom-6 text-xs text-gray-600 dark:text-gray-400";
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
  const percent =
    totalTarget > 0 ? Math.round((totalCompleted / totalTarget) * 100) : 0;
  const weeklyFocus = document.querySelector(".text-2xl.font-bold");
  if (weeklyFocus)
    weeklyFocus.textContent = `${((totalCompleted * 24) / 7).toFixed(1)} jam`;
  const progressBar = document.querySelector(".bg-primary.h-4");
  if (progressBar) progressBar.style.width = `${percent}%`;
}

// Modal utilitas
function showDeleteConfirmation(id) {
  habitIdToDelete = id;
  document
    .getElementById("konfirmasi-hapus-modal")
    .classList.remove("opacity-0", "pointer-events-none");
}
document.getElementById("konfirmasi-hapus").onclick = function () {
  if (habitIdToDelete !== null) {
    deleteHabit(habitIdToDelete);
    habitIdToDelete = null;
  }
  document
    .getElementById("konfirmasi-hapus-modal")
    .classList.add("opacity-0", "pointer-events-none");
};
document.getElementById("batal-hapus").onclick = document.getElementById(
  "close-konfirmasi"
).onclick = function () {
  habitIdToDelete = null;
  document
    .getElementById("konfirmasi-hapus-modal")
    .classList.add("opacity-0", "pointer-events-none");
};

function showEditHabit(id) {
  habitIdToEdit = id;
  const h = habitData.habits.find((h) => h.id === id);
  if (!h) return;
  document.getElementById("habit-name").value = h.name;
  document.getElementById("habit-reminder").value = h.reminderTime || "";
  const colorInputs = document.querySelectorAll('input[name="habit-color"]');
  colorInputs.forEach((input) => {
    input.checked = input.value === h.color;
  });
  const dayCheckboxes = document.querySelectorAll('input[name="habit-days"]');
  dayCheckboxes.forEach((cb) => {
    cb.checked = h.selectedDays.includes(parseInt(cb.value));
  });
  document.getElementById("tambah-kebiasaan-modal").classList.remove("hidden");
}

// Sumber data utama
let habitData = { habits: [] };
let habitIdToDelete = null;
let habitIdToEdit = null;
const DEFAULT_DAYS = [0, 1, 2, 3, 4, 5, 6];
const daysOfWeek = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
const tambahKebiasaanForm = document.getElementById("tambah-kebiasaan-form");

// Utilitas: normalisasi habit agar selalu valid
function normalizeHabit(habit) {
  if (!habit.selectedDays) habit.selectedDays = [...DEFAULT_DAYS];
  if (!habit.days || habit.days.length !== habit.selectedDays.length)
    habit.days = Array(habit.selectedDays.length).fill(false);
  if (!habit.targetDays) habit.targetDays = habit.selectedDays.length;
  if (!habit.completedDays)
    habit.completedDays = habit.days.filter(Boolean).length;
  if (!habit.streakCount) habit.streakCount = 0;
  if (!habit.longestStreak) habit.longestStreak = 0;
  if (!habit.lastCompletedDate) habit.lastCompletedDate = null;
  if (!habit.badges) habit.badges = [];
  return habit;
}

// CRUD utama
function saveHabitData() {
  localStorage.setItem("habitData", JSON.stringify(habitData));
  renderAll();
}
function loadHabitData() {
  const saved = localStorage.getItem("habitData");
  habitData = saved ? JSON.parse(saved) : { habits: [] };
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
      reminderTime: reminderTime || "",
      streakCount: 0,
      longestStreak: 0,
      lastCompletedDate: null,
      badges: [],
    })
  );
  saveHabitData();
}
function updateHabit(id, { name, color, selectedDays, reminderTime }) {
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
    const today = new Date().toISOString().split("T")[0];

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
    const today = new Date().toISOString().split("T")[0];
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
    { streak: 3, id: "streak-3", name: "Konsisten 3 Hari", icon: "🔥" },
    { streak: 7, id: "streak-7", name: "Seminggu Berturut-turut", icon: "🏆" },
    { streak: 14, id: "streak-14", name: "Dua Minggu Solid", icon: "⭐" },
    { streak: 30, id: "streak-30", name: "Sebulan Penuh", icon: "🌟" },
    { streak: 60, id: "streak-60", name: "Dua Bulan Hebat", icon: "💎" },
    { streak: 100, id: "streak-100", name: "Ratusan Hari", icon: "👑" },
  ];

  badgeMilestones.forEach((badge) => {
    if (
      habit.streakCount >= badge.streak &&
      !habit.badges.some((b) => b.id === badge.id)
    ) {
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
  const notification = document.createElement("div");
  notification.className =
    "fixed bottom-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex items-center z-50";
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
  renderCalendar();
}

function renderHabitList() {
  const container = document.getElementById("habit-list-container");
  if (!container) return;

  container.innerHTML = "";

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
    const el = document.createElement("div");
    el.className =
      "bg-gray-50 dark:bg-gray-800 rounded-lg p-4 flex flex-col gap-4 mb-3";
    el.innerHTML = `
        <div class='flex items-center justify-between'>
          <div class='flex items-center gap-3 flex-1'>
            <div>
              <h4 class='font-medium text-gray-900 dark:text-white'>${
                h.name
              }</h4>
              <p class='text-sm text-gray-500 dark:text-gray-400'>${
                h.completedDays
              }/${h.targetDays} hari</p>
            </div>
          </div>
          <div class='flex items-center gap-4'>
            <div class='w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2'>
              <div class='${
                h.color
              } h-2 rounded-full transition-all duration-300' style='width: ${
      (h.completedDays / h.targetDays) * 100
    }%'></div>
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
                h.days[i]
                  ? h.color + " text-white"
                  : "bg-gray-100 dark:bg-gray-700"
              } hover:opacity-80 transition-all duration-200' onclick='toggleHabitCompletion(${
                h.id
              },${i})'>
                ${
                  h.days[i]
                    ? `<svg class='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 13l4 4L19 7'></path></svg>`
                    : ""
                }
              </div>
              <span class='text-xs text-gray-500 dark:text-white mt-1'>${
                daysOfWeek[dayIdx]
              }</span>
            </div>
          `
            )
            .join("")}
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
  const percent =
    totalTarget > 0 ? Math.round((totalCompleted / totalTarget) * 100) : 0;
  const pieChartPath = document.querySelector("svg path.text-primary");
  if (pieChartPath)
    pieChartPath.setAttribute("stroke-dasharray", `${percent}, 100`);
  const completionText = document.querySelector("svg text");
  if (completionText) completionText.textContent = `${percent}%`;
}
function updateWeeklyChart() {
  const chartContainer = document.getElementById("chart-bars");
  if (!chartContainer) return;
  chartContainer.innerHTML = "";
  const dailyProgress = Array(7).fill(0),
    dailyTargets = Array(7).fill(0);
  habitData.habits.forEach((h) => {
    h.selectedDays.forEach((d, i) => {
      dailyTargets[d]++;
      if (h.days[i]) dailyProgress[d]++;
    });
  });
  const barsContainer = document.createElement("div");
  barsContainer.className =
    "flex justify-between items-end w-full h-full gap-x-1 sm:gap-x-2";
  for (let i = 0; i < 7; i++) {
    const progress =
      dailyTargets[i] > 0
        ? Math.round((dailyProgress[i] / dailyTargets[i]) * 100)
        : 0;
    const barContainer = document.createElement("div");
    barContainer.className = "flex flex-col items-center relative h-full";
    barContainer.style.width = "12%";
    const barsWrapper = document.createElement("div");
    barsWrapper.className = "relative w-5 h-full";
    const targetBar = document.createElement("div");
    targetBar.className =
      "absolute inset-0 border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 bg-opacity-30 rounded-t-md";
    const progressBar = document.createElement("div");
    progressBar.className =
      "absolute bottom-0 inset-x-0 bg-primary rounded-t-md transition-all duration-300";
    progressBar.style.height = `${progress}%`;
    const percentLabel = document.createElement("div");
    percentLabel.className =
      "absolute -top-6 text-xs font-medium text-gray-600 dark:text-gray-300";
    percentLabel.textContent = `${progress}%`;
    const dayLabel = document.createElement("div");
    dayLabel.className =
      "absolute -bottom-6 text-xs text-gray-600 dark:text-gray-400";
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
  const percent =
    totalTarget > 0 ? Math.round((totalCompleted / totalTarget) * 100) : 0;
  const weeklyFocus = document.querySelector(".text-2xl.font-bold");
  if (weeklyFocus)
    weeklyFocus.textContent = `${((totalCompleted * 24) / 7).toFixed(1)} jam`;
  const progressBar = document.querySelector(".bg-primary.h-4");
  if (progressBar) progressBar.style.width = `${percent}%`;
}

// Modal utilitas
function showDeleteConfirmation(id) {
  habitIdToDelete = id;
  document
    .getElementById("konfirmasi-hapus-modal")
    .classList.remove("opacity-0", "pointer-events-none");
}
document.getElementById("konfirmasi-hapus").onclick = function () {
  if (habitIdToDelete !== null) {
    deleteHabit(habitIdToDelete);
    habitIdToDelete = null;
  }
  document
    .getElementById("konfirmasi-hapus-modal")
    .classList.add("opacity-0", "pointer-events-none");
};
document.getElementById("batal-hapus").onclick = document.getElementById(
  "close-konfirmasi"
).onclick = function () {
  habitIdToDelete = null;
  document
    .getElementById("konfirmasi-hapus-modal")
    .classList.add("opacity-0", "pointer-events-none");
};

function showEditHabit(id) {
  habitIdToEdit = id;
  const h = habitData.habits.find((h) => h.id === id);
  if (!h) return;
  document.getElementById("habit-name").value = h.name;
  document.getElementById("habit-reminder").value = h.reminderTime || "";
  const colorInputs = document.querySelectorAll('input[name="habit-color"]');
  colorInputs.forEach((input) => {
    input.checked = input.value === h.color;
  });
  const dayCheckboxes = document.querySelectorAll('input[name="habit-days"]');
  dayCheckboxes.forEach((cb) => {
    cb.checked = h.selectedDays.includes(parseInt(cb.value));
  });
  document.getElementById("tambah-kebiasaan-modal").classList.remove("hidden");
}

// Form tambah/edit habit
tambahKebiasaanForm?.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("habit-name").value;
  const colorInput = document.querySelector(
    'input[name="habit-color"]:checked'
  );
  const color = colorInput ? colorInput.value : "bg-primary";
  const dayCheckboxes = document.querySelectorAll(
    'input[name="habit-days"]:checked'
  );
  const selectedDays = Array.from(dayCheckboxes).map((cb) =>
    parseInt(cb.value)
  );
  if (selectedDays.length === 0) {
    alert("Pilih minimal satu hari!");
    return;
  }
  const reminderTime = document.getElementById("habit-reminder").value;
  if (habitIdToEdit !== null) {
    updateHabit(habitIdToEdit, { name, color, selectedDays, reminderTime });
    habitIdToEdit = null;
  } else {
    createHabit(name, color, selectedDays, reminderTime);
  }
  document.getElementById("tambah-kebiasaan-modal").classList.add("hidden");
  this.reset();
});

// Modal tambah
const openModalBtn = document.getElementById("tambah-kebiasaan-btn");
const closeModalBtn = document.getElementById("close-modal");
const modalBackdrop = document.getElementById("modal-backdrop");
openModalBtn?.addEventListener("click", () =>
  document.getElementById("tambah-kebiasaan-modal").classList.remove("hidden")
);
closeModalBtn?.addEventListener("click", () =>
  document.getElementById("tambah-kebiasaan-modal").classList.add("hidden")
);
modalBackdrop?.addEventListener("click", () =>
  document.getElementById("tambah-kebiasaan-modal").classList.add("hidden")
);

// Inisialisasi
function initializeApp() {
  loadHabitData();
  renderAll();

  // event listeners untuk navigasi kalender
  document.getElementById("prev-month")?.addEventListener("click", function () {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    renderCalendar();
  });

  document.getElementById("next-month")?.addEventListener("click", function () {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    renderCalendar();
  });
}
document.addEventListener("DOMContentLoaded", initializeApp);

// Initialize color picker behavior
document.addEventListener("DOMContentLoaded", function () {
  const colorInputs = document.querySelectorAll('input[name="habit-color"]');
  const colorLabels = document.querySelectorAll(
    'input[name="habit-color"] + div'
  );

  colorInputs.forEach((input, index) => {
    input.addEventListener("change", function () {
      // Remove border from all labels
      colorLabels.forEach((label) => {
        label.classList.remove("border-gray-900", "dark:border-white");
        label.classList.add("border-transparent");
      });

      // Add border to selected label
      if (this.checked) {
        colorLabels[index].classList.remove("border-transparent");
        colorLabels[index].classList.add(
          "border-gray-900",
          "dark:border-white"
        );
      }
    });

    // Initialize selected state
    if (input.checked) {
      colorLabels[index].classList.remove("border-transparent");
      colorLabels[index].classList.add("border-gray-900", "dark:border-white");
    }
  });
});

// Notifikasi & Pengingat Dasar
if ("Notification" in window && Notification.permission !== "granted") {
  Notification.requestPermission();
}

document.getElementById("habit-reminder-modal-close").onclick = function () {
  const modal = document.getElementById("habit-reminder-modal");
  const habitId = modal.dataset.habitId;
  if (habitId) {
    const dismissed = getDismissedHabits();
    if (!dismissed.includes(Number(habitId))) {
      dismissed.push(Number(habitId));
      setDismissedHabits(dismissed);
    }
  }
  modal.classList.add("hidden");
  modal.dataset.habitId = "";
};

setInterval(() => {
  const now = new Date();
  habitData.habits?.forEach((habit) => {
    if (!habit.reminderTime) return;
    const [h, m] = habit.reminderTime.split(":");
    if (parseInt(h) === now.getHours() && parseInt(m) === now.getMinutes()) {
      // Cek jika hari ini adalah hari habit
      const dayIdx = now.getDay() === 0 ? 6 : now.getDay() - 1;
      if (
        habit.selectedDays?.includes(dayIdx) &&
        !habit.days[habit.selectedDays.indexOf(dayIdx)]
      ) {
        showHabitReminder(habit);
      }
    }
  });
}, 5000);

function getDismissedHabits() {
  return JSON.parse(localStorage.getItem("dismissedHabits") || "[]");
}
function setDismissedHabits(arr) {
  localStorage.setItem("dismissedHabits", JSON.stringify(arr));
}

function playNotificationSound() {
  const audio = new Audio("../public/notif.wav");
  audio.play();
}

function showHabitReminder(habit) {
  const dismissed = getDismissedHabits();
  if (dismissed.includes(habit.id)) return;

  playNotificationSound();

  if ("Notification" in window && Notification.permission === "granted") {
    new Notification("Pengingat Kebiasaan", {
      body: `Saatnya melakukan: ${habit.name}`,
      icon: "/favicon.ico",
    });
  } else {
    const modal = document.getElementById("habit-reminder-modal");
    const modalText = document.getElementById("habit-reminder-modal-text");
    modalText.textContent = `Saatnya melakukan: ${habit.name}`;
    modal.classList.remove("hidden");
    modal.dataset.habitId = habit.id;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  flatpickr("#habit-reminder", {
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
    time_24hr: true,
    minuteIncrement: 1,
    allowInput: true,
  });
});

// variabel untuk kalender
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

// fungsi untuk render kalender
function renderCalendar() {
  const monthYearElement = document.getElementById("calendar-month-year");
  const calendarDaysElement = document.getElementById("calendar-days");
  const habitLegendElement = document.getElementById("habit-legend");

  if (!monthYearElement || !calendarDaysElement || !habitLegendElement) return;

  // set judul bulan dan tahun
  const monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  monthYearElement.textContent = `${monthNames[currentMonth]} ${currentYear}`;

  // bersihkan kalender
  calendarDaysElement.innerHTML = "";

  // dapatkan hari pertama dari bulan
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  // konversi dari 0 (minggu) - 6 (sabtu) ke 0 (senin) - 6 (minggu)
  const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;

  // dapatkan jumlah hari dalam bulan
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // tambahkan sel kosong untuk hari-hari sebelum hari pertama bulan
  for (let i = 0; i < adjustedFirstDay; i++) {
    const emptyCell = document.createElement("div");
    emptyCell.className =
      "h-14 bg-gray-100 dark:bg-gray-800 rounded-md opacity-50";
    calendarDaysElement.appendChild(emptyCell);
  }

  // Tambahkan sel untuk setiap hari dalam bulan
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentYear, currentMonth, day);
    const dateString = date.toISOString().split("T")[0];
    const isToday = new Date().toISOString().split("T")[0] === dateString;

    const dayCell = document.createElement("div");
    dayCell.className = `h-14 bg-white dark:bg-gray-700 rounded-md flex flex-col p-1 relative ${
      isToday ? "ring-2 ring-primary" : ""
    }`;

    // Tambahkan nomor hari
    const dayNumber = document.createElement("div");
    dayNumber.className = "text-xs text-gray-500 dark:text-gray-400 self-end";
    dayNumber.textContent = day;
    dayCell.appendChild(dayNumber);

    // Tambahkan indikator kebiasaan yang diselesaikan pada hari ini
    const habitIndicators = document.createElement("div");
    habitIndicators.className = "flex flex-wrap gap-1 mt-1 justify-center";

    // Cek kebiasaan yang diselesaikan pada tanggal ini
    habitData.habits.forEach((habit) => {
      // Periksa apakah hari ini adalah hari yang dipilih untuk kebiasaan ini
      const dayOfWeek = date.getDay(); // 0 = Minggu, 1 = Senin, dst.
      const adjustedDayOfWeek = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Konversi ke 0 = Senin, 6 = Minggu

      // Cari indeks hari ini dalam selectedDays
      const dayIndex = habit.selectedDays.findIndex(
        (day) => day === adjustedDayOfWeek
      );

      // Jika hari ini adalah hari yang dipilih dan kebiasaan telah diselesaikan
      if (dayIndex !== -1 && habit.days && habit.days[dayIndex]) {
        const indicator = document.createElement("div");
        indicator.className = "w-2 h-2 rounded-full";
        indicator.className += " " + habit.color;
        indicator.title = habit.name;
        habitIndicators.appendChild(indicator);
      }
    });

    dayCell.appendChild(habitIndicators);

    // Tambahkan event listener untuk setiap sel hari
    dayCell.addEventListener("click", function () {
      // tampilkan detail kebiasaan untuk tanggal ini
      showHabitDetailsForDate(dateString);
    });

    calendarDaysElement.appendChild(dayCell);
  }

  // Buat legend untuk kebiasaan
  habitLegendElement.innerHTML = "";
  habitData.habits.forEach((habit) => {
    const legendItem = document.createElement("div");
    legendItem.className = "flex items-center";
    legendItem.innerHTML = `
    <div class="w-3 h-3 rounded-full mr-1 ${habit.color}"></div>
    <span class="text-xs text-gray-700 dark:text-gray-300">${habit.name}</span>
  `;
    habitLegendElement.appendChild(legendItem);
  });
}

function showHabitDetailsForDate(dateString) {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // cari kebiasaan yang seharusnya dilakukan pada hari ini
  const daysOfWeek = date.getDay();
  const adjustedDayOfWeek = daysOfWeek === 0 ? 6 : daysOfWeek - 1;

  const habitsForDay = habitData.habits.filter((h) =>
    h.selectedDays.includes(adjustedDayOfWeek)
  );

  if (habitsForDay.length === 0) {
    alert(`Tidak ada kebiasaan terjadwal untuk ${formattedDate}`);
    return;
  }
  // buat pesan detail
  let message = `Kebiasaan untuk ${formattedDate}:\n\n`;

  habitsForDay.forEach((habit) => {
    const isCompleted = habit.lastCompletedDate === dateString;
    message += `${habit.name}: ${
      isCompleted ? "✅ Selesai" : "❌ Belum selesai"
    }\n}`;
  });
  alert(message);
}
