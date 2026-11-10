export const beginnerLessons = {
  1: {
    question: 'What does it mean for a computer to generate something?',
    setup: 'Imagine two apps. You show one a bicycle photo and ask what is in it. You ask the other to draw a bicycle.',
    figure: 'genai',
    steps: [
      'The first app returns the word “bicycle.” Picking a label for something it sees is called classification.',
      'The second app returns a picture. Producing an example is called generation.',
      'Asking for a bicycle rather than any picture gives the generator a condition. The request guides what it makes.',
    ],
    practice: [
      ['An app reads a photo and returns “cat.” What did it do?', 'It classified the photo by picking a label.'],
      ['An app draws three different cats after the same request. What stayed fixed?', 'The request stayed “cat.” The output picture varied.'],
    ],
    next: 'To make pictures, a computer needs a way to represent them. Next we’ll turn a tiny picture into numbers.',
  },
  2: {
    question: 'How does a computer see a picture?',
    setup: 'Think of a black-and-white picture as a grid of tiny squares called pixels. Give each square a number for how bright it is.',
    figure: 'numbers',
    steps: [
      'Use 0 for black and 255 for white. Numbers in between are shades of grey.',
      'A row with black, grey and white can be written [0, 100, 255].',
      'For two rows of three pixels, write the first row and then the second. That takes 2 × 3 = 6 numbers. Colour pictures often use three numbers per pixel, one each for red, green and blue.',
    ],
    practice: [
      ['How many brightness values describe a 4 × 4 greyscale picture?', '16. There are four rows with four values in each.'],
      ['How many values would the same grid need with red, green and blue at each pixel?', '48. There are 16 pixels with three values each.'],
    ],
    next: 'Many lists can describe a bicycle. Next we’ll learn how to describe which outcomes are common and which are rare.',
  },
  3: {
    question: 'How do we describe what a coin might do?',
    setup: 'You can’t predict the next toss of a fair coin, but you can describe its two possible results and their chances. That list of outcomes and chances is its distribution.',
    figure: 'probability',
    steps: [
      'For a coin that gives heads 70% of the time, imagine about 70 heads out of 100 tosses in the long run.',
      'All the other tosses are tails. So the tails chance is 100% − 70% = 30%.',
      'Taking one toss is called sampling. For a number picked evenly along a line from 0 to 1, we ask about a range instead of a single point. The stretch from 0 to 0.25 covers one quarter of the line, so its chance is 25%.',
    ],
    practice: [
      ['A coin has a 20% chance of tails. What is the chance of heads?', '80%, because the two chances add to 100%.'],
      ['Pick a number evenly from 0 to 1. What is the chance it lands between 0.2 and 0.6?', '40%. That stretch has length 0.6 − 0.2 = 0.4 out of 1.'],
    ],
    next: 'Next we’ll see what we can learn when someone hands us a list of tosses and keeps the chances secret.',
  },
  4: {
    question: 'What if we can see the results but nobody tells us the chances?',
    setup: 'Someone lends you a coin and asks you to build a computer version that behaves like it. You’re allowed to toss it.',
    figure: 'lln',
    steps: [
      'Suppose the first four results are heads, tails, tails, heads. That is 2 heads out of 4, so 50% of this batch is heads.',
      'Two more heads would bring the total to 4 out of 6, about 67%. The coin itself could have stayed exactly the same.',
      'With many independent tosses of the same coin, the fraction usually gives us a better estimate of the true chance. The tosses are our data. The unknown chances are what we want to learn.',
    ],
    practice: [
      ['Six of ten tosses are heads. What fraction of this batch is heads?', '6 ÷ 10 = 0.6, or 60%.'],
      ['Does the batch prove the coin’s heads chance is exactly 60%?', 'No. A different batch from the same coin can give a different fraction.'],
    ],
    next: 'Next we’ll make an adjustable coin on the computer and see how a setting changes its chances.',
  },
  5: {
    question: 'How do we decide which setting to use?',
    setup: 'Suppose our target is a coin with a 50% chance of heads. Our computer has a knob that sets how often it says heads.',
    figure: 'coin-knob',
    steps: [
      'Try setting the knob to 90%. Its heads chance misses the target by 40 percentage points.',
      'Try 60%. It misses by 10 percentage points, so it is closer under this way of measuring the gap.',
      'The recipe is to pick an adjustable machine, decide how to measure a gap, then look for settings that make the gap smaller. Here we know the target chance. With real data we usually have to work from examples.',
    ],
    practice: [
      ['Which is closer to the 50% target, 20% or 55%?', '55%. The gaps are 30 and 5 percentage points.'],
      ['What would you need to estimate the target if nobody told you it was 50%?', 'A batch of tosses from the real coin. The fraction of heads estimates the target.'],
    ],
    next: 'Next we’ll build the knob itself out of a random number and one comparison.',
  },
  6: {
    question: 'How can a random number become a coin toss?',
    setup: 'Ask the computer to pick a fresh number evenly between 0 and 1. This starting number is the seed for one output in our example.',
    figure: 'density',
    steps: [
      'Put the knob at 0.25. Say “heads” if the number is below 0.25 and “tails” otherwise.',
      'A draw of 0.10 gives heads. A draw of 0.80 gives tails.',
      'The heads region occupies one quarter of the line, so the computer says heads 25% of the time. Change the knob to change that chance. Draw a fresh number to make a new toss with the same setting.',
    ],
    practice: [
      ['At setting 0.25, what does the draw 0.40 produce?', 'Tails, since 0.40 is above the cutoff.'],
      ['What setting gives heads about 70% of the time?', '0.70. It puts 70% of the line in the heads region.'],
    ],
    next: 'We can now make tosses. Next we’ll learn the few maths shortcuts we’ll use to compare them.',
  },
  7: {
    question: 'How do we average scores when outcomes have different chances?',
    setup: 'Give heads 0 points and tails 2 points. A fair coin will earn more points in some batches than others. What score should we expect per toss in the long run?',
    figure: 'expectation',
    steps: [
      'Imagine 100 tosses with exactly 50 heads and 50 tails. The total is 50 × 0 + 50 × 2 = 100 points.',
      'Divide by 100 tosses to get 1 point per toss. Using chances directly gives the same calculation, 0.5 × 0 + 0.5 × 2 = 1.',
      'That chance-weighted average is called an expectation. The symbol Σ tells you to add the terms. For a smooth range the integral symbol ∫ plays the role of adding contributions across the range.',
      'A log asks for a missing power. For example, log base 2 of 8 is 3 because 2³ = 8. We’ll use natural logs, which use the base e.',
    ],
    practice: [
      ['If tails has chance 25%, what is the expected score?', '0.75 × 0 + 0.25 × 2 = 0.5 point per toss.'],
      ['What is log base 2 of 4?', '2, because 2² = 4.'],
    ],
    math: 'Here are two more tools. A convex curve lies on or below any line segment joining two points on it. For the curve y = x², both x = −2 and x = 2 give 4, while the midpoint x = 0 gives 0. A supremum is the smallest upper limit of the available values. On the open interval from 0 to 1, you can get as close to 1 as you like, so 1 is the supremum even though 1 is excluded.',
    next: 'Next we’ll use the weighted average and the log together to compare two coins.',
  },
  8: {
    question: 'How far is our computer coin from the real coin?',
    setup: 'The real coin is fair. The computer coin gives heads 90% of the time and tails 10% of the time. Let’s calculate one specific gap called KL divergence.',
    figure: 'famous',
    steps: [
      'For heads, divide the real chance by the computer chance. That gives 0.50 ÷ 0.90 ≈ 0.56. For tails, use 0.50 ÷ 0.10 = 5.',
      'Take the natural log of each ratio. The first is about −0.588 and the second is about 1.609. A ratio below 1 has a negative log. A ratio above 1 has a positive log.',
      'Both outcomes have chance 0.50 on the real coin, so give each log half the weight. The result is about 0.511. The real coin sets the weights because this is KL measured from the real coin to the computer coin.',
    ],
    practice: [
      ['If both coins have the same chances, what are the two ratios and the KL gap?', 'Both ratios are 1. Their logs are 0, so the gap is 0.'],
      ['Why can reversing the order change KL?', 'It reverses the ratios and changes which coin supplies the weights.'],
    ],
    next: 'This calculation used both coins’ chances. Next we’ll use just the tosses we can see.',
  },
  9: {
    question: 'What can we calculate from tosses alone?',
    setup: 'Suppose you saw heads, tails, tails, heads from the real coin. A rule gives heads 0 points and tails 2 points.',
    figure: 'obstacle',
    steps: [
      'Write down one score for every toss, including the zeroes. The scores are 0, 2, 2, 0.',
      'Add them to get 4. Divide by all 4 tosses to get 1 point per toss.',
      'This is a sample average, meaning the average for the tosses we saw. It estimates the long-run average. The direct KL formula still needs the unknown chances, so next we need a different way to use these averages.',
    ],
    practice: [
      ['What is the average for heads, tails, heads, heads?', 'The scores add to 2. Divide by four to get 0.5.'],
      ['Why divide by four when only one toss earned points?', 'All four tosses are part of the batch. The zero scores count in the average.'],
    ],
    next: 'Next we’ll work both halves of the calculation, first for the real coin and then for the computer coin.',
  },
  10: {
    question: 'How do two lists of tosses give one score?',
    setup: 'The real coin gives heads, tails, tails, heads. The computer gives four heads. We want a score we can calculate even if nobody tells us either coin’s chances.',
    figure: 'detail-bound',
    steps: [
      'Pick a critic, which is a rule that gives each result points. Use 0 for heads and 2 for tails. We’ll write T for this rule.',
      'For the real coin, average those points directly. Add 0 + 2 + 2 + 0 and divide by 4 to get 1.',
      'For the computer coin, first turn each points value into a penalty. The KL formula uses e raised to (points − 1). That makes 0 points cost about 0.37 and 2 points cost about 2.72. All four computer tosses are heads, so the average penalty is 0.37.',
      'Subtract the penalty average from the real points average. This batch gives about 1 − 0.37 = 0.63. The penalty makes it costly to raise all the points just to make the real average bigger.',
    ],
    math: 'Where does the penalty come from? The conjugate takes a trial points value t and finds the biggest value of ut − u log u as u varies over positive numbers. For t = 1, the slope in u is −log u. It is positive below 1 and negative above 1, so the peak is at u = 1, where the value is 1. For any t, the same slope argument gives the peak at u = e raised to (t − 1). Substituting that u gives the same number as the value at the peak, which is our KL penalty.',
    secondMath: 'Why can the supremum move outside the integral? Imagine scoring two equally likely outcomes. Rule A contributes (3, 0) and rule B contributes (0, 2). If you are allowed to choose the best contribution separately for each outcome, you get (3 + 2) ÷ 2 = 2.5. If you choose the best whole rule after averaging each one, you get max(1.5, 1) = 1.5. The point-by-point choice can match any whole rule and can sometimes do better. In the derivation that is why the integral of the pointwise supremum is at least the supremum of the integrals over the allowed critics. Supremum means the best upper limit, even when no rule reaches it. The exact population inequality uses true averages. A score computed from a small batch can exceed the true KL.',
    practice: [
      ['What if the computer gives tails every time and the real list stays the same?', 'Its average penalty becomes about 2.72, so the score is about 1 − 2.72 = −1.72. A chosen critic can give a negative score.'],
      ['What score do you get if the critic gives both outcomes 1 point?', 'The real average is 1. The penalty is e⁰ = 1 for every computer toss. The score is 0 for any batch.'],
    ],
    next: 'We picked the critic by hand. Week 2 asks how a computer can learn the critic and use its feedback to improve the generator.',
  },
  11: {
    question: 'Why do we need a machine and a judge?',
    setup: 'In Week 1 we made a computer coin and wrote our own rule for comparing it with a real coin. For pictures, it’s hard to write a scoring rule by hand. We can train a second machine to give the scores.',
    figure: 'twonets',
    steps: [
      'The generator makes examples. In ten tosses, suppose the computer gives one tail while the real coin gives five.',
      'The judge sees both batches during training. Of the six tails, five came from the real coin. So in these batches, 5 ÷ 6 ≈ 83% of the tails came from the real coin. A tail is a clue about the source.',
      'The generator can use the judge’s feedback to make more tails. As the generator changes, the judge needs to look again for clues. This setup is called a generative adversarial network, or GAN.',
    ],
    practice: [
      ['Which network makes examples?', 'The generator. The judge scores examples.'],
      ['Why might a judge need to learn again after the generator changes?', 'A clue that worked on the old examples might be weaker on the new ones.'],
    ],
    next: 'Next we’ll give the judge a score that you can read as a chance of being real.',
  },
  12: {
    question: 'How can the judge turn a number into a chance?',
    setup: 'A judge’s network can return a raw score such as −2, 0 or 2. To read its answer as a chance of “real,” we need a number between 0 and 1.',
    figure: 'sigmoid',
    steps: [
      'A conversion called sigmoid sends −2 to about 0.12, 0 to 0.50 and 2 to about 0.88.',
      'A higher raw score always gives a higher chance. Zero becomes an even guess.',
      'We call this chance D. A judge that outputs a real-versus-generated chance is called a discriminator. If D is 0.88, it gives 0.12 to “generated,” since the two chances add to 1.',
    ],
    practice: [
      ['A raw score is zero. What chance does the judge give to “real”?', '0.50, or 50%.'],
      ['If D = 0.30, what chance does it give to “generated”?', '1 − 0.30 = 0.70, or 70%.'],
    ],
    next: 'Next we’ll see how to give the judge credit for the chance it assigned to the correct source.',
  },
  13: {
    question: 'How do we score the judge’s answers?',
    setup: 'Show the judge one real toss and one computer toss. Suppose it gives the real toss a 0.8 chance of being real and the computer toss a 0.3 chance of being real.',
    figure: 'ganf',
    steps: [
      'For the real toss the right answer is “real,” so take the 0.8 directly.',
      'For the computer toss the right answer is “generated,” so use 1 − 0.3 = 0.7.',
      'The GAN score adds log(0.8) and log(0.7), giving about −0.58 for these two examples. If the judge gets more confident in the correct answer, its log score moves closer to zero and gets higher.',
      'Adding logs combines the two correct-answer chances the same way as taking the log of their product. A very small correct-answer chance makes the score much worse.',
    ],
    practice: [
      ['The judge says a computer toss has a 0.9 chance of being real. Which number goes into the log?', '0.1. The correct answer is “generated.”'],
      ['Which is a better score for a real toss, log(0.9) or log(0.2)?', 'log(0.9) is higher. The judge assigned more chance to the correct answer.'],
    ],
    next: 'Now that we can score the judge, we can follow one turn for each network.',
  },
  14: {
    question: 'What actually changes when the networks take turns?',
    setup: 'Our real coin makes about five tails in ten tosses. The computer makes about one. Think of training as two turns with different jobs.',
    figure: 'training',
    steps: [
      'First leave the generator’s setting alone. Train the judge on both sources. In our example tails are more common in the real batch, so the judge can learn to give tails a higher “real” score.',
      'Now freeze the judge, meaning its settings stay the same. The generator can make more tails, which this judge scores as more likely to be real.',
      'Repeat with fresh examples. In practice each network takes small steps. A gradient tells us how changing a setting a little would change the score.',
    ],
    math: 'For a loss we want to shrink, subtract a small multiple of its slope. If the slope is −6 at setting 0, increasing the setting a little lowers the loss. The update 0 − 0.1 × (−6) = 0.6 moves it right for exactly that reason. Freezing the judge still lets its output tell us how changing the generator’s examples would affect their scores.',
    practice: [
      ['During the generator’s turn, does the judge still score its examples?', 'Yes. The judge gives feedback with its current rule while its settings stay fixed.'],
      ['What can the judge learn when both coins make heads and tails with the same chances?', 'With equally many examples from the two sources, the outcome gives no clue. The best probability guess for either outcome is 0.5.'],
    ],
    next: 'Week 3 takes this idea from coins to pictures and asks how to make pictures of a digit we choose.',
  },
  15: {
    question: 'Why isn’t “that looks like a 3” enough feedback?',
    setup: 'In Week 2 a judge compared real and generated samples. Now imagine giving a generator a different judge, a digit reader that only checks whether a picture looks like a 3.',
    figure: 'guided',
    steps: [
      'Imagine real examples come in two styles, narrow and wide. The digit reader calls both styles a 3.',
      'A generator learns to make one wide 3 and prints it every time. The reader may score every image highly, even though we never see the narrow style.',
      'A judge that compares real and generated examples can look for clues the digit reader ignores. The diagram shows the same problem with two numbers instead of two drawing styles.',
    ],
    practice: [
      ['If every generated picture is the same excellent 3, what is missing?', 'Variety. Real 3s come in different styles.'],
      ['Why compare batches of pictures with real data?', 'A batch reveals which kinds of examples appear and which kinds the generator keeps missing.'],
    ],
    next: 'Next we’ll see how the generator turns a small set of numbers into a grid big enough to draw a picture.',
  },
  16: {
    question: 'How can a generator grow a small grid into a picture?',
    setup: 'A picture needs many pixels. A DCGAN, a GAN designed around image grids, grows smaller grids in stages. Start with a single row to see how one stage can work.',
    figure: 'dcgan',
    steps: [
      'Take the two input values 1 and 2. Let each value stamp itself across three neighbouring boxes.',
      'Put the first stamp in boxes 1–3 and the second in boxes 3–5. At box 3, the two stamps overlap, so add 1 + 2 = 3.',
      'Read off the row [1, 1, 3, 2, 2]. A layer called transposed convolution can do this in rows and columns, with learned values controlling what gets stamped.',
    ],
    practice: [
      ['Use the same placement with inputs 2 and 4. What is the middle value?', '6, because both stamps contribute to that box.'],
      ['What are the five values in that new row?', '[2, 2, 6, 4, 4]. Only the middle box receives both values.'],
    ],
    next: 'Now that the machine can build a picture, let’s give it a way to choose which digit to draw.',
  },
  17: {
    question: 'How do we ask for a 3 and still get different drawings?',
    setup: 'Give the generator two inputs. The label says which digit you want. A fresh random input lets it draw a different version of that digit.',
    figure: 'cgan',
    steps: [
      'Give it label 3 with one random input. It might draw a wide 3. Give it label 3 with another input and it might draw a narrow 3.',
      'During training, show the judge the requested label along with the picture. A neat 7 is still a poor match when the label says 3.',
      'After training, keep the learned settings fixed. Making a new picture with those settings is called inference.',
    ],
    practice: [
      ['Which input should you change to get another 3?', 'The random input. Keep the requested label at 3.'],
      ['Why does the judge see the label too?', 'It can judge whether the image matches the request as well as whether it looks real.'],
    ],
    next: 'Week 4 starts with a problem that can happen even when the judge does its job very well. It spots every fake but gives the generator little guidance.',
  },
  18: {
    question: 'How can a perfect judge leave the generator stuck?',
    setup: 'Last week the judge checked pictures. Put pictures aside for a minute and imagine each sample is a dot on a number line. All the real dots sit at 0.',
    figure: 'saturation',
    steps: [
      'Put all the generated dots at 4. The judge can be perfect by calling 0 real and 4 generated.',
      'Move the generated dots from 4 to 1. They are much closer to 0, but the judge can still tell the two groups apart perfectly.',
      'The Jensen–Shannon gap, or JS, is log 2 in both cases. It stays flat while the groups have no positions in common. This is an example of saturation, where a score stops changing even as we change the input.',
    ],
    math: 'JS compares each group to a half-and-half mixture of the two groups. Wherever one group has all the chance, the mixture has half as much. The ratio is 1 ÷ 0.5 = 2, so each comparison gives log 2. This happens at distance 4 and at distance 1. Once the two positions match, each group is identical to the mixture and the gap drops to zero.',
    practice: [
      ['If the fake dots move from 4 to 2, can the judge still separate the two groups?', 'Yes. All real dots are at 0 and all fake dots are at 2.'],
      ['What information does the unchanged JS score leave out here?', 'How far apart the two groups are on the line.'],
    ],
    next: 'Next we’ll measure how far the dots have to travel, so moving them closer will change the score.',
  },
  19: {
    question: 'Can we measure the gap by moving sand?',
    setup: 'Picture one unit of sand at position 4. We want it at position 0. The cost of moving it is the amount of sand times the distance.',
    figure: 'transport',
    steps: [
      'Moving all the sand from 4 to 0 costs 1 × 4 = 4. Starting at 1 instead costs 1 × 1 = 1.',
      'If sand starts at several places and has several destinations, try possible ways to move it and use the cheapest total cost. This is the Wasserstein-1 distance.',
      'A Wasserstein GAN uses a critic whose score can change by at most one point per unit of distance. For example, give position x the score −x. The real dot at 0 gets 0 and the fake dot at 4 gets −4, a gap of 4.',
    ],
    math: 'Why cap the critic’s slope? Without the cap, the rule −10x would give these dots a score gap of 40 even though they are only 4 units apart. With the cap no allowed rule can give these two dots a gap greater than 4, and −x reaches 4. This slope limit is called 1-Lipschitz.',
    practice: [
      ['Half a unit of sand moves 2 steps. The other half moves 4. What does that plan cost?', '0.5 × 2 + 0.5 × 4 = 3.'],
      ['Can an allowed critic assign scores 0 and 5 to points 3 units apart?', 'No. The score difference is 5 and the limit is 3.'],
    ],
    next: 'So far we’ve changed or compared the outputs of a generator. Next we’ll work backward from one output to an input that could produce it.',
  },
  20: {
    question: 'If we have the output, can we find an input that makes it?',
    setup: 'Imagine a generator with a simple rule. It doubles whatever number you put in. You want it to produce 6.',
    figure: 'inversion',
    steps: [
      'Try 2. The generator gives 4, which is 2 away from the target.',
      'Try 3. The generator gives 6, exactly what we wanted. Finding an input that explains an output is called inversion.',
      'With pictures, we can keep the generator fixed and search for an input whose picture looks like the target. Another option is to train an encoder, a machine that guesses the input code from a picture.',
    ],
    practice: [
      ['Which input produces 10 under the doubling rule?', '5, because 2 × 5 = 10.'],
      ['What changes during a search for an input to a fixed generator?', 'The input changes. The generator’s learned settings stay fixed.'],
    ],
    next: 'Next we’ll use a judge for a different job. Instead of judging pictures for a generator, it will help a digit reader work with a new kind of photo.',
  },
  21: {
    question: 'How can a digit reader trained on scans work on phone photos?',
    setup: 'You trained a reader on neat scans. Your users take phone photos with shadows. The digit shapes still matter, but the pictures look different.',
    figure: 'dann',
    steps: [
      'Call the scans one domain and the photos another. A domain is the kind of source the examples came from.',
      'A feature is a piece of information extracted from a picture. Keep features that help read the digit, like its shape.',
      'Train a second judge to guess the source from the features. Train the feature maker to make this source guess harder while still letting the digit reader do its job. This is domain-adversarial training.',
    ],
    practice: [
      ['If shadows identify phone photos but do not help read digits, why might we want to ignore them?', 'The reader could otherwise rely on a clue that changes across sources.'],
      ['Would giving both judges a blank image solve the job?', 'No. The source judge may be confused, but the digit reader would lose the shape it needs.'],
    ],
    next: 'For the final lesson we’ll return to generators and check a whole batch of pictures at once.',
  },
  22: {
    question: 'How do we compare two batches of pictures?',
    setup: 'Imagine that we turn each picture into one number describing a visible feature, such as stroke width. A batch can differ from real pictures in its typical value, its variety, or both. Think of these numbers as signed measurements relative to a reference width.',
    figure: 'fid',
    steps: [
      'Use real feature values −1 and 1. Their average is 0, and each value is 1 away from the average.',
      'Use generated feature values −1 and 5. Their average is 2, and each value is 3 away from the average.',
      'In this one-feature example the centre gap is 2 and the spread gap is 2. Squaring and adding gives 2² + 2² = 8. This is a toy version of FID, which compares the centres and spreads of many learned picture features.',
    ],
    practice: [
      ['If the generated values are 1 and 3, how much of the toy score comes from spread?', 'Zero. Both pairs are spread 1 unit from their own centres. The centre term is 4.'],
      ['Can two batches with matching centres and spreads still contain different pictures?', 'Yes. Those summaries only capture part of the information in the batches.'],
    ],
    next: 'The recap ties together the whole path, from making one toss to judging a batch of pictures.',
  },
};
