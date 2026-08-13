import React from "react";

const TAJWEED_COLORS: Record<string, string> = {
  tajweed_madda_wajib: "text-blue-600",
  tajweed_madda_jaiz: "text-blue-400",
  tajweed_qalqalah: "text-red-600",
  tajweed_ghunnah: "text-green-600",
  tajweed_idgham_ghunnah: "text-green-600",
  tajweed_idgham_no_ghunnah: "text-amber-600",
  tajweed_iqlab: "text-purple-600",
  tajweed_ikhafa: "text-teal-600",
  tajweed_idgham_shafawi: "text-green-500",
  tajweed_ikhafa_shafawi: "text-teal-500",
};

const TAJWEED_LEGEND = [
  { class: "tajweed_madda_wajib", name: "Madd Wajib", color: "text-blue-600", desc: "Harus dipanjangkan 4-5 harakat" },
  { class: "tajweed_madda_jaiz", name: "Madd Jaiz", color: "text-blue-400", desc: "Boleh dipanjangkan 2-4-6 harakat" },
  { class: "tajweed_qalqalah", name: "Qalqalah", color: "text-red-600", desc: "Dibaca memantul" },
  { class: "tajweed_ghunnah", name: "Ghunnah", color: "text-green-600", desc: "Dengung 2 harakat" },
  { class: "tajweed_idgham_ghunnah", name: "Idgham Bighunnah", color: "text-green-600", desc: "Dimasukkan dengan dengung" },
  { class: "tajweed_idgham_no_ghunnah", name: "Idgham Bilaghunnah", color: "text-amber-600", desc: "Dimasukkan tanpa dengung" },
  { class: "tajweed_iqlab", name: "Iqlab", color: "text-purple-600", desc: "Diubah menjadi mim" },
  { class: "tajweed_ikhafa", name: "Ikhafa", color: "text-teal-600", desc: "Dibaca samar dengan dengung" },
  { class: "tajweed_idgham_shafawi", name: "Idgham Syafawi", color: "text-green-500", desc: "Idgham pada bibir" },
  { class: "tajweed_ikhafa_shafawi", name: "Ikhafa Syafawi", color: "text-teal-500", desc: "Ikhafa pada bibir" },
];

export function parseTajweed(html: string): React.ReactNode[] {
  const elements: React.ReactNode[] = [];
  let key = 0;

  const processNode = (node: string): React.ReactNode => {
    const regex = /<tajweed\s+class="([^"]+)"[^>]*>(.*?)<\/tajweed>/g;
    let lastIndex = 0;
    let match;
    const parts: React.ReactNode[] = [];
    let partKey = 0;

    while ((match = regex.exec(node)) !== null) {
      if (match.index > lastIndex) {
        parts.push(
          <span key={`text-${partKey++}`} dangerouslySetInnerHTML={{ __html: node.slice(lastIndex, match.index) }} />
        );
      }

      const tajweedClass = match[1];
      const innerHtml = match[2];
      const colorClass = TAJWEED_COLORS[tajweedClass] || "text-primary";

      parts.push(
        <span key={`tajweed-${partKey++}`} className={colorClass} title={tajweedClass.replace("tajweed_", "")}>
          <span dangerouslySetInnerHTML={{ __html: innerHtml }} />
        </span>
      );

      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < node.length) {
      parts.push(
        <span key={`text-${partKey++}`} dangerouslySetInnerHTML={{ __html: node.slice(lastIndex) }} />
      );
    }

    return parts.length > 0 ? parts : <span dangerouslySetInnerHTML={{ __html: node }} />;
  };

  elements.push(<React.Fragment key={key++}>{processNode(html)}</React.Fragment>);

  return elements;
}

export function getTajweedLegend() {
  return TAJWEED_LEGEND;
}
