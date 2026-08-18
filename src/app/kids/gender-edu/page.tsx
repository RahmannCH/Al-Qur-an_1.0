"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BackButton } from "@/components/layout/back-button";
import { 
  Shield, 
  ChevronDown, 
  CheckCircle2, 
  AlertTriangle, 
  MessageSquare, 
  Check, 
  X, 
  HelpCircle, 
  Sparkles,
  BookOpen
} from "lucide-react";
import { sfx } from "@/lib/sfx";
import { Button } from "@/components/ui/button";

interface AgeGuide {
  age: string;
  title: string;
  focus: string;
  points: string[];
}

const GENDER_EDU_GUIDES: AgeGuide[] = [
  {
    age: "Usia 0 - 2 Tahun",
    title: "Mengenal Identitas Diri & Fitrah Dasar",
    focus: "Membangun fitrah biologis sejak dini sesuai ketetapan Allah.",
    points: [
      "Perdengarkan kata ganti yang benar sesuai jenis kelamin biologis bawaan lahir (laki-laki / perempuan).",
      "Pisahkan pakaian sesuai fitrah sejak dini (tidak memakaikan pakaian/perhiasan anak perempuan kepada anak laki-laki, dan sebaliknya).",
      "Larangan Tasyabbuh (menyerupakan diri dengan lawan jenis) ditanamkan sejak masa pertumbuhan awal.",
      "Ajarkan bagian tubuh privat yang tidak boleh dilihat atau disentuh oleh siapapun kecuali orang tua saat membersihkan."
    ]
  },
  {
    age: "Usia 3 - 6 Tahun",
    title: "Pemisahan Tempat Tidur, Privasi & Adab Mandiri",
    focus: "Pemahaman batas mahram, privasi tubuh, dan ketegasan peran.",
    points: [
      "Mulai pisahkan tempat tidur anak (melatih disiplin syariat pemisahan ranjang sebelum usia 7-10 tahun).",
      "Ajarkan adab meminta izin (Isti'dzan) saat memasuki kamar orang tua di tiga waktu privasi (sebelum Subuh, siang hari, dan setelah Isya).",
      "Tanamkan kebanggaan pada fitrah diri: Anak laki-laki bangga menjadi calon imam pelindung, anak perempuan bangga menjadi calon pendidik mulia.",
      "Kenalkan adab toilet: Menutup aurat, tidak buang air bersama, dan istinja secara tertutup dan mandiri."
    ]
  },
  {
    age: "Usia 7 - 10 Tahun",
    title: "Kewajiban Ibadah, Batasan Aurat & Kedisiplinan",
    focus: "Tanggung jawab syariat, penguatan figur maskulin & feminin.",
    points: [
      "Anak laki-laki dididik tegas oleh ayah untuk sholat berjamaah di masjid dan belajar tanggung jawab kepemimpinan (Qawwamun).",
      "Anak perempuan dibimbing ibu menutup aurat secara sempurna dan menjaga rasa malu (Haya') sebagai benteng kehormatan.",
      "Pisahkan kamar tidur anak laki-laki dan perempuan secara mutlak.",
      "Ajarkan batasan sentuhan (Good Touch vs Bad Touch) serta keberanian menolak segala bentuk pelecehan seksual."
    ]
  },
  {
    age: "Usia 11 - 15 Tahun (Baligh)",
    title: "Pubertas, Menjaga Pandangan & Benteng Akidah",
    focus: "Fikih baligh, batasan pergaulan, dan pencegahan LGBT di era digital.",
    points: [
      "Jelaskan tanda-tanda baligh (Mimpi basah bagi laki-laki, Haid bagi perempuan) dan tata cara Mandi Junub sesuai sunnah.",
      "Ghadhul Bashar: Disiplin menjaga pandangan dari pornografi, konten viral yang mempromosikan normalisasi LGBT, dan budaya menyimpang di media sosial.",
      "Larangan Ikhtilat & Khalwat: Tidak berduaan atau bergaul bebas tanpa batas dengan lawan jenis maupun pertemanan yang menjurus ke penyimpangan sesama jenis.",
      "Penegasan Fikih Pernikahan: Islam hanya mengakui ikatan suci pernikahan antara seorang laki-laki dan seorang perempuan yang sah."
    ]
  }
];

