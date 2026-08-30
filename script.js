/* ==========================================================================
   KALAM HATI — script.js
   Data konten, generator ilustrasi placeholder, motion ala Framer,
   carousel galeri, tab, validasi form, modal, toast.
   ========================================================================== */
(function () {
  'use strict';

  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ======================================================================
     1. DATA
     Nama narasumber & judul kajian mengikuti konten pada file Figma.
     ====================================================================== */

  const KAJIAN = [
    {
      dow: 'Minggu', dd: '30', mm: 'AGU 2026',
      title: 'Udah Mau Nyerah Lagi? Tunggu, Allah Belum Selesai Denganmu',
      people: ['Muhammad Assad', 'Ustazah Yati Priyati'],
      venue: 'Masjid Al-Ikhlas PIK 2, Jakarta Utara',
      venueShort: 'Masjid Al-Ikhlas, PIK 2',
      address: 'Riverwalk Island Jl. Simpang Empat Gate 5, Kamal Muara, North Jakarta City, Jakarta 14460',
      query: 'Masjid Al-Ikhlas PIK 2 Kamal Muara Jakarta Utara',
      time: '13.00 WIB'
    },
    {
      dow: 'Minggu', dd: '6', mm: 'SEP 2026',
      title: 'Ya Allah, Kenapa Hidupku Gini-Gini Aja?',
      people: ['Ustaz Taufiqurrahman', 'Ustazah Yati Priyati'],
      venue: 'Masjid Baitussalam The Green BSD City, Tangerang',
      venueShort: 'Masjid Baitussalam, BSD City',
      address: 'The Green BSD City, Jl. Letnan Sutopo, Lengkong Gudang, Serpong, Tangerang Selatan 15310',
      query: 'Masjid Baitussalam The Green BSD City Tangerang Selatan',
      time: '13.00 WIB'
    },
    {
      dow: 'Minggu', dd: '13', mm: 'SEP 2026',
      title: 'Sharing Sebelum Saring, Siap-Siap Panen Dosa Jariyah',
      people: ['Habib Nabiel Al Musawa', 'Ustazah Yati Priyati'],
      venue: 'Masjid Raya Pondok Indah, Jakarta Selatan',
      venueShort: 'Masjid Raya Pondok Indah',
      address: 'Jl. Sultan Iskandar Muda, Pondok Pinang, Kebayoran Lama, Jakarta Selatan 12310',
      query: 'Masjid Raya Pondok Indah Jakarta Selatan',
      time: '13.00 WIB'
    },
    {
      dow: 'Minggu', dd: '20', mm: 'SEP 2026',
      title: 'Menantu vs Mertua',
      people: ['Ustaz Taufiqurrahman', 'Ustazah Syifa Nurfadhilah'],
      venue: 'Masjid Raya At-Taqwa, Jakarta Selatan',
      venueShort: 'Masjid Raya At-Taqwa',
      address: 'Jl. Raya Pasar Minggu, Pancoran, Jakarta Selatan 12780',
      query: 'Masjid Raya At-Taqwa Pancoran Jakarta Selatan',
      time: '13.00 WIB'
    }
  ];

  /* Episode Terbaru diambil langsung dari kanal YouTube resmi Kalam Hati
     KompasTV, tab Live (youtube.com/@kalamhatikompastv/streams). Video yang
     di-highlight adalah siaran live terbaru; tiga lainnya adalah live
     sebelumnya di kanal yang sama. Semua permalink mengarah ke YouTube. */
  const EP_MAIN = {
    id: 'TsnZpiGwhbY',
    title: 'Spesial Maulid Nabi: Bahaya, Jika Dusta Masih Kau Pelihara',
    who: 'Dude Herlino, Ustaz Abeey Ghifran & Ustazah Lulung Mumtaza',
    date: '23 Agustus 2026', time: '13.00 WIB',
    thumb: 'asset/yt-ep-1.jpg'
  };
  const EPISODES = [
    { id: 'AhgkCwCywXs', title: 'Merdeka dalam Takwa: Kunci Ketenangan Jiwa dan Hati', who: 'Dude Herlino', date: '17 Agustus 2026', time: '13.00 WIB', thumb: 'asset/yt-ep-2.jpg' },
    { id: 'M3iwC8Z1syc', title: 'Memburu Dunia hingga Lupa Sang Pencipta',              who: 'Dude Herlino', date: '10 Agustus 2026', time: '13.00 WIB', thumb: 'asset/yt-ep-3.jpg' },
    { id: 'LPcEhmCi1HY', title: 'Allah Tutup Aibmu, tapi Kau Umbar Belangmu',           who: 'Dude Herlino', date: '3 Agustus 2026',  time: '13.00 WIB', thumb: 'asset/yt-ep-4.jpg' }
  ];
  const ytUrl = id => `https://www.youtube.com/watch?v=${id}`;

  /* Kelima entri di bawah adalah konten ASLI dari akun resmi Instagram
     @dikalamhati — foto/video dan caption diambil langsung dari postingan
     publik. Item dengan `images` (array) adalah foto/carousel asli (semua
     slide disimpan, bukan cuma cover); item dengan `video` adalah reel asli
     (file .mp4 asli, bukan simulasi) dengan `poster` sebagai gambar sampul
     sebelum diputar. Semua file disimpan lokal di asset/. */
  const DAILY = [
    {
      plat: 'Instagram',
      video: 'asset/ig-reel-1.mp4', poster: 'asset/ig-post-1.jpg',
      permalink: 'https://www.instagram.com/p/DccmE5SD_ou/',
      date: '24 Agustus 2026',
      title: 'Selamat Memperingati Maulid Nabi Muhammad SAW',
      caption: 'Selamat memperingati Maulid Nabi Muhammad SAW 🤍\n\nMaulid Nabi Muhammad SAW menjadi momen untuk mengenang kelahiran Rasulullah SAW sekaligus meneladani akhlak dan perjuangan beliau dalam kehidupan sehari-hari.\n\nRasulullah SAW mengajarkan kita untuk jujur, menjaga lisan, menyayangi sesama, dan taat kepada Allah. Semoga kecintaan kepada Rasulullah SAW tidak hanya kita ucapkan, tetapi juga kita tunjukkan melalui akhlak dan perbuatan.\n\nMari jadikan Maulid Nabi Muhammad SAW sebagai pengingat untuk memperbaiki diri dan memperbanyak shalawat. Semoga kita semua mendapatkan syafaat Rasulullah SAW dan dikumpulkan bersama beliau di akhirat kelak. 🤲\n\nAllahumma shalli ‘ala Sayyidina Muhammad wa ‘ala ali Sayyidina Muhammad.\n\n#MaulidNabiMuhammad #KalamHatiKompasTV'
    },
    {
      plat: 'Instagram',
      images: ['asset/ig-post-2a.jpg', 'asset/ig-post-2b.jpg'],
      permalink: 'https://www.instagram.com/dikalamhati/p/DcXlEXMDZGw/',
      date: '22 Agustus 2026',
      title: 'Allah Maha Mengetahui, Allah Maha Adil',
      caption: 'Di tengah dunia yang tak selalu berjalan sesuai harapan, ada kalanya kebaikan kita berhadapan dengan tipu daya dan ketidakadilan. Namun, Allah mengingatkan bahwa setiap niat dan perbuatan yang tersembunyi tetap berada dalam pengetahuan-Nya.\n\nKarena itu, tak perlu mengotori hati hanya karena manusia di dunia berlaku tidak adil. Tetaplah menjaga niat dan memilih kebaikan, sebab Allah adalah Al-‘Alīm, Yang Maha Mengetahui, dan Al-‘Adl, Yang Maha Adil.\n\n#kalamhati #alquran'
    },
    {
      plat: 'Instagram',
      images: ['asset/ig-post-3a.jpg', 'asset/ig-post-3b.jpg'],
      permalink: 'https://www.instagram.com/dikalamhati/p/DcNg_AdGB12/',
      date: '18 Agustus 2026',
      title: 'Bahaya, Jika Dusta Masih Kau Pelihara',
      caption: 'Pernah merasa kebohongan kecil bukan masalah besar? Padahal, ketika dusta terus dipelihara, kebohongan bisa menjadi kebiasaan yang perlahan merusak kepercayaan dan menjauhkan hati dari Allah.\n\nYuk hadir di Kajian Kalam Hati KompasTV bersama @dude2harlino, Ustaz @abeyghifran, dan Ustazah @lulungmanis dengan tema:\n\nBAHAYA, JIKA DUSTA MASIH KAU PELIHARA\n\nMinggu, 23 Agustus 2026 • Jamaah hadir 11.00 WIB • LIVE Kajian 13.00 WIB\nMasjid Baitul Hakim, Jl. Cakrawijaya V, Cipinang Muara, Jakarta Timur\nPendaftaran (WhatsApp): 0811-9007-3273 • Terbuka untuk umum\n\nSampai bertemu di #KalamHatiKompasTV'
    },
    {
      plat: 'Instagram',
      video: 'asset/ig-reel-4.mp4', poster: 'asset/ig-post-4.jpg',
      permalink: 'https://www.instagram.com/dikalamhati/reel/DcTIIFmjUhq/',
      date: '21 Agustus 2026',
      title: 'Cara Membantu Tanpa Membuat Bergantung',
      caption: 'Sedekah dan membantu sesama adalah kebaikan, tetapi apakah setiap bantuan selalu baik untuk diberikan? Jangan sampai niat membantu justru membuat seseorang terbiasa bergantung dan kehilangan kemandirian.\n\nUstaz @muh_assad menjelaskan batas antara sedekah, kepedulian, dan kebiasaan meminta-minta dalam Islam.\n\nLalu, bagaimana cara membantu orang lain dengan tepat tanpa membuat mereka terus bergantung kepada bantuan?\n\nTonton sampai selesai dan simpan video ini sebagai pengingat agar kita bisa membantu sesama dengan cara yang bijak sesuai ajaran Islam.\n\n#KalamHatiKompasTV'
    },
    {
      plat: 'Tiktok',
      tiktokId: '7677972945322462482', poster: 'asset/tiktok-post-5.png',
      permalink: 'https://www.tiktok.com/@dikalamhati/video/7677972945322462482',
      date: '25 Agustus 2026',
      title: 'Mengisi Kemerdekaan dengan Cara yang Allah Ridai',
      caption: 'Cara mengisi kemerdekaan Indonesia dengan benar bukan hanya dengan merayakannya, tetapi juga dengan memperbaiki diri.\n\nUstadz Muhammad Assad menjelaskan bahwa syukur dan salat menjadi bagian penting agar kita menjadi pribadi yang lebih baik.\n\nSudahkah kita sebagai Bangsa Indonesia mengisi kemerdekaan dengan cara yang Allah ridai?\n\n#kalamhati #ustadzmuhammadassad #kemerdekaanindonesia'
    }
  ];

  /* Kelima artikel di bawah adalah konten ASLI dari Kompas TV (judul,
     tanggal publikasi, dan thumbnail diambil langsung dari halaman artikel
     aslinya; gambar disimpan lokal di asset/news-*.jpg). */
  const NEWS = [
    {
      author: 'Kalam Hati', date: '7 Agustus 2026',
      title: 'Allah Sudah Tutupi Aibmu! Kenapa Malah Bangga Umbar Dosa dan Maksiat di Medsos?!',
      image: 'asset/news-1.jpg',
      link: 'https://www.kompas.tv/kalam-hati/684361/allah-sudah-tutupi-aibmu-kenapa-malah-bangga-umbar-dosa-dan-maksiat-di-medsos'
    },
    {
      author: 'Kalam Hati', date: '6 Agustus 2026',
      title: 'Makna Cinta dalam Islam: Jaga Rasa Sayang Agat Tak Kalahkan Cinta kepada Allah',
      image: 'asset/news-2.jpg',
      link: 'https://www.kompas.tv/kalam-hati/684356/makna-cinta-dalam-islam-jaga-rasa-sayang-agat-tak-kalahkan-cinta-kepada-allah'
    },
    {
      author: 'Kalam Hati', date: '6 Agustus 2026',
      title: 'Alasan Judi Haram dalam Islam, Nafkah Tak Berkah, hingga Taubat Dibahas Tuntas',
      image: 'asset/news-3.jpg',
      link: 'https://www.kompas.tv/kalam-hati/684355/alasan-judi-haram-dalam-islam-nafkah-tak-berkah-hingga-taubat-dibahas-tuntas'
    },
    {
      author: 'Kalam Hati', date: '6 Juli 2026',
      title: 'Pengen Bahagia Meski Hidup Serba Mahal? Ini Kunci Rezeki dan Kebahagiaan',
      image: 'asset/news-4.jpg',
      link: 'https://www.kompas.tv/kalam-hati/678883/pengen-bahagia-meski-hidup-serba-mahal-ini-kunci-rezeki-dan-kebahagiaan-kalam-hati'
    },
    {
      author: 'Kalam Hati', date: '29 Juni 2026',
      title: '[FULL] Lingkungan Penuh Maksiat Bukan Alasan Berbuat Dosa, Ini Cara Tetap Istiqomah',
      image: 'asset/news-5.jpg',
      link: 'https://www.kompas.tv/kalam-hati/677582/full-lingkungan-penuh-maksiat-bukan-alasan-berbuat-dosa-ini-cara-tetap-istiqomah'
    }
  ];

  /* Galeri = kumpulan ALBUM, satu album per event (Figma node 87:21).

     FOTO: asset/album-N.jpg (maks 1400px, untuk pop-up) dan
     asset/album-N-cover.jpg (720px, khusus thumbnail album) — hasil kompresi
     dari "Foto Album N.jpg" (13,6 MB -> 2,5 MB). File aslinya sengaja tidak
     ditimpa, masih tersimpan di folder yang sama.

     Sepuluh foto yang sama dipakai di semua album, hanya URUTANNYA yang
     digeser (album ke-n mulai dari foto ke-n) supaya tiap album terlihat
     berbeda. Ganti isi `photos` per album begitu foto asli tiap event
     tersedia — jumlah foto per album bebas, tidak harus 10. */
  const ALBUM_PHOTO_COUNT = 10;
  const ALBUM_CAPTIONS = [
    'Suasana kajian Kalam Hati bersama jamaah yang hadir sejak pagi.',
    'Sesi tausiah bersama narasumber, membahas tema menjaga hati di tengah kesibukan.',
    'Antusiasme Teman Hati mengikuti kajian dari awal hingga akhir.',
    'Momen kebersamaan jamaah sebelum kajian dimulai.',
    'Sesi tanya jawab bersama narasumber di lokasi kajian.',
    'Doa bersama menutup rangkaian acara kajian.',
    'Ramah tamah bersama jamaah setelah kajian selesai.',
    'Kebersamaan Teman Hati dari berbagai daerah.',
    'Penyerahan kenang-kenangan kepada narasumber kajian.',
    'Foto bersama menutup acara kajian Kalam Hati.'
  ];

  /* Susun daftar foto satu album: mulai dari foto ke-`offset`, lalu berputar
     kembali ke awal setelah foto terakhir. `count` boleh melebihi jumlah
     berkas foto yang ada — kelebihannya otomatis mengulang dari awal. */
  function albumPhotos(offset, count = ALBUM_PHOTO_COUNT) {
    return Array.from({ length: count }, (_, k) => {
      const n = ((offset + k) % ALBUM_PHOTO_COUNT) + 1;
      return { src: `asset/album-${n}.jpg`, caption: ALBUM_CAPTIONS[n - 1] };
    });
  }

  /* Enam album = dua halaman (3 album per halaman) — cukup untuk menunjukkan
     panah/geser berpindah tiga-tiga sekaligus. */
  const GALLERY_ALBUMS = [
    { title: 'Event 1 : Kalam Hati',              date: '17 Agustus 2026' },
    /* sengaja 50 foto — untuk menguji tampilan saat baris pilihan foto
       pada pop-up harus di-scroll */
    { title: 'Event 2 : Kajian Akbar',            date: '24 Agustus 2026', count: 50 },
    { title: 'Event 3 : Silaturahmi Teman Hati',  date: '31 Agustus 2026' },
    { title: 'Event 4 : Kajian Spesial',          date: '7 September 2026' },
    { title: 'Event 5 : Tabligh Akbar',           date: '14 September 2026' },
    { title: 'Event 6 : Kajian Subuh',            date: '21 September 2026' }
  ].map((album, i) => ({
    ...album,
    /* offset foto digeser 1 per album (bukan 2) supaya sampai album ke-10
       pun cover & urutan fotonya tidak ada yang kembar */
    cover: `asset/album-${i % ALBUM_PHOTO_COUNT + 1}-cover.jpg`,
    photos: albumPhotos(i, album.count)
  }));

  /* Foto ke-2 album Event 1 sengaja diganti foto landscape (2480x1020,
     hasil kompresi dari "Gallery 1.jpg") sebagai contoh foto non-persegi:
     dipakai untuk memeriksa tampilan foto lebar di dalam frame 1:1 —
     harus tampil UTUH (tidak terpotong), bukan dipangkas. */
  GALLERY_ALBUMS[0].photos[1] = {
    src: 'asset/album-landscape.jpg',
    caption: 'Suasana lokasi kajian dari kejauhan — contoh foto landscape.'
  };

  /* ======================================================================
     2. GENERATOR ILUSTRASI (placeholder foto)
     Semua gambar di Pusat Media & Galeri memakai ilustrasi ini.
     Ganti dengan foto asli lewat <img> bila sudah tersedia.
     ====================================================================== */

  /* [langit atas, langit bawah, siluet, aksen] */
  const SKY = [
    ['#FFD9A0', '#FFF3D6', '#6B2E52', '#FFB86B'],
    ['#B9DFF3', '#F4FAFF', '#4A2340', '#FFD166'],
    ['#7B2E63', '#F2A65A', '#3B0A28', '#FFE2AF'],
    ['#2B1240', '#6B2E52', '#180612', '#F1D478'],
    ['#F1D478', '#FFF6DE', '#622046', '#C8418F'],
    ['#622046', '#C8418F', '#33091F', '#F1D478'],
    ['#9C4F7E', '#FFD9A0', '#3B0A28', '#FFF3D6']
  ];

  /* Dibangun pada viewBox 400×300 lalu di-"slice" ke ukuran wadah apa pun. */
  function sceneSVG(seed) {
    const i = seed % SKY.length;
    const [s1, s2, sil, acc] = SKY[i];
    const id = 'sc' + seed;
    const sunX = 90 + (seed * 47) % 220;
    const night = i === 3;

    const stars = night
      ? [...Array(14)].map((_, k) => {
          const x = (k * 61 + seed * 17) % 400, y = (k * 37 + seed * 11) % 130;
          return `<circle cx="${x}" cy="${y}" r="${0.8 + (k % 3) * 0.5}" fill="#fff" opacity=".7"/>`;
        }).join('')
      : '';

    /* siluet jemaah di bagian bawah */
    const crowd = [...Array(11)].map((_, k) => {
      const x = -10 + k * 40 + (seed * 7) % 20;
      const hgt = 26 + ((k * 13 + seed) % 14);
      return `<g fill="${sil}" opacity=".9">
                <circle cx="${x}" cy="${300 - hgt}" r="7"/>
                <path d="M${x - 12} 300 q0-${hgt - 8} 12-${hgt - 8} q12 0 12 ${hgt - 8} Z"/>
              </g>`;
    }).join('');

    return `
<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"
     preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true">
  <defs>
    <linearGradient id="${id}s" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${s1}"/><stop offset="1" stop-color="${s2}"/>
    </linearGradient>
    <radialGradient id="${id}g" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="${acc}" stop-opacity=".95"/>
      <stop offset="1" stop-color="${acc}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="${id}p" width="44" height="44" patternUnits="userSpaceOnUse">
      <path d="M22 4 30 12 40 12 40 22 48 30 40 38 40 48 30 48 22 56 14 48 4 48 4 38 -4 30 4 22 4 12 14 12Z"
            fill="none" stroke="${acc}" stroke-width=".8" opacity=".22"/>
    </pattern>
  </defs>

  <rect width="400" height="300" fill="url(#${id}s)"/>
  <circle cx="${sunX}" cy="96" r="96" fill="url(#${id}g)"/>
  <circle cx="${sunX}" cy="96" r="30" fill="${acc}" opacity=".92"/>
  ${stars}
  <rect width="400" height="300" fill="url(#${id}p)"/>

  <!-- siluet masjid -->
  <g fill="${sil}">
    <rect x="104" y="150" width="15" height="112" rx="4"/>
    <path d="M104 152c0-14 15-14 15 0Z"/>
    <circle cx="111.5" cy="142" r="6"/>
    <rect x="281" y="150" width="15" height="112" rx="4"/>
    <path d="M281 152c0-14 15-14 15 0Z"/>
    <circle cx="288.5" cy="142" r="6"/>

    <path d="M92 232c0-26 52-26 52 0Z" opacity=".95"/>
    <path d="M256 232c0-26 52-26 52 0Z" opacity=".95"/>
    <rect x="92" y="230" width="216" height="42"/>

    <path d="M132 206c0-46 136-46 136 0Z"/>
    <rect x="196" y="150" width="8" height="18" rx="3"/>
    <circle cx="200" cy="146" r="6"/>
    <rect x="132" y="204" width="136" height="68"/>
  </g>

  <!-- lengkung pintu & jendela -->
  <g fill="${s2}" opacity=".55">
    <path d="M186 272v-32c0-18 28-18 28 0v32Z"/>
    <path d="M154 268v-20c0-12 18-12 18 0v20Z"/>
    <path d="M228 268v-20c0-12 18-12 18 0v20Z"/>
  </g>

  ${crowd}
  <rect width="400" height="300" fill="none"/>
  <rect width="400" height="300"
        fill="url(#${id}s)" opacity="0"/>
</svg>`;
  }

  /* Avatar bulat 28px untuk nama narasumber */
  const AV = [
    ['#F0C9A4', '#6B2E52'], ['#E5B489', '#8E2160'], ['#D9A377', '#4A2340'],
    ['#EFCBA8', '#A63B79'], ['#E8BE97', '#622046'], ['#DCA97E', '#3B0A28']
  ];
  function avatarSVG(seed) {
    const [skin, bg] = AV[seed % AV.length];
    const hijab = seed % 2 === 1;
    return `
<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
  <rect width="40" height="40" fill="${bg}"/>
  ${hijab
    ? `<path d="M8 20c0-9 24-9 24 0v20H8Z" fill="#EDE4D6"/>
       <ellipse cx="20" cy="21" rx="7.5" ry="9" fill="${skin}"/>`
    : `<path d="M9 34c0-7 5-10 11-10s11 3 11 10v6H9Z" fill="#EDE4D6"/>
       <ellipse cx="20" cy="19" rx="8.5" ry="9.5" fill="${skin}"/>
       <path d="M11 15c0-8 18-8 18 0Z" fill="#241318"/>`}
  <circle cx="17" cy="20" r="1.3" fill="#2A1520"/>
  <circle cx="23" cy="20" r="1.3" fill="#2A1520"/>
  <path d="M17.5 25q2.5 2 5 0" fill="none" stroke="#A85A6C" stroke-width="1.2" stroke-linecap="round"/>
</svg>`;
  }

  /* Foto asli narasumber Jadwal Kajian — dipakai menggantikan avatarSVG
     placeholder di mana pun namanya muncul (kartu kajian & modal
     pendaftaran). Narasumber yang belum punya foto tetap pakai placeholder. */
  const PERSON_PHOTO = {
    'Muhammad Assad': 'asset/circle_Muhammad Assad.png',
    'Ustazah Yati Priyati': 'asset/circle_Ustazah Yati Priyati.png',
    'Habib Nabiel Al Musawa': 'asset/circle_habib.png',
    'Ustaz Taufiqurrahman': 'asset/circle_Ustaz Taufiqurrahman.png'
  };
  function personAvatar(name, seed) {
    const photo = PERSON_PHOTO[name];
    return photo ? `<img src="${photo}" alt="" loading="lazy">` : avatarSVG(seed);
  }

  /* ======================================================================
     3. RENDER
     ====================================================================== */

  /* --- Jadwal kajian --- */
  const kajianList = $('#kajianList');
  KAJIAN.forEach((k, i) => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'kj-card reveal' + (i === 0 ? ' is-active' : '');
    card.style.transitionDelay = (i * 80) + 'ms';
    card.dataset.index = i;
    card.setAttribute('aria-pressed', i === 0);
    card.innerHTML = `
      <span class="kj-date">
        <span class="kj-dow">${k.dow}</span>
        <span class="kj-dd">${k.dd}</span>
        <span class="kj-mm">${k.mm}</span>
      </span>
      <span class="kj-body">
        <span class="kj-title">${k.title}</span>
        <span class="kj-meta">
          <span class="kj-people">
            ${k.people.map((p, n) => `
              <span class="who"><i class="av">${personAvatar(p, i * 2 + n)}</i>${p}</span>`).join('')}
          </span>
          <span class="kj-line"><i class="ph-fill ph-map-pin"></i>${k.venue}</span>
          <span class="kj-line"><i class="ph ph-clock"></i>${k.time}</span>
        </span>
      </span>`;
    kajianList.appendChild(card);
  });

  const mapFrame = $('#kajianMap');
  /* Di mobile panel peta tampil sebagai bottom sheet dan baru dibuka saat
     kartu kajian ditekan — jadi peta tidak boleh ikut dimuat sebelum itu. */
  const sheetMQ = window.matchMedia('(max-width:860px)');
  const kajianPanel = $('#kajianPanel');
  const sheetBackdrop = $('#kajianSheetBackdrop');
  let mapLoadedFor = -1;

  function loadMap(i) {
    if (mapLoadedFor === i) return;
    const k = KAJIAN[i];
    mapFrame.src = 'https://www.google.com/maps?q=' + encodeURIComponent(k.query) + '&z=16&output=embed';
    mapLoadedFor = i;
  }

  /* markActive=false dipakai saat inisialisasi di mobile: info peta perlu
     disiapkan (untuk saat sheet dibuka nanti / saat balik ke desktop), tapi
     belum ada kartu yang boleh tampil aktif sebelum user benar-benar
     mengetuknya. */
  function showMap(i, markActive = true) {
    const k = KAJIAN[i];
    $('#mapVenue').textContent = k.venueShort;
    $('#mapAddress').textContent = k.address;
    $('#mapDirections').href = 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(k.query);
    $$('.kj-card').forEach(c => {
      const on = markActive && +c.dataset.index === i;
      c.classList.toggle('is-active', on);
      c.setAttribute('aria-pressed', on);
    });
    if (!sheetMQ.matches) loadMap(i);   // desktop: peta selalu terlihat
  }

  function openKajianSheet(i) {
    loadMap(i);
    $('.section-kajian').classList.add('sheet-open');
    kajianPanel.classList.add('is-open');
    sheetBackdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
  function closeKajianSheet() {
    $('.section-kajian').classList.remove('sheet-open');
    kajianPanel.classList.remove('is-open');
    sheetBackdrop.classList.remove('is-open');
    document.body.style.overflow = '';
    /* Kartu aktif hanya relevan selama sheet terbuka — begitu ditutup,
       kembali ke kondisi default: tidak ada kartu yang aktif. */
    $$('.kj-card').forEach(c => { c.classList.remove('is-active'); c.setAttribute('aria-pressed', 'false'); });
  }

  showMap(0, !sheetMQ.matches);   // mobile: belum ada kartu aktif sampai diketuk
  kajianList.addEventListener('click', e => {
    const card = e.target.closest('.kj-card');
    if (!card) return;
    const i = +card.dataset.index;
    showMap(i);
    if (sheetMQ.matches) openKajianSheet(i);
  });
  $$('[data-close-sheet]').forEach(el => el.addEventListener('click', closeKajianSheet));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && kajianPanel.classList.contains('is-open')) closeKajianSheet();
  });
  /* Kembali ke desktop saat sheet terbuka: tutup sheet & pastikan peta termuat */
  sheetMQ.addEventListener('change', e => {
    if (!e.matches) {
      closeKajianSheet();
      const active = $('.kj-card.is-active');
      showMap(active ? +active.dataset.index : 0, true);
    }
  });

  /* --- Pusat media --- */
  /* insertAdjacentHTML (bukan innerHTML) — supaya badge LIVE yang sudah
     ada di markup statis tidak ikut terhapus */
  $('#epMainArt').insertAdjacentHTML('afterbegin', `<img src="${EP_MAIN.thumb}" alt="" loading="lazy" draggable="false">`);
  $('#epMainTitle').textContent = EP_MAIN.title;
  $('#epMainWho').innerHTML = `<i class="av" data-av="1"></i> ${EP_MAIN.who}`;
  $('#epMainDate').textContent = EP_MAIN.date;
  $('#epMainTime').textContent = EP_MAIN.time;

  /* Badge LIVE hanya tampil kalau kajian memang sedang berlangsung —
     Minggu, jam 13.00–13.59 WIB (jam siaran kajian mingguan). Di luar jam
     itu badge "Terbaru" yang tampil — keduanya saling eksklusif. */
  function updateEpisodeBadge() {
    const w = nowWIB();
    const isLive = w.getDay() === 0 && w.getHours() === 13;
    $('#epMainLive').hidden = !isLive;
    $('#epMainLatest').hidden = isLive;
  }
  updateEpisodeBadge();
  setInterval(updateEpisodeBadge, 30000);

  const epList = $('#epList');
  EPISODES.forEach((e, i) => {
    const el = document.createElement('article');
    el.className = 'ep-item reveal';
    el.style.transitionDelay = (i * 90) + 'ms';
    el.dataset.href = ytUrl(e.id);
    el.innerHTML = `
      <div class="ep-thumb"><img src="${e.thumb}" alt="" loading="lazy" draggable="false"></div>
      <div class="ep-item-body">
        <h4>${e.title}</h4>
        <div class="ep-item-meta">
          <span class="who"><i class="av">${avatarSVG(i + 1)}</i>${e.who}</span>
          <span class="row">
            <span><i class="ph ph-calendar-blank"></i>${e.date}</span>
            <span class="dot"></span>
            <span><i class="ph ph-clock"></i>${e.time}</span>
          </span>
        </div>
      </div>`;
    el.addEventListener('click', () => window.open(ytUrl(e.id), '_blank', 'noopener'));
    epList.appendChild(el);
  });

  const PLAT_ICON = { Instagram: 'ph-instagram-logo', Tiktok: 'ph-tiktok-logo' };

  /* Ambil kalimat pertama dari caption asli — tidak menulis ulang sendiri.
     Berhenti pada . ? ! yang diikuti spasi/akhir teks, sambil menghindari
     pemotongan pada tanda kutip pembuka yang belum tertutup. */
  function firstSentence(text) {
    const clean = String(text || '').replace(/\s+/g, ' ').trim();
    /* tanda baca boleh diikuti kutip penutup, mis. ...bertahan?” */
    const m = clean.match(/^[\s\S]*?[.?!]["”']?(?=\s|$)/);
    return (m ? m[0] : clean).trim();
  }

  const dailyGrid = $('#dailyGrid');
  DAILY.forEach((d, i) => {
    const el = document.createElement('article');
    el.className = 'daily reveal';
    el.style.transitionDelay = (i * 70) + 'ms';
    el.dataset.index = i;
    const thumb = d.poster || d.images[0];
    el.innerHTML = `
      <div class="daily-art"><img src="${thumb}" alt="" loading="lazy" draggable="false"></div>
      <span class="daily-badge"><i class="ph-fill ${PLAT_ICON[d.plat]}"></i>${d.plat}</span>
      <div class="daily-overlay"><p class="daily-cap"></p></div>`;
    el.querySelector('.daily-cap').textContent = firstSentence(d.caption);
    dailyGrid.appendChild(el);
  });

  const newsGrid = $('#newsGrid');
  NEWS.forEach((n, i) => {
    const a = document.createElement('a');
    a.className = 'news reveal';
    a.href = n.link;
    a.target = '_blank';
    a.rel = 'noopener';
    a.draggable = false;   /* <a> secara default draggable browser — ganggu slider mobile */
    a.style.transitionDelay = (i * 70) + 'ms';
    a.innerHTML = `
      <div class="news-art"><img src="${n.image}" alt="" loading="lazy" draggable="false"></div>
      <div class="news-body">
        <h4>${n.title}</h4>
        <div class="news-foot">
          <span class="cat">${n.author}</span>
          <span class="dot"></span>
          <span>${n.date}</span>
        </div>
      </div>`;
    newsGrid.appendChild(a);
  });

  /* Avatar pada markup statis (episode utama) */
  $$('[data-av]').forEach(el => { el.innerHTML = avatarSVG(+el.dataset.av); });

  /* --- Galeri: deretan album per event (Figma node 87:21) ---
     Deretan kartu digeser dengan panah kiri/kanan (sesuai desain) maupun
     drag manual pakai mouse/jari. Klik kartu → pop-up foto besar. */
  const albTrack = $('#albTrack');
  const albViewport = $('#albViewport');

  GALLERY_ALBUMS.forEach((album, i) => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'album';
    card.dataset.album = i;
    card.setAttribute('aria-label', `Buka album ${album.title}`);
    card.innerHTML = `
      <span class="alb-thumb">
        <img src="${album.cover}" alt="" loading="lazy" draggable="false">
        <span class="alb-overlay"><span class="alb-cta"><i class="ph-fill ph-images"></i> Lihat Semua</span></span>
      </span>
      <span class="alb-meta">
        <span class="alb-title"></span>
        <span class="alb-date"></span>
      </span>`;
    /* textContent — judul & tanggal berasal dari data, jangan diperlakukan
       sebagai HTML supaya karakter seperti & tidak merusak markup */
    card.querySelector('.alb-title').textContent = album.title;
    card.querySelector('.alb-date').textContent = album.date;
    albTrack.appendChild(card);
  });

  /* Panah menggeser SATU HALAMAN penuh (3 album sekaligus), bukan satu kartu.
     Lebar 3 kartu + 2 jarak = persis lebar area terlihat, jadi jarak geser
     satu halaman = lebar area + 1 jarak (jarak pemisah antar-halaman). */
  function albScrollAmount() {
    const gap = parseFloat(getComputedStyle(albTrack).gap) || 28;
    return albViewport.clientWidth + gap;
  }
  function albSyncArrows() {
    const max = albViewport.scrollWidth - albViewport.clientWidth;
    /* toleransi 2px — scrollLeft bisa pecahan di layar ber-DPI tinggi */
    $('#albPrev').disabled = albViewport.scrollLeft <= 2;
    $('#albNext').disabled = albViewport.scrollLeft >= max - 2;
  }
  $('#albPrev').addEventListener('click', () => {
    albViewport.scrollBy({ left: -albScrollAmount(), behavior: 'smooth' });
  });
  $('#albNext').addEventListener('click', () => {
    albViewport.scrollBy({ left: albScrollAmount(), behavior: 'smooth' });
  });
  albViewport.addEventListener('scroll', albSyncArrows, { passive: true });
  window.addEventListener('resize', albSyncArrows);
  albSyncArrows();

  /* Geser manual dengan mouse. Di layar sentuh tidak perlu dicegat sama
     sekali — overflow-x native sudah menangani swipe jari dengan baik —
     jadi handler ini khusus pointer mouse. Arah gesture ditentukan setelah
     bergerak >8px supaya scroll vertikal halaman tidak ikut tercuri. */
  (function albDrag() {
    let active = false, isHorizontal = null, x0 = 0, y0 = 0, scroll0 = 0, moved = 0;
    const DIR_THRESHOLD = 8;

    albViewport.addEventListener('pointerdown', e => {
      if (e.pointerType !== 'mouse') return;
      active = true; isHorizontal = null; moved = 0;
      x0 = e.clientX; y0 = e.clientY; scroll0 = albViewport.scrollLeft;
    });
    albViewport.addEventListener('pointermove', e => {
      if (!active) return;
      const dx = e.clientX - x0, dy = e.clientY - y0;
      if (isHorizontal === null) {
        if (Math.abs(dx) < DIR_THRESHOLD && Math.abs(dy) < DIR_THRESHOLD) return;
        isHorizontal = Math.abs(dx) > Math.abs(dy);
        if (isHorizontal) {
          try { albViewport.setPointerCapture(e.pointerId); } catch (err) {}
          albViewport.classList.add('is-dragging');
        }
      }
      if (!isHorizontal) return;
      e.preventDefault();
      moved = Math.abs(dx);
      albViewport.scrollLeft = scroll0 - dx;
    });
    function endDrag() {
      if (!active) return;
      active = false;
      albViewport.classList.remove('is-dragging');
      isHorizontal = null;
      albSyncArrows();
    }
    albViewport.addEventListener('pointerup', endDrag);
    albViewport.addEventListener('pointercancel', endDrag);
    /* Setelah drag sungguhan, klik yang menyusul dibatalkan supaya menggeser
       deretan tidak ikut membuka pop-up album yang kebetulan ada di bawah
       kursor saat tombol mouse dilepas. */
    albViewport.addEventListener('click', e => {
      if (moved > DIR_THRESHOLD) { e.preventDefault(); e.stopPropagation(); moved = 0; }
    }, true);
  })();

  /* --- Pop-up album: foto besar + deskripsi + pilihan foto lain --- */
  const modalAlbum = $('#modalAlbum');
  let albumIndex = 0, albumPhoto = 0, lastFocusAlbum = null;

  /* Geser baris pilihan foto seperlunya supaya foto yang sedang aktif selalu
     kelihatan. Penting saat album berisi banyak foto (mis. 50) — tanpa ini
     penanda aktif bisa jauh di luar layar dan pengguna kehilangan jejak.
     Hanya scrollLeft baris ini yang disentuh, jadi posisi scroll pop-up &
     halaman tidak ikut berubah. */
  function scrollThumbIntoView(el) {
    const strip = $('#albumThumbs');
    if (!strip || !el) return;
    const pad = 8;
    const sr = strip.getBoundingClientRect(), er = el.getBoundingClientRect();
    let delta = 0;
    if (er.left  < sr.left  + pad) delta = er.left  - sr.left  - pad;
    else if (er.right > sr.right - pad) delta = er.right - sr.right + pad;
    if (delta) strip.scrollTo({ left: strip.scrollLeft + delta, behavior: 'smooth' });
  }

  function renderAlbumPhoto() {
    const album = GALLERY_ALBUMS[albumIndex];
    if (!album) return;
    const photo = album.photos[albumPhoto];
    const img = $('#albumModalImg');
    img.src = photo.src;
    img.alt = `${album.title} — foto ${albumPhoto + 1}`;
    $('#albumModalCaption').textContent = photo.caption || '';
    $('#albumModalCount').textContent = `Foto ${albumPhoto + 1} dari ${album.photos.length}`;
    let activeEl = null;
    $$('.album-thumb', $('#albumThumbs')).forEach((t, n) => {
      const on = n === albumPhoto;
      t.classList.toggle('is-active', on);
      t.setAttribute('aria-current', on ? 'true' : 'false');
      if (on) activeEl = t;
    });
    scrollThumbIntoView(activeEl);
    /* panah disembunyikan kalau albumnya cuma berisi satu foto */
    const many = album.photos.length > 1;
    $$('[data-album-slide]').forEach(b => { b.hidden = !many; });
  }
  function goAlbumPhoto(dir) {
    const album = GALLERY_ALBUMS[albumIndex];
    if (!album || album.photos.length < 2) return;
    albumPhoto = (albumPhoto + dir + album.photos.length) % album.photos.length;
    renderAlbumPhoto();
  }
  function openAlbumModal(i) {
    const album = GALLERY_ALBUMS[i];
    if (!album) return;
    albumIndex = i;
    albumPhoto = 0;
    $('#albumTitle').textContent = album.title;
    $('#albumModalDate').textContent = album.date;

    const thumbs = $('#albumThumbs');
    thumbs.innerHTML = '';
    album.photos.forEach((p, n) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'album-thumb';
      b.setAttribute('aria-label', `Lihat foto ${n + 1}`);
      /* thumbnail tampil 60px — pakai berkas cover yang jauh lebih kecil,
         bukan foto besar, supaya membuka pop-up tidak memuat 10 foto penuh */
      b.innerHTML = `<img src="${p.src.replace(/\.jpg$/, "-cover.jpg")}" alt="" loading="lazy" draggable="false">`;
      b.addEventListener('click', () => { albumPhoto = n; renderAlbumPhoto(); });
      thumbs.appendChild(b);
    });

    renderAlbumPhoto();
    lastFocusAlbum = document.activeElement;
    modalAlbum.classList.add('is-open');
    modalAlbum.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeAlbumModal() {
    modalAlbum.classList.remove('is-open');
    modalAlbum.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocusAlbum) lastFocusAlbum.focus();
  }

  albTrack.addEventListener('click', e => {
    const card = e.target.closest('.album');
    if (card) openAlbumModal(+card.dataset.album);
  });
  $$('[data-album-slide]').forEach(b => {
    b.addEventListener('click', () => goAlbumPhoto(+b.dataset.albumSlide));
  });


  /* --- Pilihan narasumber pada form tanya --- */
  const narsumSelect = $('[data-narsum-select]');
  [...new Set(KAJIAN.flatMap(k => k.people))].forEach(name => {
    const opt = document.createElement('option');
    opt.textContent = name;
    narsumSelect.appendChild(opt);
  });

  /* ======================================================================
     4. MOTION
     ====================================================================== */

  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target;
      const extra = +(el.dataset.revealDelay || 0);
      if (extra && !el.style.transitionDelay) el.style.transitionDelay = extra + 'ms';
      el.classList.add('is-in');
      io.unobserve(el);
      const held = parseFloat(el.style.transitionDelay) * (el.style.transitionDelay.includes('ms') ? 1 : 1000) || 0;
      setTimeout(() => { el.style.transitionDelay = ''; }, held + 1100);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  const revealables = $$('.reveal, .hero-asset');
  revealables.forEach(el => io.observe(el));

  /* Failsafe: bila IntersectionObserver tidak sempat berjalan, tetap tampilkan. */
  setTimeout(() => {
    revealables.forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('is-in');
    });
  }, 3000);

  /* Parallax + progress + navbar */
  let ticking = false;
  const parallaxEls = $$('[data-parallax]');
  function onScroll() {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    $('#scrollBar').style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
    $('#navbar').classList.toggle('is-stuck', y > 24);
    $('#toTop').classList.toggle('is-show', y > 600);
    if (!REDUCED) {
      parallaxEls.forEach(el => {
        el.style.transform = `translate3d(0,${y * parseFloat(el.dataset.parallax)}px,0)`;
      });
    }
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  /* Scroll "slow motion" tipis ala Framer — khusus perangkat dengan mouse
     wheel/trackpad (desktop; layar sentuh dibiarkan native karena sudah
     punya momentum sendiri yang lebih baik). Bukan scroll virtual/library
     terpisah: posisi scroll ASLI tetap yang digeser tiap frame (cuma
     sedikit demi sedikit, bukan langsung), jadi semua yang bergantung pada
     posisi scroll asli di atas (progress bar, parallax, reveal, scrollspy)
     tetap jalan seperti biasa. Elemen yang punya scroll internalnya sendiri
     (modal, popup jadwal sholat, dsb.) sengaja dilewati supaya tetap bisa
     di-scroll dengan wheel secara normal. */
  (function smoothWheelScroll() {
    if (REDUCED || !window.matchMedia('(pointer:fine)').matches) return;

    const EASE = 0.35;   // mendekati 1 = nyaris native; makin kecil makin "melambat"
    let targetY = window.scrollY, raf = null;

    function maxScroll() { return Math.max(0, document.documentElement.scrollHeight - window.innerHeight); }

    function hasInnerScroll(el, deltaY) {
      while (el && el !== document.documentElement) {
        const cs = getComputedStyle(el);
        if (/(auto|scroll)/.test(cs.overflowY) && el.scrollHeight > el.clientHeight) {
          const atTop = el.scrollTop <= 0, atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
          if ((deltaY < 0 && !atTop) || (deltaY > 0 && !atBottom)) return true;
        }
        el = el.parentElement;
      }
      return false;
    }

    function tick() {
      const cur = window.scrollY, diff = targetY - cur;
      if (Math.abs(diff) < .5) { window.scrollTo({ top: targetY, behavior: 'instant' }); raf = null; return; }
      window.scrollTo({ top: cur + diff * EASE, behavior: 'instant' });
      raf = requestAnimationFrame(tick);
    }

    window.addEventListener('wheel', e => {
      if (e.ctrlKey || hasInnerScroll(e.target, e.deltaY)) return;   // zoom / scroll internal — biarkan native
      e.preventDefault();
      targetY = Math.min(maxScroll(), Math.max(0, targetY + e.deltaY));
      if (!raf) raf = requestAnimationFrame(tick);
    }, { passive: false });

    /* Scroll dari sumber lain (klik menu, tombol kembali ke atas, dsb.)
       jadi acuan target baru — supaya wheel berikutnya tidak "menarik
       mundur" ke target lama yang sudah basi. */
    let syncTimer = null;
    window.addEventListener('scroll', () => {
      if (raf) return;   // lagi kita animasikan sendiri — abaikan gemanya
      clearTimeout(syncTimer);
      syncTimer = setTimeout(() => { targetY = window.scrollY; }, 50);
    }, { passive: true });
  })();

  /* Tombol magnetic */
  if (!REDUCED && window.matchMedia('(hover:hover)').matches) {
    $$('.magnetic').forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const r = btn.getBoundingClientRect();
        const mx = (e.clientX - r.left - r.width / 2) / r.width;
        const my = (e.clientY - r.top - r.height / 2) / r.height;
        btn.style.transform = `translate(${mx * 9}px, ${my * 7 - 3}px)`;
      });
      btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });
  }

  /* ======================================================================
     5. NAVBAR — pill + scrollspy
     ====================================================================== */
  const navLinks = $$('.nav-link');
  const navPill = $('#navPill');
  function movePill(link) {
    if (!link) return;
    navPill.style.width = link.offsetWidth + 'px';
    navPill.style.transform = `translateX(${link.offsetLeft}px)`;
  }
  const SECTION_IDS = ['beranda', 'jadwal-kajian', 'pusat-media', 'galeri', 'mari-berinteraksi'];
  function currentSection() {
    const probe = window.innerHeight * 0.35;
    let cur = SECTION_IDS[0];
    SECTION_IDS.forEach(id => {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= probe) cur = id;
    });
    return cur;
  }
  function setActive(id) {
    const link = navLinks.find(l => l.dataset.target === id) || navLinks[0];
    navLinks.forEach(l => l.classList.toggle('is-active', l === link));
    movePill(link);
  }
  requestAnimationFrame(() => setActive('beranda'));
  window.addEventListener('load', () => setActive(currentSection()));
  window.addEventListener('resize', () => movePill($('.nav-link.is-active')));

  /* Drawer menu mobile (tombol hamburger, Figma node 67:1003) */
  const navMenu = $('#navMenu'), navToggle = $('#navToggle');
  function closeNavMenu() {
    navMenu.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.querySelector('i').className = 'ph-bold ph-list';
  }
  navToggle.addEventListener('click', e => {
    e.stopPropagation();
    const open = navMenu.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.querySelector('i').className = open ? 'ph-bold ph-x' : 'ph-bold ph-list';
  });
  document.addEventListener('click', e => {
    if (navMenu.classList.contains('is-open') &&
        !navMenu.contains(e.target) && !navToggle.contains(e.target)) closeNavMenu();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeNavMenu(); });

  navLinks.forEach(l => l.addEventListener('click', () => { setActive(l.dataset.target); closeNavMenu(); }));

  let spyTick = false;
  window.addEventListener('scroll', () => {
    if (spyTick) return;
    spyTick = true;
    requestAnimationFrame(() => { setActive(currentSection()); spyTick = false; });
  }, { passive: true });

  /* ======================================================================
     6. TABS
     ====================================================================== */
  const tabs = $$('.tab', $('#interaksiTabBar')), glider = $('#tabGlider');
  function moveGlider(tab) {
    glider.style.width = tab.offsetWidth + 'px';
    /* offsetLeft sudah relatif terhadap padding-box .tab-bar, jadi dipakai
       apa adanya — mengurangi nilai padding membuat pill menempel ke tepi. */
    glider.style.transform = `translateX(${tab.offsetLeft}px)`;
  }
  /* Dipakai khusus utk penempatan awal (load/resize) — .tab-glider punya
     CSS transition pada width, dan nilai awalnya width:0. Kalau posisi
     awal ini lewat moveGlider() biasa, transisi itu ikut kepicu dari 0 →
     lebar asli selama .6 detik: selama itu teks tab aktif (plum gelap)
     yang belum tertutup pill nyaris tak kelihatan di atas latar gelap,
     kelihatan seperti "kepotong". Set instan dulu, baru transisi
     dikembalikan supaya ganti tab lewat klik tetap animasi mulus. */
  function moveGliderInstant(tab) {
    if (!tab) return;
    glider.style.transition = 'none';
    moveGlider(tab);
    void glider.offsetWidth;   // paksa reflow sebelum transisi dikembalikan
    glider.style.transition = '';
  }
  function activateTab(tab) {
    tabs.forEach(t => { t.classList.toggle('is-active', t === tab); t.setAttribute('aria-selected', t === tab); });
    $$('.tab-panel').forEach(p => p.classList.toggle('is-active', p.dataset.panel === tab.dataset.tab));
    moveGlider(tab);
  }
  /* Query WAJIB di-scope ke #interaksiTabBar — '.tab.is-active' global akan
     kena tab batch Galeri lebih dulu (section Galeri ada di atas section
     ini), sehingga pill emas mengambil lebar tab Galeri yang lebih sempit
     dan teks tab di sini jadi kelihatan terpotong. */
  const interaksiBar = $('#interaksiTabBar');
  tabs.forEach(t => t.addEventListener('click', () => activateTab(t)));
  const placeInteraksiGlider = () => moveGliderInstant($('.tab.is-active', interaksiBar));
  requestAnimationFrame(placeInteraksiGlider);
  window.addEventListener('load', placeInteraksiGlider);
  window.addEventListener('resize', placeInteraksiGlider);
  /* WAJIB: lebar tab bergantung lebar teksnya, dan teks masih memakai font
     cadangan sampai web-font selesai dimuat. Web-font kadang baru siap
     SETELAH event 'load', jadi tanpa ini pill emas terkunci pada ukuran
     font cadangan yang lebih sempit dan teks tab kelihatan terpotong. */
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(placeInteraksiGlider);

  /* ======================================================================
     7. FORM
     ====================================================================== */
  $$('[data-counter-for]').forEach(sp => {
    const ta = document.getElementById(sp.dataset.counterFor);
    if (ta) ta.addEventListener('input', () => { sp.textContent = ta.value.length; });
  });

  const RULES = {
    nama:       { test: v => v.trim().length >= 3, msg: 'Mohon isi nama lengkap (minimal 3 huruf).' },
    hp:         { test: v => /^(\+62|62|0)8[1-9][0-9]{6,11}$/.test(v.replace(/[\s-]/g, '')), msg: 'Nomor handphone tidak valid. Contoh: 081234567890' },
    alamat:     { test: v => v.trim().length >= 6, msg: 'Mohon isi alamat lebih lengkap.' },
    tema:       { test: v => v.trim().length >= 4, msg: 'Tuliskan usulan tema kajian Anda.' },
    pertanyaan: { test: v => v.trim().length >= 10, msg: 'Tuliskan pertanyaan Anda minimal 10 karakter.' }
  };

  function validateField(input) {
    const rule = RULES[input.name];
    const field = input.closest('.field');
    if (!rule || !field) return true;
    const ok = rule.test(input.value);
    field.classList.toggle('has-error', !ok);
    const err = field.querySelector('.err');
    if (err) err.textContent = ok ? '' : rule.msg;
    return ok;
  }

  $$('.form').forEach(form => {
    form.querySelectorAll('input, textarea').forEach(inp => {
      inp.addEventListener('blur', () => { if (inp.value) validateField(inp); });
      inp.addEventListener('input', () => {
        const f = inp.closest('.field');
        if (f && f.classList.contains('has-error')) validateField(inp);
      });
    });

    form.addEventListener('submit', e => {
      e.preventDefault();
      let valid = true, firstBad = null;

      form.querySelectorAll('input[required], textarea[required]').forEach(inp => {
        if (inp.type === 'checkbox') return;
        validateField(inp);
        if (!RULES[inp.name]) {
          inp.closest('.field').classList.toggle('has-error', !inp.value.trim());
        }
        if (inp.closest('.field').classList.contains('has-error')) {
          valid = false;
          if (!firstBad) firstBad = inp;
        }
      });

      const agree = form.querySelector('.check input');
      if (agree && !agree.checked) {
        valid = false;
        agree.closest('.check').animate(
          [{ transform: 'translateX(0)' }, { transform: 'translateX(-6px)' },
           { transform: 'translateX(6px)' }, { transform: 'translateX(0)' }],
          { duration: 350 });
        if (!firstBad) toast('Mohon setujui pernyataan terlebih dahulu.', 'warning');
      }

      if (!valid) { if (firstBad) firstBad.focus(); return; }

      const btn = form.querySelector('button[type="submit"]');
      const original = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = '<i class="ph-bold ph-circle-notch spin"></i> <span>Mengirim…</span>';

      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = original;
        form.reset();
        $$('[data-counter-for]', form).forEach(sp => sp.textContent = '0');
        $$('.field', form).forEach(f => f.classList.remove('has-error'));

        /* Pemberitahuan berhasil memakai modal ber-ikon centang (bukan toast).
           Khusus Daftar Kajian, modal formulirnya ditutup lebih dulu supaya
           tidak bertumpuk dengan modal pemberitahuan. */
        const kind = form.dataset.form;
        if (kind !== 'teman' && kind !== 'curahan') closeModal();
        openSuksesModal(kind);
      }, 1100);
    });
  });

  /* ======================================================================
     8. MODAL
     ====================================================================== */
  const modal = $('#modalDaftar');
  let lastFocus = null;

  const MONTH_FULL = {
    JAN: 'Januari', FEB: 'Februari', MAR: 'Maret', APR: 'April', MEI: 'Mei', JUN: 'Juni',
    JUL: 'Juli', AGU: 'Agustus', SEP: 'September', OKT: 'Oktober', NOV: 'November', DES: 'Desember'
  };

  function openModal() {
    const active = $('.kj-card.is-active');
    const i = active ? +active.dataset.index : 0;
    const k = KAJIAN[i];
    const [monthAbbr, year] = k.mm.split(' ');
    const monthFull = MONTH_FULL[monthAbbr] || monthAbbr;

    $('#modalTitle').textContent = k.title;
    /* Urutan & gaya disamakan dengan kartu di Jadwal Kajian:
       narasumber → lokasi masjid → tanggal (hari, bulan penuh, jam). */
    $('#modalSub').innerHTML =
      `<span class="kj-people">
         ${k.people.map((p, n) => `<span class="who"><i class="av">${personAvatar(p, i * 2 + n)}</i>${p}</span>`).join('')}
       </span>
       <span class="kj-line"><i class="ph-fill ph-map-pin"></i>${k.venue}</span>
       <span class="kj-line"><i class="ph-fill ph-calendar-dots"></i>${k.dow}, ${k.dd} ${monthFull} ${year} • ${k.time}</span>`;
    lastFocus = document.activeElement;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(() => $('#d-nama').focus(), 380);
  }
  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }

  /* --- Modal Konten Harian (gaya pop-up Instagram) --- */
  const modalDaily = $('#modalDaily');
  let lastFocusDaily = null;
  let dailyIndex = -1;   // item DAILY yang sedang dibuka
  let dailySlide = 0;    // slide carousel yang sedang tampil

  /* Render ulang area media (dipanggil saat buka modal & saat ganti slide).
     Video asli diberi autoplay+loop+muted+playsinline agar bisa autoplay di
     semua browser, plus atribut controls native supaya user tetap bisa
     menyalakan suara / jeda / maju-mundur sendiri. */
  function renderDailyMedia(d) {
    const media = $('#dailyModalMedia');
    const oldVideo = media.querySelector('video');
    if (oldVideo) oldVideo.pause();

    /* TikTok tidak bisa di-self-host (video mentahnya diblokir API TikTok
       untuk item spesifik), jadi dipakai player resmi TikTok lewat iframe
       embed/v2 miliknya sendiri — mekanisme resmi yang disediakan TikTok. */
    if (d.tiktokId) {
      media.innerHTML =
        `<iframe src="https://www.tiktok.com/embed/v2/${d.tiktokId}?lang=id-ID"
                 allow="autoplay; encrypted-media; fullscreen" allowfullscreen
                 loading="lazy" title="${d.title || 'Postingan TikTok Kalam Hati'}"></iframe>`;
      return;
    }

    if (d.video) {
      media.innerHTML =
        `<video src="${d.video}" poster="${d.poster}"
                autoplay loop muted playsinline controls preload="auto"></video>`;
      return;
    }

    const imgs = d.images;
    const nav = imgs.length > 1 ? `
      <button class="daily-modal-arrow daily-modal-arrow--prev" data-slide="-1" aria-label="Foto sebelumnya"><i class="ph-bold ph-caret-left"></i></button>
      <button class="daily-modal-arrow daily-modal-arrow--next" data-slide="1" aria-label="Foto berikutnya"><i class="ph-bold ph-caret-right"></i></button>
      <div class="daily-modal-dots">
        ${imgs.map((_, n) => `<span class="daily-modal-dot${n === dailySlide ? ' is-active' : ''}"></span>`).join('')}
      </div>` : '';
    media.innerHTML = `<img src="${imgs[dailySlide]}" alt="">${nav}`;
  }

  function goDailySlide(dir) {
    const d = DAILY[dailyIndex];
    if (!d || !d.images || d.images.length < 2) return;
    dailySlide = (dailySlide + dir + d.images.length) % d.images.length;
    renderDailyMedia(d);
  }

  function openDailyModal(i) {
    const d = DAILY[i];
    if (!d) return;
    dailyIndex = i;
    dailySlide = 0;
    renderDailyMedia(d);
    $('#dailyModalPlat').innerHTML = `<i class="ph-fill ${PLAT_ICON[d.plat]}"></i> ${d.plat}`;
    $('#dailyModalDate').textContent = d.date || '';
    $('#dailyModalCaption').textContent = d.caption || '';
    const link = $('#dailyModalLink');
    link.href = d.permalink;
    link.querySelector('span').textContent = d.plat === 'Tiktok' ? 'Lihat di TikTok' : 'Lihat di Instagram';
    modalDaily.setAttribute('aria-label', d.title || 'Postingan Kalam Hati');
    lastFocusDaily = document.activeElement;
    modalDaily.classList.add('is-open');
    modalDaily.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeDailyModal() {
    modalDaily.classList.remove('is-open');
    modalDaily.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    const video = $('#dailyModalMedia video');
    if (video) video.pause();
    const iframe = $('#dailyModalMedia iframe');
    if (iframe) iframe.src = 'about:blank';
    if (lastFocusDaily) lastFocusDaily.focus();
  }

  /* --- Modal Pilih Platform (CTA Lihat Semua Konten Harian) --- */
  const modalPlatform = $('#modalPlatform');
  let lastFocusPlatform = null;
  function openPlatformModal() {
    lastFocusPlatform = document.activeElement;
    modalPlatform.classList.add('is-open');
    modalPlatform.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closePlatformModal() {
    modalPlatform.classList.remove('is-open');
    modalPlatform.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocusPlatform) lastFocusPlatform.focus();
  }

  /* --- Modal pemberitahuan berhasil (pengganti toast sukses) --- */
  const modalSukses = $('#modalSukses');
  let lastFocusSukses = null;
  /* Isi pesan per form — dipakai setelah pengiriman berhasil. */
  const SUKSES_PESAN = {
    daftar: {
      judul: 'Pendaftaran Berhasil',
      pesan: 'Terima kasih atas partisipasinya, detail kegiatan dan informasi selanjutnya akan di informasikan melalui WhatsApp Anda'
    },
    curahan: {
      judul: 'Berhasil Kirim',
      pesan: 'Curahan hati Anda sudah kami terima. Pertanyaan Anda akan dijawab pada kajian selanjutnya.'
    },
    teman: {
      judul: 'Berhasil Kirim',
      pesan: 'Jazakallahu khairan! Terima kasih atas usulan Anda, akan kami pertimbangkan.'
    }
  };
  function openSuksesModal(kind) {
    const isi = SUKSES_PESAN[kind] || SUKSES_PESAN.curahan;
    $('#suksesTitle').textContent = isi.judul;
    $('#suksesMsg').textContent = isi.pesan;
    lastFocusSukses = document.activeElement;
    modalSukses.classList.add('is-open');
    modalSukses.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    /* fokus pindah ke tombol "Oke" supaya Enter/Esc langsung menutupnya */
    const ok = modalSukses.querySelector('.btn-fig-primary');
    if (ok) requestAnimationFrame(() => ok.focus());
  }
  function closeSuksesModal() {
    modalSukses.classList.remove('is-open');
    modalSukses.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocusSukses) lastFocusSukses.focus();
  }

  document.addEventListener('click', e => {
    /* Dari bottom sheet peta, "Daftar" menutup sheet lalu membuka sheet form */
    if (e.target.closest('[data-open-daftar]')) {
      e.preventDefault();
      closeKajianSheet();
      openModal();
    }
    if (e.target.closest('[data-open-platform]')) { e.preventDefault(); openPlatformModal(); }

    const dailyCard = e.target.closest('.daily');
    if (dailyCard) openDailyModal(+dailyCard.dataset.index);

    const slideBtn = e.target.closest('.daily-modal-arrow');
    if (slideBtn) goDailySlide(+slideBtn.dataset.slide);

    const closeBtn = e.target.closest('[data-close-modal]');
    if (closeBtn) {
      const host = closeBtn.closest('.modal');
      if (host === modalDaily) closeDailyModal();
      else if (host === modalPlatform) closePlatformModal();
      else if (host === modalAlbum) closeAlbumModal();
      else if (host === modalSukses) closeSuksesModal();
      else closeModal();
    }
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (modal.classList.contains('is-open')) closeModal();
      if (modalDaily.classList.contains('is-open')) closeDailyModal();
      if (modalPlatform.classList.contains('is-open')) closePlatformModal();
      if (modalAlbum.classList.contains('is-open')) closeAlbumModal();
      if (modalSukses.classList.contains('is-open')) closeSuksesModal();
    }
    /* panah kiri/kanan: pindah foto pada modal yang sedang terbuka */
    if (modalAlbum.classList.contains('is-open')) {
      if (e.key === 'ArrowLeft') goAlbumPhoto(-1);
      if (e.key === 'ArrowRight') goAlbumPhoto(1);
      return;
    }
    if (!modalDaily.classList.contains('is-open')) return;
    if (e.key === 'ArrowLeft') goDailySlide(-1);
    if (e.key === 'ArrowRight') goDailySlide(1);
  });

  /* ======================================================================
     9. TOAST & LAIN-LAIN
     ====================================================================== */
  let toastTimer;
  function toast(msg, kind) {
    const t = $('#toast');
    $('#toastMsg').textContent = msg;
    t.querySelector('i').className = kind === 'warning' ? 'ph-fill ph-warning-circle' : 'ph-fill ph-check-circle';
    t.classList.add('is-show');
    clearTimeout(toastTimer);
    /* Lama tampil menyesuaikan panjang pesan (±70ms/karakter, dengan batas
       bawah 4.2 dtk dan atas 9 dtk) — pesan sukses pendaftaran/curahan
       cukup panjang, jangan sampai hilang sebelum sempat terbaca. */
    const duration = Math.min(9000, Math.max(4200, msg.length * 70));
    toastTimer = setTimeout(() => t.classList.remove('is-show'), duration);
  }

  $('#toTop').addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: REDUCED ? 'auto' : 'smooth' }));

  $('#year').textContent = new Date().getFullYear();

  $('#epMain').addEventListener('click', () => window.open(ytUrl(EP_MAIN.id), '_blank', 'noopener'));

  /* ======================================================================
     10. WAKTU SHOLAT — zona WIB (Jakarta) saja
     ====================================================================== */
  /* Sholat fardu — dipakai untuk menentukan "berikutnya". Syuruq tetap
     disimpan pada prayerTimes karena ikut diambil dari API, tapi tidak
     pernah jadi "berikutnya" sebab bukan sholat fardu. */
  const FARDHU = ['Subuh', 'Zuhur', 'Ashar', 'Maghrib', 'Isya'];

  /* Cadangan bila API tidak dapat dihubungi (mis. dibuka offline) */
  let prayerTimes = { Subuh: '04:38', Syuruq: '05:56', Zuhur: '11:55', Ashar: '15:14', Maghrib: '17:54', Isya: '19:04' };

  const pad2 = n => String(n).padStart(2, '0');
  const toSec = key => { const [h, m] = prayerTimes[key].split(':').map(Number); return h * 3600 + m * 60; };

  /* Waktu "sekarang" dalam WIB (UTC+7), apa pun zona waktu perangkat */
  function nowWIB() {
    const n = new Date();
    return new Date(n.getTime() + n.getTimezoneOffset() * 60000 + 7 * 3600000);
  }

  /* Urutan tampil jadwal lengkap pada popover (Syuruq ikut ditampilkan
     sebagai penanda masuknya waktu Dhuha, walau bukan sholat fardu). */
  const PERIODS = ['Subuh', 'Syuruq', 'Zuhur', 'Ashar', 'Maghrib', 'Isya'];

  function renderPrayer() {
    const w = nowWIB();
    const nowSec = w.getHours() * 3600 + w.getMinutes() * 60 + w.getSeconds();

    /* Fardu berikutnya (Syuruq/Dhuha dilewati karena bukan sholat fardu) */
    let next = FARDHU.find(p => toSec(p) > nowSec);
    let diff;
    if (next) {
      diff = toSec(next) - nowSec;
    } else {                                  // sudah lewat Isya → Subuh besok
      next = 'Subuh';
      diff = toSec('Subuh') + 24 * 3600 - nowSec;
    }

    const h = Math.floor(diff / 3600), m = Math.floor((diff % 3600) / 60);

    $('#psNext').textContent      = next;
    $('#psNextTime').textContent  = prayerTimes[next] + ' WIB';
    $('#psCountdown').textContent = h > 0 ? `${h} jam ${m} menit lagi` : `${m} menit lagi`;

    /* Periode berjalan = periode terakhir yang waktunya sudah lewat hari
       ini (dipakai untuk menyorot baris aktif pada jadwal lengkap). */
    let current = 'Isya';
    for (let i = PERIODS.length - 1; i >= 0; i--) {
      if (nowSec >= toSec(PERIODS[i])) { current = PERIODS[i]; break; }
    }
    const list = $('#prayerPopList');
    if (list) {
      list.innerHTML = PERIODS.map(p => `
        <li class="prayer-pop-row${p === current ? ' is-now' : ''}">
          <span>${p}</span><span>${prayerTimes[p]}</span>
        </li>`).join('');
    }
  }

  renderPrayer();
  setInterval(renderPrayer, 30000);

  /* Buka/tutup container jadwal sholat lengkap saat prayer-strip diklik. */
  (function prayerPopover() {
    const strip = $('#prayerStrip'), pop = $('#prayerPop');
    if (!strip) return;
    const close = () => {
      strip.classList.remove('is-open');
      strip.setAttribute('aria-expanded', 'false');
      if (pop) pop.setAttribute('aria-hidden', 'true');
    };
    const toggle = () => {
      const open = strip.classList.toggle('is-open');
      strip.setAttribute('aria-expanded', String(open));
      if (pop) pop.setAttribute('aria-hidden', String(!open));
    };
    strip.addEventListener('click', e => { if (!e.target.closest('.prayer-pop')) toggle(); });
    strip.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
      if (e.key === 'Escape') close();
    });
    document.addEventListener('click', e => { if (!strip.contains(e.target)) close(); });
  })();

  /* Strip tanggal Hijriah — pakai kalender Islamic bawaan Intl (ICU), akurat
     tanpa perlu tabel konversi manual. Nama bulan dari ICU Indonesia sedikit
     digabung tanpa spasi (mis. "Rabiulawal"), jadi dirapikan di sini supaya
     sesuai penulisan umum ("Rabiul Awal"). */
  const HIJRI_MONTH_FIX = {
    Rabiulawal: 'Rabiul Awal', Rabiulakhir: 'Rabiul Akhir',
    Jumadilawal: 'Jumadil Awal', Jumadilakhir: 'Jumadil Akhir'
  };
  const hijriFmt = new Intl.DateTimeFormat('id-ID-u-ca-islamic', {
    timeZone: 'Asia/Jakarta', weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  });
  function renderHijriDate() {
    const parts = hijriFmt.formatToParts(new Date());
    const get = t => (parts.find(p => p.type === t) || {}).value || '';
    const month = HIJRI_MONTH_FIX[get('month')] || get('month');
    $('#hijriDate').textContent = `${get('weekday')}, ${get('day')} ${month} ${get('year')} H`;
  }
  renderHijriDate();
  setInterval(renderHijriDate, 60000);

  /* Jam berjalan pada strip Hijriah — selalu zona WIB (Jakarta), apa pun
     zona waktu perangkat pengunjung. */
  const clockFmt = new Intl.DateTimeFormat('id-ID', {
    timeZone: 'Asia/Jakarta', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
  });
  function renderHijriClock() { $('#hijriClock').textContent = clockFmt.format(new Date()); }
  renderHijriClock();
  setInterval(renderHijriClock, 1000);

  /* Jadwal aktual Jakarta (Aladhan, method 20 = Kemenag RI). Gagal? pakai cadangan. */
  (function fetchPrayerTimes() {
    const d = new Date();
    const url = `https://api.aladhan.com/v1/timingsByCity/${pad2(d.getDate())}-${pad2(d.getMonth() + 1)}-${d.getFullYear()}`
              + `?city=Jakarta&country=Indonesia&method=20`;
    fetch(url)
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(j => {
        const t = j && j.data && j.data.timings;
        if (!t) throw new Error('timings kosong');
        const cut = v => String(v).trim().slice(0, 5);
        prayerTimes = {
          Subuh: cut(t.Fajr), Syuruq: cut(t.Sunrise), Zuhur: cut(t.Dhuhr),
          Ashar: cut(t.Asr), Maghrib: cut(t.Maghrib), Isya: cut(t.Isha)
        };
        renderPrayer();
      })
      .catch(() => { /* diam saja — nilai cadangan sudah tampil */ });
  })();

  const style = document.createElement('style');
  style.textContent = '@keyframes spin{to{transform:rotate(360deg)}}.spin{display:inline-block;animation:spin .8s linear infinite}';
  document.head.appendChild(style);

})();
