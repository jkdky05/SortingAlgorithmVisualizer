const app = Vue.createApp({
  data() {
    return {
      list: [1, 1],
      numberItems: 2,
      algorithmChosen: 'quickSort',
      speed: 0,
    };
  },
  watch: {
    numberItems() {
      this.list = [];
      if (this.numberItems > 20) {
        setTimeout(this.hideColumnText, 200);
      }

      if (this.numberItems > 200) {
        this.numberItems = 0;
        return;
      }
      for (let i = 0; i < this.numberItems; i++) {
        //if input is a string, i < NaN will return false
        this.list.push(Math.floor(Math.ceil(Math.random() * 100)));
      }
      setTimeout(this.setHeightAndWidthColumns, 1);
    },
  },
  methods: {
    async sort() {
      let timerId = setInterval(this.setHeightAndWidthColumns, 1);
      console.log(this.algorithmChosen);
      switch (this.algorithmChosen) {
        case 'quickSort':
          await this.quickSort();
        case 'bubbleSort':
          await this.bubbleSort();
        case 'bogoSort':
          await this.bogoSort();
      }

      await this.sleep(500);
      clearInterval(timerId);
      const columns = document.querySelectorAll('li');
      for (const column of columns) {
        await this.sleep(10);
        this.paintFinishColor(column, 'rgb(0, 81, 255)');
      }
    },
    reset() {
      const columns = document.querySelectorAll('li');
      /* console.log('setHeightAndWidthColumns'); */
      columns.forEach((element) => {
        /* console.log(element.innerText + '%'); */
        element.style.background = `none rgb(255, 60, 0)`;
      });
    },
    async paintFinishColor(e, color) {
      e.style.backgroundColor = color;
    },
    setHeightAndWidthColumns() {
      const columns = document.querySelectorAll('li');
      /* console.log('setHeightAndWidthColumns'); */
      columns.forEach((element) => {
        element.style.height = element.innerText + '%';
        element.style.width =
          element.parentElement.style.width / this.list.length;
      });
    },
    hideColumnText() {
      const columns = document.querySelectorAll('li');
      columns.forEach((element) => {
        element.style.color = 'rgba(0, 0, 0, 0)';
      });
    },
    async bogoSort(array = this.list, length = array.length) {
      while (await this.isArrayNotSorted(array)) {
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
          if (array[index] > array[index + 1]) {
            await this.swapBubbleSort(array, index, index + 1);
          }
        }
      }
    },
    async swapBubbleSort(array, index, nextIndex) {
      await this.sleep(200 - (this.speed - 200));
      let temp = array[index];
      array[index] = array[nextIndex];
      array[nextIndex] = temp;
    },
    async quickSort(array = this.list, first = 0, last = this.list.length - 1) {
      if (first < last) {
        let indexPartition = await this.partition(array, first, last);
        await Promise.all([
          this.quickSort(array, first, indexPartition - 1),
          this.quickSort(array, indexPartition + 1, last),
        ]);
      }
    },
    async partition(array, first, last) {
      let pivot = array[last];
      let i = first;
      let j = last;
      console.log('pivot: ' + pivot);
      while (i < j) {
        if (array[i] > pivot) {
          await this.swapQuickSort(array, i, j, pivot);
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
