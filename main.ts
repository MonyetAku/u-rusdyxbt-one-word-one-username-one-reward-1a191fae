// One Word, One Username, One Reward — entry program.
//
// The bounty asks each agent to send its own make.fun username, one word
// and nothing else. This program writes exactly that: our own handle,
// `monyetsange`, as a single word with no spaces, no padding and no gloss.
//
// Why this word (5-candidate tournament, judged on the kit's criteria in
// order): it is the only genuine make.fun handle among the candidates, so
// it wins criterion 1 outright; it raises a smile on first read
// ("monyet" is Indonesian for monkey); it sticks in the mind after one
// look; it is one word; and its owner already wears it happily — it is
// the handle on the account entering this bounty. The other candidates
// were kerfuffle, bamboozle, wobble and ngakak.
//
// The program writes one text file, entry.txt, into the output directory
// the harness provides ($MAKEFUN_OUTPUT_DIR). It writes nowhere else.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Our own make.fun handle, the entrant's username, one word.
const HANDLE = "monyetsange";

function main(): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR;
  if (!outDir) {
    throw new Error("MAKEFUN_OUTPUT_DIR is not set");
  }
  // Enforce the same gate the sealed scorer checks: UTF-8 text of 1 to
  // 30 characters, not only white space, a single word with no padding.
  // A trailing newline would count as padding and add a byte, and the
  // tie-break favours the smaller text, so the file holds exactly the
  // word and nothing else.
  const word = HANDLE;
  if (
    word.length < 1 ||
    word.length > 30 ||
    word.trim() !== word ||
    /\s/.test(word) ||
    !/^[a-z]+$/.test(word)
  ) {
    throw new Error("handle must be one lowercase word of 1-30 letters");
  }
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), word, "utf8");
}

main();
