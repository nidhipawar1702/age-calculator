// DOM Elements
const ageForm = document.getElementById('age-form');
const birthDateInput = document.getElementById('birth-date');
const birthTimeInput = document.getElementById('birth-time');
const calculateBtn = document.getElementById('calculate-btn');
const resultsDashboard = document.getElementById('results-dashboard');
const inputCardSection = document.getElementById('input-card-section');
const recalculateBtn = document.getElementById('recalculate-btn');

// Age Display Elements
const ageYearsSpan = document.getElementById('age-years');
const ageMonthsSpan = document.getElementById('age-months');
const ageDaysSpan = document.getElementById('age-days');
const exactSummaryDiv = document.getElementById('exact-summary');

// Countdown Elements
const countdownMonthsSpan = document.getElementById('countdown-months');
const countdownDaysSpan = document.getElementById('countdown-days');
const countdownHoursSpan = document.getElementById('countdown-hours');
const countdownMinutesSpan = document.getElementById('countdown-minutes');
const countdownSecondsSpan = document.getElementById('countdown-seconds');
const nextBirthdayDateDiv = document.getElementById('next-birthday-date');

// Cosmic Profile Elements
const zodiacSymbolSpan = document.getElementById('zodiac-symbol');
const zodiacNameSpan = document.getElementById('zodiac-name');
const zodiacElementSpan = document.getElementById('zodiac-element');
const zodiacColorTheme = document.getElementById('zodiac-color-theme');

const chineseZodiacSymbolSpan = document.getElementById('chinese-zodiac-symbol');
const chineseZodiacNameSpan = document.getElementById('chinese-zodiac-name');
const chineseZodiacElementSpan = document.getElementById('chinese-zodiac-element');
const chineseZodiacColorTheme = document.getElementById('chinese-zodiac-color-theme');

// Ticker Elements
const tickerYearsSpan = document.getElementById('ticker-years');
const tickerDaysSpan = document.getElementById('ticker-days');
const tickerHoursSpan = document.getElementById('ticker-hours');
const tickerMinutesSpan = document.getElementById('ticker-minutes');
const tickerSecondsSpan = document.getElementById('ticker-seconds');

// Milestones & Stats Elements
const statBornDaySpan = document.getElementById('stat-born-day');
const statLifePathSpan = document.getElementById('stat-life-path');
const statHeartbeatsSpan = document.getElementById('stat-heartbeats');
const statBreathsSpan = document.getElementById('stat-breaths');
const statSleepSpan = document.getElementById('stat-sleep');
const statMilestoneSpan = document.getElementById('stat-milestone');
const lifeJourneyDescriptionP = document.getElementById('life-journey-description');

// State Variables
let timerInterval = null;
let birthDateObject = null;
let isAnimating = false;

// Initialize: Set max birthdate to today
window.addEventListener('DOMContentLoaded', () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    birthDateInput.max = `${yyyy}-${mm}-${dd}`;
});

// Event Listeners
ageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    processCalculation();
});

recalculateBtn.addEventListener('click', () => {
    // Hide results dashboard, show input card with animation
    resultsDashboard.classList.add('hidden');
    inputCardSection.style.display = 'block';
    inputCardSection.classList.remove('fade-out');
    inputCardSection.classList.add('fade-in');
    
    // Stop the ticker timer
    if (timerInterval) {
        clearInterval(timerInterval);
    }
});

// Main processing function
function processCalculation() {
    const dateVal = birthDateInput.value;
    const timeVal = birthTimeInput.value || "00:00";
    
    if (!dateVal) return;
    
    // Create birth date object
    birthDateObject = new Date(`${dateVal}T${timeVal}`);
    const now = new Date();
    
    // Validate if birthdate is in the future
    if (birthDateObject > now) {
        alert("Chronos cannot look into the future. Please enter a past birth date!");
        return;
    }
    
    // Hide input card with transition, then show results
    inputCardSection.classList.add('fade-out');
    setTimeout(() => {
        inputCardSection.style.display = 'none';
        resultsDashboard.classList.remove('hidden');
        resultsDashboard.classList.add('fade-in');
        
        // Initial calculations
        calculateStaticDetails();
        updateDynamicCounters();
        
        // Animate primary numbers count up
        animateNumbersCountUp();
        
        // Start the real-time ticker
        timerInterval = setInterval(updateDynamicCounters, 100);
    }, 400);
}

