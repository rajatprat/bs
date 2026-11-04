export function quickSortTrace(values) {
  const array = [...values]; const steps = [];
  const guidance = {0:['Get ready','We begin with the exact list you entered, so you can follow every change.'],1:['Choose a part to sort','Quick Sort works on one smaller part of the list at a time.'],2:['Base case','A list with zero or one item cannot be out of order.'],3:['Choose a pivot','The pivot is the reference value used to decide where every other item belongs.'],4:['Make one comparison','Comparing one item at a time prevents us from losing track of the regions.'],5:['Grow the Upper region','Items larger than the pivot must finish on its right.'],6:['Grow the Lower region','Items not larger than the pivot must finish on its left.'],7:['Fix the pivot in place','After this, the pivot is in its final sorted position and will not move again.'],8:['Repeat on smaller parts','The same idea now sorts the values on each side of the fixed pivot.']};
  const add = (line, explanation, variables = {}, active = []) => steps.push({array:[...array], line, explanation, variables, active, label:guidance[line][0], why:guidance[line][1]});
  const sort = (left, right) => {
    add(1, `Sort the part from position ${left + 1} to ${right + 1}.`, {left:left + 1, right:right + 1});
    if (left >= right) { add(2, 'This part has at most one item, so it is already sorted.', {left:left + 1, right:right + 1}); return; }
    const pivot = array[left]; let lower = left + 1; let upper = left + 1;
    add(3, `Choose ${pivot} as the pivot. Lower and Upper start just after it.`, {pivot, lower:lower + 1, upper:upper + 1}, [left]);
    for (let i = left + 1; i <= right; i++) {
      add(4, `Compare ${array[i]} with the pivot ${pivot}.`, {pivot, i:i + 1, lower:lower + 1, upper:upper + 1}, [i, left]);
      if (array[i] > pivot) { [array[i], array[upper]] = [array[upper], array[i]]; upper++; add(5, `${array[upper - 1]} is larger, so extend the Upper region.`, {pivot, lower:lower + 1, upper:upper + 1}, [upper - 1]); }
      else { [array[i], array[lower]] = [array[lower], array[i]]; lower++; upper++; add(6, `${array[lower - 1]} belongs in Lower; move both boundaries.`, {pivot, lower:lower + 1, upper:upper + 1}, [lower - 1]); }
    }
    [array[left], array[lower - 1]] = [array[lower - 1], array[left]]; const pivotIndex = lower - 1;
    add(7, `Place pivot ${pivot} between Lower and Upper.`, {pivot, pivotIndex:pivotIndex + 1}, [pivotIndex]);
    add(8, 'Recursively sort the Lower and Upper regions.', {left:left + 1, pivot:pivotIndex + 1, right:right + 1}); sort(left, pivotIndex - 1); sort(pivotIndex + 1, right);
  };
  add(0, 'Ready: choose Next to trace Quick Sort.', {input:array.join(', ')}); sort(0, array.length - 1); return steps;
}

export function parseGraph(text) {
  const graph = {};
  text.split(';').map(part => part.trim()).filter(Boolean).forEach(part => { const [node, neighbours=''] = part.split(':'); const key=node?.trim(); if (!key) throw new Error('Each entry needs a vertex before the colon.'); graph[key] = neighbours.split(',').map(x=>x.trim()).filter(Boolean); });
  Object.values(graph).flat().forEach(node => { if (!graph[node]) graph[node]=[]; });
  if (!Object.keys(graph).length) throw new Error('Enter at least one vertex.'); return graph;
}

export function bfsTrace(graph, start) {
  if (!graph[start]) throw new Error(`Start vertex ${start} is not in the graph.`);
  const queue=[start], visited=[start], steps=[]; const guidance={0:['Set up the search','The queue records which vertices still need to be explored.'],1:['Take the next vertex','A queue always gives us the oldest waiting vertex first.'],2:['Explore one layer','Looking at all neighbours here is what makes BFS move outward in layers.'],3:['Remember a new vertex','Mark it now so another edge cannot add the same vertex twice.'],4:['Avoid a repeat','Skipping visited vertices prevents loops and repeated work.'],5:['Finish','No waiting vertices remain, so every reachable vertex has been explored.']}; const add=(line, explanation, current=null)=>steps.push({line, explanation, queue:[...queue], visited:[...visited], current, label:guidance[line][0], why:guidance[line][1]});
  add(0, `Put ${start} in the queue and mark it visited.`);
  while (queue.length) { const current=queue.shift(); add(1, `Remove ${current} from the front of the queue.`, current); add(2, `Visit ${current}; inspect its unvisited neighbours.`, current);
    graph[current].forEach(neighbour => { if (!visited.includes(neighbour)) { visited.push(neighbour); queue.push(neighbour); add(3, `${neighbour} is new: mark it visited and add it to the back of the queue.`, current); } else add(4, `${neighbour} was already visited, so do not add it again.`, current); });
  }
  add(5, 'The queue is empty. Breadth-first search is complete.'); return steps;
}
