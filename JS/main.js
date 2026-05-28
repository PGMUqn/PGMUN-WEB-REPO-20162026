
/* ══════════════════════════════════════
   DATA
══════════════════════════════════════ */
let committees = [];

// Fetch committees from AppScript
async function loadCommittees() {
  try {
    const res = await fetch(COMMITTEES_SCRIPT_URL + '?type=committees', {
      method: 'GET',
      redirect: 'follow'
    });
    
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }
    
    const data = await res.json();
    
    if (Array.isArray(data)) {
      committees = data;
      
      // DEBUG: Log all committee names from Google Sheets
      console.log('📋 Committee names from Google Sheets:');
      committees.forEach(c => {
        console.log(`  - "${c.name}"`);
      });
      
      renderCommittees();
      console.log('✅ Loaded', committees.length, 'committees');
    } else {
      console.error('Invalid data format:', data);
    }
  } catch(e) {
    console.error('Failed to load committees:', e);
    // Show error in UI
    document.getElementById('home-committees').innerHTML = `
      <div style="text-align:center; padding:3rem 2rem; border:1px solid var(--border); background:var(--card-bg);">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#f87171" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin:0 auto 1rem;"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        <h3 style="font-family:'Cinzel',serif; font-size:1rem; color:#f87171; margin-bottom:0.5rem;">Failed to Load Committees</h3>
        <p style="font-size:0.85rem; color:var(--muted); margin-bottom:1rem;">Could not connect to Google Sheets</p>
        <button onclick="loadCommittees()" style="background:var(--phoenix); color:var(--ivory); border:none; padding:0.6rem 1.5rem; cursor:pointer; font-family:'Cinzel',serif; font-size:0.75rem; letter-spacing:0.1em; text-transform:uppercase;">Retry</button>
      </div>
    `;
    document.getElementById('all-committees').innerHTML = document.getElementById('home-committees').innerHTML;
  }
}

const secretariat = [
  // Core 3 - Main rectangular cards with photos
  { 
    name: "Anusha Khanduri", 
    role: "Secretary General", 
    type: "core",
    imageUrl: "" // Will be filled from Google Sheets
  },
  { 
    name: "Pranav Prabhakar Heriyur", 
    role: "Director General", 
    type: "core",
    prominent: true, // Makes this card subtly stand out
    imageUrl: "" // Will be filled from Google Sheets
  },
  { 
    name: "Harika Panguluri", 
    role: "Charge d'Affaires", 
    type: "core",
    imageUrl: "" // Will be filled from Google Sheets
  },
  
  // USG Members - Smaller circular cards
  { 
    name: "Ishaan Kripesh", 
    role: "USG Marketing", 
    type: "usg",
    imageUrl: "" // Will be filled from Google Sheets
  },
  { 
    name: "Yishika Agrawal", 
    role: "USG Finance", 
    type: "usg",
    imageUrl: "" // Will be filled from Google Sheets
  },
  { 
    name: "Vagdevi", 
    role: "USG Public Relations", 
    type: "usg",
    imageUrl: "" // Will be filled from Google Sheets
  },
  { 
    name: "Rheanna Kiran Zachariah", 
    role: "USG Logistics", 
    type: "usg",
    imageUrl: "" // Will be filled from Google Sheets
  },
  { 
    name: "Ahana Sharma", 
    role: "USG Design", 
    type: "usg",
    imageUrl: "" // Will be filled from Google Sheets
  },
  { 
    name: "Kandalam Aditya Krishna", 
    role: "USG Delegate Relations", 
    type: "usg",
    imageUrl: "" // Will be filled from Google Sheets
  },
  { 
    name: "Safal Sabat", 
    role: "OC Head", 
    type: "usg",
    imageUrl: "" // Will be filled from Google Sheets
  }
];

// Google Sheets Photo API
const PHOTO_API_URL = 'https://script.google.com/macros/s/AKfycbxzZEuZmqV67_KkJVFKHh_l7yk75fsS8Mkn50skCbOkcLiP91_diQNWHBVC1ZqJwrvVcg/exec';

// Fetch photos and populate imageUrl fields
async function loadPhotos() {
  try {
    const response = await fetch(PHOTO_API_URL);
    const photos = await response.json();
    
    // Match names and fill in imageUrl
    secretariat.forEach(member => {
      if (photos[member.name]) {
        member.imageUrl = photos[member.name];
      }
    });
    
    // Now render with photos loaded
    renderSecretariat();
    
  } catch (error) {
    console.error('Error loading photos:', error);
    // Still render even if photos fail to load
    renderSecretariat();
  }
}

/* ══════════════════════════════════════
   BUILD COMMITTEE CARDS
══════════════════════════════════════ */
// Committee icons - Add your Cloudinary URLs here
// ═══════════════════════════════════════════════════════════════
// 📸 COMMITTEE ICONS - REPLACE WITH YOUR CLOUDINARY URLs HERE
// ═══════════════════════════════════════════════════════════════
// Instructions:
// 1. Upload your committee icon images to Cloudinary (transparent PNG recommended)
// 2. Copy the Cloudinary URL for each image
// 3. Replace each placeholder URL below with your actual Cloudinary URL
// 
// Example:
// UNSC: 'https://res.cloudinary.com/YOUR_CLOUD/image/upload/v123456/unsc.png',
// 
// The images will automatically display at 64x64px with no background circle
// ═══════════════════════════════════════════════════════════════

const committeeIcons = {
  UNSC: 'https://res.cloudinary.com/dbuei75st/image/upload/ar_1:1,c_auto/image-removebg-preview_4_bf2qme.png',
  DISEC: 'https://res.cloudinary.com/dbuei75st/image/upload/ar_1:1,c_auto/image-removebg-preview_4_bf2qme.png',
  ECOSOC: 'https://res.cloudinary.com/dbuei75st/image/upload/ar_1:1,c_auto/image-removebg-preview_4_bf2qme.png',
  CCPCJ: 'https://res.cloudinary.com/dbuei75st/image/upload/ar_1:1,c_auto/image-removebg-preview_2_thbjef.png',
  IFI: 'https://res.cloudinary.com/dbuei75st/image/upload/Screenshot_2026-05-25_090356_y0szig.png',
  PAHO: 'https://res.cloudinary.com/dbuei75st/image/upload/image-removebg-preview_j2ctzd.png',
  UNHRC: 'https://res.cloudinary.com/dbuei75st/image/upload/ar_1:1,c_auto/image-removebg-preview_1_gg0ksd.png',
  // All possible variations for Lok Sabha
  'Lok Sabha': 'https://res.cloudinary.com/dbuei75st/image/upload/image-removebg-preview_5_dxe4jv.png',
  'LOK SABHA': 'https://res.cloudinary.com/dbuei75st/image/upload/image-removebg-preview_5_dxe4jv.png',
  'lok sabha': 'https://res.cloudinary.com/dbuei75st/image/upload/image-removebg-preview_5_dxe4jv.png',
  'LS': 'https://res.cloudinary.com/dbuei75st/image/upload/image-removebg-preview_5_dxe4jv.png',
  // All possible variations for International Press
  'IP': 'https://res.cloudinary.com/dbuei75st/image/upload/ar_1:1,c_auto/ar_1:1,c_auto/e_brightness:100/e_contrast:level_-100;type_sigmoidal/IP__1_-removebg-preview_1_ska2jz.png',
  'International Press': 'https://res.cloudinary.com/dbuei75st/image/upload/ar_1:1,c_auto/ar_1:1,c_auto/e_brightness:100/e_contrast:level_-100;type_sigmoidal/IP__1_-removebg-preview_1_ska2jz.png',
  'INTERNATIONAL PRESS': 'https://res.cloudinary.com/dbuei75st/image/upload/ar_1:1,c_auto/ar_1:1,c_auto/e_brightness:100/e_contrast:level_-100;type_sigmoidal/IP__1_-removebg-preview_1_ska2jz.png',
  'international press': 'https://res.cloudinary.com/dbuei75st/image/upload/ar_1:1,c_auto/ar_1:1,c_auto/e_brightness:100/e_contrast:level_-100;type_sigmoidal/IP__1_-removebg-preview_1_ska2jz.png'
};

