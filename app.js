const app = Vue.createApp({
  data() {
    return {
      list: [1, 1],
      numberItems: 2,
      algorithmChosen: '',
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
      await this.quickSort();
      await this.sleep(500);
      clearInterval(timerId);
      const columns = document.querySelectorAll('li');
      for (const column of columns) {
        await this.sleep(10);
        this.paintFinishColor(column);
      }
    },
    reset() {
      const columns = document.querySelectorAll('li');
      /* console.log('setHeightAndWidthColumns'); */
      columns.forEach((element) => {
        /* console.log(element.innerText + '%'); */
        element.style.backgroundColor = 'tomato';
      });
    },
    async paintFinishColor(e) {
      e.style.backgroundColor = 'rgb(21, 255, 0)';
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
          await this.swap(array, i, j, pivot);
          j--;
        } else i++;
      }
      return j;
    },
    async swap(array, i, j, pivot) {
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
