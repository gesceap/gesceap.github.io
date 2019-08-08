// import Meyda from "meyda";
// import { MeydaAnalyzer } from "meyda/src/meyda-wa.js";
import { WebAudioAPISound } from "../application/WebAudioApiSound"

// function createNewMeydaAnalyser(options) {
//   return new MeydaAnalyzer(options, Object.assign({}, Meyda));
// }

const baseUrl = "/loops/";
// const baseUrl = "https://rawcdn.githack.com/gesceap/gesceap.github.io/bc839d84392ea15264a9e6485762b9072d66d9e5/public/loops/";

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

const types = ["r", "b", "s", "d"];

function loadSound(url) {
  return new Promise((resolve, reject) => {
    // var request = new XMLHttpRequest();
    // request.open('GET', url, true);
    // request.responseType = 'arraybuffer';

    // // Decode asynchronously
    // request.onload = function() {
    //   resolve()
    // }

    // request.send();

    new WebAudioAPISound(url, resolve)
  })
}

function makeSource(filename, type) {
  return new Promise(async (resolve) => {
    const url = `${baseUrl}${filename}`;

    await loadSound(url)

    resolve({
      filename,
      type: types[type]
    })
    
    // const sound = new Howl({
    //   preload: true,
    //   src: url,
    //   loop: true,
    //   onload() {
    //     const analyser = createNewMeydaAnalyser({
    //       audioContext: Howler.ctx,
    //       source: sound._sounds[0]._node,
    //       bufferSize: 256,
    //       featureExtractors: ["rms", "energy", "buffer"]
    //     });

    //     analyser.start();

    //     resolve({
    //       filename,
    //       playing: false,
    //       sound,
    //       type: types[type],
    //       analyser
    //     });
    //   }
    // });
  });
}

export default async function loadSources() {
  let type = -1;
  const sources = await Promise.all(
    files.map((filename, i) => {
      if (i % 4 === 0) type++;
      return makeSource(filename, type);
    })
  );

  return sources;
}