function buildCommitteeCard(c) {
  // Calculate position stats
  const totalCountries = c.countries ? c.countries.length : 0;
  const takenCount = c.countries ? c.countries.filter(country => country.status === 'Taken').length : 0;
  const openCount = totalCountries - takenCount;
  
  const dots = Array.from({length: Math.min(totalCountries, 20)}, (_, i) => {
    const taken = i < takenCount;
    return `<div class="pos-dot ${taken ? 'pos-taken' : 'pos-open'}"></div>`;
  }).join('');

  const status = takenCount === totalCountries ? 'full' : takenCount > totalCountries * 0.7 ? 'filling' : 'open';
  const badgeClass = status === 'open' ? 'badge-open' : status === 'filling' ? 'badge-filling' : 'badge-full';
  const badgeText = status === 'open' ? 'Open' : status === 'filling' ? 'Filling Fast' : 'Full';
  
  // DEBUG: Log icon matching
  const iconUrl = committeeIcons[c.name] || committeeIcons['UNSC'];
  if (!committeeIcons[c.name]) {
    console.warn(`⚠️ No icon found for committee: "${c.name}" - using default UNSC icon`);
    console.log('Available icon keys:', Object.keys(committeeIcons));
  } else {
    console.log(`✅ Icon matched for "${c.name}"`);
  }
  const iconHtml = iconUrl ? `<img src="${iconUrl}" alt="${c.name}">` : '';

  return `
    <div class="committee-card" onclick="openCommitteeModal('${c.id}')">
      <div class="card-icon-band">
        ${iconHtml}
        <span class="card-badge ${badgeClass}">${badgeText}</span>
      </div>
      <div class="card-body">
        <div class="card-acronym">${c.name}</div>
        <div class="card-name">${c.name}</div>
        <div class="card-agenda">${c.agenda}</div>
        <div class="position-matrix">${dots}</div>
        <div class="matrix-legend">
          <span><div class="legend-dot" style="background:var(--phoenix)"></div>${takenCount} Taken</span>
          <span><div class="legend-dot" style="background:rgba(74,222,128,0.45)"></div>${openCount} Open</span>
        </div>
      </div>
    </div>
  `;
}

function renderCommittees() {
  const homeEl = document.getElementById('home-committees');
  const allEl = document.getElementById('all-committees');

  if (committees.length === 0) {
    const emptyMessage = `
      <div style="text-align:center; padding:4rem 2rem; border:1px solid var(--border); background:var(--card-bg);">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin:0 auto 1.5rem; opacity:0.5;"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        <h3 style="font-family:'Cinzel',serif; font-size:1.1rem; color:var(--ivory); margin-bottom:0.8rem; letter-spacing:0.1em;">Committees Coming Soon</h3>
        <p style="font-size:0.85rem; color:var(--muted); line-height:1.7; max-width:400px; margin:0 auto;">Committee details will be announced shortly. Check back soon or follow our updates page.</p>
      </div>
    `;
    homeEl.innerHTML = emptyMessage;
    allEl.innerHTML = emptyMessage;
  } else {
    homeEl.innerHTML = committees.slice(0, 3).map(buildCommitteeCard).join('');
    allEl.innerHTML = committees.map(buildCommitteeCard).join('');
  }
}

function renderSecretariat() {
  const el = document.getElementById('secretariat-grid');
  
  // Separate core and USG members
  const coreMembers = secretariat.filter(s => s.type === 'core');
  const usgMembers = secretariat.filter(s => s.type === 'usg');
  
  // Build core cards (rectangular with photos)
  const coreHTML = coreMembers.map(s => `
    <div class="sec-card-core ${s.prominent ? 'prominent' : ''}">
      <div class="sec-photo-container">
        ${s.imageUrl ? 
          `<img src="${s.imageUrl}" alt="${s.name}" class="sec-photo">` : 
          `<div class="sec-photo-placeholder">${s.name.split(' ').map(n => n[0]).join('')}</div>`
        }
      </div>
      <div class="sec-name-core">${s.name}</div>
      <div class="sec-role-core">${s.role}</div>
    </div>
  `).join('');
  
  // Build USG cards (smaller, circular)
  const usgHTML = usgMembers.map(s => `
    <div class="sec-card-usg">
      <div class="sec-avatar-usg">
        ${s.imageUrl ? 
          `<img src="${s.imageUrl}" alt="${s.name}" class="sec-avatar-img">` : 
          `<div class="sec-avatar-initials">${s.name.split(' ').map(n => n[0]).join('')}</div>`
        }
      </div>
      <div class="sec-name-usg">${s.name}</div>
      <div class="sec-role-usg">${s.role}</div>
    </div>
  `).join('');
  
  // Combine with section headers
  el.innerHTML = `
    <div class="sec-core-section">
      ${coreHTML}
    </div>
    
    <div class="sec-divider"></div>
    
    <div class="sec-usg-section">
      <h3 class="sec-section-title">Under-Secretaries General</h3>
      <div class="sec-usg-grid">
        ${usgHTML}
      </div>
    </div>
  `;
}

