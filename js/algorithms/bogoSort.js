export async function bogoSort(array = this.list) {
  while (await this.isArrayNotSorted(array)) {
    await this.shuffleArrayRandom(array);
  }
}