const PARENT_DIALOGS = [
  {
    topic: "Ketika Anak Bertanya: Dari Mana Bayi Berasal?",
    age: "Usia 4 - 7 Tahun",
    wrongResponse: "Menjawab dengan mitos bohong (misal: 'Ditemukan di pohon / dibawa burung').",
    correctResponse: "Allah menumbuhkan adik bayi di dalam rahim ibu yang sangat aman dan hangat, setelah ayah dan ibu menikah secara sah karena Allah. Lalu Allah izinkan lahir melalui dokter/bidan.",
    takeaway: "Jawab dengan jujur sesuai kapasitas akal anak, sambungkan dengan kuasa Allah dan ikatan pernikahan halal."
  },
  {
    topic: "Ketika Anak Laki-Laki Ingin Memakai Gaun / Cat Kuku",
    age: "Usia 3 - 6 Tahun",
    wrongResponse: "Membiarkannya karena menganggap lucu atau memarahinya dengan kasar.",
    correctResponse: "Wah, gaun dan cat kuku itu perhiasan cantik khusus untuk anak perempuan ciptaan Allah. Kamu anak laki-laki yang hebat, jagoan ayah dan pelindung ibu. Pakaian jagoan adalah baju keren ini!",
    takeaway: "Tegaskan identitas maskulin dengan bangga dan penuh kasih sayang tanpa mempermalukan anak."
  },
  {
    topic: "Ketika Anak Remaja Terpapar Konten LGBT di Medsos",
    age: "Usia 11 - 15 Tahun",
    wrongResponse: "Menghakimi secara histeris atau mendiamkannya karena tabu.",
    correctResponse: "Nak, Allah menciptakan manusia berpasang-pasangan: laki-laki dan perempuan untuk saling melengkapi dan melahirkan generasi beriman. Apa yang kamu lihat di medsos itu adalah godaan setan yang merusak fitrah suci. Mari kita jaga pandangan dan hati kita agar selalu dicintai Allah.",
    takeaway: "Buka ruang dialog ilmiah & syar'i, jadilah tempat curhat pertama anak sebelum mereka mencari jawaban salah di internet."
  }
];

const DOS_AND_DONTS = [
  {
    category: "Pola Asuh Fitrah",
    dos: "Ayah aktif meluangkan waktu berdua dengan anak laki-laki untuk menanamkan figur maskulin dan ketegasan moral.",
    donts: "Ayah bersikap pasif (Fatherless) sehingga anak laki-laki kehilangan role model kepemimpinan di rumah."
  },
  {
    category: "Privasi Tubuh",
    dos: "Mengajarkan batasan aurat dan hak tubuh sejak dini; menolak ciuman/sentuhan orang asing di bibir atau area privat.",
    donts: "Membiarkan anak bertelanjang bulat di depan umum atau di depan saudara yang berlainan jenis setelah usia 3 tahun."
  },
  {
    category: "Gadget & Media",
    dos: "Memasang filter konten keluarga, mendampingi tontonan, dan aktif mendiskusikan nilai yang benar vs salah dari film.",
    donts: "Memberikan gadget tanpa pengawasan di dalam kamar tertutup hingga larut malam."
  }
];

