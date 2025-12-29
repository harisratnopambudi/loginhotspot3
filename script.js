document.addEventListener('DOMContentLoaded', () => {

    // --- Copy to Clipboard Functionality ---
    const copyElements = document.querySelectorAll('.copy-trigger');
    copyElements.forEach(el => {
        el.addEventListener('click', () => {
            const text = el.getAttribute('data-copy');
            if (text) {
                navigator.clipboard.writeText(text).then(() => {
                    showToast(`Copied: ${text}`, 'success');
                }).catch(err => {
                    console.error('Copy failed', err);
                    showToast('Failed to copy', 'error');
                });
            }
        });
    });

    // --- Login Form Handling ---
    const loginForm = document.querySelector('form[action*="login"]');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            const btn = loginForm.querySelector('button[type="submit"]');
            if (btn) {
                // Only run spinner if not blocked by cooldown overlay
                if (!btn.disabled) {
                    btn.classList.add('loading');
                    setTimeout(() => {
                        btn.disabled = true;
                    }, 100);
                }
            }
        });
    }

    // --- Menu Search Filter (DOM-based) ---
    const searchInput = document.getElementById('menuSearch');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const items = document.querySelectorAll('.menu-item');

            items.forEach(item => {
                const name = item.querySelector('.item-name')?.innerText.toLowerCase() || '';
                if (name.includes(term)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    // --- Smart Banner Logic (Variations) ---
    function initSmartBanner() {
        const slide = document.getElementById('greetingSlide');
        const title = document.getElementById('greetTitle');
        const desc = document.getElementById('greetDesc');
        const badge = document.getElementById('greetBadge');

        if (!slide || !title || !desc || !badge) return;

        if (!slide || !title || !desc || !badge) return;

        // Reset all possible classes
        slide.classList.remove('grad-morning', 'grad-noon', 'grad-afternoon', 'grad-night', 'grad-gaming', 'grad-streaming', 'grad-quote', 'grad-holiday', 'grad-national');

        const dateObj = new Date();
        const month = dateObj.getMonth() + 1; // 0-indexed
        const date = dateObj.getDate();
        const dateKey = `${date}-${month}`; // Format: D-M

        // -- Holiday Logic --
        const holidays = {
            '1-1': { title: "HAPPY NEW YEAR 🎉", desc: "Semoga tahun ini lebih baik & koneksi makin ngebut!", class: 'grad-holiday', badge: "Tahun Baru" },
            '14-2': { title: "HAPPY VALENTINE 💖", desc: "Sebarkan kasih sayang (dan password wifi) ke orang tersayang.", class: 'grad-quote', badge: "Valentine" },
            '21-4': { title: "SELAMAT HARI KARTINI 🇮🇩", desc: "Habis Gelap Terbitlah Terang (dan Internet Kencang).", class: 'grad-national', badge: "Ibu Kartini" },
            '1-5': { title: "SELAMAT HARI BURUH", desc: "Istirahatlah sejenak, nikmati hasil kerjamu.", class: 'grad-holiday', badge: "May Day" },
            '2-5': { title: "HARDIKNAS 🎓", desc: "Ing Ngarsa Sung Tuladha, Ing Madya Mangun Karsa.", class: 'grad-national', badge: "Pendidikan" },
            '20-5': { title: "KEBANGKITAN NASIONAL 🇮🇩", desc: "Bangkit! Kejar mimpimu dengan koneksi tanpa batas.", class: 'grad-national', badge: "Harkitnas" },
            '1-6': { title: "HARI LAHIR PANCASILA 🇮🇩", desc: "Berbeda-beda tetapi tetap satu koneksi.", class: 'grad-national', badge: "Pancasila" },
            '17-8': { title: "DIRGAHAYU RI 🇮🇩", desc: "Merdeka Internetnya, Merdeka Belajarnya!", class: 'grad-national', badge: "HUT RI" },
            '2-10': { title: "SELAMAT HARI BATIK 🇮🇩", desc: "Bangga buatan Indonesia, Warisan Budaya Dunia.", class: 'grad-holiday', badge: "Hari Batik" },
            '5-10': { title: "HUT TNI 🇮🇩", desc: "Bersama Rakyat TNI Kuat.", class: 'grad-national', badge: "Dirgahayu TNI" },
            '28-10': { title: "SUMPAH PEMUDA 🇮🇩", desc: "Satu Nusa, Satu Bangsa, Satu Kuota.", class: 'grad-national', badge: "Semangat Pemuda" },
            '10-11': { title: "HARI PAHLAWAN 🇮🇩", desc: "Jadilah pahlawan bagi keluargamu.", class: 'grad-national', badge: "10 November" },
            '25-11': { title: "SELAMAT HARI GURU 🎓", desc: "Terima kasih Guruku, pahlawan tanpa tanda jasa.", class: 'grad-quote', badge: "Hari Guru" },
            '22-12': { title: "SELAMAT HARI IBU ❤️", desc: "Terima kasih untuk kasih sayang tak terhingga.", class: 'grad-quote', badge: "Hari Ibu" },
            '25-12': { title: "MERRY CHRISTMAS 🎄", desc: "Damai di bumi, damai di hati.", class: 'grad-holiday', badge: "Natal" }
        };

        if (holidays[dateKey]) {
            const h = holidays[dateKey];
            slide.classList.add(h.class);
            title.innerText = h.title;
            // Allow basic HTML in desc if needed
            desc.innerHTML = h.desc;
            badge.innerText = h.badge;
            return; // Exit function, override random logic
        }

        // Randomly choose a mode (Weighted: 40% Time, 20% Gaming, 20% Streaming, 20% Quote)
        const rand = Math.random();

        if (rand < 0.4) {
            // MODE: Time Greeting
            const h = new Date().getHours();
            if (h >= 5 && h < 11) {
                slide.classList.add('grad-morning');
                title.innerText = "Selamat Pagi 🌅";
                desc.innerHTML = "Awali hari dengan <em>Semangat & Koneksi Lancar</em>";
            } else if (h >= 11 && h < 15) {
                slide.classList.add('grad-noon');
                title.innerText = "Selamat Siang ☀️";
                desc.innerHTML = "Jangan lupa <em>Istirahat & Makan Siang</em>";
            } else if (h >= 15 && h < 18) {
                slide.classList.add('grad-afternoon');
                title.innerText = "Selamat Sore 🌇";
                desc.innerHTML = "Santai sejenak menikmati <em>Senja & Kopi</em>";
            } else {
                slide.classList.add('grad-night');
                title.innerText = "Selamat Malam 🌙";
                desc.innerHTML = "Istirahatlah, tapi <em>Internet Jalan Terus</em> 24 Jam";
            }
            badge.innerText = "AshrafHotspot";

        } else if (rand < 0.6) {
            // MODE: Gaming
            slide.classList.add('grad-gaming');
            title.innerHTML = "GAMER MODE";
            desc.innerHTML = "Ping Stabil <em>Anti Lag</em> • Auto Headshot";
            badge.innerText = "Gas Mabar!";

        } else if (rand < 0.8) {
            // MODE: Streaming
            slide.classList.add('grad-streaming');
            title.innerHTML = "NO BUFFER";
            desc.innerHTML = "Nonton Drakor & YouTube <em>Resolusi 4K</em>";
            badge.innerText = "Enjoy Movie";

        } else {
            // MODE: Motivation/Quote
            slide.classList.add('grad-quote');
            title.innerHTML = "DAILY QUOTE";
            const quotes = [
                "Rejeki gak akan tertukar, tapi kuota bisa habis.",
                "Kerja keras itu perlu, wifi kencang itu harus.",
                "Tetap tenang dan hubungkan ke Hotspot.",
                "Dunia maya lebih indah kalau koneksinya lancar."
            ];
            const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
            desc.innerHTML = `"${randomQuote}"`;
            badge.innerText = "Semangat!";
        }
    }

    initSmartBanner();
    // Rotate content every 10 seconds to show variety dynamicallly? 
    // Or keep 60s? Let's do 15s so user sees the change faster.
    setInterval(initSmartBanner, 15000);

    // --- Dynamic Package Promo Logic ---
    function initPackagePromo() {
        const slide = document.getElementById('packageSlide');
        const title = document.getElementById('pkgTitle');
        const desc = document.getElementById('pkgDesc');
        const badge = document.getElementById('pkgBadge');

        if (!slide || !title || !desc || !badge) return;

        // Package Data (Synced with menu.html)
        const packages = [
            { name: "PAKET 12 JAM", detail: "Internet Kilat <em>12 Jam</em> Nonstop", price: "Hanya Rp 2.000", color: "grad-1" },
            { name: "PAKET HARIAN", detail: "Internet Puas <em>24 Jam</em> Unlimited", price: "Best Seller Rp 3.000", color: "grad-2" },
            { name: "PAKET 2 HARI", detail: "Masa aktif <em>48 Jam</em> Lebih Lama", price: "Rp 5.000", color: "grad-4" }, // Use available grads
            { name: "HEMAT MINGGUAN", detail: "Aktif <em>7 Hari</em> Anti Repot", price: "Rp 15.000", color: "grad-3" },
            { name: "BULANAN HEMAT", detail: "Full <em>30 Hari</em> Internet Jalan Terus", price: "Rp 50.000", color: "grad-1" },
            { name: "PAKET SHARING", detail: "Bisa untuk <em>3 Device</em> Sekaligus", price: "Rp 65.000 / Bulan", color: "grad-2" },
            { name: "SHARING KELUARGA", detail: "Max 5 Device <em>Lebih Murah</em>", price: "Rp 100.000 / Bulan", color: "grad-4" }
        ];

        // Randomly pick one
        const pkg = packages[Math.floor(Math.random() * packages.length)];

        // Animate out (Optional, but simple text switch is fine)
        title.innerText = pkg.name;
        desc.innerHTML = pkg.detail;
        badge.innerText = pkg.color === "grad-netflix" ? "Premium" : pkg.price;

        // Update Color Class
        slide.classList.remove('grad-1', 'grad-2', 'grad-3', 'grad-4', 'grad-netflix');
        slide.classList.add(pkg.color);
    }

    initPackagePromo();
    setInterval(initPackagePromo, 12000); // Change package every 12s

    // --- Slideshow Logic (Glitch) ---
    try {
        let slideIndex = 0;
        const slides = document.querySelectorAll(".slide");

        // Init: Show first slide
        if (slides.length > 0) {
            slides[0].classList.add('active');
            setInterval(nextSlide, 4000); // 4 seconds interval
        }

        function nextSlide() {
            // Remove active from current
            if (slides[slideIndex]) {
                slides[slideIndex].classList.remove('active');
            }

            // Increment
            slideIndex++;
            if (slideIndex >= slides.length) {
                slideIndex = 0;
            }

            // Add active to next
            if (slides[slideIndex]) {
                slides[slideIndex].classList.add('active');
            }
        }
    } catch (e) {
        console.error("Slideshow error:", e);
    }

    // --- Prayer Schedule Init ---
    initPrayerSchedule();

    // --- Prayer Schedule Logic ---
    function initPrayerSchedule() {
        const dateGregorian = document.getElementById('dateGregorian');
        const dateHijri = document.getElementById('dateHijri');
        const clockData = document.getElementById('clockData');
        const prayerContainer = document.getElementById('prayerTimes');

        if (!dateGregorian || !prayerContainer) return;

        // 1. Clock & Date
        function updateClock() {
            const now = new Date();

            // Time
            if (clockData) {
                clockData.textContent = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false });
            }

            // Update date only once per minute/hour if needed, but safe here
            const optionsGreg = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
            dateGregorian.textContent = now.toLocaleDateString('id-ID', optionsGreg);

            // Hijri Date
            try {
                const optionsHijri = { day: 'numeric', month: 'long', year: 'numeric', calendar: 'islamic-umalqura' };
                dateHijri.textContent = new Intl.DateTimeFormat('id-ID-u-ca-islamic-umalqura', optionsHijri).format(now);
            } catch (e) {
                dateHijri.textContent = "";
            }
        }

        // Run immediately then interval
        updateClock();
        setInterval(updateClock, 1000);

        const now = new Date(); // still needed for prayer init logic below once

        // 2. Prayer Times (Offline Calculation via praytimes.js)
        // Default: Jakarta (-6.2088, 106.8456, GMT+7) - Fits most WIB users or can be adjusted in config
        const coords = [-6.2088, 106.8456];
        const timezone = 7;

        // Check if prayTimes library is loaded
        if (typeof prayTimes === 'undefined') {
            console.error("PrayTimes.js not found");
            prayerContainer.innerHTML = '<div style="grid-column: span 5; font-size: 0.8rem; color: var(--text-muted);">Library missing</div>';
            return;
        }

        try {
            // Indonesia Kemenag Standards: Fajr 20deg, Isha 18deg
            prayTimes.setMethod('Makkah'); // Base
            prayTimes.adjust({ fajr: 20, isha: 18, maghrib: '0 min', midnight: 'Standard' });

            const times = prayTimes.getTimes(now, coords, timezone);
            renderPrayerTimes(times);
        } catch (err) {
            console.error("Calculation error", err);
            prayerContainer.innerHTML = '<div style="grid-column: span 5; font-size: 0.8rem; color: var(--text-muted);">Error calc</div>';
        }

        function renderPrayerTimes(jadwal) {
            // Mapping keys: PrayTimes returns lowercase: fajr, dhuhr, asr, maghrib, isha
            const prayers = [
                { key: 'fajr', name: 'Subuh' },
                { key: 'dhuhr', name: 'Dzuhur' },
                { key: 'asr', name: 'Ashar' },
                { key: 'maghrib', name: 'Maghrib' },
                { key: 'isha', name: 'Isya' }
            ];

            let html = '';
            const currentMinutes = now.getHours() * 60 + now.getMinutes();

            let hasActiveHighlight = false;
            // First pass: Try to find upcoming prayer today
            prayers.forEach(p => {
                let timeStr = jadwal[p.key];
                if (!timeStr) return;
                const [h, m] = timeStr.split(':').map(Number);
                const prayerMinutes = h * 60 + m;
                if (!hasActiveHighlight && prayerMinutes > currentMinutes) {
                    hasActiveHighlight = true;
                }
            });

            // Second pass: Render
            let nextFound = false;
            prayers.forEach((p, index) => {
                let timeStr = jadwal[p.key];
                if (!timeStr) return;

                const [h, m] = timeStr.split(':').map(Number);
                const prayerMinutes = h * 60 + m;
                let isActive = false;

                // If we found a future prayer today, highlight it/them
                if (hasActiveHighlight) {
                    if (!nextFound && prayerMinutes > currentMinutes) {
                        isActive = true;
                        nextFound = true;
                    }
                } else {
                    // If NO future prayer today (past Isya), highlight Subuh (index 0)
                    if (index === 0) isActive = true;
                }

                // Style for active prayer
                const activeClass = isActive ? 'border-color: var(--primary); box-shadow: 0 0 10px rgba(6,182,212,0.3); transform: translateY(-2px);' : '';
                const activeText = isActive ? 'color: var(--primary);' : '';
                const activeTime = isActive ? 'color: white; text-shadow: 0 0 5px rgba(255,255,255,0.5);' : '';

                html += `
                    <div class="prayer-pill" style="${activeClass}">
                        <span class="p-name" style="${activeText}">${p.name}</span>
                        <span class="p-time" style="${activeTime}">${timeStr}</span>
                    </div>
                `;
            });

            prayerContainer.innerHTML = html;
        }
    }
});

