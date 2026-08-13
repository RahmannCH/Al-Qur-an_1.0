export interface LearnSection {
  title: string;
  points: string[];
}

export interface LearnModule {
  slug: string;
  level: number;
  name: string;
  type: string;
  emoji: string;
  desc: string;
  sections: LearnSection[];
  practice: string;
}

export const LEARN_MODULES: LearnModule[] = [
  {
    slug: "rukun-iman-islam",
    level: 1,
    name: "Rukun Iman & Islam",
    type: "article",
    emoji: "🕌",
    desc: "Dua pondasi utama seorang Muslim: apa yang kita percaya (iman) dan apa yang kita amalkan (islam).",
    sections: [
      {
        title: "Rukun Iman (6)",
        points: [
          "Iman kepada Allah — percaya Allah Maha Esa, Pencipta segalanya.",
          "Iman kepada Malaikat — makhluk Allah yang taat, seperti Jibril.",
          "Iman kepada Kitab — Al-Qur'an dan kitab-kitab sebelumnya.",
          "Iman kepada Rasul — 25 nabi dan rasul yang diutus Allah.",
          "Iman kepada Hari Akhir — hari pembalasan semua amal.",
          "Iman kepada Qada & Qadar — takdir baik dan buruk dari Allah.",
        ],
      },
      {
        title: "Rukun Islam (5)",
        points: [
          "Syahadat — bersaksi tiada Tuhan selain Allah dan Muhammad utusan-Nya.",
          "Sholat — mendirikan salat lima waktu.",
          "Zakat — menyisihkan sebagian harta untuk yang membutuhkan.",
          "Puasa — menahan lapar, haus, dan hawa nafsu di bulan Ramadhan.",
          "Haji — menunaikan ibadah haji bagi yang mampu.",
        ],
      },
    ],
    practice: "Hafalkan dan ucapkan syahadat setiap hari dengan penuh kesadaran maknanya.",
  },
  {
    slug: "tata-cara-bersuci",
    level: 1,
    name: "Tata Cara Bersuci (Wudhu & Mandi)",
    type: "video",
    emoji: "💧",
    desc: "Kebersihan adalah sebagian dari iman. Belajar bersuci dengan benar adalah kunci sahnya ibadah.",
    sections: [
      {
        title: "Wudhu",
        points: [
          "Niat wudhu di dalam hati.",
          "Membasuh telapak tangan 3 kali.",
          "Berkumur dan membersihkan hidung 3 kali.",
          "Membasuh wajah 3 kali, lalu tangan sampai siku 3 kali.",
          "Mengusap sebagian kepala dan telinga.",
          "Membasuh kaki sampai mata kaki 3 kali, diakhiri dengan doa.",
        ],
      },
      {
        title: "Mandi Wajib (Junub)",
        points: [
          "Niat mandi wajib untuk menghilangkan hadas besar.",
          "Membasuh seluruh tubuh dari ujung kepala sampai ujung kaki.",
          "Pastikan air sampai ke kulit dan sela-sela rambut.",
        ],
      },
      {
        title: "Tayamum (Alternatif)",
        points: [
          "Bila tidak ada air atau berhalangan, gunakan debu bersih.",
          "Usapkan ke wajah dan kedua tangan, berniat tayamum.",
        ],
      },
    ],
    practice: "Praktikkan wudhu yang benar sebelum setiap sholat selama satu pekan.",
  },
  {
    slug: "panduan-sholat",
    level: 1,
    name: "Panduan Gerakan & Bacaan Sholat",
    type: "interactive",
    emoji: "🧎",
    desc: "Belajar gerakan dan bacaan sholat dari takbiratul ihram hingga salam, lengkap dengan maknanya.",
    sections: [
      {
        title: "Rukun Sholat",
        points: [
          "Berdiri tegak (bagi yang mampu), niat di hati, takbiratul ihram.",
          "Membaca Al-Fatihah pada setiap rakaat.",
          "Rukuk dengan tuma'ninah, lalu I'tidal.",
          "Sujud dua kali dengan tuma'ninah di setiap rakaat.",
          "Duduk di antara dua sujud, lalu tasyahud akhir dan salam.",
        ],
      },
      {
        title: "Kekhusyukan",
        points: [
          "Pahami arti bacaan agar hati ikut hadir.",
          "Jangan terburu-buru; gerakan dan bacaan harus tuma'ninah (tenang).",
          "Fokus pandangan ke tempat sujud, hilangkan gangguan.",
        ],
      },
    ],
    practice: "Perbaiki satu gerakan yang sering terburu-buru dalam sholatmu hari ini.",
  },
  {
    slug: "huruf-hijaiyah",
    level: 2,
    name: "Pengenalan Huruf Hijaiyah",
    type: "interactive",
    emoji: "🔤",
    desc: "28 huruf hijaiyah adalah pintu masuk untuk membaca Al-Qur'an dengan benar.",
    sections: [
      {
        title: "Huruf Dasar",
        points: [
          "Alif, Ba, Ta, Tsa, Jim, Ha (kecil), Kho — tujuh huruf pertama.",
          "Dal, Dzal, Ro, Za, Sin, Syin, Shod — lanjutkan dengan makhraj gigi.",
          "Dhod, Tho, Zho, 'Ain, Ghain, Fa, Qof — perhatikan tenggorokan.",
          "Kaf, Lam, Mim, Nun, Wau, Ha (besar), Ya — tujuh huruf terakhir.",
        ],
      },
      {
        title: "Tips Belajar",
        points: [
          "Belajar bersama guru atau audio murottal untuk meniru makhraj.",
          "Latih 5 huruf setiap hari, jangan terburu-buru.",
          "Sering mendengar bacaan Al-Qur'an agar telinga terbiasa.",
        ],
      },
    ],
    practice: "Latih 5 huruf hijaiyah hari ini beserta makhraj dan contoh pengucapannya.",
  },
  {
    slug: "tajwid-dasar",
    level: 2,
    name: "Hukum Tajwid Dasar (Nun Mati & Mim)",
    type: "quiz",
    emoji: "📐",
    desc: "Tajwid membuat bacaan Al-Qur'an menjadi indah dan benar sesuai aturannya.",
    sections: [
      {
        title: "Nun Sukun & Tanwin",
        points: [
          "Idgham — memasukkan nun ke huruf setelahnya, mis. yaa, ro, mim, lam.",
          "Ikhfa — menyamarkan nun, dibaca samar dengan dengung.",
          "Iqlab — mengubah nun menjadi mim saat bertemu ba.",
          "Izhar — jelas tanpa dengung saat bertemu huruf halqi.",
        ],
      },
      {
        title: "Mim Sukun",
        points: [
          "Ikhfa syafawi — dengung samar saat mim sukun bertemu ba.",
          "Idgham mimi — memasukkan mim ke mim dengan dengung.",
          "Izhar syafawi — jelas saat bertemu selain mim dan ba.",
        ],
      },
    ],
    practice: "Cari 3 contoh hukum tajwid di surat Al-Fatihah dan tandai jenisnya.",
  },
  {
    slug: "adab-doa-harian",
    level: 2,
    name: "Adab Sehari-hari & Doa Pilihan",
    type: "article",
    emoji: "🌿",
    desc: "Islam adalah agama adab. Doa-doa harian menyambungkan kita dengan Allah di setiap momen.",
    sections: [
      {
        title: "Adab Sehari-hari",
        points: [
          "Mengucapkan salam, bersyukur, dan menundukkan diri kepada orang tua.",
          "Makan dengan tangan kanan, membaca bismillah, tidak mencela makanan.",
          "Menjaga lisan: jujur, tidak menggunjing, dan berkata baik.",
        ],
      },
      {
        title: "Doa Pilihan",
        points: [
          "Bangun tidur: Alhamdulillahilladzi ahyana ba'da ma amatana...",
          "Keluar rumah: Bismillahi tawakkaltu 'alallah...",
          "Sebelum makan: Bismillah, dan setelah makan: Alhamdulillah.",
          "Masuk masjid dan rumah, serta doa untuk kedua orang tua.",
        ],
      },
    ],
    practice: "Baca doa keluar rumah setiap kali keluar hari ini, dengan maknanya.",
  },
  {
    slug: "sirah-nabi",
    level: 3,
    name: "Sejarah Nabi Muhammad (Sirah)",
    type: "article",
    emoji: "🌙",
    desc: "Mengenal perjalanan hidup Rasulullah ﷺ dari kelahiran hingga wafat sebagai teladan umat.",
    sections: [
      {
        title: "Periode Mekkah",
        points: [
          "Lahir tahun Gajah, yatim sejak kecil, dikenal sebagai Al-Amin.",
          "Menerima wahyu pertama di Gua Hira, berdakwah secara rahasia lalu terang-terangan.",
          "Menghadapi cobaan berat: boikot, hinaan, dan hijrah ke Thaif.",
        ],
      },
      {
        title: "Periode Madinah",
        points: [
          "Hijrah ke Madinah dan membangun masjid pertama serta masyarakat madani.",
          "Perjanjian Hudaibiyah dan penaklukan Mekkah tanpa pertumpahan darah.",
          "Wafat pada usia 63 tahun, meninggalkan Al-Qur'an dan sunnah sebagai warisan.",
        ],
      },
    ],
    practice: "Baca kisah lengkap Nabi Muhammad ﷺ di menu Kisah Para Nabi.",
  },
  {
    slug: "tafsir-ayat-populer",
    level: 3,
    name: "Tafsir Ayat-ayat Populer",
    type: "article",
    emoji: "📖",
    desc: "Memahami makna ayat-ayat yang sering dibaca agar iman semakin kokoh.",
    sections: [
      {
        title: "Ayat Pilihan",
        points: [
          "Al-Fatihah — inti doa dan pujian, dibaca di setiap rakaat sholat.",
          "Ayat Kursi (2:255) — ayat paling agung tentang kekuasaan Allah.",
          "Al-Ashr — sumpah waktu, manusia rugi kecuali yang beriman dan beramal saleh.",
          "Al-Ikhlas — sepertiga Al-Qur'an, menjelaskan keesaan Allah.",
        ],
      },
    ],
    practice: "Baca dan renungkan arti Ayat Kursi hari ini sebelum tidur.",
  },
  {
    slug: "fikih-muamalah",
    level: 3,
    name: "Fikih Muamalah (Jual Beli Islami)",
    type: "video",
    emoji: "⚖️",
    desc: "Aturan Islam dalam transaksi agar harta yang diperoleh halal dan berkah.",
    sections: [
      {
        title: "Prinsip Jual Beli",
        points: [
          "Kerelaan kedua belah pihak (an-taradhin).",
          "Bebas dari riba, gharar (ketidakjelasan), dan judi.",
          "Jujur dalam takaran, timbangan, dan menggambarkan barang.",
          "Akad yang jelas: barang, harga, dan cara pembayaran.",
        ],
      },
      {
        title: "Adab Bermuamalah",
        points: [
          "Tidak menjelekkan barang dagangan orang lain.",
          "Memudahkan transaksi dan menghindari penimbunan.",
          "Saling membantu antar penjual dan pembeli dengan saling ridha.",
        ],
      },
    ],
    practice: "Terapkan satu prinsip kejujuran dalam transaksi kecilmu hari ini.",
  },
];