/* ══════════════════════════════════════
   COMMITTEE MODAL
══════════════════════════════════════ */
function openCommitteeModal(committeeId) {
  const committee = committees.find(c => c.id === committeeId);
  if (!committee) return;
  
  const modal = document.getElementById('committee-modal');
  const content = document.getElementById('modal-content');
  
  // Build leadership section
  let leadershipHTML = '';
  if (committee.leadership) {
    const leaders = [];
    if (committee.leadership.chair) leaders.push({...committee.leadership.chair, role: 'Chair'});
    if (committee.leadership.viceChair) leaders.push({...committee.leadership.viceChair, role: 'Vice Chair'});
    if (committee.leadership.rapporteur) leaders.push({...committee.leadership.rapporteur, role: 'Rapporteur'});
    
    leadershipHTML = `
      <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr)); gap:1.5rem; margin-bottom:3rem;">
        ${leaders.map(person => `
          <div style="display:flex; align-items:center; gap:1.5rem; padding:1.5rem; background:var(--card-bg); border:1px solid var(--border);">
            <img src="${person.photoUrl}" alt="${person.name}" style="width:80px; height:80px; border-radius:50%; object-fit:cover; border:2px solid var(--phoenix);" onerror="this.src='https://via.placeholder.com/150'">
            <div>
              <div style="font-family:'Cinzel',serif; font-size:0.7rem; letter-spacing:0.2em; color:var(--phoenix); text-transform:uppercase; margin-bottom:0.3rem;">${person.role}</div>
              <div style="font-family:'EB Garamond',serif; font-size:1.1rem; color:var(--ivory); font-weight:500;">${person.name}</div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }
  
  // Build country matrix with color coding
  const availableCountries = committee.countries.filter(c => c.status === 'Available');
  const waitlistCountries = committee.countries.filter(c => c.status === 'Waitlist');
  const takenCountries = committee.countries.filter(c => c.status === 'Taken');
  
  const countryGrid = `
    <div style="display:grid; grid-template-columns:repeat(auto-fill,minmax(min(100%,160px),1fr)); gap:0.5rem;">
      ${committee.countries.map(c => {
        const bgColor = c.status === 'Available' ? 'rgba(74,222,128,0.1)' : 
                       c.status === 'Waitlist' ? 'rgba(251,191,36,0.1)' : 
                       'rgba(239,68,68,0.1)';
        const borderColor = c.status === 'Available' ? 'rgba(74,222,128,0.3)' : 
                           c.status === 'Waitlist' ? 'rgba(251,191,36,0.3)' : 
                           'rgba(239,68,68,0.3)';
        const textColor = c.status === 'Available' ? '#4ade80' : 
                         c.status === 'Waitlist' ? '#fbbf24' : 
                         '#f87171';
        return `
          <div style="padding:0.7rem 1rem; background:${bgColor}; border:1px solid ${borderColor}; font-size:0.8rem; color:${textColor}; text-align:center; font-family:'EB Garamond',serif;">
            ${c.country}
          </div>
        `;
      }).join('')}
    </div>
  `;
  
  content.innerHTML = `
    <div style="margin-bottom:2.5rem;">
      <h1 style="font-family:'Cinzel',serif; font-size:clamp(1.35rem,5.5vw,2.5rem); color:var(--ivory); margin-bottom:0.5rem; letter-spacing:0.05em; padding-right:3.5rem; line-height:1.2;">${committee.name}</h1>
      <div style="font-family:'EB Garamond',serif; font-size:1.1rem; color:var(--parchment); font-style:italic; line-height:1.7; margin-bottom:1.5rem;">Agenda: ${committee.agenda}</div>
      <div style="display:flex; gap:2rem; font-size:0.85rem; color:var(--muted);">
        <span><strong style="color:#4ade80;">${availableCountries.length}</strong> Available</span>
        <span><strong style="color:#fbbf24;">${waitlistCountries.length}</strong> Waitlist</span>
        <span><strong style="color:#f87171;">${takenCountries.length}</strong> Taken</span>
      </div>
    </div>
    
    ${leadershipHTML}
    
    <div>
      <h2 style="font-family:'Cinzel',serif; font-size:1.3rem; color:var(--ivory); margin-bottom:1.5rem; letter-spacing:0.1em;">Country Matrix</h2>
      ${countryGrid}
    </div>
  `;
  
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeCommitteeModal() {
  const modal = document.getElementById('committee-modal');
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

/* ══════════════════════════════════════
   COUNTDOWN
══════════════════════════════════════ */
// Event date: July 17 2026 09:00 IST
const eventDate = new Date('2026-07-17T09:00:00+05:30');

function updateCountdown() {
  const now = new Date();
  const diff = eventDate - now;

  if (diff <= 0) {
    document.getElementById('cd-days').textContent = '00';
    document.getElementById('cd-hrs').textContent = '00';
    document.getElementById('cd-min').textContent = '00';
    document.getElementById('cd-sec').textContent = '00';
    return;
  }

  const days = Math.floor(diff / 86400000);
  const hrs  = Math.floor((diff % 86400000) / 3600000);
  const min  = Math.floor((diff % 3600000) / 60000);
  const sec  = Math.floor((diff % 60000) / 1000);

  document.getElementById('cd-days').textContent = String(days).padStart(2,'0');
  document.getElementById('cd-hrs').textContent  = String(hrs).padStart(2,'0');
  document.getElementById('cd-min').textContent  = String(min).padStart(2,'0');
  document.getElementById('cd-sec').textContent  = String(sec).padStart(2,'0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

/* ══════════════════════════════════════
   PAGE NAVIGATION
══════════════════════════════════════ */
function showPage(name) {
  // Close committee modal if open (allows nav while modal is active)
  const modal = document.getElementById('committee-modal');
  if (modal && modal.style.display !== 'none') {
    closeCommitteeModal();
  }
  
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + name).classList.add('active');
  window.scrollTo({top: 0, behavior: 'smooth'});
}

/* ══════════════════════════════════════
   NAVBAR SCROLL
══════════════════════════════════════ */
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

/* ══════════════════════════════════════
   HAMBURGER
══════════════════════════════════════ */
function toggleMenu() {
  const ham = document.getElementById('hamburger');
  const menu = document.getElementById('mobile-menu');
  ham.classList.toggle('open');
  menu.classList.toggle('open');
}

function closeMenu() {
  document.getElementById('hamburger').classList.remove('open');
  document.getElementById('mobile-menu').classList.remove('open');
}

/* ══════════════════════════════════════
   FORM SUBMIT
══════════════════════════════════════ */
function addAwardEntry() {
  const container = document.getElementById('awards-container');
  const count = container.querySelectorAll('.award-entry').length + 1;
  const entry = document.createElement('div');
  entry.className = 'award-entry';
  entry.style.cssText = 'border:1px solid var(--border); padding:1.2rem 1.4rem; margin-bottom:1rem; position:relative;';
  entry.innerHTML = `
    <button type="button" onclick="this.parentElement.remove()" style="position:absolute; top:0.7rem; right:0.9rem; background:none; border:none; color:var(--muted); cursor:pointer; font-size:1rem; line-height:1;" title="Remove">×</button>
    <div class="form-row">
      <div class="form-group" style="margin-bottom:0;">
        <label>MUN / Conference Name</label>
        <input type="text" class="award-mun" placeholder="e.g. HYMUN 2025"/>
      </div>
      <div class="form-group" style="margin-bottom:0;">
        <label>Award Received</label>
        <input type="text" class="award-title" placeholder="e.g. Best Delegate"/>
      </div>
    </div>
    <div class="form-group" style="margin-bottom:0; margin-top:0.9rem;">
      <label>Committee &amp; Portfolio</label>
      <input type="text" class="award-committee" placeholder="e.g. UNSC — United States"/>
    </div>`;
  container.appendChild(entry);
}

/* ══ STUDENT CATEGORY & PAYMENT ══ */
function toggleSchoolEmail() {
  const checkbox = document.getElementById('r-is-school-student');
  const field = document.getElementById('school-email-field');
  const gradeSelect = document.getElementById('r-grade');
  field.style.display = checkbox.checked ? 'block' : 'none';

  if (checkbox.checked) {
    // Lock grade until email verified
    gradeSelect.disabled = true;
    gradeSelect.style.opacity = '0.4';
    gradeSelect.style.cursor = 'not-allowed';
    gradeSelect.title = 'Verify your school email first';
    gradeSelect.value = '';
    removeGrade8();
  } else {
    // Unchecked — external user: unlock, no Grade 8, reset
    gradeSelect.disabled = false;
    gradeSelect.style.opacity = '1';
    gradeSelect.style.cursor = 'pointer';
    gradeSelect.title = '';
    gradeSelect.value = '';
    removeGrade8();
    // Reset verification state
    const badge = document.getElementById('email-verification-badge');
    const input = document.getElementById('r-school-email');
    const helpText = document.getElementById('email-help-text');
    badge.style.display = 'none';
    input.value = '';
    input.style.borderColor = 'var(--border)';
    helpText.textContent = 'Enter your official Phoenix Greens email for verification';
    helpText.style.color = 'var(--muted)';
    isEmailVerified = false;
  }
}

function addGrade8() {
  const gradeSelect = document.getElementById('r-grade');
  if (!gradeSelect.querySelector('option[value="Grade 8"]')) {
    const opt = document.createElement('option');
    opt.value = 'Grade 8';
    opt.textContent = 'Grade 8';
    gradeSelect.insertBefore(opt, gradeSelect.options[1]);
  }
}

function removeGrade8() {
  const gradeSelect = document.getElementById('r-grade');
  const opt = gradeSelect.querySelector('option[value="Grade 8"]');
  if (opt) opt.remove();
  if (gradeSelect.value === 'Grade 8') gradeSelect.value = '';
}

/* ══════════════════════════════════════
   EMAIL VERIFICATION SYSTEM
══════════════════════════════════════ */
const VERIFICATION_API_URL = 'https://script.google.com/macros/s/AKfycbyVmOVGH6bXkpvFhMuCNX2op95ENzg5--JUDgilrtn2K_NPGqXp5tZpEcAxhe3ZDRT5/exec';
let verificationTimeout;
let isEmailVerified = false;

async function verifySchoolEmail(email) {
  const badge = document.getElementById('email-verification-badge');
  const input = document.getElementById('r-school-email');
  const helpText = document.getElementById('email-help-text');
  
  // Clear previous timeout
  clearTimeout(verificationTimeout);
  
  // Reset state
  isEmailVerified = false;
  
  // Hide badge if email is empty
  if (!email || email.trim() === '') {
    badge.style.display = 'none';
    input.style.borderColor = 'var(--border)';
    helpText.textContent = 'Enter your official Phoenix Greens email for verification';
    helpText.style.color = 'var(--muted)';
    return;
  }
  
  // Show checking state
  badge.style.display = 'flex';
  badge.style.alignItems = 'center';
  badge.style.gap = '0.4rem';
  badge.style.background = 'rgba(251,191,36,0.1)';
  badge.style.color = '#fbbf24';
  badge.style.border = '1px solid rgba(251,191,36,0.3)';
  badge.innerHTML = `
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
      <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
    </svg>
    Checking...
  `;
  input.style.borderColor = 'rgba(251,191,36,0.5)';
  
  // Debounce - wait 800ms after user stops typing
  verificationTimeout = setTimeout(async () => {
    
    // Check if API is configured
    if (VERIFICATION_API_URL === 'YOUR_VERIFICATION_API_URL') {
      // Development mode - show warning
      badge.style.background = 'rgba(251,191,36,0.1)';
      badge.style.color = '#fbbf24';
      badge.style.border = '1px solid rgba(251,191,36,0.3)';
      badge.innerHTML = `
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
          <line x1="12" y1="9" x2="12" y2="13"/>
          <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
        Not configured
      `;
      input.style.borderColor = 'rgba(251,191,36,0.5)';
      helpText.textContent = 'Verification API not set up yet. Configure VERIFICATION_API_URL in the code.';
      helpText.style.color = '#fbbf24';
      return;
    }
    
    try {
      const response = await fetch(`${VERIFICATION_API_URL}?action=verify&email=${encodeURIComponent(email)}`);
      const data = await response.json();
      
      if (data.success && data.isValid) {
        // Email verified ✓ — unlock grade dropdown and add Grade 8
        isEmailVerified = true;
        badge.style.background = 'rgba(74,222,128,0.1)';
        badge.style.color = '#4ade80';
        badge.style.border = '1px solid rgba(74,222,128,0.3)';
        badge.innerHTML = `
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          Verified
        `;
        input.style.borderColor = '#4ade80';
        helpText.textContent = '✓ Email verified successfully';
        helpText.style.color = '#4ade80';
        const gradeSelectV = document.getElementById('r-grade');
        gradeSelectV.disabled = false;
        gradeSelectV.style.opacity = '1';
        gradeSelectV.style.cursor = 'pointer';
        gradeSelectV.title = '';
        addGrade8();
      } else {
        // Email not found — keep grade locked, no Grade 8
        isEmailVerified = false;
        const gradeSelectNF = document.getElementById('r-grade');
        gradeSelectNF.disabled = true;
        gradeSelectNF.style.opacity = '0.4';
        gradeSelectNF.style.cursor = 'not-allowed';
        gradeSelectNF.title = 'Verify your school email first';
        gradeSelectNF.value = '';
        removeGrade8();
        badge.style.background = 'rgba(239,68,68,0.1)';
        badge.style.color = '#f87171';
        badge.style.border = '1px solid rgba(239,68,68,0.3)';
        badge.innerHTML = `
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="15" y1="9" x2="9" y2="15"/>
            <line x1="9" y1="9" x2="15" y2="15"/>
          </svg>
          Not found
        `;
        input.style.borderColor = '#f87171';
        helpText.textContent = 'This email is not in our student database. Please check and try again.';
        helpText.style.color = '#f87171';
      }
    } catch (error) {
      // Network error
      badge.style.background = 'rgba(239,68,68,0.1)';
      badge.style.color = '#f87171';
      badge.style.border = '1px solid rgba(239,68,68,0.3)';
      badge.innerHTML = `
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        Error
      `;
      input.style.borderColor = '#f87171';
      helpText.textContent = 'Could not verify email. Please check your connection and try again.';
      helpText.style.color = '#f87171';
      console.error('Verification error:', error);
    }
  }, 800);
}

// Add CSS for spin animation
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);

function updatePaymentInfo() {
  const isSchoolStudent = document.getElementById('r-is-school-student').checked;
  const badge = document.getElementById('student-type-badge');
  const amount = document.getElementById('payment-amount');
  const schoolInstructions = document.getElementById('school-payment-instructions');
  const externalButton = document.getElementById('external-payment-button');
  const btn = document.getElementById('payment-link-btn');
  
  // ⚠️ CONFIGURE THESE VALUES:
  const EXTERNAL_LINK = 'https://web.zoment.com/euro/web/ng/external/child-order-creation/1639466678758674434/1789701426830643200'; // Replace with actual link
  const SCHOOL_AMOUNT = '₹2,400';  // Replace with actual amount
  const EXTERNAL_AMOUNT = '₹2,700'; // Replace with actual amount
  
  if (isSchoolStudent) {
    badge.textContent = 'School Student';
    amount.textContent = SCHOOL_AMOUNT;
    // Show instructions, hide button
    schoolInstructions.style.display = 'block';
    externalButton.style.display = 'none';
  } else {
    badge.textContent = 'External Participant (Priority Round)';
    amount.textContent = EXTERNAL_AMOUNT;
    // Hide instructions, show button
    schoolInstructions.style.display = 'none';
    externalButton.style.display = 'block';
    btn.onclick = () => window.open(EXTERNAL_LINK, '_blank');
  }
}

function handlePaymentSelect(input) {
  const file = input.files[0];
  if (file) validatePaymentProof(file);
}

function handlePaymentDrop(e) {
  e.preventDefault();
  const zone = document.getElementById('payment-upload-zone');
  zone.style.borderColor = 'rgba(155,32,32,0.4)';
  zone.style.background = 'transparent';
  const file = e.dataTransfer.files[0];
  if (file) {
    document.getElementById('r-payment-proof').files = e.dataTransfer.files;
    validatePaymentProof(file);
  }
}

function validatePaymentProof(file) {
  const zone = document.getElementById('payment-upload-zone');
  const allowedTypes = ['image/png', 'image/jpeg', 'application/pdf'];
  
  if (!allowedTypes.includes(file.type)) {
    zone.style.borderColor = '#f87171';
    document.getElementById('payment-upload-text').textContent = 'Only PNG, JPG, or PDF files accepted.';
    document.getElementById('payment-upload-text').style.color = '#f87171';
    return;
  }
  
  if (file.size > 10 * 1024 * 1024) {
    zone.style.borderColor = '#f87171';
    document.getElementById('payment-upload-text').textContent = 'File exceeds 10MB limit.';
    document.getElementById('payment-upload-text').style.color = '#f87171';
    return;
  }
  
  // Success state
  zone.style.borderColor = 'rgba(74,222,128,0.5)';
  zone.style.background = 'rgba(74,222,128,0.04)';
  document.getElementById('payment-upload-icon').innerHTML = `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4ade80" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin:0 auto;display:block;"><polyline points="20 6 9 17 4 12"/></svg>`;
  document.getElementById('payment-upload-text').textContent = file.name;
  document.getElementById('payment-upload-text').style.color = '#4ade80';
  document.getElementById('payment-upload-sub').textContent = (file.size / 1024 / 1024).toFixed(2) + ' MB · Ready to submit';
}

/* ══ STEP NAVIGATION ══ */
function goToStep(n) {
  [1,2,3,4,5].forEach(i => {
    const el = document.getElementById('reg-step-' + i);
    if (el) el.style.display = i === n ? 'block' : 'none';
  });
  document.querySelectorAll('.step').forEach((s, i) => {
    s.classList.toggle('active', i < n);
  });
  const el = document.getElementById('reg-step-' + n);
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 120, behavior: 'smooth' });
}

