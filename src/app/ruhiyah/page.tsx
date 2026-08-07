"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BackButton } from "@/components/layout/back-button";
import { 
  Heart, 
  Cloud, 
  Brain, 
  Frown, 
  Angry, 
  Zap,
  ChevronRight,
  BookOpen,
  Sparkles
} from "lucide-react";

interface Emotion {
  id: string;
  label: string;
  icon: any;
  color: string;
  bgGradient: string;
  ayat: {
    arabic: string;
    translation: string;
    reference: string;
  };
  psychology: string;
  doa: {
    arabic: string;
    latin: string;
    translation: string;
  };
  actionPlan: string[];
}

const EMOTIONS: Emotion[] = [
  {
    id: "sedih",
    label: "Sedih & Patah Hati",
    icon: Frown,
    color: "text-blue-600",
    bgGradient: "from-blue-500/20 to-indigo-500/20",
    ayat: {
      arabic: "فَإِنَّ مَعَ ٱلْعُسْرِ يُسْرًا",
      translation: "Maka sesungguhnya bersama kesulitan ada kemudahan.",
      reference: "QS. Asy-Syarh: 6"
    },
    psychology: "Kesedihan adalah emosi alami ketika kehilangan atau kekecewaan terjadi. Membiarkan diri merasakan sedih adalah bagian dari proses penyembuhan, bukan kelemahan.",
    doa: {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ",
      latin: "Allahumma inni a'udzu bika minal-hammi wal-hazan",
      translation: "Ya Allah, aku berlindung kepada-Mu dari kesedihan dan duka cita."
    },
    actionPlan: [
      "Ambil wudhu dan sholat dua rakaat (Sholat Hajat).",
      "Tulis perasaanmu di jurnal (Emotional Dumping).",
      "Hubungi teman atau keluarga yang bisa mendengar tanpa menghakimi."
    ]
  },
  {
    id: "overthinking",
    label: "Overthinking & Cemas",
    icon: Brain,
    color: "text-purple-600",
    bgGradient: "from-purple-500/20 to-pink-500/20",
    ayat: {
      arabic: "أَلَا بِذِكْرِ ٱللَّهِ تَطْمَئِنُّ ٱلْقُلُوبُ",
      translation: "Ingatlah, hanya dengan mengingat Allah hati menjadi tenteram.",
      reference: "QS. Ar-Ra'd: 28"
    },
    psychology: "Overthinking terjadi karena otak mencoba melindungi diri dari ketidakpastian. Sayangnya, ini justru menciptakan skenario buruk yang belum tentu terjadi.",
    doa: {
      arabic: "حَسْبِيَ اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ",
      latin: "Hasbiyallahu la ilaha illa huwa 'alayhi tawakkaltu",
      translation: "Cukuplah Allah bagiku, tiada Tuhan selain Dia. Hanya kepada-Nya aku bertawakal."
    },
    actionPlan: [
      "Teknik Grounding 5-4-3-2-1: Sebutkan 5 hal yang kamu lihat, 4 yang kamu sentuh, 3 yang kamu dengar, 2 yang kamu cium, 1 yang kamu rasakan.",
      "Tulis worry list: pisahkan apa yang bisa kamu kontrol vs tidak.",
      "Dzikir 'Hasbunallah wa ni'mal wakil' 100x."
    ]
  },
  {
    id: "malas",
    label: "Malas & Tidak Produktif",
    icon: Cloud,
    color: "text-slate-600",
    bgGradient: "from-slate-500/20 to-gray-500/20",
    ayat: {
      arabic: "إِنَّ اللَّهَ لَا يُغَيِّرُ مَا بِقَوْمٍ حَتَّىٰ يُغَيِّرُوا مَا بِأَنفُسِهِمْ",
      translation: "Sesungguhnya Allah tidak akan mengubah keadaan suatu kaum sebelum mereka mengubah diri mereka sendiri.",
      reference: "QS. Ar-Ra'd: 11"
    },
    psychology: "Malas sering kali adalah respons tubuh terhadap kelelahan mental, bukan fisik. Istirahat yang berkualitas lebih penting daripada memaksakan diri.",
    doa: {
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ",
      latin: "Allahumma inni a'udzu bika minal-'ajzi wal-kasal",
      translation: "Ya Allah, aku berlindung kepada-Mu dari kelemahan dan kemalasan."
    },
    actionPlan: [
      "Mulai dengan target mikro: 1 ayat, 1 halaman, 5 menit produktif.",
      "Identifikasi penyebab: burnout, overthinking, atau memang butuh istirahat?",
      "Reward diri sendiri setelah menyelesaikan task kecil."
    ]
  },
  {
    id: "marah",
    label: "Marah & Kesal",
    icon: Angry,
    color: "text-red-600",
    bgGradient: "from-red-500/20 to-orange-500/20",
    ayat: {
      arabic: "وَٱلْكَٰظِمِينَ ٱلْغَيْظَ وَٱلْعَافِينَ عَنِ ٱلنَّاسِ",
      translation: "Dan orang-orang yang menahan amarahnya dan memaafkan (kesalahan) orang lain.",
      reference: "QS. Ali 'Imran: 134"
    },
    psychology: "Kemarahan adalah emosi sekunder. Di baliknya ada perasaan terluka, kecewa, atau takut. Kenali akar penyebabnya agar tidak meledak ke arah yang salah.",
    doa: {
      arabic: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
      latin: "A'udzu billahi minasy-syaithonir-rajim",
      translation: "Aku berlindung kepada Allah dari setan yang terkutuk."
    },
    actionPlan: [
      "Segera ambil wudhu (air mendinginkan emosi).",
      "Jika berdiri, duduk. Jika duduk, berbaring (Hadits).",
      "Keluar dari situasi pemicu untuk menenangkan diri terlebih dahulu."
    ]
  },
  {
    id: "insecure",
    label: "Insecure & Rendah Diri",
    icon: Heart,
    color: "text-pink-600",
    bgGradient: "from-pink-500/20 to-rose-500/20",
    ayat: {
      arabic: "وَلَقَدْ كَرَّمْنَا بَنِىٓ ءَادَمَ",
      translation: "Dan sungguh, Kami telah memuliakan anak cucu Adam.",
      reference: "QS. Al-Isra: 70"
    },
    psychology: "Insecurity lahir dari perbandingan sosial dan standar sempurna yang tidak realistis. Ingat: tak ada manusia yang sempurna, termasuk mereka yang terlihat 'baik-baik saja' di media sosial.",
    doa: {
      arabic: "اللَّهُمَّ اهْدِنِي لِأَحْسَنِ الْأَخْلَاقِ",
      latin: "Allahummahdini li-ahsanil-akhlaq",
      translation: "Ya Allah, tunjukilah aku kepada akhlak yang terbaik."
    },
    actionPlan: [
      "List 3 hal yang kamu syukuri tentang dirimu hari ini.",
      "Batasi waktu scroll media sosial (Social Media Detox).",
      "Fokus pada progress diri, bukan kompetisi dengan orang lain."
    ]
  },
  {
    id: "takut",
    label: "Takut & Khawatir",
    icon: Zap,
    color: "text-yellow-600",
    bgGradient: "from-yellow-500/20 to-amber-500/20",
    ayat: {
      arabic: "أَلَا إِنَّ أَوْلِيَآءَ ٱللَّهِ لَا خَوْفٌ عَلَيْهِمْ وَلَا هُمْ يَحْزَنُونَ",
      translation: "Ketahuilah, sesungguhnya wali-wali Allah itu tidak ada rasa takut pada mereka dan tidak pula mereka bersedih hati.",
      reference: "QS. Yunus: 62"
    },
    psychology: "Ketakutan adalah alarm alami tubuh yang melindungi kita dari bahaya. Namun ketakutan berlebihan (anxiety) bisa dilawan dengan grounding dan logika rasional.",
    doa: {
      arabic: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ",
      latin: "Hasbunallahu wa ni'mal wakil",
      translation: "Cukuplah Allah sebagai penolong kami, dan Dia sebaik-baik pelindung."
    },
    actionPlan: [
      "Tarik napas dalam (4 detik), tahan (7 detik), buang (8 detik). Ulangi 3x.",
      "Tanya diri sendiri: 'Apakah ketakutan ini nyata atau hanya imajinasi?'",
      "Berdoa dan serahkan hasilnya kepada Allah setelah berusaha maksimal."
    ]
  }
];