// --- Netflix Promo Logic ---
if (typeof BUYER_CONFIG !== 'undefined' && BUYER_CONFIG.enableNetflix === 1) {
    initNetflixPromo();
}

function initNetflixPromo() {
    // Double check if modal exists, if not create it dynamically (or expect it in HTML)
    // Since we didn't add it to HTML yet, let's inject it dynamically to be safe/clean
    if (!document.querySelector('.promo-modal')) {
        const promoHTML = `
            <div class="promo-modal" id="netflixModal">
                <div class="promo-card">
                    <div class="promo-content">
                        <span class="promo-badge">HOT OFFER</span>
                        <h2 class="promo-title">NETFLIX<br>SHARING</h2>
                        <div class="promo-price">Rp 50rb <span style="font-size: 1rem; color: #fff; font-weight: 500;">/ Bulan</span></div>
                        <p class="promo-desc">Nonton film & series favorit tanpa batas. Akun premium legal, anti on-hold.</p>
                        <a href="https://wa.me/6287784477751?text=Halo%20min%2C%20mau%20beli%20Netflix%20Sharing%2050rb" target="_blank" class="btn-promo">BELI SEKARANG</a>
                        <button class="btn-close-promo" onclick="closePromo()">Tutup</button>
                    </div>
                </div>
            </div>`;
        document.body.insertAdjacentHTML('beforeend', promoHTML);
    }

    // Show with delay
    setTimeout(() => {
        const modal = document.getElementById('netflixModal');
        if (modal) {
            modal.classList.add('active');
        }
    }, 1500); // 1.5s delay
}