function nextStep(from) {
  if (from === 1) {
    const fname  = document.getElementById('r-fname').value.trim();
    const lname  = document.getElementById('r-lname').value.trim();
    const school = document.getElementById('r-school').value.trim();
    const email  = document.getElementById('r-email').value.trim();
    const phone  = document.getElementById('r-phone').value.trim();
    const grade  = document.getElementById('r-grade').value;
    const exp    = document.getElementById('r-exp').value;
    const isSchoolStudent = document.getElementById('r-is-school-student').checked;
    
    if (!fname || !lname)  { showFormError('Please enter your full name.'); return; }
    if (!school)           { showFormError('Please enter your school name.'); return; }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showFormError('Please enter a valid email.'); return; }
    if (!phone)            { showFormError('Please enter your phone number.'); return; }
    if (!grade)            { showFormError('Please select your grade.'); return; }
    if (!exp)              { showFormError('Please select your MUN experience level.'); return; }
    
    // Validate school email if checkbox is checked
    if (isSchoolStudent) {
      const schoolEmail = document.getElementById('r-school-email').value.trim();
      if (!schoolEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(schoolEmail)) {
        showFormError('Please enter a valid school email address.'); return;
      }
      // Check if email verification is enabled and email is verified
      if (VERIFICATION_API_URL !== 'YOUR_VERIFICATION_API_URL' && !isEmailVerified) {
        showFormError('Please wait for email verification to complete, or make sure your school email is verified.'); return;
      }
    }
    
    goToStep(2);
  } else if (from === 2) {
    const c1       = document.getElementById('r-committee-1').value;
    const country1 = document.getElementById('r-country-1').value.trim();
    if (!c1)       { showFormError('Please select your 1st preference committee.'); return; }
    if (!country1) { showFormError('Please enter your 1st preference country.'); return; }
    goToStep(3);
  } else if (from === 3) {
    // Moving to payment step - update payment info
    updatePaymentInfo();
    goToStep(4);
  } else if (from === 4) {
    // Validate payment proof uploaded
    const paymentProof = document.getElementById('r-payment-proof').files[0];
    if (!paymentProof) {
      showFormError('Please upload your payment proof screenshot.'); return;
    }
    buildConfirmSummary();
    goToStep(5);
  }
}

