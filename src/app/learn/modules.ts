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
    youtubeId: "bZ11ZceIKn8", // NUSSA: RUKUN IMAN
    sections: [
      {
        title: "Rukun Iman (6)",
        points: [
          "Iman kepada Allah : percaya Allah Maha Esa, Pencipta segalanya.",
          "Iman kepada Malaikat : makhluk Allah yang taat, seperti Jibril.",
          "Iman kepada Kitab : Al-Qur'an dan kitab-kitab sebelumnya.",
          "Iman kepada Rasul : 25 nabi dan rasul yang diutus Allah.",
          "Iman kepada Hari Akhir : hari pembalasan semua amal.",
          "Iman kepada Qada & Qadar : takdir baik dan buruk dari Allah.",
        ],
      },
      {
        title: "Rukun Islam (5)",
        points: [
          "Syahadat : bersaksi tiada Tuhan selain Allah dan Muhammad utusan-Nya.",
          "Sholat : mendirikan salat lima waktu.",
          "Zakat : menyisihkan sebagian harta untuk yang membutuhkan.",
          "Puasa : menahan lapar, haus, dan hawa nafsu di bulan Ramadhan.",
          "Haji : menunaikan ibadah haji bagi yang mampu.",
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
        explanation: "Rukun iman terdiri dari 6 perkara keyakinan dasar seorang muslim."
      },
      {
        question: "Iman kepada Qada dan Qadar berarti kita percaya kepada...",
        options: ["Hari Kiamat", "Takdir baik dan buruk dari Allah", "Kitab-kitab suci", "Nabi dan Rasul"],
        correctIndex: 1,
        explanation: "Qada dan Qadar adalah ketentuan dan takdir yang telah digariskan oleh Allah SWT."
      },
      {
        question: "Ibadah yang wajib dilakukan 5 kali dalam sehari semalam adalah...",
        options: ["Zakat", "Puasa", "Sholat Fardhu", "Haji"],
        correctIndex: 2,
        explanation: "Sholat lima waktu (Subuh, Dzuhur, Ashar, Maghrib, Isya) adalah rukun Islam kedua yang wajib ditunaikan setiap hari."
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
    youtubeId: "LwnLurexn1Y", // Cerita Ubay: Belajar Wudhu
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
        options: ["Kaki", "Kepala", "Kedua tangan sampai siku", "Telinga"],
        correctIndex: 2,
        explanation: "Urutan wudhu yang benar setelah membasuh wajah adalah membasuh kedua tangan sampai ke siku."
      },
      {
        question: "Berapa kali sunnah membasuh anggota tubuh dalam wudhu?",
        options: ["1 kali", "2 kali", "3 kali", "7 kali"],
        correctIndex: 2,
        explanation: "Sangat disunnahkan untuk membasuh setiap anggota wudhu sebanyak 3 kali secara merata."
      },
      {
        question: "Tayamum menggunakan media apa sebagai pengganti air saat bersuci?",
        options: ["Daun kering", "Debu atau tanah yang suci", "Batu karang", "Kain basah"],
        correctIndex: 1,
        explanation: "Tayamum dilakukan menggunakan debu atau permukaan tanah yang suci dan bersih."
      },
      {
        question: "Hal berikut yang membatalkan wudhu adalah...",
        options: ["Makan nasi", "Buang air kecil atau buang angin", "Minum air putih", "Membaca Al-Qur'an"],
        correctIndex: 1,
        explanation: "Keluarnya sesuatu dari dua jalan (kubul/dubur) seperti buang air atau buang angin membatalkan wudhu."
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
    youtubeId: "VKyRSN7nes0", // Cerita Ubay: Belajar Sholat
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
        explanation: "Membaca Al-Fatihah adalah rukun sholat. Tanpa membaca Al-Fatihah, rakaat tidak sah."
      },
      {
        question: "Berapa kali kita melakukan sujud dalam satu rakaat sholat?",
        options: ["1 kali", "2 kali", "3 kali", "4 kali"],
        correctIndex: 1,
        explanation: "Dalam setiap satu rakaat sholat, wajib melakukan sujud sebanyak 2 kali."
      },
      {
        question: "Sikap tenang sejenak dalam setiap gerakan sholat disebut...",
        options: ["Khusyuk", "Tuma'ninah", "Ikhlas", "Ihsan"],
        correctIndex: 1,
        explanation: "Tuma'ninah adalah diam sejenak setelah seluruh anggota badan mapan pada suatu gerakan rukun."
      },
      {
        question: "Gerakan penutup sholat yang menandakan selesainya ibadah sholat adalah...",
        options: ["Rukuk", "Sujud Sahwi", "Takbiratul Ihram", "Salam ke kanan dan ke kiri"],
        correctIndex: 3,
        explanation: "Sholat diawali dengan Takbiratul Ihram dan diakhiri dengan ucapan Salam."
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
    youtubeId: "DD3FxVA22as", // Huruf Hijaiyah bersama Diva
    sections: [
      {
        title: "Huruf Dasar",
        points: [
          "Alif, Ba, Ta, Tsa, Jim, Ha (kecil), Kho : tujuh huruf pertama.",
          "Dal, Dzal, Ro, Za, Sin, Syin, Shod : lanjutkan dengan makhraj gigi.",
          "Dhod, Tho, Zho, 'Ain, Ghain, Fa, Qof : perhatikan tenggorokan.",
          "Kaf, Lam, Mim, Nun, Wau, Ha (besar), Ya : tujuh huruf terakhir.",
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
        question: "Berapa jumlah total huruf hijaiyah tunggal dasar?",
        options: ["26", "28", "30", "32"],
        correctIndex: 1,
        explanation: "Secara umum, jumlah huruf hijaiyah dasar adalah 28 atau 29 huruf."
      },
      {
        question: "Huruf apakah yang bentuknya seperti perahu dengan satu titik di bawah?",
        options: ["Ta (ت)", "Tsa (ث)", "Ba (ب)", "Nun (ن)"],
        correctIndex: 2,
        explanation: "Huruf Ba (ب) berbentuk seperti wadah/perahu dengan satu titik di bawahnya."
      },
      {
        question: "Tempat keluarnya suara huruf saat kita melafalkannya disebut...",
        options: ["Tajwid", "Makharijul Huruf (Makhraj)", "Harokat", "Ghunnah"],
        correctIndex: 1,
        explanation: "Makharijul Huruf adalah tempat-tempat spesifik keluarnya bunyi huruf hijaiyah pada organ bicara."
      },
      {
        question: "Tanda baca baris atas yang berbunyi vokal 'A' dalam bahasa Arab dinamakan...",
        options: ["Kasroh", "Dhommah", "Fathah", "Sukun"],
        correctIndex: 2,
        explanation: "Fathah adalah harakat garis di atas huruf yang menghasilkan bunyi vokal 'A'."
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
    youtubeId: "qF_HuLMI-B4", // Belajar Tahsin
    sections: [
      {
        title: "Nun Sukun & Tanwin",
        points: [
          "Idgham : memasukkan nun ke huruf setelahnya, mis. yaa, ro, mim, lam.",
          "Ikhfa : menyamarkan nun, dibaca samar dengan dengung.",
          "Iqlab : mengubah nun menjadi mim saat bertemu ba.",
          "Izhar : jelas tanpa dengung saat bertemu huruf halqi.",
        ],
      },
      {
        title: "Mim Sukun",
        points: [
          "Ikhfa syafawi : dengung samar saat mim sukun bertemu ba.",
          "Idgham mimi : memasukkan mim ke mim dengan dengung.",
          "Izhar syafawi : jelas saat bertemu selain mim dan ba.",
        ],
      },
    ],
    practice: "Cari 3 contoh hukum tajwid di surat Al-Fatihah dan tandai jenisnya.",
    quiz: [
      {
        question: "Jika Nun Mati bertemu huruf Ba (ب), hukum tajwidnya adalah...",
        options: ["Izhar", "Iqlab", "Ikhfa", "Idgham"],
        correctIndex: 1,
        explanation: "Iqlab adalah mengubah bunyi nun mati/tanwin menjadi bunyi mim yang berdengung saat bertemu huruf Ba."
      },
      {
        question: "Membaca nun mati dengan bunyi jelas tanpa dengung disebut hukum...",
        options: ["Izhar Halqi", "Ikhfa Haqiqi", "Idgham Bighunnah", "Iqlab"],
        correctIndex: 0,
        explanation: "Izhar Halqi berarti membaca dengan jelas dan tegas tanpa dengung saat bertemu 6 huruf tenggorokan."
      },
      {
        question: "Mim mati bertemu huruf selain Mim dan Ba, hukum bacaannya adalah...",
        options: ["Ikhfa Syafawi", "Idgham Mimi", "Izhar Syafawi", "Qalqalah"],
        correctIndex: 2,
        explanation: "Izhar Syafawi adalah membaca mim mati dengan jelas tanpa dengung saat bertemu huruf selain Mim dan Ba."
      },
      {
        question: "Huruf Qalqalah (pantulan) yang disingkat dalam kata 'Baju Di Toko' berjumlah...",
        options: ["3 huruf", "4 huruf", "5 huruf (ب ج د ط ق)", "6 huruf"],
        correctIndex: 2,
        explanation: "Huruf Qalqalah ada 5: Ba (ب), Jim (ج), Dal (د), Tha (ط), Qaf (ق)."
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
    youtubeId: "6xLsftss-bE", // Kumpulan Doa
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
        question: "Bagaimana adab saat makan menurut sunnah Rasulullah ﷺ?",
        options: ["Makan sambil berdiri", "Makan dengan tangan kiri", "Makan dengan tangan kanan dan membaca Bismillah", "Meniup makanan panas"],
        correctIndex: 2,
        explanation: "Sunnah makan adalah menggunakan tangan kanan, membaca Bismillah, dan tidak meniup makanan."
      },
      {
        question: "Doa \"Bismillahi tawakkaltu 'alallah...\" disunnahkan dibaca ketika...",
        options: ["Masuk rumah", "Keluar rumah / bepergian", "Naik tempat tidur", "Selesai makan"],
        correctIndex: 1,
        explanation: "Doa tawakal tersebut dibaca saat melangkah keluar rumah agar senantiasa dilindungi oleh Allah SWT."
      },
      {
        question: "Apa arti dari kalimat dzikir Alhamdulillah?",
        options: ["Maha Suci Allah", "Segala puji bagi Allah", "Allah Maha Besar", "Tiada Tuhan selain Allah"],
        correctIndex: 1,
        explanation: "Alhamdulillah adalah ungkapan pujian dan syukur yang berarti 'Segala puji hanya bagi Allah'."
      },
      {
        question: "Ketika bertemu dengan sesama muslim, ucapan salam yang paling utama adalah...",
        options: ["Selamat Pagi", "Halo kawan", "Assalamu'alaikum Warahmatullahi Wabarakatuh", "Sampai jumpa"],
        correctIndex: 2,
        explanation: "Mengucapkan salam lengkap adalah doa keselamatan, rahmat, dan keberkahan bagi sesama muslim."
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
    youtubeId: "cJy7KOUetT0", // Kisah Para Nabi
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
        question: "Gelar Al-Amin yang disematkan kepada Nabi Muhammad sejak muda memiliki arti...",
        options: ["Yang sangat cerdas", "Yang paling kuat", "Yang dapat dipercaya", "Yang paling tampan"],
        correctIndex: 2,
        explanation: "Al-Amin artinya 'Orang yang dapat dipercaya' karena kejujuran dan integritas beliau."
      },
      {
        question: "Wahyu pertama (Surah Al-'Alaq 1-5) diturunkan kepada Nabi Muhammad di...",
        options: ["Gua Tsur", "Gua Hira", "Bukit Shafa", "Masjid Nabawi"],
        correctIndex: 1,
        explanation: "Wahyu pertama turun melalui Malaikat Jibril saat beliau berkhalwat di Gua Hira."
      },
      {
        question: "Peristiwa hijrah kaum muslimin dari Mekkah ke Madinah dijadikan tonggak awal...",
        options: ["Tahun Baru Masehi", "Kalender Hijriyah", "Perang Badar", "Fathu Makkah"],
        correctIndex: 1,
        explanation: "Peristiwa Hijrah menjadi titik tolak kebangkitan peradaban Islam dan dijadikan awal penanggalan Hijriyah."
      },
      {
        question: "Nabi Muhammad ﷺ wafat pada usia berapa tahun?",
        options: ["60 tahun", "61 tahun", "63 tahun", "65 tahun"],
        correctIndex: 2,
        explanation: "Rasulullah ﷺ wafat pada usia 63 tahun di kota Madinah Al-Munawwarah."
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
    youtubeId: "hUpWc8LXBVM", // Keutamaan Ayat Kursi
    sections: [
      {
        title: "Ayat Pilihan",
        points: [
          "Al-Fatihah : inti doa dan pujian, dibaca di setiap rakaat sholat.",
          "Ayat Kursi (2:255) : ayat paling agung tentang kekuasaan Allah.",
          "Al-Ashr : sumpah waktu, manusia rugi kecuali yang beriman dan beramal saleh.",
          "Al-Ikhlas : sepertiga Al-Qur'an, menjelaskan keesaan Allah.",
        ],
      },
    ],
    practice: "Baca dan renungkan arti Ayat Kursi hari ini sebelum tidur.",
    quiz: [
      {
        question: "Surah apa yang disebut setara sepertiga Al-Qur'an karena memuat tauhid murni?",
        options: ["Surah Al-Fatihah", "Surah Yasin", "Surah Al-Ikhlas", "Surah Al-Mulk"],
        correctIndex: 2,
        explanation: "Surah Al-Ikhlas menjelaskan keesaan Allah tanpa sekutu, sehingga dinilai setara sepertiga Al-Qur'an."
      },
      {
        question: "Ayat Kursi yang agung berada di dalam Surah...",
        options: ["Ali 'Imran ayat 10", "Al-Baqarah ayat 255", "An-Nisa ayat 1", "Al-Ma'idah ayat 3"],
        correctIndex: 1,
        explanation: "Ayat Kursi adalah ayat ke-255 di dalam Surah Al-Baqarah yang menjelaskan keagungan takhta Allah."
      },
      {
        question: "Dalam Surah Al-'Asr, seluruh manusia berada dalam kerugian KECUALI orang yang...",
        options: ["Kaya harta", "Beriman, beramal saleh, dan saling menasihati", "Terkenal dan berkuasa", "Pintar berbisnis"],
        correctIndex: 1,
        explanation: "Kunci selamat dari kerugian masa adalah iman, amal saleh, serta saling menasihati dalam kebenaran dan kesabaran."
      },
      {
        question: "Surah Al-Fatihah disebut juga sebagai Ummul Qur'an yang artinya...",
        options: ["Penutup Al-Qur'an", "Induk / Inti Al-Qur'an", "Ayat Terpanjang", "Kisah Nabi"],
        correctIndex: 1,
        explanation: "Al-Fatihah disebut Ummul Qur'an (Induk Al-Qur'an) karena memuat seluruh pokok-pokok ajaran Islam."
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
    youtubeId: "xeM7DcgoT4c", // Rukun Jual Beli
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
        question: "Transaksi yang mengandung unsur ketidakjelasan barang atau spekulasi disebut...",
        options: ["Riba", "Gharar", "Maysir", "Mudharabah"],
        correctIndex: 1,
        explanation: "Gharar adalah jual beli yang tidak jelas wujud fisik, takaran, atau harganya, yang dilarang dalam syariat."
      },
      {
        question: "Syarat utama sahnya akad jual beli menurut Surah An-Nisa ayat 29 adalah...",
        options: ["Harus di pasar", "Saling ridha / rela antar kedua belah pihak", "Harus tunai", "Harus ada diskon"],
        correctIndex: 1,
        explanation: "Asas jual beli dalam Islam adalah perdagangan yang didasari atas kerelaan (an-taradhin minkum)."
      },
      {
        question: "Menyembunyikan cacat barang yang dijual agar laku dengan harga tinggi hukumnya...",
        options: ["Boleh jika pembeli tidak tanya", "Haram dan termasuk penipuan (Tadlis)", "Makruh", "Mubah"],
        correctIndex: 1,
        explanation: "Islam mewajibkan kejujuran; menyembunyikan cacat barang (tadlis) diharamkan dan merusak keberkahan rezeki."
      },
      {
        question: "Tambahan pembayaran yang disyaratkan dalam transaksi pinjam meminjam uang dinamakan...",
        options: ["Zakat", "Infaq", "Riba", "Hibah"],
        correctIndex: 2,
        explanation: "Riba adalah tambahan nilai yang disyaratkan secara batil dalam transaksi utang piutang."
      }
    ]
  },
];
