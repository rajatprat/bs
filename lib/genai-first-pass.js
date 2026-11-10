export const firstPass = {
  'week-1': {
    title: 'Two coins and a critic',
    goal: 'Compare a fair coin with a biased coin, then estimate the same score when all you have are tosses.',
    steps: [
      {
        title: 'Measure the mismatch with known probabilities',
        explanation: 'The real coin P has probabilities (0.5, 0.5) for heads and tails. The model coin Q has (0.9, 0.1). Look at heads and tails separately. Heads is more common under Q, so log(0.5/0.9) is negative. Tails is rarer under Q, so log(0.5/0.1) is positive. Average these log ratios using the real coin’s probabilities: 0.5 × (−0.588) + 0.5 × 1.609 ≈ 0.511. This is KL(P ∥ Q).',
        why: 'The ratios tell us where the model is off. Weighting by P makes the score reflect what the real coin actually produces.',
        topic: 'famous',
      },
      {
        title: 'Give heads and tails different scores',
        explanation: 'A critic T is a rule that assigns one number to each outcome. For KL, try the score “average of T under P minus average of exp(T−1) under Q.” Giving both outcomes 1 yields 1 − 1 = 0. Giving heads 0 and tails 2 yields 1 − [0.9 × exp(−1) + 0.1 × exp(1)] ≈ 0.397. The best pair, about (0.412, 2.609), reaches 0.511 for these coins.',
        why: 'The critic can highlight a mismatch the constant rule misses. The exponential term penalizes raising scores indiscriminately. The convex conjugate gives this penalty and explains why every pair of scores gives a population lower bound.',
        topic: 'conjugate',
      },
      {
        title: 'Choose one rule for the whole average',
        explanation: 'On paper you can maximize the heads term and the tails term separately. A critic family might tie the two scores together. If it only allows constant rules, it cannot pick the best score for heads and a different best score for tails. Instead, evaluate the whole average for each allowed rule, then take the supremum over those rules. Supremum means the least upper bound on the scores we can achieve, even if no rule attains it.',
        why: 'This is the move from a supremum inside the integral to one outside it. The pointwise version can choose independently at every input. The outer supremum chooses one function for the whole integral. A restricted family gives a lower bound and can match the original value if it contains a suitable pointwise optimizer.',
        topic: 'bound',
      },
      {
        title: 'Replace probabilities with tosses',
        explanation: 'Keep T(heads) = 0 and T(tails) = 2. Suppose ten real tosses give five heads and five tails, while ten model tosses give eight heads and two tails. The real average is 1. The model average is [8 × exp(−1) + 2 × exp(1)] / 10 ≈ 0.838. The empirical score is about 0.162, compared with the population score of about 0.397 for this same critic.',
        why: 'Tosses let us compute both averages without knowing either coin’s probabilities. The finite-sample score fluctuates and can also exceed the population bound or the true divergence.',
        topic: 'obstacle',
      },
    ],
    check: 'If your critic can only use one score for both outcomes, can it reach the true KL for these two coins?',
    answer: 'No. Its best score is 0, attained when the shared score is 1. The true KL is about 0.511.',
  },
  'week-2': {
    title: 'Train the judge, then train the generator',
    goal: 'Use the same coins to see what the two networks want and why we update them separately.',
    steps: [
      {
        title: 'Let the judge see both sources',
        explanation: 'Use the same fair real coin and 90%-heads generator from Week 1. Give the judge equally many real and generated tosses. Across 100 tosses from each source, expect 50 real heads and 90 generated heads. A head is therefore real about 50/(50+90) ≈ 0.357 of the time. For tails the corresponding score is 50/(50+10) ≈ 0.833.',
        why: 'The judge scores how likely an observed outcome is to be real. It compares the two sources at the same outcome. The best discriminator formula is the probability version of these two fractions.',
        topic: 'judge',
      },
      {
        title: 'Reward confidence in the correct source',
        explanation: 'Start with raw network output V = 0. Sigmoid gives D = 0.5, and log D gives critic score T ≈ −0.693. The probability and critic score have different jobs. For a real tails toss under the judge above, the score inside the log is D(tails) ≈ 0.833. For a generated tails toss, it is 1−D(tails) ≈ 0.167. A sigmoid maps any raw score to a number strictly between 0 and 1. Logs then turn products of probabilities into sums and penalize confident wrong predictions strongly.',
        why: 'The discriminator needs valid probabilities. In the formal GAN derivation, the output mapping also keeps the critic inside the domain where its convex conjugate is finite.',
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
    goal: 'Use handwritten digits to connect classifier feedback, image generation, and conditioning.',
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
        explanation: 'Imagine two input features, 1 and 2. Let each spread through a three-position filter [1, 1, 1], with starting positions two cells apart and no padding. Their footprints overlap in one cell, so the output is [1, 1, 3, 2, 2]. An image generator can learn these filters and spread features across two spatial dimensions.',
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
    goal: 'Start with points on a line, then use the same intuition to see what the later tools measure.',
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
        explanation: 'Imagine that one image feature has real mean 0 and standard deviation 1, while generated images have mean 2 and standard deviation 3. In the one-dimensional Gaussian version of FID, the mean shift contributes (0−2)² = 4 and the spread mismatch contributes (1−3)² = 4, for a total of 8.',
        why: 'FID compares feature distributions. The mean detects a shift in the centre. Covariance describes spread and how features vary together, which is why the full formula needs a matrix calculation.',
        topic: 'fid',
      },
    ],
    check: 'Can moving a generated point from 4 to 1 improve Wasserstein-1 while leaving JS unchanged in the point-mass example?',
    answer: 'Yes. Wasserstein-1 falls from 4 to 1. JS stays at log 2 because neither generated point overlaps the real point at 0.',
  },
};

export const firstPassUrl = (base, week) => base + 'first-pass/' + week + '/';