export default function RuhiyahPage() {
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 min-h-screen">
      <BackButton />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <div className="inline-block p-3 bg-gradient-to-br from-primary/10 to-teal/10 rounded-2xl mb-4">
          <Sparkles className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-4xl font-display font-bold mb-3">P3K Jiwa</h1>
        <p className="text-muted-foreground text-lg">
          Spiritual & Psychological First Aid
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Pilih apa yang sedang kamu rasakan hari ini
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        {!selectedEmotion ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {EMOTIONS.map((emotion, idx) => {
              const Icon = emotion.icon;
              return (
                <motion.button
                  key={emotion.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  onClick={() => setSelectedEmotion(emotion)}
                  className={`group relative overflow-hidden rounded-2xl border p-6 text-left transition-all hover:shadow-xl hover:scale-[1.02] bg-gradient-to-br ${emotion.bgGradient}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl bg-card shadow-sm ${emotion.color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-display font-bold text-lg">{emotion.label}</p>
                        <p className="text-xs text-muted-foreground">Tap untuk panduan</p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            key="detail"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <button
              onClick={() => setSelectedEmotion(null)}
              className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors mb-4"
            >
              ← Kembali ke daftar emosi
            </button>

            <div className={`rounded-3xl border p-8 bg-gradient-to-br ${selectedEmotion.bgGradient}`}>
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-4 rounded-2xl bg-card shadow-lg ${selectedEmotion.color}`}>
                  <selectedEmotion.icon className="h-8 w-8" />
                </div>
                <div>
                  <h2 className="text-3xl font-display font-bold">{selectedEmotion.label}</h2>
                  <p className="text-sm text-muted-foreground">Panduan spiritual & psikologis</p>
                </div>
              </div>

              <div className="space-y-6 mt-8">
                <div className="p-6 bg-card/80 backdrop-blur-sm rounded-2xl border">
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <h3 className="font-display font-bold">Ayat Penenang Jiwa</h3>
                  </div>
                  <p className="font-arabic text-2xl text-primary leading-loose mb-4 text-right" dir="rtl">
                    {selectedEmotion.ayat.arabic}
                  </p>
                  <p className="text-sm leading-relaxed mb-2">&ldquo;{selectedEmotion.ayat.translation}&rdquo;</p>
                  <p className="text-xs text-muted-foreground font-bold">— {selectedEmotion.ayat.reference}</p>
                </div>

                <div className="p-6 bg-card/80 backdrop-blur-sm rounded-2xl border">
                  <div className="flex items-center gap-2 mb-3">
                    <Brain className="h-5 w-5 text-purple-600" />
                    <h3 className="font-display font-bold">Tinjauan Psikologis</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-foreground/90">{selectedEmotion.psychology}</p>
                </div>

                <div className="p-6 bg-card/80 backdrop-blur-sm rounded-2xl border">
                  <div className="flex items-center gap-2 mb-3">
                    <Heart className="h-5 w-5 text-rose-600" />
                    <h3 className="font-display font-bold">Doa Amalan</h3>
                  </div>
                  <p className="font-arabic text-xl text-primary leading-loose mb-3 text-right" dir="rtl">
                    {selectedEmotion.doa.arabic}
                  </p>
                  <p className="text-sm italic text-muted-foreground mb-2">{selectedEmotion.doa.latin}</p>
                  <p className="text-sm">&ldquo;{selectedEmotion.doa.translation}&rdquo;</p>
                </div>

                <div className="p-6 bg-gradient-to-br from-gold/10 to-teal/10 rounded-2xl border border-gold/20">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="h-5 w-5 text-gold" />
                    <h3 className="font-display font-bold">Action Plan</h3>
                  </div>
                  <ul className="space-y-3">
                    {selectedEmotion.actionPlan.map((action, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/20 text-xs font-bold text-gold">
                          {idx + 1}
                        </span>
                        <p className="text-sm leading-relaxed">{action}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
