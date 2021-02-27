const app = Vue.createApp({
  data() {
    return {
      list: [],
      numberItems: 0,
      algorithmChosen: 'quickSort',
      speed: 200,
      limitNumbers: {
        min: 2,
        max: 200,
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
        case 'quickSort':
          this.limitNumbers.max = 200;
          this.numberItems = 60;
          break;
        case 'bubbleSort':
          this.limitNumbers.max = 100;
          this.numberItems = 30;
          break;
        case 'bogoSort':
          this.limitNumbers.max = 6;
          this.numberItems = 5;
          break;
      }
    },
  },

  methods: {
    async sort() {
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
        element.style.background = ` rgb(255, 60, 0)`;
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
      for (let i = 1; i < length - 1; i++) {
        for (let index = 0; index < length - i; index++) {
          const columns = document.querySelectorAll('li');
          await this.paintFinishColor(columns[index], 'none red');

          if (array[index] > array[index + 1]) {
            await this.swapBubbleSort(array, index, index + 1);
          }

          await this.paintFinishColor(columns[index], 'none rgb(255, 60, 0)');

          await this.paintFinishColor(columns[index + 1], 'none red');
        }
      }
    },

    async swapBubbleSort(array, index, nextIndex) {
      await this.sleep(200 - (this.speed - 200));
      let temp = array[index];
      array[index] = array[nextIndex];
      array[nextIndex] = temp;
    },

    async quickSort(
      array = this.list,
      first = 0,
      last = this.list.length - 1,
      indexPivot = last
    ) {
      if (first < last) {
        let stepCounter = { counter: 0 };
        let indexPartition = await this.partition(
          array,
          first,
          last,
          stepCounter,
          indexPivot
        );
        console.log(stepCounter.counter);
        await Promise.all([
          this.quickSort(
            array,
            first,
            indexPartition - 1,
            indexPivot - stepCounter.counter - 1
          ),
          this.quickSort(array, indexPartition + 1, last, indexPivot),
        ]);
      }
    },

    async partition(array, first, last, stepCounter, indexPivot) {
      let pivot = array[last];
      let i = first;
      let j = last;
      const elements = document.querySelector('ul').children;

      console.log('pivot: ' + pivot);
      while (i < j) {
        if (array[i] > pivot) {
          pivotElement = elements.item(indexPivot - stepCounter.counter);
          await this.paintFinishColor(pivotElement, 'none red');

          await this.swapQuickSort(array, i, j, pivot);
          stepCounter.counter++;
          await this.sleep(50);
          await this.paintFinishColor(pivotElement, 'none rgb(255, 60, 0)');
          pivotElement = elements.item(indexPivot - stepCounter.counter);
          await this.paintFinishColor(pivotElement, 'none red');
          j--;
        } else i++;
      }
      return j;
    },

    async swapQuickSort(array, i, j, pivot) {
      await this.sleep(200 - (this.speed - 200));
      let temp = array[i];
      array[i] = array[j - 1];
      array[j - 1] = pivot;
      array[j] = temp;
    },

    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
  },
});

app.mount('#app');