window.closePromo = function () {
    const modal = document.getElementById('netflixModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// --- Toast Notification (Helper for script.js internal usage) ---
// Note: The protection script has its own showToast function. 
// If they conflict, the one loaded last (inline protection) might override globally, 
// which is fine as long as it handles the logic. 
// However, since script.js loads via <script src> and protection is inline at body end, 
// we should check if it exists or use our own name if needed. 
// But the protection script defines it inside an IIFE (mostly) or global? 
// Protection script defines `showToast` inside IIFE? 
// Wait, the protection script defines `showToast` inside the IIFE `(function () { ... })()`. 
// So it is NOT global. We need our own here for the copy function.

function showToast(msg, type = 'success') {
    // Try to find the toast container defined by protection script
    let container = document.getElementById('toastContainer');

    // If not found (protection inactive?), fallback to simple toast
    if (!container) {
        let toast = document.querySelector('.toast-fallback');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'toast toast-fallback'; // Use toast class for style
            if (type === 'error') toast.style.border = '1px solid #ef4444';
            document.body.appendChild(toast);
        }
        toast.innerText = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
        return;
    }

    // If container exists, use the protection style toast structure
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    // Simple icons for fallback
    const icons = {
        error: '<svg class="toast-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
        success: '<svg class="toast-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
        warning: '<svg class="toast-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>'
    };

    // Add toast to container
    toast.innerHTML = `${icons[type] || icons.success}<span>${msg}</span>`;
    container.appendChild(toast);

    // Remove after timeout
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}
