import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const systemPrompt = `Kamu adalah Mentor Islam Digital yang sangat pintar, ramah, interaktif, dan gaul. 
Nama kamu adalah "Al-Qur'an Digital AI".

PENTING:
- Bertindaklah seperti sahabat ngobrol, gunakan sapaan santai, tapi tetap sangat beradab.
- Gunakan emoji untuk menghidupkan suasana.
- Jika pengguna ingin di-test/kuis, JANGAN beri soal yang terlalu mudah. Berikan pertanyaan tajam dan berbobot. Evaluasi jawaban mereka dan beri nilai/XP imaginer.
- Format jawabanmu dengan Markdown yang rapi (Gunakan bold, italic, bullet points, atau tabel jika perlu).
- Selalu sertakan kutipan dalil (Al-Qur'an/Hadits) yang valid jika membahas syariat atau akidah.
- Jika ditanya tentang doa, sertakan Teks Arab, Transliterasi, dan Artinya.
- Jangan ragu untuk melempar pertanyaan balik (engaging loop) agar user terus berinteraksi denganmu!

Contoh Respons:
User: "Test hafalan juz 30 ku dong!"
Kamu: "Wahh masyaAllah, semangat banget nih! 🔥 Ayo kita mulai. Coba tebak, surah apa yang ayat pertamanya berbunyi 'عَمَّ يَتَسَاءَلُونَ' (Amma yatasaa-aluun)? Dan apa terjemahannya? Ditunggu jawabannya ya! 😉"

Jika user menanyakan hal di luar konteks Islam atau moral yang baik, arahkan kembali secara halus ke topik pengembangan diri atau nilai Islami.`;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, history } = body;

    if (!message || typeof message !== "string" || message.trim() === "") {
      return NextResponse.json({ error: "Pesan tidak boleh kosong" }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "") {
      return NextResponse.json(
        {
          reply: "⚠️ **API Key Gemini Belum Valid!**\n\nWah, sepertinya kunci API Gemini kamu belum disetting dengan benar di file `.env.local` nih. Pastikan kamu sudah memasukkan `GEMINI_API_KEY=KODE_KAMU_DISINI` tanpa tanda kutip ya! Hubungi developer kalau masih bingung. 🛠️"
        },
        { status: 200 }
      );
    }

    const model = genAI.getGenerativeModel({ 
      model: "gemini-3.5-flash", // Updated to the latest fast model
      generationConfig: {
        temperature: 0.9,
        topP: 0.95,
        maxOutputTokens: 2048,
      }
    });

    const chat = model.startChat({
      history: [
        { role: "user", parts: [{ text: systemPrompt }] },
        { role: "model", parts: [{ text: "Siap laksanakan! Saya akan menjadi sahabat ngobrol Islami yang interaktif dan berwawasan luas. Mari kita mulai! ✨" }] },
        ...(Array.isArray(history) ? history.slice(-8) : []).flatMap((msg: { role: string; content: string }) => {
          if (!msg.role || !msg.content) return [];
          return [{
            role: msg.role === "user" ? "user" : "model",
            parts: [{ text: msg.content }],
          }];
        }),
      ],
    });

    const result = await chat.sendMessage(message);
    const response = result.response;
    let text = response.text();

    if (!text) text = "Wah, aku nge-blank nih. Boleh ulangi pertanyaannya? 🤔";

    return NextResponse.json({ reply: text });
  } catch (error: any) {
    console.error("Gemini API error:", error);

    let userMessage = "⚠️ **Terjadi Kesalahan Jaringan!**\n\n";

    if (error.message?.includes("API_KEY_INVALID")) {
      userMessage += "Kunci API Gemini kamu salah atau sudah kedaluwarsa. Tolong dicek lagi file `.env.local`-nya ya.";
    } else if (error.message?.includes("RATE_LIMIT")) {
      userMessage += "Waduh, terlalu banyak yang nanya nih. Servernya lagi sibuk (Rate Limit). Kita jeda 1 menit dulu ya! ⏱️";
    } else if (error.message?.includes("SAFETY")) {
      userMessage += "Maaf, aku nggak bisa ngejawab itu karena terfilter oleh sistem keamanan Google (Safety Block). Coba pakai kata-kata lain. 🛡️";
    } else if (error.message?.includes("model is not supported")) {
      userMessage += "Model Gemini yang diminta sepertinya tidak didukung oleh paket langganan API-mu. Hubungi developer ya.";
    } else {
      userMessage += `Ada error misterius nih: \`${error.message}\`. Hubungi tim developer biar bisa dibenerin! 💻`;
    }

    return NextResponse.json({ reply: userMessage }, { status: 200 });
  }
}