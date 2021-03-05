import { bogoSort } from './algorithms/bogoSort.js';
import { bubbleSort, swapBubbleSort } from './algorithms/bubbleSort.js';
import { quickSort, partition, swapQuickSort } from './algorithms/quickSort.js';
import { mergeSort, merge } from './algorithms/mergeSort.js';
import { heapSort, heapify } from './algorithms/heapSort.js';

const app = Vue.createApp({
  data() {
    return {
      list: [],
      numberItems: 0,
      algorithmChosen: '',
      pastAlgorithmChosen: '',
      speed: 375,
      limitNumbers: {
        min: 2,
        max: 100,
      },
      swapColor: 'red',
      hasChosen: false,
      isDisabled: false,
      red: 'red',
      blue: 'none rgb(27, 61, 124)',
      partitionColor: '#a553a8',
      yellow: 'yellow',
      white: 'none white',
      green: 'none green',
      colorColumn: 'rgb(207, 125, 87)',
      delay: '25',
    };
  },

  watch: {
    speed() {
      this.delay = 200 - (this.speed - 200);
    },
    numberItems() {
      this.list = [];
      this.numberItems > 40 ? setTimeout(this.hideColumnText, 2) : setTimeout(this.showColumnText, 2);

      for (let i = 0; i < this.numberItems; i++) {
        this.list.push(Math.floor(Math.ceil(Math.random() * 100)));
      }

      setTimeout(this.setHeightAndColorColumns, 1);
    },

    algorithmChosen() {
      console.log('#' + this.algorithmChosen);
      let element = document.querySelector('#' + this.algorithmChosen);

      element.classList.add('button-selected');
      if (this.pastAlgorithmChosen != '') {
        element = document.querySelector('#' + this.pastAlgorithmChosen);
        element.classList.remove('button-selected');
      }
      this.pastAlgorithmChosen = this.algorithmChosen;
      switch (this.algorithmChosen) {
        case 'bogoSort':
          this.limitNumbers.max = 6;
          this.numberItems = 5;
          break;
        case 'bubbleSort':
          this.limitNumbers.max = 40;
          this.numberItems = 20;
          break;
        case 'quickSort':
          this.limitNumbers.max = 100;
          this.numberItems = 40;
          break;
        case 'mergeSort':
          this.limitNumbers.max = 80;
          this.numberItems = 35;
          break;
        case 'heapSort':
          this.limitNumbers.max = 80;
          this.numberItems = 30;
          break;
      }
    },
  },

  methods: {
    async sort() {
      if (!(await this.isArrayNotSorted(this.list))) return;
      this.isDisabled = true;
      let timerId = setInterval(this.setHeightColumns, 1);
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
        case 'heapSort':
          await this.heapSort();
          break;
      }
      await this.sleep(0);
      clearInterval(timerId);

      const columns = document.querySelectorAll('li');
      for (const column of columns) {
        await this.sleep(8);
        this.paintColumn(column, this.blue);
      }
      this.isDisabled = false;
    },

    async paintColumn(e, color) {
      e.style.background = color;
    },

    setHeightColumns() {
      let h = 0;
      const columns = document.querySelectorAll('li');
      console.log(++h);
      columns.forEach((element) => {
        element.style.height = element.innerText + '%';
      });
    },

    setHeightAndColorColumns() {
      const columns = document.querySelectorAll('li');

      columns.forEach((element) => {
        element.style.height = element.innerText + '%';
        element.style.background = this.colorColumn;
      });
    },

    hideColumnText() {
      const columns = document.querySelectorAll('li');
      columns.forEach((element) => {
        element.style.color = 'rgba(0, 0, 0, 0)';
      });
    },

    showColumnText() {
      const columns = document.querySelectorAll('li');
      columns.forEach((element) => {
        element.style.color = 'white';
      });
    },

    keepPivots() {
      const columns = document.querySelectorAll('li');
      columns.forEach((element) => {
        if (element.style.background !== this.blue) element.style.background = this.colorColumn;
      });
    },
    resetColorColumns(color = this.colorColumn) {
      const columns = document.querySelectorAll('li');
      columns.forEach((element) => {
        element.style.background = color;
      });
    },

    bogoSort,

    async isArrayNotSorted(array) {
      for (let i = 1; i < array.length; i++) {
        if (array[i - 1] > array[i]) {
          return true;
        }
      }
    },

    async shuffleArrayRandom(array) {
      await this.sleep(this.delay);
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    },

    drawElipse(canvas, ctx, index, nextIndex) {
      const columns = document.querySelector('ul').getElementsByTagName('li');
      const columnsContainer = document.querySelector('ul');

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      let midX = Math.floor((columns[index].offsetLeft + columns[nextIndex].offsetLeft) / 2);
      let midY = Math.floor((columns[index].offsetTop + columns[nextIndex].offsetTop) / 2);

      let realX = Math.floor((canvas.width * midX) / columnsContainer.clientWidth);
      let realY = Math.floor((canvas.height * midY) / columnsContainer.clientHeight);
      console.log('real X e Y:', realX, realY);
      let indexX = Math.floor((canvas.width * columns[index].offsetLeft) / columnsContainer.clientWidth);
      let indexY = Math.floor((canvas.height * columns[index].offsetTop) / columnsContainer.clientHeight);
      let nextX = Math.floor((canvas.width * columns[nextIndex].offsetLeft) / columnsContainer.clientWidth);
      let nextY = Math.floor((canvas.height * columns[nextIndex].offsetTop) / columnsContainer.clientHeight);

      let radiusX = Math.sqrt(Math.pow(realX - indexX, 2));
      let radiusY = Math.sqrt(Math.pow(realY - indexY, 2));

      ctx.lineWidth = 10;
      ctx.strokeStyle = 'blue';
      if (this.algorithmChosen === ('bubbleSort' || 'mergeSort')) {
        //The swaps with columns next to each other
        ctx.moveTo(indexX + radiusX, indexY);

        ctx.quadraticCurveTo(nextX, -0.5 * (indexY + radiusY), nextX + radiusX, nextY);
      } else {
        //The swaps with columns that aren't neighbors
        ctx.moveTo(indexX + columns[index].clientWidth / 2, indexY);
        ctx.quadraticCurveTo(nextX, -0.5 * (indexY + radiusY), nextX + columns[nextIndex].clientWidth / 2, nextY);
      }
      ctx.stroke();
    },

    bubbleSort,

    swapBubbleSort,

    quickSort,

    partition,

    swapQuickSort,

    mergeSort,

    merge,

    heapSort,

    heapify,

    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
  },
});

app.mount('#app');
