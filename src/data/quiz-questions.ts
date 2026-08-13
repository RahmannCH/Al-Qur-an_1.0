import { QuizQuestion } from "@/store/quiz-store";

export const QUIZ_CATEGORIES = [
  { id: "rukun-iman", name: "Rukun Iman", color: "text-emerald-600", bg: "bg-emerald-500/10", icon: "⭐" },
  { id: "rukun-islam", name: "Rukun Islam", color: "text-blue-600", bg: "bg-blue-500/10", icon: "🕌" },
  { id: "nama-nabi", name: "Nama Nabi", color: "text-amber-600", bg: "bg-amber-500/10", icon: "👳" },
  { id: "surah-pendek", name: "Surah Pendek", color: "text-indigo-600", bg: "bg-indigo-500/10", icon: "📖" },
  { id: "adab-doa", name: "Adab & Doa", color: "text-teal-600", bg: "bg-teal-500/10", icon: "🤲" },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // Rukun Iman
  {
    id: "1",
    category: "rukun-iman",
    question: "Berapa jumlah Rukun Iman?",
    options: ["4", "5", "6", "7"],
    correctIndex: 2,
    explanation: "Rukun Iman ada 6: 1) Iman kepada Allah, 2) Iman kepada Malaikat, 3) Iman kepada Kitab, 4) Iman kepada Rasul, 5) Iman kepada Hari Akhir, 6) Iman kepada Qada & Qadar.",
  },
  {
    id: "2",
    category: "rukun-iman",
    question: "Malaikat yang bertugas menyampaikan wahyu adalah...",
    options: ["Malaikat Israfil", "Malaikat Jibril", "Malaikat Mikail", "Malaikat Izrail"],
    correctIndex: 1,
    explanation: "Malaikat Jibril adalah pembawa wahyu dari Allah kepada para nabi.",
  },
  {
    id: "3",
    category: "rukun-iman",
    question: "Kitab suci Al-Qur'an diturunkan kepada nabi...",
    options: ["Nabi Musa AS", "Nabi Isa AS", "Nabi Muhammad ﷺ", "Nabi Ibrahim AS"],
    correctIndex: 2,
    explanation: "Al-Qur'an diturunkan kepada Nabi Muhammad ﷺ melalui Malaikat Jibril selama 23 tahun.",
  },

  // Rukun Islam
  {
    id: "4",
    category: "rukun-islam",
    question: "Rukun Islam yang pertama adalah...",
    options: ["Sholat", "Zakat", "Syahadat", "Puasa"],
    correctIndex: 2,
    explanation: "Rukun Islam pertama adalah Syahadat (persaksian bahwa tiada Tuhan selain Allah dan Muhammad adalah utusan Allah).",
  },
  {
    id: "5",
    category: "rukun-islam",
    question: "Sholat wajib yang paling awal waktunya adalah...",
    options: ["Maghrib", "Isya", "Subuh", "Dzuhur"],
    correctIndex: 2,
    explanation: "Subuh adalah sholat pertama dalam urutan waktu harian, dilaksanakan sebelum terbit matahari.",
  },
  {
    id: "6",
    category: "rukun-islam",
    question: "Zakat dikeluarkan dari harta yang telah mencapai nisab dan...",
    options: ["Setahun sudah jatuh tempo (haul)", "Sehari setelah penghasilan", "Sudah berumur 5 tahun", "Setiap 6 bulan sekali"],
    correctIndex: 0,
    explanation: "Zakat wajib dikeluarkan setelah harta mencapai nisab dan telah dimiliki selama satu tahun penuh (haul).",
  },

  // Nama Nabi
  {
    id: "7",
    category: "nama-nabi",
    question: "Nabi yang terkenal dengan mukjizat membelah laut adalah...",
    options: ["Nabi Ibrahim AS", "Nabi Musa AS", "Nabi Nuh AS", "Nabi Yunus AS"],
    correctIndex: 1,
    explanation: "Nabi Musa AS atas izin Allah membelah Laut Merah untuk menyelamatkan kaumnya dari kejaran Firaun.",
  },
  {
    id: "8",
    category: "nama-nabi",
    question: "Nabi yang menghadapi raja Namrud dan tidak mempan dibakar adalah...",
    options: ["Nabi Yunus AS", "Nabi Isa AS", "Nabi Ibrahim AS", "Nabi Daud AS"],
    correctIndex: 2,
    explanation: "Nabi Ibrahim AS dibakar hidup-hidup oleh raja Namrud, tetapi api tidak membakarnya atas izin Allah.",
  },
  {
    id: "9",
    category: "nama-nabi",
    question: "Nabi yang dimakan ikan paus tetapi selamat berkat doa adalah...",
    options: ["Nabi Yunus AS", "Nabi Ibrahim AS", "Nabi Muhammad ﷺ", "Nabi Nuh AS"],
    correctIndex: 0,
    explanation: "Nabi Yunus AS tinggal di perut paus selama beberapa hari, lalu keluar dengan selamat setelah bertobat.",
  },

  // Surah Pendek
  {
    id: "10",
    category: "surah-pendek",
    question: "Surah yang sering dibaca saat sholat karena merupakan inti doa adalah...",
    options: ["Surah Al-Ikhlas", "Surah Al-Fatihah", "Surah An-Nas", "Surah Al-Falaq"],
    correctIndex: 1,
    explanation: "Surah Al-Fatihah wajib dibaca setiap rakaat sholat, karena ia adalah induk Al-Qur'an.",
  },
  {
    id: "11",
    category: "surah-pendek",
    question: "Surah yang menyatakan keesaan Allah SWT adalah...",
    options: ["Surah Al-Kafirun", "Surah Al-Ikhlas", "Surah An-Nasr", "Surah Al-Falaq"],
    correctIndex: 1,
    explanation: "Surah Al-Ikhlas (Qs 112) disebut sepertiga Al-Qur'an karena menjelaskan tauhid (keesaan Allah).",
  },
  {
    id: "12",
    category: "surah-pendek",
    question: "Surah yang diajarkan untuk berlindung dari kejahatan manusia adalah...",
    options: ["Surah Al-Falaq", "Surah An-Nas", "Surah Al-Ma'un", "Surah Quraisy"],
    correctIndex: 1,
    explanation: "Surah An-Nas memohon perlindungan dari kejahatan bisikan (setan) yang ada dalam diri manusia.",
  },

  // Adab & Doa
  {
    id: "13",
    category: "adab-doa",
    question: "Doa sebelum makan dimulai dengan...",
    options: ["Alhamdulillah", "Bismillah", "Astaghfirullah", "Subhanallah"],
    correctIndex: 1,
    explanation: "Bismillah (dengan menyebut nama Allah) adalah doa sebelum makan.",
  },
  {
    id: "14",
    category: "adab-doa",
    question: "Saat masuk masjid, kita disunahkan mengucapkan...",
    options: ["Alhamdulillah", "Assalamu'alaikum", "Bismillah", "Subhanallah"],
    correctIndex: 0,
    explanation: "Disunahkan membaca doa masuk masjid: \"Alhamdulillah...\"",
  },
  {
    id: "15",
    category: "adab-doa",
    question: "Saat seseorang bersin lalu mengucap \"Alhamdulillah\", kita disunahkan membalas...",
    options: ["Insya Allah", "Yarhamukallah", "Wa'alaikum salam", "Afwan"],
    correctIndex: 1,
    explanation: "Membalas dengan \"Yarhamukallah\" (semoga Allah merahmatimu).",
  },
];

export function getQuestionsByCategory(category: string): QuizQuestion[] {
  return QUIZ_QUESTIONS.filter(q => q.category === category);
}

export function getRandomQuestions(count: number): QuizQuestion[] {
  const shuffled = [...QUIZ_QUESTIONS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
