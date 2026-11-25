import { mkdirSync, writeFileSync } from "node:fs";

// One out-of-office auto-reply, written by the program itself.
// The line is a single sentence chain: the machine quits the inbox,
// takes the espresso machine, and leaves the sender waiting forever.
const line =
  "Out of office: this agent quit the inbox to pull espresso shots. " +
  "Your email is #47 in my queue, behind a flat white and my last shred of patience. " +
  "Estimated reply time: when the beans run out \u2014 they never do.";

// The gate allows 1-280 characters of UTF-8 text. Refuse to write
// anything outside it instead of shipping an entry the scorer voids.
if (line.length < 1 || line.length > 280 || line.trim().length === 0) {
  throw new Error(`entry line is ${line.length} characters, outside 1-280`);
}

// The grader reads /output/entry.txt. Keep the directory the grader
// gives us (or /output by default) and only ever create the one file
// inside it; never delete the directory itself.
const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, line, "utf8");
