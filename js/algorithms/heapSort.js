export async function heapSort(arr = this.list) {
  let n = arr.length;
  const elements = document.querySelector('ul').children;

  for (let i = Math.floor(n / 2 - 1); i >= 0; i--) await this.heapify(arr, n, i);

  for (let i = n - 1; i > 0; i--) {
    let lastElement = elements.item(i);
    let firstElement = elements.item(0);
    await Promise.all([this.paintColumn(firstElement, this.red), this.paintColumn(lastElement, this.red)]);

    await this.sleep(this.delay);
    [arr[i], arr[0]] = [arr[0], arr[i]];
    await this.sleep(this.delay);

    await Promise.all([
      this.paintColumn(firstElement, this.colorColumn),
      this.paintColumn(lastElement, this.colorColumn),
    ]);

    await this.sleep(this.delay);
    await this.heapify(arr, i, 0);
  }
}

export async function heapify(arr, n, i) {
  const elements = document.querySelector('ul').children;
  let largest = i;
  let l = 2 * i + 1;
  let r = 2 * i + 2;

  if (l < n && arr[l] > arr[largest]) largest = l;

  if (r < n && arr[r] > arr[largest]) largest = r;

  if (largest != i) {
    let betterLargest = elements.item(i);
    let notLargest = elements.item(largest);

    await Promise.all([this.paintColumn(betterLargest, this.red), this.paintColumn(notLargest, this.red)]);
    await this.sleep(this.delay);
    [arr[i], arr[largest]] = [arr[largest], arr[i]];

    await this.sleep(this.delay);
    await Promise.all([
      this.paintColumn(betterLargest, this.colorColumn),
      this.paintColumn(notLargest, this.colorColumn),
    ]);

    await this.sleep(this.delay);

    await this.heapify(arr, n, largest);
  }
}
