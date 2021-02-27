const app = Vue.createApp({
  data() {
    return {
      list: [],
      numberItems: 0,
      algorithmChosen: 'quickSort',
      speed: 200,
      limitNumbers: {
        min: 2,
        max: 100,
      },
    };
  },

  watch: {
    numberItems() {
      this.list = [];
      if (this.numberItems > 20) {
        setTimeout(this.hideColumnText, 2);
      }
      if (this.numberItems <= 20) {
        setTimeout(this.showColumText, 2);
      }
      for (let i = 0; i < this.numberItems; i++) {
        //if input is a string, i < NaN will return false
        this.list.push(Math.floor(Math.ceil(Math.random() * 100)));
      }
      setTimeout(this.setHeightAndWidthAndBackGroundColumns, 1);
    },
    algorithmChosen() {
      switch (this.algorithmChosen) {
        case 'bogoSort':
          this.limitNumbers.max = 7;
          this.numberItems = 5;
          break;
        case 'bubbleSort':
          this.limitNumbers.max = 100;
          this.numberItems = 30;
          break;
        case 'quickSort':
          this.limitNumbers.max = 100;
          this.numberItems = 60;
          break;
        case 'mergeSort':
          this.limitNumbers.max = 100;
          this.numberItems = 50;
          break;
      }
    },
  },

  methods: {
    async sort() {
      if (!(await this.isArrayNotSorted(this.list))) return;
      let timerId = setInterval(this.setHeightAndWidthColumns, 1);
      console.log(this.algorithmChosen);
      let input = document.querySelector('#numberItem');

      input.disabled = true;
      switch (this.algorithmChosen) {
        case 'quickSort':
          await this.quickSort();
          break;
        case 'bubbleSort':
          await this.bubbleSort();
          break;
        case 'bogoSort':
          await this.bogoSort();
          break;
        case 'mergeSort':
          await this.mergeSort();
          break;
      }

      await this.sleep(500);
      clearInterval(timerId);
      const columns = document.querySelectorAll('li');
      for (const column of columns) {
        await this.sleep(8);
        this.paintFinishColor(column, 'rgb(0, 81, 255)');
      }
      input.disabled = false;
    },

    async paintFinishColor(e, color) {
      e.style.background = color;
    },

    setHeightAndWidthColumns() {
      const columns = document.querySelectorAll('li');
      /* console.log('setHeightAndWidthAndBackGroundColumns'); */
      columns.forEach((element) => {
        element.style.height = element.innerText + '%';
        element.style.width =
          element.parentElement.style.width / this.list.length;
      });
    },

    setHeightAndWidthAndBackGroundColumns() {
      const columns = document.querySelectorAll('li');
      /* console.log('setHeightAndWidthAndBackGroundColumns'); */
      columns.forEach((element) => {
        element.style.height = element.innerText + '%';
        element.style.width =
          element.parentElement.style.width / this.list.length;
        element.style.background = `rgb(255, 81, 0)`;
      });
    },

    hideColumnText() {
      const columns = document.querySelectorAll('li');
      columns.forEach((element) => {
        element.style.color = 'rgba(0, 0, 0, 0)';
      });
    },

    showColumText() {
      const columns = document.querySelectorAll('li');
      columns.forEach((element) => {
        element.style.color = 'white';
      });
    },

    keepPivots() {
      const columns = document.querySelectorAll('li');
      /* console.log('setHeightAndWidthAndBackGroundColumns'); */
      columns.forEach((element) => {
        if (element.style.background !== 'none white')
          element.style.background = `rgb(255, 81, 0)`;
      });
    },

    async bogoSort(array = this.list) {
      while (await this.isArrayNotSorted(array)) {
        console.log(this.isArrayNotSorted(array));
        await this.shuffleArrayRandom(array);
      }
    },

    async isArrayNotSorted(array) {
      for (let i = 1; i < array.length; i++) {
        if (array[i - 1] > array[i]) {
          return true;
        }
      }
    },

    async shuffleArrayRandom(array) {
      await this.sleep(200 - (this.speed - 200));
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    },

    async bubbleSort(array = this.list, length = array.length) {
      const columns = document.querySelector('ul').children;

      for (let i = 1; i < length + 1; i++) {
        for (let index = 0; index < length - i; index++) {
          await this.sleep(200 - (this.speed - 200));
          await this.paintFinishColor(columns[index], 'none white');

          if (array[index] > array[index + 1]) {
            await this.swapBubbleSort(array, index, index + 1);
          }
          await this.sleep(200 - (this.speed - 200));
          await this.paintFinishColor(columns[index], 'none rgb(255, 81, 0)');
          await this.sleep(200 - (this.speed - 200));
          await this.paintFinishColor(columns[index + 1], 'none white');

          console.log('index ' + index);
          console.log('i ' + i);
        }
      }
      await this.paintFinishColor(columns[0], 'none white');
    },

    async swapBubbleSort(array, index, nextIndex) {
      await this.sleep(200 - (this.speed - 200));
      let temp = array[index];
      array[index] = array[nextIndex];
      array[nextIndex] = temp;
    },

    async quickSort(array = this.list, first = 0, last = this.list.length - 1) {
      if (first < last) {
        const stepCounter = { counter: 0 };
        let indexPartition = await this.partition(
          array,
          first,
          last,
          stepCounter
        );
        console.log(stepCounter.counter);
        await this.sleep(200 - (this.speed - 200));
        /* await Promise.all([
          this.quickSort(
            array,
            first,
            indexPartition - 1,
            indexPivot - stepCounter.counter - 1
          ),
          await this.quickSort(array, indexPartition + 1, last, indexPivot),
        ]); */

        await this.quickSort(
          array,
          first,
          indexPartition - 1,
          last - stepCounter.counter - 1
        );
        await this.quickSort(array, indexPartition + 1, last);
      }
    },

    async partition(array, first, last, stepCounter) {
      let pivot = array[last];
      let i = first;
      let j = last;
      const elements = document.querySelector('ul').children;

      for (let jojo = first; jojo <= last; jojo++) {
        await this.paintFinishColor(elements.item(jojo), 'green');
      }
      while (i < j) {
        if (array[i] > pivot) {
          pivotElement = elements.item(last - stepCounter.counter);
          await this.sleep(200 - (this.speed - 200));
          await this.paintFinishColor(pivotElement, 'none white');

          await this.swapQuickSort(array, i, j, pivot);
          stepCounter.counter++;
          await this.sleep(200 - (this.speed - 200));
          await this.paintFinishColor(pivotElement, 'none rgb(255, 81, 0)');
          pivotElement = elements.item(last - stepCounter.counter);
          await this.paintFinishColor(pivotElement, 'none white');
          j--;
        } else i++;
      }
      this.keepPivots();
      console.log('j: ' + j);
      return j;
    },

    async swapQuickSort(array, i, j, pivot) {
      await this.sleep(200 - (this.speed - 200));
      let temp = array[i];
      array[i] = array[j - 1];
      array[j - 1] = pivot;
      array[j] = temp;
    },

    async mergeSort(arr = this.list, first = 0, last = this.list.length - 1) {
      if (first < last) {
        let middle = Math.floor(first + (last - first) / 2);

        await this.mergeSort(arr, first, middle);
        await this.mergeSort(arr, middle + 1, last);

        await this.merge(arr, first, middle, last);
      }
    },

    async merge(arr, first, middle, last) {
      let nextFirst = middle + 1;

      if (arr[middle] <= arr[nextFirst]) {
        return;
      }
      const elements = document.querySelector('ul').children;

      while (first <= middle && nextFirst <= last) {
        if (arr[first] <= arr[nextFirst]) {
          first++;
        } else {
          let value = arr[nextFirst];
          let index = nextFirst;
          pivotElement = elements.item(first);

          while (index != first) {
            pivotElement = elements.item(index);

            await this.sleep(200 - (this.speed - 200));

            await this.paintFinishColor(pivotElement, 'none white');

            arr[index] = arr[index - 1];
            index--;
          }

          await this.sleep(200 - (this.speed - 200));

          pivotElement = elements.item(first);
          await this.paintFinishColor(pivotElement, 'none white');
          arr[first] = value;

          first++;
          middle++;
          nextFirst++;
        }
      }
    },

    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
  },
});

app.mount('#app');