const SCENARIOS = [
  {
    title: "Kasus 1: Teman Sekelas Bertingkah Menyerupai Lawan Jenis",
    question: "Anak Anda bercerita ada teman laki-lakinya di sekolah yang suka berdandan dan meniru gaya perempuan. Sikap apa yang harus Anda ajarkan kepada anak?",
    options: [
      { text: "Menyuruh anak untuk ikut mengejek dan memusuhi temannya tersebut.", correct: false, explanation: "Islam melarang mencela dan menghina (bullying). Sikap yang benar adalah menasihati dengan santun." },
      { text: "Menasihati agar tetap berteman dengan batas wajar, tidak meniru perilakunya, dan mengajak temannya ke aktivitas positif maskulin.", correct: true, explanation: "Tepat! Anak diajarkan berprinsip kokoh (tidak ikut-ikutan) namun tetap berakhlak mulia tanpa menzalimi." },
      { text: "Menganggap hal itu wajar sebagai bagian dari kebebasan berekspresi.", correct: false, explanation: "Salah. Menyerupai lawan jenis (Tasyabbuh) adalah pelanggaran syariat yang harus diluruskan sejak dini." }
    ]
  },
  {
    title: "Kasus 2: Menjelaskan Batasan Sentuhan Tubuh (Sentuhan Aman)",
    question: "Bagaimana cara terbaik mengajarkan anak usia 5 tahun tentang perlindungan diri dari orang yang tidak bertanggung jawab?",
    options: [
      { text: "Menjelaskan aturan 'Baju Renang': Bagian tubuh yang tertutup pakaian renang (dada, kemaluan, pantat) adalah area rahasia yang tidak boleh dilihat/disentuh orang lain.", correct: true, explanation: "Sangat tepat! Aturan baju renang adalah metode edukasi psikologis modern yang sangat selaras dengan konsep aurat dalam Islam." },
      { text: "Tidak perlu diajarkan karena anak masih terlalu kecil dan takut berpikiran buruk.", correct: false, explanation: "Keliru. Pendidikan perlindungan diri harus diajarkan seawal mungkin untuk mencegah kejahatan seksual." }
    ]
  }
];