function prevStep(from) { goToStep(from - 1); }

function showFormError(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

function buildConfirmSummary() {
  const v   = id => document.getElementById(id).value;
  const row = (label, value) => value ? `<div style="display:flex;padding:0.65rem 0;border-bottom:1px solid var(--border);"><span style="font-family:'Cinzel',serif;font-size:0.58rem;letter-spacing:0.15em;color:var(--phoenix);text-transform:uppercase;width:38%;flex-shrink:0;">${label}</span><span style="font-size:0.82rem;color:var(--parchment);">${value}</span></div>` : '';
  const c1 = v('r-committee-1'), c2 = v('r-committee-2'), c3 = v('r-committee-3');
  document.getElementById('reg-confirm-summary').innerHTML = `
    <p class="section-label" style="margin-bottom:1rem;">Review Your Details</p>
    <div style="border:1px solid var(--border);padding:1.2rem 1.4rem;margin-bottom:1.5rem;">
      ${row('Full Name', v('r-fname') + ' ' + v('r-lname'))}
      ${row('School', v('r-school'))}
      ${row('Email', v('r-email'))}
      ${row('Phone', v('r-phone'))}
      ${row('Grade', v('r-grade'))}
      ${row('Experience', v('r-exp'))}
    </div>
    <p class="section-label" style="margin-bottom:1rem;">Committee Preferences</p>
    <div style="border:1px solid var(--border);padding:1.2rem 1.4rem;margin-bottom:1.5rem;">
      ${row('1st Choice', c1 + (v('r-country-1') ? ' — ' + v('r-country-1') : ''))}
      ${c2 ? row('2nd Choice', c2 + (v('r-country-2') ? ' — ' + v('r-country-2') : '')) : ''}
      ${c3 ? row('3rd Choice', c3 + (v('r-country-3') ? ' — ' + v('r-country-3') : '')) : ''}
    </div>
    <p style="font-size:0.72rem;color:var(--parchment);opacity:0.55;line-height:1.6;">
      A confirmation email will be sent to <strong style="opacity:0.9;">${v('r-email')}</strong> within 1 minute.
    </p>`;
}

async function submitForm() {
  const SPAM_KEY = 'pgmun_last_reg_ts';
  const COOLDOWN = 12 * 60 * 60 * 1000;
  const last = localStorage.getItem(SPAM_KEY);
  if (last && (Date.now() - parseInt(last)) < COOLDOWN) {
    const rem  = COOLDOWN - (Date.now() - parseInt(last));
    showFormError('Already submitted. Try again in ' + Math.floor(rem/3600000) + 'h ' + Math.floor((rem%3600000)/60000) + 'm.');
    return;
  }
  const btn = document.getElementById('pgmun-submit-btn');
  btn.disabled = true; btn.textContent = 'Submitting...';

  const awards = Array.from(document.querySelectorAll('.award-entry')).map(e => {
    const mun   = e.querySelector('.award-mun')?.value.trim();
    const title = e.querySelector('.award-title')?.value.trim();
    const comm  = e.querySelector('.award-committee')?.value.trim();
    return (mun || title) ? [mun, title, comm].filter(Boolean).join(' · ') : null;
  }).filter(Boolean);

  const payload = {
    action: 'submitRegistration',
    firstName: document.getElementById('r-fname').value.trim(),
    lastName: document.getElementById('r-lname').value.trim(),
    school: document.getElementById('r-school').value.trim(),
    email: document.getElementById('r-email').value.trim().toLowerCase(),
    phone: document.getElementById('r-phone').value.trim(),
    grade: document.getElementById('r-grade').value,
    experience: document.getElementById('r-exp').value,
    pref1Committee: document.getElementById('r-committee-1').value,
    pref1Country: document.getElementById('r-country-1').value.trim(),
    pref2Committee: document.getElementById('r-committee-2').value || '',
    pref2Country: document.getElementById('r-country-2').value.trim(),
    pref3Committee: document.getElementById('r-committee-3').value || '',
    pref3Country: document.getElementById('r-country-3').value.trim(),
    awards, notes: document.getElementById('r-note').value.trim()
  };

  const certFile = document.getElementById('r-certificate').files[0];
  if (certFile) {
    try {
      payload.certificatePDF = await new Promise((res, rej) => {
        const r = new FileReader();
        r.onload = () => res(r.result.split(',')[1]);
        r.onerror = rej;
        r.readAsDataURL(certFile);
      });
    } catch(e) {}
  }

  const paymentFile = document.getElementById('r-payment-proof').files[0];
  if (paymentFile) {
    try {
      payload.paymentProof = await new Promise((res, rej) => {
        const r = new FileReader();
        r.onload = () => res(r.result.split(',')[1]);
        r.onerror = rej;
        r.readAsDataURL(paymentFile);
      });
    } catch(e) {}
  }

  try {
    const result = await (await fetch(APPS_SCRIPT_URL, { method:'POST', body: JSON.stringify(payload) })).json();
    if (result.success) {
      localStorage.setItem(SPAM_KEY, Date.now().toString());
      document.getElementById('reg-step-5').innerHTML = `
        <div style="text-align:center;padding:3rem 1rem;">
          <div style="font-size:2.5rem;margin-bottom:1rem;">✅</div>
          <h3 style="font-family:'Cinzel',serif;font-size:1rem;letter-spacing:0.2em;color:var(--ivory);margin-bottom:0.8rem;text-transform:uppercase;">Registration Submitted</h3>
          <p style="font-size:0.82rem;color:var(--parchment);opacity:0.7;line-height:1.8;max-width:380px;margin:0 auto 1.5rem;">
            Thank you, <strong style="color:var(--ivory);">${payload.firstName}</strong>!
            Check <strong style="color:var(--ivory);">${payload.email}</strong> for your confirmation email.
          </p>
          <div style="border:1px solid rgba(251,191,36,0.3);background:rgba(251,191,36,0.05);padding:1rem 1.5rem;border-radius:4px;max-width:380px;margin:0 auto;">
            <div style="font-family:'Cinzel',serif;font-size:0.65rem;letter-spacing:0.2em;color:#fbbf24;text-transform:uppercase;margin-bottom:0.4rem;">⏳ Payment Verification Pending</div>
            <p style="font-size:0.75rem;color:var(--parchment);opacity:0.8;line-height:1.6;margin:0;">Your registration will be confirmed once we verify your payment proof. This usually takes 24-48 hours.</p>
          </div>
        </div>`;
      document.querySelectorAll('.step').forEach(s => s.classList.add('active'));
    } else {
      btn.disabled = false; btn.textContent = 'Submit Registration →';
      showFormError(result.error || 'Submission failed. Please try again.');
    }
  } catch(e) {
    btn.disabled = false; btn.textContent = 'Submit Registration →';
    showFormError('Network error. Please check your connection and try again.');
  }
}

/* ══════════════════════════════════════
   CERTIFICATE UPLOAD HANDLERS
══════════════════════════════════════ */
function handleCertSelect(input) {
  const file = input.files[0];
  if (file) validateAndShowCert(file);
}

function handleCertDrop(e) {
  e.preventDefault();
  const zone = document.getElementById('cert-upload-zone');
  zone.style.borderColor = 'rgba(155,32,32,0.4)';
  zone.style.background = 'transparent';
  const file = e.dataTransfer.files[0];
  if (file) {
    document.getElementById('r-certificate').files = e.dataTransfer.files;
    validateAndShowCert(file);
  }
}

function validateAndShowCert(file) {
  const zone = document.getElementById('cert-upload-zone');
  if (file.type !== 'application/pdf') {
    zone.style.borderColor = '#f87171';
    document.getElementById('cert-upload-text').textContent = 'Only PDF files are accepted.';
    document.getElementById('cert-upload-text').style.color = '#f87171';
    return;
  }
  if (file.size > 10 * 1024 * 1024) {
    zone.style.borderColor = '#f87171';
    document.getElementById('cert-upload-text').textContent = 'File exceeds 10MB limit.';
    document.getElementById('cert-upload-text').style.color = '#f87171';
    return;
  }
  zone.style.borderColor = 'rgba(74,222,128,0.5)';
  zone.style.background = 'rgba(74,222,128,0.04)';
  document.getElementById('cert-upload-icon').innerHTML = `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4ade80" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin:0 auto;display:block;"><polyline points="20 6 9 17 4 12"/></svg>`;
  document.getElementById('cert-upload-text').textContent = file.name;
  document.getElementById('cert-upload-text').style.color = '#4ade80';
  document.getElementById('cert-upload-sub').textContent = (file.size / 1024 / 1024).toFixed(2) + ' MB · PDF ready to submit';
}

/* ══════════════════════════════════════
   ANNOUNCEMENT SYSTEM
══════════════════════════════════════ */
// AppScript URLs
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbybRbeYPnN_zDi2tRrdLwbJr5noqI5UBExVuCqr1pLVhkHFfh_pGxTLMMwDeRbdbI4O/exec'; // Original - for announcements & registration
const COMMITTEES_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyToLWZfaTVwHcol4sZB3ylZnqWHiiZbQUq3pkjEAu-oGYZwrmI9A8wvVeBiWVK2F28jA/exec'; // New - for committees only
const dismissedAnnouncements = new Set();

// Priority → banner colour mapping
const priorityStyles = {
  urgent:  { bg: 'linear-gradient(90deg,#7f1d1d,#991b1b)', dot: '#f87171' },
  warning: { bg: 'linear-gradient(90deg,#78350f,#92400e)', dot: '#fbbf24' },
  info:    { bg: 'linear-gradient(90deg, var(--crimson), var(--phoenix))', dot: 'var(--phoenix)' }
};

const priorityBadge = {
  urgent:  { color:'#f87171', bg:'rgba(239,68,68,0.1)',   border:'rgba(239,68,68,0.25)',   label:'Urgent'  },
  warning: { color:'#fbbf24', bg:'rgba(251,191,36,0.1)',  border:'rgba(251,191,36,0.25)',  label:'Important'},
  info:    { color:'var(--phoenix)', bg:'rgba(155,32,32,0.1)', border:'rgba(155,32,32,0.2)', label:'Info' }
};

async function fetchAnnouncements() {
  if (APPS_SCRIPT_URL === 'YOUR_APPS_SCRIPT_URL') {
    // Not wired yet — hide loading state
    document.getElementById('announcements-loading').style.display = 'none';
    document.getElementById('home-updates-loading').style.display = 'none';
    document.getElementById('home-updates-empty').style.display = 'block';
    return;
  }
  try {
    const res  = await fetch(APPS_SCRIPT_URL + '?type=announcements');
    const data = await res.json();

    // Hide static fallback, hide loading
    document.getElementById('announcements-static').style.display = 'none';
    document.getElementById('announcements-loading').style.display = 'none';
    document.getElementById('home-updates-loading').style.display = 'none';

    if (!data.length) {
      document.getElementById('announcements-empty').style.display = 'block';
      document.getElementById('home-updates-empty').style.display = 'block';
      return;
    }

    // Render full announcements page list
    renderAnnouncementsPage(data);

    // Render home page updates (show latest 3)
    renderHomeUpdates(data.slice(0, 3));

    // Update home + register strips with most important item
    updateStrips(data[0]);

    // Show top banner if not yet dismissed
    const unseen = data.filter(a => !dismissedAnnouncements.has(a.id));
    if (unseen.length > 0) showAnnouncementBanner(unseen[0]);

    // Pulse the nav dot
    document.getElementById('nav-announcement-dot').style.display = 'inline-block';

  } catch(e) {
    document.getElementById('announcements-loading').style.display = 'none';
    document.getElementById('home-updates-loading').style.display = 'none';
    document.getElementById('home-updates-empty').style.display = 'block';
    console.log('Announcement fetch failed', e);
  }
}

function renderAnnouncementsPage(announcements) {
  const list = document.getElementById('announcements-list');
  list.innerHTML = announcements.map(a => {
    const badge = priorityBadge[a.priority] || priorityBadge.info;
    const borderColor = a.priority === 'urgent' ? '#f87171' : a.priority === 'warning' ? '#fbbf24' : 'var(--phoenix)';
    const dateStr = a.date ? new Date(a.date).toLocaleDateString('en-IN', { day:'numeric', month:'long', year:'numeric' }) : '';
    return `
      <div style="border:1px solid var(--border); border-left:3px solid ${borderColor}; background:var(--card-bg); padding:1.8rem 2rem; margin-bottom:1px; animation:fadeUp 0.5s ease both;">
        <div style="display:flex; align-items:flex-start; justify-content:space-between; gap:1rem; margin-bottom:0.8rem;">
          <span style="font-family:'Cinzel',serif; font-size:0.58rem; letter-spacing:0.25em; color:${badge.color}; text-transform:uppercase; background:${badge.bg}; border:1px solid ${badge.border}; padding:0.15rem 0.6rem;">${badge.label}</span>
          <span style="font-family:'EB Garamond',sans-serif; font-size:0.7rem; color:var(--muted); white-space:nowrap;">${dateStr}</span>
        </div>
        <h3 style="font-family:'EB Garamond',serif; font-style:italic; font-size:1.15rem; color:var(--ivory); margin-bottom:0.6rem;">${a.title}</h3>
        <p style="font-size:0.82rem; color:var(--parchment); opacity:0.75; line-height:1.7;">${a.message}</p>
      </div>`;
  }).join('');
}

function renderHomeUpdates(updates) {
  const homeLoading = document.getElementById('home-updates-loading');
  const homeList = document.getElementById('home-updates-list');
  const homeEmpty = document.getElementById('home-updates-empty');
  
  homeLoading.style.display = 'none';
  
  if (!updates || updates.length === 0) {
    homeEmpty.style.display = 'block';
    return;
  }
  
  homeEmpty.style.display = 'none';
  homeList.innerHTML = updates.map(a => {
    const badge = priorityBadge[a.priority] || priorityBadge.info;
    const borderColor = a.priority === 'urgent' ? '#f87171' : a.priority === 'warning' ? '#fbbf24' : 'var(--phoenix)';
    const dateStr = a.date ? new Date(a.date).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' }) : '';
    return `
      <div style="border:1px solid var(--border); border-left:3px solid ${borderColor}; background:var(--card-bg); padding:1.5rem 1.8rem; margin-bottom:1rem; animation:fadeUp 0.5s ease both;">
        <div style="display:flex; align-items:flex-start; justify-content:space-between; gap:1rem; margin-bottom:0.7rem;">
          <span style="font-family:'Cinzel',serif; font-size:0.55rem; letter-spacing:0.25em; color:${badge.color}; text-transform:uppercase; background:${badge.bg}; border:1px solid ${badge.border}; padding:0.12rem 0.55rem;">${badge.label}</span>
          <span style="font-family:'EB Garamond',serif; font-size:0.7rem; color:var(--muted); white-space:nowrap;">${dateStr}</span>
        </div>
        <h3 style="font-family:'EB Garamond',serif; font-style:italic; font-size:1.05rem; color:var(--ivory); margin-bottom:0.5rem;">${a.title}</h3>
        <p style="font-size:0.8rem; color:var(--parchment); opacity:0.75; line-height:1.7;">${a.message}</p>
      </div>`;
  }).join('');
}

function updateStrips(announcement) {
  if (!announcement) return;
  const text = announcement.title + (announcement.message ? ' — ' + announcement.message : '');

  const homeStrip = document.getElementById('home-announcements-strip');
  const homeText  = document.getElementById('home-strip-text');
  if (homeStrip && homeText) {
    homeStrip.style.display = 'block';
    homeText.textContent = text;
  }

  const regStrip = document.getElementById('register-announcements-strip');
  const regText  = document.getElementById('register-strip-text');
  if (regStrip && regText) {
    regStrip.style.display = 'block';
    regText.textContent = text;
  }
}

function showAnnouncementBanner(announcement) {
  const banner  = document.getElementById('announcement-banner');
  const style   = priorityStyles[announcement.priority] || priorityStyles.info;
  banner.style.background   = style.bg;
  banner.style.display      = 'flex';
  document.getElementById('announcement-text').textContent = announcement.title + (announcement.message ? ' — ' + announcement.message : '');
  requestAnimationFrame(() => { banner.style.transform = 'translateY(0)'; });
  if (announcement.id) dismissedAnnouncements.add(announcement.id);
}

function dismissAnnouncement() {
  const banner = document.getElementById('announcement-banner');
  banner.style.transform = 'translateY(-100%)';
  setTimeout(() => { banner.style.display = 'none'; }, 400);
}

// Poll every 5 minutes once URL is set
if (APPS_SCRIPT_URL !== 'YOUR_APPS_SCRIPT_URL') {
  fetchAnnouncements();
  setInterval(fetchAnnouncements, 5 * 60 * 1000);
} else {
  // Hide loading state immediately in dev mode
  setTimeout(() => {
    const el = document.getElementById('announcements-loading');
    if (el) el.style.display = 'none';
  }, 0);
}

/* ══════════════════════════════════════
   REGISTRATION STATUS CHECK
   Fetches toggle + message from Apps Script.
   If closed=TRUE → shows irremovable overlay.
   Toggle FALSE (or fetch fails) → page works normally.
══════════════════════════════════════ */

// 🔧 REPLACE with your Registration Status Apps Script web app URL
const REGISTRATION_STATUS_URL = 'https://script.google.com/macros/s/AKfycbzkx-lci33nin0zShST_jAUWW92JFlypLvEoNJrjni7OEuMcnXYD4clhFfbIJGiF5qFGw/exec';

async function checkRegistrationStatus() {
  if (REGISTRATION_STATUS_URL === 'YOUR_REGISTRATION_STATUS_SCRIPT_URL') return; // skip in dev

  try {
    const res = await fetch(REGISTRATION_STATUS_URL, { method: 'GET', redirect: 'follow' });
    if (!res.ok) return; // fail open — don't block if endpoint is down
    const data = await res.json();

    // data.closed should be true/false (or "TRUE"/"FALSE" from Sheets)
    const isClosed = data.closed === true || data.closed === 'TRUE';
    if (!isClosed) return;

    // Build the overlay — position:fixed, z-index above everything, no close button
    const overlay = document.createElement('div');
    overlay.id = 'reg-closed-overlay';
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('role', 'alertdialog');
    overlay.style.cssText = `
      position: fixed;
      inset: 0;
      z-index: 999999;
      background: rgba(8, 6, 6, 0.97);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
    `;

    const msg = data.message || 'Registrations are currently closed.';

    overlay.innerHTML = `
      <div style="
        max-width: 540px;
        width: 100%;
        text-align: center;
        border: 1px solid rgba(155,32,32,0.45);
        background: rgba(20,15,15,0.95);
        padding: clamp(2.5rem, 6vw, 4rem) clamp(2rem, 5vw, 3.5rem);
        animation: fadeIn 0.4s ease;
      ">
        <div style="
          width: 56px; height: 56px;
          border: 1.5px solid rgba(155,32,32,0.6);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 1.8rem;
        ">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
               stroke="var(--phoenix, #9b2020)" stroke-width="1.5"
               stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
        </div>
        <h2 style="
          font-family: 'Cinzel', serif;
          font-size: clamp(1.1rem, 3.5vw, 1.6rem);
          letter-spacing: 0.12em;
          color: var(--ivory, #f5f0e8);
          text-transform: uppercase;
          margin-bottom: 1.2rem;
          line-height: 1.3;
        ">Registrations Closed</h2>
        <p style="
          font-family: 'EB Garamond', serif;
          font-size: clamp(0.95rem, 2.5vw, 1.1rem);
          color: var(--parchment, #c8b99a);
          line-height: 1.8;
          opacity: 0.85;
        ">${msg}</p>
      </div>
    `;

    // Block keyboard escape and tab from leaving overlay
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' || e.key === 'Tab') e.preventDefault();
    });

    // Block scroll on body
    document.body.style.overflow = 'hidden';

    // Append to body — runs after DOM is ready
    document.body.appendChild(overlay);

  } catch (err) {
    // Silently fail open — never block the page on a network error
    console.warn('Registration status check failed (fail-open):', err);
  }
}

