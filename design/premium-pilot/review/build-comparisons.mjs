import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import sharp from "sharp";

// Review montage only: resize/contain images without photo retouch or crops.
const directory = path.dirname(fileURLToPath(import.meta.url));
const pilot = path.resolve(directory, "..");
const root = path.resolve(pilot, "../..");
const escape = (value) =>
  value.replaceAll("&", "&amp;").replaceAll("<", "&lt;");

async function comparison(name, columns, width, height, footer) {
  const gap = 24;
  const cellWidth = Math.floor(
    (width - gap * (columns.length + 1)) / columns.length,
  );
  const top = 92;
  const canvasHeight = top + height + 76;
  const layers = [];
  let labels = "";
  for (const [index, column] of columns.entries()) {
    const left = gap + index * (cellWidth + gap);
    const input = await sharp(path.resolve(root, column.file))
      .rotate()
      .resize(cellWidth, height, { fit: "contain", background: "#202326" })
      .png()
      .toBuffer();
    layers.push({ input, top, left });
    labels += `<text x="${left}" y="39" font-size="22" font-weight="700">${escape(column.title)}</text><text x="${left}" y="67" font-size="15" fill="#b3b8b8">${escape(column.subtitle)}</text>`;
  }
  const svg = `<svg width="${width}" height="${canvasHeight}"><g font-family="Arial, sans-serif" fill="#f3f1ec">${labels}<text x="24" y="${canvasHeight - 29}" font-size="18" fill="#ccc3ac">${escape(footer)}</text></g></svg>`;
  layers.push({ input: Buffer.from(svg), top: 0, left: 0 });
  await sharp({
    create: { width, height: canvasHeight, channels: 3, background: "#16191b" },
  })
    .composite(layers)
    .jpeg({ quality: 94, chromaSubsampling: "4:4:4" })
    .toFile(path.join(directory, name));
}

const sourceHero = "design/img/IMG_20220801_164013.jpg";
for (const [id, title, file] of [
  ["a", "A — ГРАФИТ И ДУБ", "hero-a-graphite-living.png"],
  ["b", "B — ОЛИВА И КОЖА", "hero-b-olive-reading.png"],
]) {
  await comparison(
    `hero-${id}-comparison.jpg`,
    [
      {
        file: sourceHero,
        title: "ИСХОДНАЯ ФОТОГРАФИЯ",
        subtitle: "Реальное помещение · IMG_20220801_164013.jpg",
      },
      {
        file: `design/premium-pilot/visualizations/${file}`,
        title,
        subtitle: "Интерьерная визуализация · не выполненный объект",
      },
    ],
    1920,
    520,
    "Мебель, композиция и часть поверхностей созданы GPT-Image-2. Маркировка визуализации обязательна.",
  );
}

await comparison(
  "bathroom-comparison.jpg",
  [
    {
      file: "design/img/IMG_20220801_154610.jpg",
      title: "ИСХОДНАЯ ФОТОГРАФИЯ",
      subtitle: "Реальный объект · без ретуши",
    },
    {
      file: "design/premium-pilot/rejected/bathroom-retouch-v1.png",
      title: "ПОПЫТКА 1 — ОТКЛОНЕНА",
      subtitle: "Перерисованы светильники, фактура и кромки",
    },
    {
      file: "design/premium-pilot/rejected/bathroom-retouch-v2.png",
      title: "ПОПЫТКА 2 — ОТКЛОНЕНА",
      subtitle: "Убран рулон, но материалы всё ещё изменены",
    },
  ],
  1800,
  1010,
  "Обе попытки не допущены в документальное портфолио. Лимит генерации: 5 из 5 вызовов.",
);

const provenanceFile = path.join(pilot, "provenance.json");
const provenance = JSON.parse(await fs.readFile(provenanceFile, "utf8"));
for (const record of provenance.records) {
  const outputPath = path.join(pilot, record.file);
  const buffer = await fs.readFile(outputPath);
  const meta = await sharp(buffer).metadata();
  record.outputMetadata = {
    width: meta.width,
    height: meta.height,
    bytes: buffer.length,
    sha256: createHash("sha256").update(buffer).digest("hex"),
  };
  record.inputsMetadata = await Promise.all(
    record.inputs.map(async (input) => {
      const inputBuffer = await fs.readFile(path.resolve(root, input));
      const info = await sharp(inputBuffer).metadata();
      return {
        file: input,
        width: info.width,
        height: info.height,
        sha256: createHash("sha256").update(inputBuffer).digest("hex"),
      };
    }),
  );
}
await fs.writeFile(provenanceFile, JSON.stringify(provenance, null, 2) + "\n");
console.log(
  "Built 3 comparison sheets. Recorded original input and output dimensions and hashes.",
);
