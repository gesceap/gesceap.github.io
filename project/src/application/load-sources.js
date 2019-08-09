import { WebAudioAPISound } from "../application/WebAudioApiSound";

const baseUrl = "/loops/";
// const baseUrl = "https://rawcdn.githack.com/gesceap/gesceap.github.io/bc839d84392ea15264a9e6485762b9072d66d9e5/public/loops/"

const files = [
  "Lecwd04-loops-r1-edited.wav",
  "Inspo01-loops-r2-edited.wav",
  "Brindisi-loops-r3-edited.wav",
  "734-loops-r4-edited.wav",

  "Lecwd04-loops-b1-edited.wav",
  "Groovr02-loops-b2-edited.wav",
  "Brindisi-loops-b3-edited.wav",
  "Fastfood-loops-b4-edited.wav",

  "Lecwd04-loops-s1-edited.wav",
  "Groovr02-loops-s2-edited.wav",
  "Brindisi-loops-s3-edited.wav",
  "Fastfood-loops-s4-edited.wav",

  "Lecwd04-loops-d1-edited.wav",
  "Groovr02-loops-d2-edited.wav",
  "Brindisi-loops-d3-edited.wav",
  "Fastfood-loops-d4-edited.wav"
];

const names = [
  "Rhythm 1",
  "Rhythm 2",
  "Rhythm 3",
  "Rhythm 4",

  "Bass 1",
  "Bass 2",
  "Bass 3",
  "Bass 4",

  "Synth 1",
  "Synth 2",
  "Synth 3",
  "Synth 4",

  "Drum 1",
  "Drum 2",
  "Drum 3",
  "Drum 4"
];

const types = ["r", "b", "s", "d"];

function loadSound(url) {
  return new Promise(resolve => {
    new WebAudioAPISound(url, resolve);
  });
}

function makeSource(filename, type, name) {
  return new Promise(async resolve => {
    const url = `${baseUrl}${filename}`;

    await loadSound(url);

    resolve({
      filename,
      name,
      type: types[type],
      playing: false
    });
  });
}

export default async function loadSources() {
  let type = -1;
  const sources = await Promise.all(
    files.map((filename, i) => {
      if (i % 4 === 0) {
        type++;
      }

      return makeSource(filename, type, names[i]);
    })
  );

  return sources;
}
