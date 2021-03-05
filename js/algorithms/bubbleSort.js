export async function bubbleSort(array = this.list, length = array.length) {
  const columns = document.querySelector('ul').getElementsByTagName('li');

  for (let i = 1; i < length + 1; i++) {
    for (let index = 0; index < length - i; index++) {
      await this.sleep(this.delay);
      this.paintColumn(columns[index], this.green);
      this.paintColumn(columns[index + 1], this.green);
      await this.sleep(this.delay);
      if (array[index] > array[index + 1]) {
        await this.swapBubbleSort(array, index, index + 1);
      }

      await this.paintColumn(columns[index], this.colorColumn);
    }
  }
  await this.sleep(this.delay);
  await this.paintColumn(columns[0], this.green);
}

export async function swapBubbleSort(array, index, nextIndex) {
  const columns = document.querySelector('ul').getElementsByTagName('li');
  const lolo = document.querySelector('ul');
  await this.sleep(this.delay);
  let temp = array[index];
  console.log(columns[index].textContent);
  console.log(columns[index].offsetLeft, columns[index].offsetTop);
  console.log(columns[nextIndex].textContent);
  console.log(columns[nextIndex].offsetLeft, columns[nextIndex].offsetTop);

  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');
  this.drawElipse(canvas, ctx, index, nextIndex);

  await this.sleep(this.delay);

  await this.paintColumn(columns[index], this.swapColor);
  await this.paintColumn(columns[nextIndex], this.swapColor);
  await this.sleep(this.delay);
  array[index] = array[nextIndex];
  array[nextIndex] = temp;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  await this.sleep(this.delay);

  await this.paintColumn(columns[index], this.green);
  await this.paintColumn(columns[nextIndex], this.green);
}