// Numerology Life Path Number & Details
const lifePathDetails = {
    1: { name: "1 - The Leader", quote: "Independent, pioneer, and driven by self-discovery. You are meant to create your own unique trail." },
    2: { name: "2 - The Peacemaker", quote: "Harmonious, sensitive, and cooperative. Your strength lies in diplomacy, details, and unifying others." },
    3: { name: "3 - The Communicator", quote: "Creative, expressive, and social. You bring color, joy, and inspiration to the world through self-expression." },
    4: { name: "4 - The Builder", quote: "Practical, reliable, and organized. You construct long-lasting structures, systems, and foundations in life." },
    5: { name: "5 - The Adventurer", quote: "Dynamic, freedom-loving, and versatile. Your journey is characterized by exploration, change, and learning." },
    6: { name: "6 - The Nurturer", quote: "Compassionate, protective, and responsible. You are the heartbeat of the family and community, radiating warmth." },
    7: { name: "7 - The Seeker", quote: "Analytical, spiritual, and intellectual. You seek the deeper truths of life, exploring wisdom and mystery." },
    8: { name: "8 - The Powerhouse", quote: "Ambitious, realistic, and authoritative. You balance material success with spiritual lessons, mastering focus." },
    9: { name: "9 - The Humanitarian", quote: "Generous, artistic, and philosophical. You lead with compassion, helping humanity transition and heal." },
    11: { name: "11 - The Visionary", quote: "Master Number. Highly intuitive, spiritual channel, and inspiring. You bring cosmic light down to earth." },
    22: { name: "22 - The Master Builder", quote: "Master Number. Ambitious, practical, and capable of translating massive dreams into concrete reality." },
    33: { name: "33 - The Master Teacher", quote: "Master Number. Compassionate, selfless, and highly influential. You teach love, understanding, and harmony." }
};

// Chinese Zodiac Mappings
const chineseZodiacs = [
    { name: "Monkey", symbol: "🐒" },
    { name: "Rooster", symbol: "🐓" },
    { name: "Dog", symbol: "🐕" },
    { name: "Pig", symbol: "🐖" },
    { name: "Rat", symbol: "🐀" },
    { name: "Ox", symbol: "🐂" },
    { name: "Tiger", symbol: "🐅" },
    { name: "Rabbit", symbol: "🐇" },
    { name: "Dragon", symbol: "🐉" },
    { name: "Snake", symbol: "🐍" },
    { name: "Horse", symbol: "🐎" },
    { name: "Goat", symbol: "🐑" }
];

const chineseElements = ["Metal", "Metal", "Water", "Water", "Wood", "Wood", "Fire", "Fire", "Earth", "Earth"];
const chineseElementEmojis = {
    "Metal": "🪙",
    "Water": "💧",
    "Wood": "🌳",
    "Fire": "🔥",
    "Earth": "⛰️"
};

// Western Zodiac Mappings
const westernZodiacs = [
    { name: "Capricorn", symbol: "♑", start: [12, 22], end: [1, 19], element: "Earth", color: "#a1887f" },
    { name: "Aquarius", symbol: "♒", start: [1, 20], end: [2, 18], element: "Air", color: "#00e5ff" },
    { name: "Pisces", symbol: "♓", start: [2, 19], end: [3, 20], element: "Water", color: "#80deea" },
    { name: "Aries", symbol: "♈", start: [3, 21], end: [4, 19], element: "Fire", color: "#ff1744" },
    { name: "Taurus", symbol: "♉", start: [4, 20], end: [5, 20], element: "Earth", color: "#4caf50" },
    { name: "Gemini", symbol: "♊", start: [5, 21], end: [6, 20], element: "Air", color: "#ffd54f" },
    { name: "Cancer", symbol: "♋", start: [6, 21], end: [7, 22], element: "Water", color: "#90caf9" },
    { name: "Leo", symbol: "♌", start: [7, 23], end: [8, 22], element: "Fire", color: "#ff9100" },
    { name: "Virgo", symbol: "♍", start: [8, 23], end: [9, 22], element: "Earth", color: "#8d6e63" },
    { name: "Libra", symbol: "♎", start: [9, 23], end: [10, 22], element: "Air", color: "#f48fb1" },
    { name: "Scorpio", symbol: "♏", start: [10, 23], end: [11, 21], element: "Water", color: "#d500f9" },
    { name: "Sagittarius", symbol: "♐", start: [11, 22], end: [12, 21], element: "Fire", color: "#ff5252" }
];