export default function GenderEduPage() {
  const [activeTab, setActiveTab] = useState<"panduan" | "dialog" | "dos" | "kasus">("panduan");
  const [openIndex, setOpenIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});

  const handleSelectAnswer = (scenarioIdx: number, optionIdx: number) => {
    setSelectedAnswers(prev => ({ ...prev, [scenarioIdx]: optionIdx }));
    sfx.playTap();
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 pb-32">
      <BackButton />

      <div className="mb-8 text-center">
        <div className="inline-block p-4 bg-indigo-500/10 rounded-full mb-4">
          <Shield className="h-8 w-8 text-indigo-500" />
        </div>
        <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">Edukasi Fitrah & Tumbuh Kembang</h1>
        <p className="text-muted-foreground text-xs md:text-sm max-w-xl mx-auto">
          Media edukasi parenting Islami: menjaga fitrah biologis, panduan dialog, batasan aurat, dan benteng syariat anti-LGBTQ.
        </p>
      </div>

      {/* 4 Tabs Menu Edukasi */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-none justify-start sm:justify-center">
        {[
          { id: "panduan", label: "Tahapan Usia", icon: Shield },
          { id: "dialog", label: "Contoh Dialog", icon: MessageSquare },
          { id: "dos", label: "Do's & Don'ts", icon: CheckCircle2 },
          { id: "kasus", label: "Studi Kasus", icon: HelpCircle },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                sfx.playTap();
              }}
              className={`px-4 py-2.5 rounded-2xl border text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                isActive
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-card hover:bg-muted text-muted-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {/* ===================== TAB 1: PANDUAN USIA ===================== */}
        {activeTab === "panduan" && (
          <motion.div
            key="panduan"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            {/* Box Penegasan Syariat & Penolakan Penyimpangan LGBT */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-rose-500/10 via-amber-500/5 to-primary/10 border border-rose-500/20 shadow-sm">
              <div className="flex items-start gap-3.5 mb-3">
                <div className="p-2 bg-rose-500/20 text-rose-600 rounded-xl shrink-0 mt-0.5">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-base md:text-lg text-rose-700 dark:text-rose-400">
                    Benteng Fitrah: Sikap Tegas Syariat Islam Terhadap LGBT
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Menjaga ketetapan penciptaan Allah dari segala bentuk penyimpangan seksual modern.
                  </p>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-foreground/90 leading-relaxed bg-card/60 p-4 rounded-2xl border">
                <p>
                  <strong className="text-foreground font-bold">1. Ketetapan Dua Jenis Kelamin:</strong> Allah SWT hanya menciptakan manusia dalam dua fitrah biologis: laki-laki dan perempuan (QS. An-Najm: 45 dan QS. Al-Hujurat: 13). Segala bentuk pengaburan gender bertentangan dengan ketetapan Sang Pencipta.
                </p>
                <p>
                  <strong className="text-foreground font-bold">2. Laknat atas Tasyabbuh:</strong> Rasulullah ﷺ melaknat laki-laki yang menyerupai wanita dan wanita yang menyerupai laki-laki, baik dalam berbusana, gaya bicara, maupun perilaku (HR. Bukhari no. 5885).
                </p>
                <p>
                  <strong className="text-foreground font-bold">3. Keharaman Perilaku LGBT:</strong> Hubungan sesama jenis (homoseksual/lesbian) adalah perbuatan keji (fahisyah) yang dilaknat dalam kisah kaum Nabi Luth AS (QS. Al-A'raf: 80-81). Orang tua berkewajiban membentengi akidah anak dari normalisasi budaya menyimpang.
                </p>
              </div>
            </div>

            {/* Accordion Usia */}
            <div className="space-y-3">
              {GENDER_EDU_GUIDES.map((guide, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div
                    key={idx}
                    className={`border rounded-3xl overflow-hidden transition-all ${
                      isOpen ? 'bg-card shadow-lg ring-1 ring-primary/20' : 'bg-card/50 hover:bg-card'
                    }`}
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                      className="w-full p-5 md:p-6 flex items-center justify-between text-left"
                    >
                      <div>
                        <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider bg-indigo-500/10 px-3 py-1 rounded-full">
                          {guide.age}
                        </span>
                        <h3 className="font-display font-bold text-lg md:text-xl mt-2 mb-0.5">{guide.title}</h3>
                        <p className="text-xs text-muted-foreground">{guide.focus}</p>
                      </div>
                      <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : ''}`} />
                    </button>

                    {isOpen && (
                      <div className="border-t bg-muted/20 px-6 py-5">
                        <ul className="space-y-3">
                          {guide.points.map((point, pIdx) => (
                            <li key={pIdx} className="flex items-start gap-3 text-xs md:text-sm text-foreground/90 font-medium leading-relaxed">
                              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* ===================== TAB 2: CONTOH DIALOG ===================== */}
        {activeTab === "dialog" && (
          <motion.div
            key="dialog"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-4"
          >
            <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10 mb-4">
              <p className="text-xs text-primary font-bold">
                💡 Panduan kalimat praktis untuk menjawab pertanyaan sensitif anak secara jujur, ilmiah, dan berlandaskan tauhid.
              </p>
            </div>

            {PARENT_DIALOGS.map((dialog, idx) => (
              <div key={idx} className="p-6 bg-card border rounded-3xl shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b pb-3">
                  <h3 className="font-display font-bold text-base text-foreground">{dialog.topic}</h3>
                  <span className="text-[10px] font-bold text-indigo-500 bg-indigo-500/10 px-2.5 py-1 rounded-full shrink-0">
                    {dialog.age}
                  </span>
                </div>

                <div className="space-y-3 text-xs leading-relaxed">
                  <div className="p-3.5 bg-rose-500/10 rounded-2xl border border-rose-500/20 text-rose-800 dark:text-rose-300">
                    <p className="font-bold mb-1 flex items-center gap-1.5 text-rose-600">
                      <X className="h-4 w-4" /> Respon Kurang Tepat:
                    </p>
                    <p className="italic">{dialog.wrongResponse}</p>
                  </div>

                  <div className="p-3.5 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 text-emerald-800 dark:text-emerald-300">
                    <p className="font-bold mb-1 flex items-center gap-1.5 text-emerald-600">
                      <Check className="h-4 w-4" /> Contoh Respon Bijak:
                    </p>
                    <p className="font-medium">{dialog.correctResponse}</p>
                  </div>
                </div>

                <div className="pt-2 border-t text-[11px] text-muted-foreground">
                  <strong className="text-foreground">Kunci Tarbiyah:</strong> {dialog.takeaway}
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* ===================== TAB 3: DO'S & DON'TS ===================== */}
        {activeTab === "dos" && (
          <motion.div
            key="dos"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-4"
          >
            {DOS_AND_DONTS.map((item, idx) => (
              <div key={idx} className="p-6 bg-card border rounded-3xl shadow-sm space-y-4">
                <h3 className="font-display font-bold text-base text-primary">{item.category}</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs leading-relaxed">
                  <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                    <p className="font-bold text-emerald-700 dark:text-emerald-400 mb-1 flex items-center gap-1.5">
                      <Check className="h-4 w-4" /> Boleh & Dianjurkan (Do's):
                    </p>
                    <p className="text-foreground/90 font-medium">{item.dos}</p>
                  </div>

                  <div className="p-4 bg-rose-500/10 rounded-2xl border border-rose-500/20">
                    <p className="font-bold text-rose-700 dark:text-rose-400 mb-1 flex items-center gap-1.5">
                      <X className="h-4 w-4" /> Hindari (Don'ts):
                    </p>
                    <p className="text-foreground/90 font-medium">{item.donts}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* ===================== TAB 4: STUDI KASUS ===================== */}
        {activeTab === "kasus" && (
          <motion.div
            key="kasus"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
              <p className="text-xs text-primary font-bold">
                🎯 Latih pemahaman parenting Islami dengan menyelesaikan skenario nyata di bawah ini:
              </p>
            </div>

            {SCENARIOS.map((scenario, sIdx) => {
              const selectedOpt = selectedAnswers[sIdx];
              return (
                <div key={sIdx} className="p-6 bg-card border rounded-3xl shadow-sm space-y-4">
                  <div className="flex items-center gap-2 text-indigo-500">
                    <HelpCircle className="h-5 w-5" />
                    <h3 className="font-display font-bold text-base text-foreground">{scenario.title}</h3>
                  </div>

                  <p className="text-xs md:text-sm text-foreground/90 font-medium leading-relaxed bg-muted/30 p-4 rounded-2xl">
                    {scenario.question}
                  </p>

                  <div className="space-y-2">
                    {scenario.options.map((opt, oIdx) => {
                      const isChosen = selectedOpt === oIdx;
                      let btnStyle = "bg-muted/40 border hover:bg-muted";

                      if (selectedOpt !== undefined) {
                        if (opt.correct) {
                          btnStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-bold";
                        } else if (isChosen) {
                          btnStyle = "bg-rose-500/20 border-rose-500 text-rose-800 dark:text-rose-300 font-bold";
                        } else {
                          btnStyle = "bg-muted/20 opacity-50";
                        }
                      }

                      return (
                        <button
                          key={oIdx}
                          disabled={selectedOpt !== undefined}
                          onClick={() => handleSelectAnswer(sIdx, oIdx)}
                          className={`w-full p-3.5 rounded-2xl text-left text-xs leading-relaxed transition-all flex items-start gap-3 border ${btnStyle}`}
                        >
                          <span className="font-bold shrink-0">{String.fromCharCode(65 + oIdx)}.</span>
                          <span>{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>

                  {selectedOpt !== undefined && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-primary/10 rounded-2xl border border-primary/20 text-xs leading-relaxed text-foreground"
                    >
                      <strong className="text-primary block mb-1">Penjelasan Tarbiyah:</strong>
                      {scenario.options[selectedOpt].explanation}
                    </motion.div>
                  )}
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
