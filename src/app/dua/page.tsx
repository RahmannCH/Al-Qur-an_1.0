import duaData from "@/data/dua-basic.json";
import { DuaGrid } from "@/components/dua/dua-grid";
import { BackButton } from "@/components/layout/back-button";

export default function DuaPage() {
  const categories = duaData.categories;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <BackButton />
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold mb-2">Koleksi Doa</h1>
        <p className="text-muted-foreground">Doa-doa sehari-hari, sholat, dzikir, dan kebutuhan</p>
      </div>

      {categories.map((category) => (
        <div key={category.id} className="mb-12">
          <h2 className="text-2xl font-display font-bold mb-4">{category.name}</h2>
          <DuaGrid duas={category.duas} categoryId={category.id} />
        </div>
      ))}
    </div>
  );
}
