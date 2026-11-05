export const playgroundRegistry={
  pdsa:[
    {week:1,slug:'python-recap-gcd',kind:'gcd',visual:'remainder-table'},
    {week:1,slug:'python-recap-primes',kind:'prime-check',visual:'factor-scan'},
    {week:1,slug:'python-recap-euclid',kind:'gcd',visual:'remainder-table'},
    {week:2,slug:'searching-in-a-list',kind:'binary-search',visual:'search-range'},
    {week:2,slug:'selection-sort',kind:'selection-sort',visual:'array-passes'},
    {week:2,slug:'insertion-sort',kind:'insertion-sort',visual:'array-passes'},
    {week:2,slug:'merge-sort',kind:'merge-sort',visual:'split-merge-tree'},
    {week:3,slug:'quicksort',kind:'quick-sort',visual:'partitioned-array'},
    {week:3,slug:'lists-and-arrays',kind:'array-insert',visual:'shifted-array'},
    {week:3,slug:'designing-a-linked-list',kind:'linked-list',visual:'linked-nodes'},
    {week:3,slug:'dictionaries-and-hashing',kind:'hashing',visual:'hash-table'},
    {week:4,slug:'breadth-first-search',kind:'bfs',visual:'layered-graph'},
    {week:4,slug:'depth-first-search',kind:'dfs',visual:'depth-first-graph'},
    {week:4,slug:'topological-sorting',kind:'topological-sort',visual:'indegree-dag'},
    {week:4,slug:'longest-path-in-dags',kind:'dag-longest-path',visual:'weighted-dag'}
  ],
  deepLearning:[
    {week:1,slug:'perceptron-learning-algorithm',kind:'perceptron-update',visual:'decision-boundary'},
    {week:2,slug:'gradient-descent',kind:'gradient-descent',visual:'contour-path'},
    {week:3,slug:'backpropagation-hidden-units-and-weights',kind:'backpropagation',visual:'network-flow'},
    {week:4,slug:'momentum-and-nag',kind:'momentum',visual:'contour-path'},
    {week:4,slug:'stochastic-and-mini-batch',kind:'mini-batch',visual:'batch-updates'}
  ],
  csd:[
    {week:1,slug:'binary-numbers',kind:'base-conversion',visual:'place-value'},
    {week:2,slug:'logic-gates',kind:'logic-gates',visual:'truth-table'},
    {week:2,slug:'boolean-algebra',kind:'boolean-algebra',visual:'expression-steps'},
    {week:4,slug:'multiplexers',kind:'multiplexer',visual:'signal-routing'},
    {week:4,slug:'decoders',kind:'decoder',visual:'signal-routing'}
  ]
};
export const supportedProcedureKinds=['gcd','prime-check','binary-search','selection-sort','insertion-sort','merge-sort','hashing','linked-list','base-conversion','logic-gates','gradient-descent','perceptron-update','topological-sort','dag-longest-path','array-insert'];
export function playgroundFor(subject,week,slug){return playgroundRegistry[subject]?.find(item=>item.week===week&&item.slug===slug);}