// 1. Calculate static birth information (Zodiacs, Life Path, Milestones)
function calculateStaticDetails() {
    const birthYear = birthDateObject.getFullYear();
    const birthMonth = birthDateObject.getMonth() + 1; // 1-indexed
    const birthDay = birthDateObject.getDate();
    
    // A. Born on weekday
    const weekday = birthDateObject.toLocaleDateString('en-US', { weekday: 'long' });
    statBornDaySpan.textContent = weekday;
    
    // B. Western Zodiac Sign
    let westernZodiac = westernZodiacs.find(z => {
        const [sMonth, sDay] = z.start;
        const [eMonth, eDay] = z.end;
        
        return (birthMonth === sMonth && birthDay >= sDay) || (birthMonth === eMonth && birthDay <= eDay);
    }) || westernZodiacs[0]; // Fallback
    
    zodiacSymbolSpan.textContent = westernZodiac.symbol;
    zodiacNameSpan.textContent = westernZodiac.name;
    zodiacElementSpan.textContent = `${westernZodiac.element} Element`;
    zodiacColorTheme.style.backgroundColor = `${westernZodiac.color}25`;
    zodiacColorTheme.style.borderColor = `${westernZodiac.color}50`;
    zodiacColorTheme.style.color = westernZodiac.color;
    
    // C. Chinese Zodiac Sign
    const chineseZodIdx = birthYear % 12;
    const chineseZodiac = chineseZodiacs[chineseZodIdx];
    
    // Chinese element based on last digit of birth year
    const lastDigit = birthYear % 10;
    const chineseElement = chineseElements[lastDigit];
    const chineseEmoji = chineseElementEmojis[chineseElement] || "";
    
    chineseZodiacSymbolSpan.textContent = chineseZodiac.symbol;
    chineseZodiacNameSpan.textContent = chineseZodiac.name;
    chineseZodiacElementSpan.textContent = `${chineseElement} ${chineseEmoji}`;
    
    // Give chinese zodiac a warm red-gold theme
    chineseZodiacColorTheme.style.backgroundColor = "rgba(255, 64, 129, 0.15)";
    chineseZodiacColorTheme.style.borderColor = "rgba(255, 64, 129, 0.3)";
    chineseZodiacColorTheme.style.color = "#ff4081";
    
    // D. Numerology Life Path Number
    const pathNum = calculateLifePath(birthDateObject);
    const pathInfo = lifePathDetails[pathNum] || { name: pathNum.toString(), quote: "A unique life path of deep significance." };
    statLifePathSpan.textContent = pathInfo.name;
    
    // E. Life Path Explanation in footer box
    lifeJourneyDescriptionP.innerHTML = `<strong>Your Life Path: ${pathInfo.name}</strong><br>"${pathInfo.quote}"`;
}

// Helper to sum numerology digits
function calculateLifePath(date) {
    const dayStr = date.getDate().toString();
    const monthStr = (date.getMonth() + 1).toString();
    const yearStr = date.getFullYear().toString();
    
    const combinedStr = dayStr + monthStr + yearStr;
    
    function sumDigits(str) {
        let sum = 0;
        for (let char of str) {
            sum += parseInt(char);
        }
        // Keep reducing unless it's a master number (11, 22, 33)
        if (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
            return sumDigits(sum.toString());
        }
        return sum;
    }
    
    return sumDigits(combinedStr);
}

