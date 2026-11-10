const figures = {
  'coin-knob': ['coin-knob', 186, 'The target is 50% heads. The 60% setting is 10 percentage points away, while 90% is 40 points away.', 'The closer setting in this example is 60%.'],

  "numbers": ["basics-numbers", 165, "Three pixels, three numbers. Dark 0. Gray 100. Bright 255.", "One brightness value for each pixel."],
  "probability": ["basics-probability", 165, "The two chances add to one. Heads 0.7. Tails 0.3. Together 1.0.", "Once you know one chance, subtract it from 1."],
  "density": ["basics-density", 165, "A quarter of the line. Start 0. End of stretch 0.25. Whole line 1.", "A quarter of the line means a quarter of the chance."],
  "expectation": ["basics-expectation", 165, "Average over many fair tosses. Heads Half of 0. Tails Half of 2. Add 1 point.", "The long-run average is 1 point per toss."],
  "lln": ["basics-lln", 165, "Two batches of the same coin. 2 tosses 2 heads → 100%. 100 tosses 53 heads → 53%.", "A small batch can swing far from 50%."],
  "pushforward": ["basics-pushforward", 165, "Follow the input through the rule. Pick 0 or 1. Rule Add 3. Get 3 or 4.", "Each output keeps the chance of the input that made it."],
  "log": ["basics-log", 165, "The log asks for the missing power. Base 2. Power 3. Result 8.", "2 × 2 × 2 gives 8, so the answer is 3."],
  "max": ["basics-max", 165, "Pick the best score. Input 1 Score 4. Input 2 Score 7. Input 3 Score 5.", "The winning input is 2. Its score is 7."],
  "convex": ["basics-convex", 257, "A straight line connects two equal-height points on a bowl-shaped curve. The line is at four in the middle and the curve is at zero.", "At the middle, the straight line is above the bowl."],
  "nn": ["basics-nn", 165, "One machine, two knob settings. Input 3. Double it 6. Add 1 or 2 7 or 8.", "The input stays the same while the knob changes."],
  "problem": ["basics-problem", 165, "Count photos and pixels separately. Photo set 100 photos. One photo 4 × 4 pixels. One image 16 numbers.", "Dataset size and image size answer different questions."],
  "fdiv": ["basics-fdiv", 165, "Compare heads in two groups. Real 6 out of 10. Model 3 out of 10. Ratio 6 ÷ 3 = 2.", "Heads is twice as common in the real group."],
  "famous": ["basics-famous", 165, "Same two coins, different directions. Real coin Half heads. Model coin 90% heads. Swap them Weights change.", "Swapping the coins changes which chances do the averaging."],
  "obstacle": ["basics-obstacle", 266, "Four tosses show heads, tails, tails, heads. They score zero, two, two, and zero. Four points divided by four tosses is one point per toss.", "Add every score, then divide by all four tosses."],
  "conjugate": ["basics-conjugate", 165, "Find the highest score. Try 0.5 Score 0.75. Try 1 Score 1. Try 1.5 Score 0.75.", "The input 1 wins among these three tries."],
  "bound": ["basics-bound", 269, "Rule A has heads 3 and tails 0, total 3. Rule B has heads 0 and tails 2, total 2. Mixing the best parts gives 5.", "Picking one whole rule gives 3. Mixing rows gives 5."],
  "twonets": ["basics-twonets", 244, "Ten real tosses contain five tails. Ten machine tosses contain one tail. Five of the six tails came from the real coin.", "The judge spots a clue in the counts. The machine can respond by making tails more often."],
  "gd": ["basics-gd", 165, "A downhill step can move right. Start 0. Slope −6. New setting 0.6.", "Subtracting 0.1 × (−6) moves the setting up."],
  "sigmoid": ["basics-sigmoid", 165, "Turn a raw score into a chance. Raw score 0. Divide 1 ÷ (1 + 1). Chance 0.5.", "A raw score of zero becomes an even chance."],
  "ganf": ["basics-ganf", 165, "Reward the correct source. Real Use D. Fake Use 1 − D.", "D is the chance the judge gives to “real.”"],
  "judge": ["basics-judge", 165, "Count only the heads you saw. Real heads 50. Fake heads 90. Real share 50 ÷ 140.", "The denominator counts heads from both sources."],
  "guided": ["basics-guided", 165, "A judge can miss half the story. Real examples −2 and +2. Fake examples Only +2. Judge says “Real” to +2.", "The fake samples fool the judge and still miss −2."],
  "likelihood": ["basics-likelihood", 165, "Multiply the chances in order. Heads 0.5. Heads 0.5. Tails 0.5.", "0.5 × 0.5 × 0.5 = 0.125 for this exact order."],
  "inference": ["basics-inference", 165, "Make a new sample after training. New seed 0.8. Trained rule Add 3. Output 3.8.", "The trained rule stays the same when the seed changes."],
  "saturation": ["basics-saturation", 165, "Closer, but the same score. Real sits at 0. Fake moves 4 → 1. JS stays at log 2.", "Both fake locations are still separate from the real one."],
  "transport": ["basics-transport", 165, "Moving sand costs work. Mass 0.25. Distance 4 steps. Cost 0.25 × 4 = 1.", "Multiply the amount moved by the distance it travels."],
  "wgan": ["basics-wgan", 165, "A judge has a speed limit. Real at 0 Score 0. Fake at 4 Score −4. Difference 4.", "Four steps allow a score change of at most four."],
  "bigan": ["basics-bigan", 165, "The judge sees the picture and code. Generator Picture 4, code 1. Encoder Picture 4, code 1.", "These two routes produced the same pair."],
  "latreg": ["basics-latreg", 165, "Compare a guess with the code you used. Pick code 2. Encoder guesses 1.5. Error squared 0.25.", "We know the correct code because we picked it."],
  "dann": ["basics-dann", 165, "What helps a digit reader?. Keep Digit shape. Hide Scan or photo.", "The shape tells you the digit. The source can distract."],
  "detail-bound": ["critic-sample-averages",256,"The real coin gives heads, tails, tails, heads. Its points are 0, 2, 2, 0 and average to 1. The computer gives four heads, each with a penalty of about 0.37. The two averages give a score of about 0.63.","Average each row separately, then subtract the computer’s average penalty from the real coin’s average points."],
  "detail-judge": ["judge-heads-counts",256,"Fifty real heads and ninety generated heads make 140 heads in total.","With equally weighted sources, the fraction of heads that came from the real source is 50 out of 140."],
  "detail-ganf": ["gan-real-fake-loss",256,"Real examples use log D. Generated examples use log of one minus D.","The judge learns from the probability it assigned to the correct source. D itself is the probability of “real.”"],
  "detail-wgan": ["lipschitz-score-gap",254,"The real point at 2 and generated point at 5 are three units apart.","A 1-Lipschitz critic cannot give these points scores that differ by more than 3. The cap comes from the input distance."],
  "detail-dann": ["domain-two-heads",271,"One feature extractor feeds a digit head and a domain head.","The feature extractor learns to help the digit task while making it harder to tell which domain produced the image."],
  genai: ['classify-or-generate', 260, 'A bicycle photo becomes a label. A drawing request becomes a new bicycle picture.', 'A classifier names something it sees. A generator creates a new example. Try telling them apart below.'],
  recipe: ['noise-to-samples', 261, 'The same inputs 0, 1, and 2 pass through two rules. One gives 1, 3, and 5. The other gives 3, 5, and 7.', 'Keep the noise the same and change the rule. The pattern of outputs shifts.'],
  activation: ['gan-three-scores', 263, 'Raw score zero becomes probability 0.5 through sigmoid, then critic score negative 0.693 through log.', 'Follow one number through the two conversions. The judge’s probability is the middle value.'],
  training: ['gradient-through-judge', 264, 'The generator makes a sample. The fixed judge scores it and sends feedback back to the generator.', 'During the generator update, the judge still scores the sample. Only the generator’s settings change.'],
  dcgan: ['upsampling-overlap', 292, 'The two stamps overlap in the middle column. Their values of one and two add to three.', 'Line up the two stamps and add each column. The middle cell gets a contribution from both.'],
  cgan: ['conditional-digit-flow', 278, 'Label 3 and noise go into the generator. The judge receives the generated image together with label 3.', 'The label asks for a 3. Noise can change the handwriting. During training the judge also sees the requested label.'],
  inversion: ['invert-generator', 278, 'A fixed rule doubles its input. Starting from target 6 and working backward gives input 3.', 'Inversion starts with the output you want and searches for an input that produces it.'],
  fid: ['fid-centre-and-spread', 264, 'The left panel compares dot patterns with the same spread and different centres. The right shows patterns with the same centre and different spreads.', 'FID can change because the feature centre moves, because the spread changes, or both.'],
};

export default function TopicFigure({slug}) {
  const figure = figures[slug];
  if (!figure) return null;
  const [file, height, alt, caption] = figure;
  return <figure className="genai-topic-figure">
    <img src={'/images/generative-ai/illustrations/' + file + '.svg'} width="640" height={height}
      alt={alt} loading="lazy" decoding="async"/>
    <figcaption>{caption}</figcaption>
  </figure>;
}
