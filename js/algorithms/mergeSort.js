export async function mergeSort(arr = this.list, first = 0, last = this.list.length - 1) {
  if (first < last) {
    let middle = Math.floor(first + (last - first) / 2);

    await this.mergeSort(arr, first, middle);
    await this.mergeSort(arr, middle + 1, last);

    await this.merge(arr, first, middle, last);
  }
}

export async function merge(arr, first, middle, last) {
  console.log(arr, first, middle, last);
  let nextFirst = middle + 1;
  const columns = document.querySelector('ul').children;

  if (arr[middle] <= arr[nextFirst]) {
    return;
  }

  while (first <= middle && nextFirst <= last) {
    if (arr[first] <= arr[nextFirst]) {
      first++;
    } else {
      let value = arr[nextFirst];
      let index = nextFirst;
      let firstElement = columns.item(first);
      let nextFirstElement = columns.item(nextFirst);

      await this.paintColumn(firstElement, this.green);

      let i = 0;
      let auxiliarArray = [];

      while (index != first) {
        let pivotElement = columns.item(index);

        auxiliarArray.push(arr[index - 1]);
        if (index - 1 != first) arr[index] = arr[index - 1];
        if (i > 0) {
          arr[nextFirst - i] = auxiliarArray[i - 1];
          pivotElement = columns.item(index);
          await this.paintColumn(pivotElement, this.partitionColor);
        }

        if (i == 0) {
          arr[nextFirst] = value;
          pivotElement = columns.item(nextFirst);
          await this.paintColumn(pivotElement, this.green);
        }
        /* await this.sleep(this.delay) */
        index--;
        i++;
      }
      /* array[nextFirst - 1] = auxiliar2; */

      await this.paintColumn(nextFirstElement, this.green);

      await this.sleep(this.delay);

      await Promise.all([
        this.paintColumn(nextFirstElement, this.swapColor),
        this.paintColumn(firstElement, this.swapColor),
      ]);

      await this.sleep(this.delay);

      let largo = auxiliarArray.length;
      for (let step = first, iteration = 0; step <= nextFirst; step++) {
        if (iteration == 0) arr[step] = arr[nextFirst - iteration];
        else {
          arr[step] = auxiliarArray[largo - iteration];
          let e = columns.item(step);
          await this.paintColumn(e, this.colorColumn);
        }
        iteration++;
      }

      await this.paintColumn(nextFirstElement, this.colorColumn);
      let pivotElement = columns.item(index + 1);
      await Promise.all([
        this.paintColumn(nextFirstElement, this.colorColumn),
        this.paintColumn(pivotElement, this.swapColor),
        this.paintColumn(firstElement, this.swapColor),
      ]);

      await this.sleep(this.delay);

      first++;
      middle++;
      nextFirst++;
    }
    for (let partitionColumn = first; partitionColumn <= last; partitionColumn++) {
      this.resetColorColumns();
    }
  }
}
