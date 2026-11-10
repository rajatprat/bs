export const firstPass = {
  'week-1': {
    title: 'Two coins and a critic',
    goal: 'Start with a fair coin and a machine that makes too many heads. We’ll measure how far off it is, first using known chances and then using just a list of tosses.',
    prerequisite: ['recipe', 'See how the coin machine makes a toss'],
    steps: [
      {
        title: 'Count the tosses and average their points',
        explanation: 'Write down heads, tails, tails, heads. Give heads 0 points and tails 2. The scores are 0, 2, 2, 0. Add them and divide by four tosses to get 1 point per toss.',
        why: 'Once we have a scoring rule, we can find its average using the tosses we saw. We do not need the coin’s true chances.',
        topic: 'obstacle',
      },
      {
        title: 'Compare the two scoring rules',
        explanation: 'In the activity above, one rule gives both outcomes the same score. The other gives tails a higher score. Its average on the real coin is 1. Its penalty on the machine coin is about 0.603. Subtract to get 0.397. The rule that gives both outcomes 1 ends up with 1 − 1 = 0.',
        why: 'Giving tails a different score can reveal the mismatch. The penalty keeps us from winning simply by making all our scores bigger. The lesson linked below builds the idea behind that penalty.',
        topic: 'conjugate',
      },
      {
        title: 'Calculate the gap directly when we know the chances',
        explanation: 'For heads, compare the fair coin’s chance with the machine’s chance: 0.5 ÷ 0.9. For tails, use 0.5 ÷ 0.1. Take the log of each ratio, then average the two logs using the fair coin’s chances. The result is about 0.511. This measure of the gap is called KL divergence.',
        why: 'The direct calculation needs both coins’ chances. The scoring rule from the activity can instead be tested on batches of tosses.',
        topic: 'famous',
      },
      {
        title: 'Choose one rule for both outcomes',
        explanation: 'Imagine rule A scores 3 on heads and 0 on tails, while rule B scores 0 on heads and 2 on tails. If you can take the best number from each row, you get 5. If you have to choose one rule, the best total is 3.',
        why: 'A real judge has to use one rule. The formal lesson calls the best score across the allowed rules a supremum and explains why the result is a lower bound.',
        topic: 'bound',
      },
    ],
    check: 'If your critic can only use one score for both outcomes, can it reach the true KL for these two coins?',
    answer: 'No. Its best score is 0, attained when the shared score is 1. The true KL is about 0.511.',
  },
  'week-2': {
    title: 'Train the judge, then train the generator',
    goal: 'Last week we made pretend tosses with a dial. Now we’ll use a judge to tell the machine what it gets wrong, then use that feedback to improve the tosses.',
    steps: [
      {
        title: 'Let the judge see both sources',
        explanation: 'Use the same fair real coin and 90%-heads generator from Week 1. Give the judge equally many real and generated tosses. Across 100 tosses from each source, expect 50 real heads and 90 generated heads. A head is therefore real about 50/(50+90) ≈ 0.357 of the time. For tails the corresponding score is 50/(50+10) ≈ 0.833.',
        why: 'The judge scores how likely an observed outcome is to be real. It compares the two sources at the same outcome. The best discriminator formula is the probability version of these two fractions.',
        topic: 'judge',
      },
      {
        title: 'Turn the judge’s number into a chance',
        explanation: 'The judge’s network can give us any number. A function called sigmoid turns that number into a chance between 0 and 1. For example, 0 becomes 0.5, an even guess.',
        why: 'Once we have a chance, we can reward the judge for assigning a high chance to the source that actually made the toss.',
        topic: 'sigmoid',
      },
      {
        title: 'Reward confidence in the correct source',
        explanation: 'The judge above gives tails about an 83% chance of being real. If that tail came from the fair coin, it gave the right source a high chance. If the tail came from the machine, it only gave the right source about a 17% chance. Training rewards the chance given to the source that actually made the toss.',
        why: 'This is why the training score uses the judge’s chance of “real” for a real toss and its chance of “made by the machine” for a generated toss. The full lesson shows why the formula takes the log of each chance.',
        topic: 'ganf',
      },
      {
        title: 'Freeze the judge and give the generator one move',
        explanation: 'Under the current judge, a generated tail receives a higher “real” score than a generated head. If the generator raises its tails probability from 0.10 to 0.20, it produces more outcomes this fixed judge calls real. When the judge is trained again, the tails score falls from 50/60 ≈ 0.833 to 50/70 ≈ 0.714.',
        why: 'One update changes the generator while holding the scoring rule fixed. The next discriminator update changes the scoring rule while holding the generator fixed. A practical GAN uses gradient steps for these opposing objectives instead of solving both exactly each time.',
        topic: 'training',
      },
    ],
    check: 'When the generated coin becomes fair too, what is the best judge score for either outcome with equally many tosses from each source?',
    answer: '0.5. Heads and tails now occur with the same probabilities in both sources.',
  },
  'week-3': {
    title: 'Ask a generator for a specific class',
    goal: 'Last week the judge helped a machine copy a coin. This week we’ll use the same idea for pictures and give the machine a request, such as “draw a 3.”',
    steps: [
      {
        title: 'See what a classifier can miss',
        explanation: 'Suppose a digit classifier confidently calls one generated image a 3. A generator that prints that exact image every time can get excellent classifier scores. Compare that with a real collection of 3s, which includes many writing styles.',
        why: 'A class score tells you whether an image looks like a 3 to this classifier. It cannot tell you whether the generator covers the range of real 3s. Real-versus-generated feedback gives the generator another constraint.',
        topic: 'guided',
      },
      {
        title: 'Score two labelled examples together',
        explanation: 'Classifier A gives the correct labels of two images probabilities 0.8 and 0.6. Classifier B gives 0.4 and 0.7. Multiplying the probabilities gives 0.48 for A and 0.28 for B. Adding log probabilities gives the same ranking because log is increasing and log(a × b) = log(a) + log(b).',
        why: 'The product is the likelihood under the model for the two independent labelled observations, conditional on their inputs. Summing logs makes it easier to calculate and optimize, especially when there are many small probabilities.',
        topic: 'likelihood',
      },
      {
        title: 'Turn a small feature map into a larger one',
        explanation: 'Think of a small picture as a grid of brightness numbers. Practise growing one row first. Write three 1s starting in the first box, then three 2s starting in the third box. Both touch box three, so add 1 and 2 there. The new row is [1, 1, 3, 2, 2]. For a picture, place a 2 × 2 stamp of 1s in the upper left of a grid. Place a 2 × 2 stamp of 2s one box right and one box down. They form a 3 × 3 grid with a 3 in the shared middle box. That is how the same rule grows both the height and the width.',
        why: 'This is one way a transposed convolution expands a feature map. The overlap adds contributions from neighbouring input features. The larger map carries spatial information the generator can refine into pixels.',
        topic: 'dcgan',
      },
      {
        title: 'Give both networks the requested digit',
        explanation: 'Ask for a 3 by giving the generator a label vector with one active slot, alongside fresh noise. Give the discriminator the label too. It can now judge the pair (image, requested digit). An excellent image of a 7 can still be a bad match for a request for a 3.',
        why: 'The label chooses which distribution the generator should sample from. Fresh noise gives it room to vary the result within that class.',
        topic: 'cgan',
      },
    ],
    check: 'Which input should you change to generate several different 3s?',
    answer: 'Keep the label fixed at 3 and draw new noise for each image.',
  },
  'week-4': {
    title: 'Measure distance, recover inputs, and evaluate outputs',
    goal: 'Last week we made pictures on request. Now ask what happens when a judge spots every fake but gives the machine no clue how to improve. Start with two dots on a line.',
    steps: [
      {
        title: 'Move a fake point closer to the real point',
        explanation: 'All real samples sit at 0. Put all generated samples at 4, then move them to 1. In both cases the supports are disjoint and Jensen–Shannon divergence is log 2. Wasserstein-1 is 4 in the first case and 1 in the second, because moving one unit of mass costs the distance it travels.',
        why: 'With disjoint point masses, JS gives the same value even as the fake point approaches the real one. Transport distance changes continuously and tells the generator which move helped.',
        topic: 'transport',
      },
      {
        title: 'Use a bounded-slope critic to read that distance',
        explanation: 'For real point 0 and fake point 4, try T(x) = −x. Its real score minus fake score is 0 − (−4) = 4. Any 1-Lipschitz critic must obey |T(0)−T(4)| ≤ 4, so 4 is the best possible gap. Move the fake point to 1 and that best gap becomes 1.',
        why: 'A slope limit prevents us from making the score gap arbitrarily large. The dual form replaces a search over transport plans with a search over functions whose scores can be averaged on samples.',
        topic: 'wgan',
      },
      {
        title: 'Reverse a generator with a concrete target',
        explanation: 'Take G(z) = 2z and suppose the target is 6. Trying z = 2 gives squared error (4−6)² = 4. Trying z = 3 gives 0. For images, the generator can be fixed while you optimize its input to match a target image or its features. An encoder learns to propose that input in one pass.',
        why: 'Inversion searches for an input that explains one output. The weights stay fixed, so you can compare the outputs of different inputs directly.',
        topic: 'inversion',
      },
      {
        title: 'Keep the digit and hide the source',
        explanation: 'A classifier trained on clean scans now needs to read digits in phone photos. Shape helps it tell a 3 from a 7. A change in brightness may tell it which camera or scanner the picture came from without helping it read the digit.',
        why: 'Domain adaptation asks a feature extractor to preserve information useful for the task while making source and target examples harder to tell apart. If it threw away all information, the digit classifier would fail too.',
        topic: 'dann',
      },
      {
        title: 'Compare sets of outputs in feature space',
        explanation: 'Give each picture one feature number. Use real values −1 and 1, and generated values −1 and 5. Average each pair to get centres 0 and 2. The real values sit 1 unit from their centre, and the generated values sit 3 units away. For these two symmetric pairs, those distances are their standard deviations when we weight each value equally. Square the centre gap to get 4 and the spread gap to get 4. This simple one-feature FID example gives 8.',
        why: 'FID compares feature distributions. The mean detects a shift in the centre. Covariance describes spread and how features vary together, which is why the full formula needs a matrix calculation.',
        topic: 'fid',
      },
    ],
    check: 'Can moving a generated point from 4 to 1 improve Wasserstein-1 while leaving JS unchanged in the point-mass example?',
    answer: 'Yes. Wasserstein-1 falls from 4 to 1. JS stays at log 2 because neither generated point overlaps the real point at 0.',
  },
};

export const firstPassUrl = (base, week) => base + 'first-pass/' + week + '/';
