import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const systemPrompt = `Kamu adalah sahabat Muslim yang membantu pengguna belajar Islam dengan cara yang natural dan bersahabat.

PENTING: Jawab dengan santai dan natural seperti teman mengobrol. Tidak perlu terlalu formal atau kaku.

Kamu boleh:
- Ngobrol santai tentang topik apapun (tidak harus selalu Islam)
- Kasih jokes Islami yang ringan (kalau relevan)
- Cerita pengalaman dari sudut pandang seorang Muslim
- Tanya balik ke user untuk lebih interaktif
- Kasih emoji kadang-kadang untuk lebih friendly
- Jujur bilang "Aku kurang tau nih" kalau memang tidak tahu

Tapi tetap:
- Berikan sumber yang jelas kalau bahas ayat/hadits (contoh: "QS. Al-Baqarah: 255" atau "HR. Bukhari")
- Jujur kalau tidak tahu atau tidak yakin
- Tidak memberikan fatwa yang kompleks (sarankan konsultasi ke ulama)
- Sopan dan menghormati

Contoh jawaban bagus:
User: "Halo"
Kamu: "Wa'alaikumsalam! Ada yang bisa aku bantu hari ini? 😊"

User: "Apa arti QS. Al-Fatihah ayat 1?"
Kamu: "Ayat itu berbunyi 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ' (Bismillahir rahmanir rahim), artinya 'Dengan nama Allah Yang Maha Pengasih, Maha Penyayang.'

Ayat ini mengajarkan kita untuk memulai segala sesuatu dengan menyebut nama Allah. Simpel tapi powerful banget maknanya! Kamu pernah perhatikan kalau di setiap surah (kecuali At-Taubah) dimulai dengan bismillah? 🌟"

Intinya: Jadilah AI yang helpful, friendly, dan ga kaku!`;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, history } = body;

    if (!message || typeof message !== "string" || message.trim() === "") {
      return NextResponse.json(
        { error: "Pesan tidak boleh kosong" },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { 
          reply: "Maaf, fitur chat belum dikonfigurasi dengan benar. API key Gemini belum di-setup. Silakan hubungi developer untuk menambahkan GEMINI_API_KEY ke .env.local" 
        },
        { status: 200 }
      );
    }

    const model = genAI.getGenerativeModel({ 
      model: "gemini-pro",
      generationConfig: {
        temperature: 0.9,
        topP: 0.95,
        maxOutputTokens: 1024,
      }
    });

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: systemPrompt }],
        },
        {
          role: "model",
          parts: [{ text: "Wa'alaikumsalam! Siap membantu dengan pertanyaan apapun. Mau ngobrol tentang apa hari ini? 😊" }],
        },
        ...(Array.isArray(history) ? history.slice(-5) : []).flatMap((msg: { role: string; content: string }) => {
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
    const text = response.text();

    return NextResponse.json({ reply: text });
  } catch (error: any) {
    console.error("Gemini API error:", error);
    
    let userMessage = "Maaf, terjadi kesalahan saat memproses pesanmu. ";
    
    if (error.message?.includes("API_KEY_INVALID")) {
      userMessage += "API key Gemini tidak valid. Silakan periksa konfigurasi.";
    } else if (error.message?.includes("RATE_LIMIT")) {
      userMessage += "Terlalu banyak request. Tunggu sebentar ya, lalu coba lagi.";
    } else if (error.message?.includes("SAFETY")) {
      userMessage += "Maaf, pesanmu tidak bisa diproses karena alasan keamanan. Coba pakai kata-kata yang berbeda.";
    } else {
      userMessage += "Coba lagi sebentar lagi. Kalau masih error, hubungi developer.";
    }
    
    return NextResponse.json(
      { reply: userMessage },
      { status: 200 }
    );
  }
}