/* ══════════════════════════════════════
   INIT
══════════════════════════════════════ */
checkRegistrationStatus(); // Check reg status first — overlay if closed
loadCommittees(); // Load committees from AppScript
loadPhotos(); // Load photos from Google Sheets

/* ══════════════════════════════════════
   SCROLL TO TOP FUNCTIONALITY
══════════════════════════════════════ */
// Show/hide button based on scroll position
window.addEventListener('scroll', () => {
  const scrollToTopBtn = document.getElementById('scroll-to-top');
  if (!scrollToTopBtn) return;
  if (window.pageYOffset > 300) {
    scrollToTopBtn.classList.add('visible');
  } else {
    scrollToTopBtn.classList.remove('visible');
  }
});

// Scroll to top when clicked
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

/* ══════════════════════════════════════
   SCHEDULE — GOOGLE SHEETS INTEGRATION
══════════════════════════════════════ */
const SCHEDULE_API = 'https://script.google.com/macros/s/AKfycbzd1rLn2TTuGMo1544mrgk4-mtvIET5z4LYIO8cK-trYz1bH8r1ktSCL6sdqxe2JVI9/exec';
let scheduleLoaded = false; // only fetch once per session

async function loadSchedule() {
  // Don't re-fetch if already loaded
  if (scheduleLoaded) return;

  const container = document.getElementById('schedule-container');
  if (!container) return;

  // Show loading state
  container.innerHTML = `
    <div style="text-align:center; padding:3rem; color:var(--ivory); opacity:0.5; font-family:'EB Garamond',serif;">
      Loading schedule...
    </div>`;

  try {
    const res = await fetch(SCHEDULE_API, { method: 'GET', redirect: 'follow' });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();

    scheduleLoaded = true;

    // ── COMING SOON MODE ──────────────────────────────────
    if (data.coming_soon === true || data.coming_soon === 'TRUE') {
      container.innerHTML = `
        <div style="
          text-align:center;
          padding:5rem 2rem;
          border:1px solid var(--border);
          background:var(--card-bg);
          max-width:600px;
          margin:2rem auto;
        ">
          <div style="font-size:3rem; margin-bottom:1.2rem;">📅</div>
          <h2 style="font-family:'Cinzel',serif; color:var(--gold); font-size:1.8rem; letter-spacing:0.08em; margin-bottom:0.75rem;">
            Schedule Coming Soon
          </h2>
          <p style="font-family:'EB Garamond',serif; color:var(--ivory); opacity:0.6; font-size:1.05rem; line-height:1.7;">
            The full event programme will be published here shortly.<br>Stay tuned!
          </p>
        </div>`;
      return;
    }

    // ── RENDER FULL SCHEDULE ──────────────────────────────
    if (!data.days || data.days.length === 0) {
      container.innerHTML = `
        <div style="text-align:center; padding:3rem; color:var(--muted); font-family:'EB Garamond',serif;">
          No schedule data available yet.
        </div>`;
      return;
    }

    let html = '<div class="schedule-grid">';
    data.days.forEach(day => {
      html += `
        <div>
          <div class="schedule-day-label">${day.day_label}</div>
          <div class="schedule-day-title">${day.day_title}</div>
          <div class="timeline">`;
      day.items.forEach(item => {
        html += `
            <div class="timeline-item">
              <div class="tl-time">${item.time}</div>
              <div class="tl-event">${item.event}</div>
              <div class="tl-desc">${item.desc || ''}</div>
            </div>`;
      });
      html += `</div></div>`;
    });
    html += '</div>';
    container.innerHTML = html;

  } catch (e) {
    console.error('Schedule load failed:', e);
    scheduleLoaded = false; // allow retry
    container.innerHTML = `
      <div style="text-align:center; padding:3rem; font-family:'EB Garamond',serif;">
        <p style="color:var(--phoenix); margin-bottom:1rem;">Could not load schedule. Please try again.</p>
        <button onclick="scheduleLoaded=false; loadSchedule();" style="background:var(--phoenix); color:var(--ivory); border:none; padding:0.6rem 1.5rem; cursor:pointer; font-family:'Cinzel',serif; font-size:0.75rem; letter-spacing:0.1em; text-transform:uppercase;">Retry</button>
      </div>`;
  }
}

// Hook into the existing showPage so schedule loads when navigating to it
const _origShowPage = window.showPage;
window.showPage = function(name) {
  _origShowPage(name);
  if (name === 'schedule') loadSchedule();
};