// 2. Real-Time Dynamic Ticker
function updateDynamicCounters() {
    if (!birthDateObject) return;
    
    const now = new Date();
    const diffMs = now.getTime() - birthDateObject.getTime();
    
    if (diffMs < 0) return; // safety
    
    // A. Precise Age (Years, Months, Days) taking time into account
    let years = now.getFullYear() - birthDateObject.getFullYear();
    let months = now.getMonth() - birthDateObject.getMonth();
    let days = now.getDate() - birthDateObject.getDate();
    
    // Adjust if birth time of day has not arrived yet
    const birthHour = birthDateObject.getHours();
    const birthMin = birthDateObject.getMinutes();
    const nowHour = now.getHours();
    const nowMin = now.getMinutes();
    
    if (nowHour < birthHour || (nowHour === birthHour && nowMin < birthMin)) {
        days--;
    }
    
    if (days < 0) {
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
        months--;
    }
    
    if (months < 0) {
        months += 12;
        years--;
    }
    
    // update primary display (if not currently in count-up animation)
    if (!isAnimating) {
        ageYearsSpan.textContent = String(years).padStart(2, '0');
        ageMonthsSpan.textContent = String(months).padStart(2, '0');
        ageDaysSpan.textContent = String(days).padStart(2, '0');
    }
    
    exactSummaryDiv.textContent = `You have been traveling through the cosmos for ${years} years, ${months} months, and ${days} days.`;
    
    // B. Next Birthday Countdown
    let nextBirthday = new Date(now.getFullYear(), birthDateObject.getMonth(), birthDateObject.getDate(), birthHour, birthMin);
    let nextAge = years + 1;
    
    if (nextBirthday < now) {
        nextBirthday.setFullYear(now.getFullYear() + 1);
    } else {
        // If it's today but the time of birth hasn't passed, keep same age as turning
        // standard countdown is set
    }
    
    const countdownDetails = calculateCountdownBreakdown(now, nextBirthday);
    countdownMonthsSpan.textContent = String(countdownDetails.months).padStart(2, '0');
    countdownDaysSpan.textContent = String(countdownDetails.days).padStart(2, '0');
    countdownHoursSpan.textContent = String(countdownDetails.hours).padStart(2, '0');
    countdownMinutesSpan.textContent = String(countdownDetails.minutes).padStart(2, '0');
    countdownSecondsSpan.textContent = String(countdownDetails.seconds).padStart(2, '0');
    
    const bdayWeekday = nextBirthday.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    nextBirthdayDateDiv.textContent = `Turning ${nextAge} on ${bdayWeekday}.`;
    
    // C. Live Ticker Statistics
    const yearsLivedFloat = diffMs / (1000 * 60 * 60 * 24 * 365.2425);
    tickerYearsSpan.textContent = yearsLivedFloat.toFixed(8);
    
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    tickerDaysSpan.textContent = totalDays.toLocaleString();
    
    const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
    tickerHoursSpan.textContent = totalHours.toLocaleString();
    
    const totalMinutes = Math.floor(diffMs / (1000 * 60));
    tickerMinutesSpan.textContent = totalMinutes.toLocaleString();
    
    const totalSeconds = Math.floor(diffMs / 1000);
    tickerSecondsSpan.textContent = totalSeconds.toLocaleString();
    
    // D. Estimated Stats
    // Heartbeats: ~80 per minute
    const estimatedHeartbeats = totalMinutes * 80;
    statHeartbeatsSpan.textContent = formatLargeNumber(estimatedHeartbeats);
    
    // Breaths: ~16 per minute
    const estimatedBreaths = totalMinutes * 16;
    statBreathsSpan.textContent = formatLargeNumber(estimatedBreaths);
    
    // Sleep: ~1/3 of life
    const estimatedSleepYears = (yearsLivedFloat / 3).toFixed(1);
    statSleepSpan.textContent = `${estimatedSleepYears} Years`;
    
    // E. Next Clean Milestone
    const milestoneInfo = getNextMilestoneInfo(totalDays, birthDateObject);
    statMilestoneSpan.textContent = milestoneInfo.value;
    statMilestoneSpan.title = `Occurs on ${milestoneInfo.date}`;
}

