// Place each explanation just before the step or section that introduces the math.
export const mathBridges = {
  fdiv: [
    ['<h2 id="s-14-3">', 'Why use Jensen here?', 'The weighted average of the ratios P(x)/Q(x), using Q as weights, is 1 when Q covers the support of P. The divergence averages f of those ratios. Convexity lets us compare that average with f of the average ratio, which is f(1) = 0. That is what guarantees the score cannot be negative under these assumptions.'],
  ],
  conjugate: [
    ['<h2 id="s-17-1">', 'Why introduce a second function?', 'Start with f(u) = u²/2 and fix a slope t = 2. The line 2u − 2 touches the curve at u = 2. It stays below the curve because their difference is (u − 2)²/2. The conjugate gives the smallest amount we must subtract from the line of slope 2 to keep it below the curve. Finding this amount means looking for the biggest gap 2u − f(u).'],
    ['<h2 id="s-17-4">', 'Why take the supremum over slopes?', 'A line of one slope may touch the curve at one point and sit far below it elsewhere. If we can choose a different slope for each point, the highest available line recovers a closed convex curve. This is the reason the derivation introduces a supremum over t.'],
  ],
  bound: [
    ['<p><span class="step">Step 4', 'Why take the supremum outside the integral?', 'Think of a two-row table, with one row for heads and one for tails. With the supremum inside the sum, you can pick the best t independently in each row. With the supremum outside, you first pick one rule T, use its two scores across the whole table, then compare the resulting totals for all allowed rules. Each rule’s score in each row is at most the best score for that row. Multiplying by nonnegative Q weights and summing preserves that inequality. Taking the supremum over allowed rules still cannot exceed the independently optimized total. If an admissible rule achieves both row optima, you get equality. The same reasoning applies when the weighted sum becomes an integral. We use the outer form because a learnable critic is one shared rule across inputs.'],
    ['<p><span class="step">Step 5', 'Why cancel the model density?', 'Inside the integral the real-data term contains Q times P/Q, which reduces to P on the region where Q is positive. That leaves one average under P and another under Q. We can estimate both using samples. This is the payoff of the algebra. The cancellation uses the support assumption made in the density derivation.'],
  ],
  twonets: [
    ['<h2 id="s-20-3">', 'Why does one side maximize while the other minimizes?', 'A stronger critic tries to expose the mismatch between the current generator and the data. The generator tries to reduce the score that a strong critic can obtain. Freezing the generator during a critic update makes the first goal precise. Freezing the critic during a generator update gives the generator a fixed scoring rule to improve against.'],
  ],
  ganf: [
    ['<h2 id="s-24-2">', 'Why solve for the conjugate here?', 'Week 1 gave a general recipe with a penalty f*(T). This lesson picks the particular f that leads to the original GAN. Computing its conjugate tells us both the penalty and which critic scores are legal. Those restrictions motivate the output transformation in the next step.'],
  ],
  judge: [
    ['<h2 id="s-25-2">', 'Why can we optimize the judge outcome by outcome on paper?', 'In the ideal calculation, you can choose a score independently for each outcome. At a given outcome, the real term rewards a larger score and the generated term rewards a smaller one. Their relative weights determine the best compromise. A neural network shares parameters across outcomes, so training approximates that ideal calculation.'],
  ],
  likelihood: [
    ['<h2 id="s-29-2">', 'Why sum logs across images?', 'For independent examples, the probability of getting all the observed labels is the product of the model’s probabilities for those labels, given the inputs. Taking a log preserves which product is largest. It turns the product into a sum so each example contributes one term to the objective.'],
  ],
  cgan: [
    ['<h2 id="s-31-4">', 'Why does the label appear in both terms?', 'The real term scores a real image paired with its label. The generated term scores an image made using the requested label, paired with that same label. Giving the discriminator both kinds of pairs lets it detect a mismatch between the image and the request, even when the image looks realistic by itself.'],
  ],
  saturation: [
    ['<h2 id="s-34-4">', 'Why does the JS score stay flat here?', 'When the two supports are disjoint, their equal mixture assigns half the original density on each support. The ratio to the mixture is 2 on the support that contributes to each KL term. Both terms therefore give log 2, regardless of how far apart the supports are.'],
  ],
  transport: [
    ['<h2 id="s-35-4">', 'Why multiply the mass by the distance?', 'Moving 0.25 units a distance of 4 costs 1 unit of work. The transport plan gives the amount moved between each pair of locations. Adding mass × distance over all pairs gives the total cost, and minimizing it finds the cheapest plan that respects both distributions.'],
  ],
  wgan: [
    ['<h2 id="s-36-3">', 'Why can a score difference describe transport?', 'For a 1-Lipschitz function, the score difference between two locations cannot exceed the distance between them. Average this inequality under any transport plan and the average real score minus fake score is at most that plan’s cost. This gives one direction of the duality. The theorem supplies the other direction: for Wasserstein-1 under the usual finite-first-moment assumptions, the supremum of these score gaps equals the cheapest transport cost.'],
  ],
  inversion: [
    ['<h2 id="s-37-2">', 'Why optimize the input instead of the generator?', 'The trained generator already maps a latent input to an image. Inversion asks which input best matches one target, so the generator stays fixed. Gradients still pass through it to tell us how to change the input.'],
  ],
  bigan: [
    ['<h2 id="s-38-2">', 'Why show the discriminator pairs?', 'An image alone cannot tell the discriminator whether its code makes sense. Real-side pairs combine an image with its encoded code. Generated-side pairs combine a sampled code with the image it produces. Comparing those joint distributions gives the encoder and generator feedback about how images and codes correspond.'],
  ],
  dann: [
    ['<h2 id="s-40-2">', 'Why reverse only one gradient?', 'The task classifier should still reward features that predict the task label. The domain classifier should learn to detect the domain, but its signal to the feature extractor is reversed. That encourages the extractor to keep task information while making the source and target domains harder to distinguish.'],
  ],
  fid: [
    ['<h2 id="s-41-2">', 'Why are there two parts to FID?', 'The mean term asks whether the typical feature vector shifted. The covariance term asks whether the feature clouds spread in the same directions and by similar amounts. In one dimension, the covariance part reduces to the squared difference of standard deviations. The matrix expression compares spread when several feature coordinates can move together.'],
  ],
};
