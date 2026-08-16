export interface LearnSection {
  title: string;
  points: string[];
}

export interface LearnQuiz {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LearnModule {
  slug: string;
  level: number;
  name: string;
  type: string;
  emoji: string;
  desc: string;
  youtubeId: string;
  sections: LearnSection[];
  practice: string;
  quiz: LearnQuiz[];
}

export const LEARN_MODULES: LearnModule[] = [
  {
    slug: "rukun-iman-islam",
    level: 1,
    name: "Rukun Iman & Islam",
    type: "article",
    emoji: "🕌",
    desc: "Dua pondasi utama seorang Muslim: apa yang kita percaya (iman) dan apa yang kita amalkan (islam).",
    youtubeId: "W7oR-Zg2R3s", // Yufid Kids - Rukun Iman dan Rukun Islam
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
    quiz: [
      {
        question: "Manakah yang merupakan Rukun Islam yang pertama?",
        options: ["Puasa", "Zakat", "Syahadat", "Sholat"],
        correctIndex: 2,
        explanation: "Syahadat (persaksian) adalah pintu gerbang dan rukun Islam yang pertama."
      },
      {
        question: "Berapa jumlah Rukun Iman?",
        options: ["4", "5", "6", "7"],
        correctIndex: 2,
        explanation: "Rukun iman terdiri dari 6 perkara."
      },
      {
        question: "Iman kepada Qada dan Qadar berarti kita percaya kepada...",
        options: ["Hari Kiamat", "Takdir baik dan buruk dari Allah", "Kitab-kitab suci", "Nabi dan Rasul"],
        correctIndex: 1,
        explanation: "Qada dan Qadar adalah ketentuan dan takdir dari Allah SWT."
      }
    ]
  },
  {
    slug: "tata-cara-bersuci",
    level: 1,
    name: "Tata Cara Bersuci (Wudhu & Mandi)",
    type: "video",
    emoji: "💧",
    desc: "Kebersihan adalah sebagian dari iman. Belajar bersuci dengan benar adalah kunci sahnya ibadah.",
    youtubeId: "7L_811e2pXQ", // Yufid Kids - Tata Cara Wudhu
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
    quiz: [
      {
        question: "Apa yang harus dibasuh setelah membasuh wajah saat wudhu?",
        options: ["Kaki", "Kepala", "Tangan sampai siku", "Telinga"],
        correctIndex: 2,
        explanation: "Urutan wudhu setelah wajah adalah membasuh kedua tangan sampai siku."
      },
      {
        question: "Berapa kali sunnah membasuh anggota tubuh dalam wudhu?",
        options: ["1 kali", "2 kali", "3 kali", "7 kali"],
        correctIndex: 2,
        explanation: "Sangat disunnahkan untuk membasuh anggota wudhu sebanyak 3 kali."
      },
      {
        question: "Tayamum menggunakan media apa sebagai pengganti air?",
        options: ["Daun kering", "Debu/tanah yang suci", "Batu karang", "Kain bersih"],
        correctIndex: 1,
        explanation: "Tayamum dilakukan menggunakan debu atau tanah permukaan bumi yang suci."
      }
    ]
  },
  {
    slug: "panduan-sholat",
    level: 1,
    name: "Panduan Gerakan & Bacaan Sholat",
    type: "interactive",
    emoji: "🧎",
    desc: "Belajar gerakan dan bacaan sholat dari takbiratul ihram hingga salam, lengkap dengan maknanya.",
    youtubeId: "bO14Xm1zHw8", // Panduan Sholat Lengkap
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
    quiz: [
      {
        question: "Apa rukun bacaan yang WAJIB dibaca di setiap rakaat sholat?",
        options: ["Surah Al-Ikhlas", "Doa Iftitah", "Surah Al-Fatihah", "Ayat Kursi"],
        correctIndex: 2,
        explanation: "Membaca Al-Fatihah adalah rukun sholat. Tanpanya, rakaat tersebut tidak sah."
      },
      {
        question: "Berapa kali kita melakukan sujud dalam satu rakaat?",
        options: ["1 kali", "2 kali", "3 kali", "Tergantung niat"],
        correctIndex: 1,
        explanation: "Dalam setiap satu rakaat, wajib melakukan sujud sebanyak 2 kali."
      },
      {
        question: "Sikap tenang sejenak dalam setiap gerakan sholat disebut...",
        options: ["Khusyuk", "Tuma'ninah", "Ikhlas", "Ihsan"],
        correctIndex: 1,
        explanation: "Tuma'ninah adalah diam sejenak setelah anggota badan mapan pada suatu gerakan rukun."
      }
    ]
  },
  {
    slug: "huruf-hijaiyah",
    level: 2,
    name: "Pengenalan Huruf Hijaiyah",
    type: "interactive",
    emoji: "🔤",
    desc: "28 huruf hijaiyah adalah pintu masuk untuk membaca Al-Qur'an dengan benar.",
    youtubeId: "vB0v21y9l1o", // Belajar Hijaiyah
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
    quiz: [
      {
        question: "Berapa jumlah total huruf hijaiyah (tanpa huruf gabungan)?",
        options: ["26", "28", "30", "32"],
        correctIndex: 1,
        explanation: "Secara umum, jumlah huruf hijaiyah dasar adalah 28 atau 29 huruf."
      },
      {
        question: "Huruf apakah yang bentuknya seperti perahu dengan satu titik di bawah?",
        options: ["Ta", "Tsa", "Ba", "Nun"],
        correctIndex: 2,
        explanation: "Huruf Ba (ب) berbentuk seperti wadah/perahu dengan satu titik di bawahnya."
      },
      {
        question: "Tempat keluarnya huruf saat kita melafalkannya disebut...",
        options: ["Tajwid", "Makhraj", "Harokat", "Ghunnah"],
        correctIndex: 1,
        explanation: "Makharijul Huruf (makhraj) adalah tempat-tempat keluarnya huruf hijaiyah."
      }
    ]
  },
  {
    slug: "tajwid-dasar",
    level: 2,
    name: "Hukum Tajwid Dasar (Nun Mati & Mim)",
    type: "quiz",
    emoji: "📐",
    desc: "Tajwid membuat bacaan Al-Qur'an menjadi indah dan benar sesuai aturannya.",
    youtubeId: "W9nKkVQZt-0", // Belajar Tajwid
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
    quiz: [
      {
        question: "Jika Nun Mati bertemu huruf Ba (ب), hukum tajwidnya adalah...",
        options: ["Izhar", "Iqlab", "Ikhfa", "Idgham"],
        correctIndex: 1,
        explanation: "Iqlab adalah mengubah bunyi nun mati/tanwin menjadi bunyi mim ketika bertemu huruf Ba."
      },
      {
        question: "Membaca dengan jelas tanpa dengung disebut...",
        options: ["Izhar", "Ikhfa", "Idgham Bighunnah", "Iqlab"],
        correctIndex: 0,
        explanation: "Izhar berarti jelas atau terang, dibaca tanpa dengung."
      },
      {
        question: "Mim mati bertemu huruf selain Mim dan Ba, hukumnya adalah...",
        options: ["Ikhfa Syafawi", "Idgham Mimi", "Izhar Syafawi", "Idgham Mutamatsilain"],
        correctIndex: 2,
        explanation: "Izhar Syafawi: bunyi mim dibaca jelas saat bertemu selain huruf Mim dan Ba."
      }
    ]
  },
  {
    slug: "adab-doa-harian",
    level: 2,
    name: "Adab Sehari-hari & Doa Pilihan",
    type: "article",
    emoji: "🌿",
    desc: "Islam adalah agama adab. Doa-doa harian menyambungkan kita dengan Allah di setiap momen.",
    youtubeId: "V5-Z9B7-X1w", // Doa Harian
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
    quiz: [
      {
        question: "Bagaimana adab saat makan menurut sunnah?",
        options: ["Makan sambil berdiri", "Makan dengan tangan kiri", "Makan dengan tangan kanan dan membaca Bismillah", "Menyisakan makanan di piring"],
        correctIndex: 2,
        explanation: "Sunnah makan adalah menggunakan tangan kanan, membaca Bismillah, dan disarankan duduk."
      },
      {
        question: "Doa \"Bismillahi tawakkaltu 'alallah...\" dibaca ketika...",
        options: ["Masuk rumah", "Keluar rumah", "Naik kendaraan", "Mandi"],
        correctIndex: 1,
        explanation: "Doa tersebut dibaca saat melangkah keluar rumah agar dilindungi oleh Allah."
      },
      {
        question: "Apa arti dari kalimat Alhamdulillah?",
        options: ["Maha Suci Allah", "Segala puji bagi Allah", "Allah Maha Besar", "Dengan nama Allah"],
        correctIndex: 1,
        explanation: "Alhamdulillah adalah ungkapan rasa syukur yang artinya 'Segala puji bagi Allah'."
      }
    ]
  },
  {
    slug: "sirah-nabi",
    level: 3,
    name: "Sejarah Nabi Muhammad (Sirah)",
    type: "article",
    emoji: "🌙",
    desc: "Mengenal perjalanan hidup Rasulullah ﷺ dari kelahiran hingga wafat sebagai teladan umat.",
    youtubeId: "XQ8m_P1FzLw", // Kisah Nabi Muhammad
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
    quiz: [
      {
        question: "Gelar Al-Amin yang disematkan kepada Nabi Muhammad sejak kecil memiliki arti...",
        options: ["Yang sangat cerdas", "Yang paling kuat", "Yang dapat dipercaya", "Yang paling sabar"],
        correctIndex: 2,
        explanation: "Al-Amin artinya 'Orang yang dapat dipercaya' karena kejujuran beliau."
      },
      {
        question: "Wahyu pertama diturunkan kepada Nabi Muhammad saat beliau berkhalwat di...",
        options: ["Gua Tsur", "Gua Hira", "Bukit Safa", "Padang Arafah"],
        correctIndex: 1,
        explanation: "Wahyu pertama (Surah Al-'Alaq 1-5) turun melalui Malaikat Jibril di Gua Hira."
      },
      {
        question: "Peristiwa perpindahan kaum muslimin dari Mekkah ke Madinah disebut...",
        options: ["Isra' Mi'raj", "Fathu Makkah", "Hijrah", "Haji Wada'"],
        correctIndex: 2,
        explanation: "Hijrah adalah momentum sangat penting hingga dijadikan awal kalender Islam."
      }
    ]
  },
  {
    slug: "tafsir-ayat-populer",
    level: 3,
    name: "Tafsir Ayat-ayat Populer",
    type: "article",
    emoji: "📖",
    desc: "Memahami makna ayat-ayat yang sering dibaca agar iman semakin kokoh.",
    youtubeId: "5jX9V3pQjF8", // Tafsir Al Fatihah
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
    quiz: [
      {
        question: "Surah apa yang disebut sebagai sepertiga Al-Qur'an karena menjelaskan ketauhidan murni?",
        options: ["Surah Al-Fatihah", "Surah Yasin", "Surah Al-Ikhlas", "Surah Al-Mulk"],
        correctIndex: 2,
        explanation: "Surah Al-Ikhlas menjelaskan keesaan Allah tanpa sekutu, sehingga dinilai setara sepertiga Al-Qur'an."
      },
      {
        question: "Ayat Kursi terdapat di dalam surah...",
        options: ["Ali 'Imran", "Al-Baqarah", "An-Nisa", "Al-Kahfi"],
        correctIndex: 1,
        explanation: "Ayat Kursi adalah ayat ke-255 di dalam Surah Al-Baqarah."
      },
      {
        question: "Dalam Surah Al-'Asr, demi masa, manusia berada dalam kerugian KECUALI mereka yang...",
        options: ["Kaya raya", "Beriman, beramal sholeh, menasihati kebenaran & kesabaran", "Rajin bekerja siang malam", "Menghafal banyak surah"],
        correctIndex: 1,
        explanation: "Kunci selamat dari kerugian waktu adalah iman, amal saleh, serta saling menasihati."
      }
    ]
  },
  {
    slug: "fikih-muamalah",
    level: 3,
    name: "Fikih Muamalah (Jual Beli Islami)",
    type: "video",
    emoji: "⚖️",
    desc: "Aturan Islam dalam transaksi agar harta yang diperoleh halal dan berkah.",
    youtubeId: "9o4v0o7Q6yQ", // Fikih Muamalah Dasar
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
    quiz: [
      {
        question: "Transaksi yang mengandung unsur ketidakjelasan atau spekulasi disebut...",
        options: ["Riba", "Gharar", "Maysir", "Mudharabah"],
        correctIndex: 1,
        explanation: "Gharar adalah jual beli yang tidak jelas wujud barang atau harganya, yang dilarang dalam Islam."
      },
      {
        question: "Syarat utama sahnya jual beli adalah...",
        options: ["Harus di pasar", "Saling ridha (rela) antar kedua pihak", "Harus tunai tanpa hutang", "Harus ada diskon"],
        correctIndex: 1,
        explanation: "Asas jual beli dalam Al-Qur'an (An-Nisa: 29) adalah perdagangan yang didasari kerelaan (an-taradhin)."
      },
      {
        question: "Menyembunyikan cacat barang yang dijual agar laku mahal hukumnya adalah...",
        options: ["Boleh jika pembeli tidak tanya", "Haram karena termasuk penipuan", "Makruh", "Mubah"],
        correctIndex: 1,
        explanation: "Islam mewajibkan kejujuran; menyembunyikan cacat barang (tadlis) diharamkan."
      }
    ]
  },
];