// Calculate birthday countdown components
function calculateCountdownBreakdown(now, target) {
    let temp = new Date(now.getTime());
    let targetMonths = target.getMonth() - temp.getMonth();
    let targetYears = target.getFullYear() - temp.getFullYear();
    let months = targetMonths + (targetYears * 12);
    
    // Move temp date forward by months
    temp.setMonth(temp.getMonth() + months);
    
    // If we overshot, subtract a month
    if (temp > target) {
        months--;
        temp = new Date(now.getTime());
        temp.setMonth(temp.getMonth() + months);
    }
    
    let diffMs = target - temp;
    let days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    diffMs -= days * (1000 * 60 * 60 * 24);
    
    let hours = Math.floor(diffMs / (1000 * 60 * 60));
    diffMs -= hours * (1000 * 60 * 60);
    
    let minutes = Math.floor(diffMs / (1000 * 60));
    diffMs -= minutes * (1000 * 60);
    
    let seconds = Math.floor(diffMs / 1000);
    
    return { months, days, hours, minutes, seconds };
}

// Next clean milestone calculator (e.g. 1000, 5000, 10000 days lived)
function getNextMilestoneInfo(totalDays, birthDate) {
    const milestones = [1000, 5000, 10000, 15000, 20000, 25000, 30000, 40000, 50000];
    let nextMilestone = milestones.find(m => m > totalDays);
    if (!nextMilestone) {
        // Fallback: next 10,000 days block
        nextMilestone = Math.ceil(totalDays / 10000) * 10000;
    }
    
    let milestoneDate = new Date(birthDate.getTime());
    milestoneDate.setDate(milestoneDate.getDate() + nextMilestone);
    
    return {
        value: `${nextMilestone.toLocaleString()} Days`,
        date: milestoneDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
}

// Format numbers nicely (e.g. 1,234,567 -> "1.23 M", 1,234,567,890 -> "1.23 B")
function formatLargeNumber(num) {
    if (num >= 1e9) {
        return `${(num / 1e9).toFixed(2)} Billion`;
    } else if (num >= 1e6) {
        return `${(num / 1e6).toFixed(2)} Million`;
    } else {
        return num.toLocaleString();
    }
}

// Number Count Up Animation State

function animateNumbersCountUp() {
    isAnimating = true;
    
    const now = new Date();
    let targetYears = now.getFullYear() - birthDateObject.getFullYear();
    let targetMonths = now.getMonth() - birthDateObject.getMonth();
    let targetDays = now.getDate() - birthDateObject.getDate();
    
    const birthHour = birthDateObject.getHours();
    const birthMin = birthDateObject.getMinutes();
    const nowHour = now.getHours();
    const nowMin = now.getMinutes();
    
    if (nowHour < birthHour || (nowHour === birthHour && nowMin < birthMin)) {
        targetDays--;
    }
    if (targetDays < 0) {
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        targetDays += prevMonth.getDate();
        targetMonths--;
    }
    if (targetMonths < 0) {
        targetMonths += 12;
        targetYears--;
    }
    
    // Animate over 1.2 seconds
    const duration = 1200; 
    const startTime = performance.now();
    
    function animate(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        // Easing function (easeOutQuad)
        const easeProgress = progress * (2 - progress);
        
        const currentYears = Math.floor(easeProgress * targetYears);
        const currentMonths = Math.floor(easeProgress * targetMonths);
        const currentDays = Math.floor(easeProgress * targetDays);
        
        ageYearsSpan.textContent = String(currentYears).padStart(2, '0');
        ageMonthsSpan.textContent = String(currentMonths).padStart(2, '0');
        ageDaysSpan.textContent = String(currentDays).padStart(2, '0');
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            isAnimating = false;
            // set exact targets
            ageYearsSpan.textContent = String(targetYears).padStart(2, '0');
            ageMonthsSpan.textContent = String(targetMonths).padStart(2, '0');
            ageDaysSpan.textContent = String(targetDays).padStart(2, '0');
        }
    }
    
    requestAnimationFrame(animate);
}
