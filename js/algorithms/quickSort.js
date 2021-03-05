export async function quickSort(array = this.list, first = 0, last = this.list.length - 1) {
  if (first < last) {
    const stepCounter = { counter: 0 };
    let indexPartition = await this.partition(array, first, last, stepCounter);

    await this.quickSort(array, first, indexPartition - 1, last - stepCounter.counter - 1);
    await this.quickSort(array, indexPartition + 1, last);
  }
}

export async function partition(array, first, last, stepCounter) {
  let pivot = array[last];
  let i = first;
  let j = last;
  const elements = document.querySelector('ul').getElementsByTagName('li');

  for (let partitionColumn = first; partitionColumn <= last; partitionColumn++) {
    await this.paintColumn(elements.item(partitionColumn), this.partitionColor);
  }

  while (i < j) {
    if (array[i] > pivot) {
      let pivotElement = elements.item(last - stepCounter.counter);

      await this.paintColumn(pivotElement, this.green);
      let pivotElementI = elements.item(i);

      await this.paintColumn(pivotElementI, this.green);
      await this.sleep(this.delay);
      await this.swapQuickSort(array, i, j, pivot);
      stepCounter.counter++;
      await this.sleep(this.delay);
      await this.paintColumn(pivotElement, this.colorColumn);
      await this.paintColumn(pivotElementI, this.colorColumn);

      pivotElement = elements.item(last - stepCounter.counter);
      await this.paintColumn(pivotElement, this.green);
      pivotElementI = elements.item(i + stepCounter.counter);
      await this.paintColumn(pivotElement, this.green);

      j--;
    } else {
      let pivotElement = elements.item(last - stepCounter.counter);
      await this.paintColumn(pivotElement, this.green);
      let pivotElementI = elements.item(i);
      await this.paintColumn(pivotElementI, this.green);
      await this.sleep(this.delay);

      await this.paintColumn(pivotElementI, this.colorColumn);

      await this.sleep(this.delay);
      i++;
    }
  }
  let pivotElement = elements.item(last - stepCounter.counter);
  await this.paintColumn(pivotElement, this.blue);
  await this.keepPivots();

  return j;
}

export async function swapQuickSort(array, i, j, pivot) {
  const elements = document.querySelector('ul').getElementsByTagName('li');

  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');
  this.drawElipse(canvas, ctx, i, j);

  await this.sleep(this.delay);
  let pivotElement = elements.item(i);
  await this.paintColumn(pivotElement, this.swapColor);

  pivotElement = elements.item(j);
  await this.paintColumn(pivotElement, this.swapColor);
  await this.sleep(this.delay);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  [array[i], array[j - 1], array[j]] = [array[j - 1], pivot, array[i]];
  pivotElement = elements.item(i);
  await this.paintColumn(pivotElement, this.partitionColor);
  pivotElement = elements.item(j - 1);
  await this.paintColumn(pivotElement, this.swapColor);
  pivotElement = elements.item(j);
  await this.paintColumn(pivotElement, this.swapColor);
  await this.sleep(this.delay);
  await this.paintColumn(pivotElement, this.colorColumn);
  pivotElement = elements.item(j - 1);
  await this.paintColumn(pivotElement, this.green);
  pivotElement = elements.item(i);
  await this.paintColumn(pivotElement, this.green);
  await this.sleep(this.delay);
}
