export const bubbleSort = inputArray => {
  const arr = inputArray.slice();
  const animations = [];
  for (let i = 0; i < arr.length; i++)
    for (let j = 0; j < arr.length - i - 1; j++) {
      animations.push({type: 'scan', pair: [j, j+1]});
      if (arr[j] > arr[j+1]) {
        animations.push({type: 'swap', pair: [j, j+1]});
        const temp = arr[j];
        arr[j] = arr[j+1];
        arr[j+1] = temp;
      }
    }
  return animations;
};

export const selectionSort = inputArray => {
  const arr = inputArray.slice();
  const animations = [];
  for (let i = 0; i < arr.length-1; i++) {
    let min = i;
    for (let j = i+1; j < arr.length; j++) {
      animations.push({type: 'scan', pair: [min, j]});
      if (arr[min] > arr[j])
        min = j;
    }
    if (min !== i) {
      animations.push({type: 'swap', pair: [i, min]});
      const temp = arr[i];
      arr[i] = arr[min];
      arr[min] = temp;
    }
  }
  return animations;
}

export const insertionSort = inputArray => {
  const arr = inputArray.slice();
  const animations = [];
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i-1;
    while (j >=0 && arr[j] > key) {
      animations.push({type: 'scan', pair: [i, j]});
      animations.push({type: 'copy', target: j+1, val: arr[j]});
      arr[j+1] = arr[j];
      j = j-1;
    }
    animations.push({type: 'copy', target: j+1, val: key});
    arr[j+1] = key;
  }
  return animations;
}

export const heapSort = inputArray => {
  const arr = inputArray.slice();
  const animations = [];

  const swap = (arr, left, right) => {
    var temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp;
  };

  const maxHeapify = (arr, i) => {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let max = i;
    if (left < len)
      animations.push({type: 'scan', pair: [left, max]});
    if (left < len && arr[left] > arr[max])
      max = left;
    if (right < len)
      animations.push({type: 'scan', pair: [right, max]});
    if (right < len && arr[right] > arr[max])
      max = right;
    if (max !== i) {
      animations.push({type: 'swap', pair: [i, max]});
      swap(arr, i, max);
      maxHeapify(arr, max);
    }
  };

  let len = arr.length;
  for (let i = Math.floor(len / 2); i >= 0; i--)
    maxHeapify(arr, i);
  for (let i = len - 1; i > 0; i--) {
    animations.push({type: 'swap', pair: [0, i]});
    swap(arr, 0, i);
    len--;
    maxHeapify(arr, 0);
  }
  return animations;
}

export const mergeSort = (inputArray) => {
  const animations = [];

  const merge = (left, right, leftStartIndex, rightStartIndex) => {
    let resultArray = [], mergeIndex = leftStartIndex, leftIndex = 0, rightIndex = 0;
    while (leftIndex < left.length && rightIndex < right.length) {
      animations.push({type: 'scan', pair: [leftStartIndex + leftIndex, rightStartIndex + rightIndex]})
      if (left[leftIndex] < right[rightIndex]) {
        animations.push({type: 'insert', val: left[leftIndex], pair: [leftStartIndex + leftIndex, mergeIndex++]})
        resultArray.push(left[leftIndex++]);
      }
      else {
        animations.push({type: 'insert', val: right[rightIndex], pair: [rightStartIndex + rightIndex, mergeIndex++]})
        resultArray.push(right[rightIndex++]);
      }
    }
    while (leftIndex < left.length) {
      animations.push({type: 'insert', val: left[leftIndex], pair: [leftStartIndex + leftIndex, mergeIndex++]})
      resultArray.push(left[leftIndex++]);
    }
    while (rightIndex < right.length) {
      animations.push({type: 'insert', val: right[rightIndex], pair: [rightStartIndex + rightIndex, mergeIndex++]})
      resultArray.push(right[rightIndex++]);
    }
    return resultArray;
  };

  const divide = (inputArray, startIndex) => {
    if (inputArray.length <= 1)
      return inputArray;
    const middle = Math.floor(inputArray.length / 2);
    const left = inputArray.slice(0, middle);
    const right = inputArray.slice(middle);
    return merge(divide(left, startIndex), divide(right, startIndex + middle), startIndex, startIndex + middle);
  };

  divide(inputArray, 0);
  return animations;
}

export const quickSort = inputArray => {
  const arr = inputArray.slice();
  const animations = [];

  const swap = (arr, left, right) => {
    var temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp;
  }

  const partition = (arr, left, right) => {
    var pivot = arr[Math.floor((right + left) / 2)], i = left, j = right;
    while (i <= j) {
      while (arr[i] < pivot)
        i++;
      while (arr[j] > pivot)
        j--;
      animations.push({type: 'scan', pair: [i, j]});
      if (i <= j) {
        animations.push({type: 'swap', pair: [i, j]});
        swap(arr, i++, j--);
      }
    }
    return i;
  }

  const quickSortAuxiliary = (arr, left, right) => {
    var index;
    if (arr.length > 1) {
      index = partition(arr, left, right);
      if (left < index - 1)
        quickSortAuxiliary(arr, left, index - 1);
      if (index < right)
        quickSortAuxiliary(arr, index, right);
    }
    return arr;
  }

  quickSortAuxiliary(arr, 0, arr.length-1, animations);
  return animations;
}
