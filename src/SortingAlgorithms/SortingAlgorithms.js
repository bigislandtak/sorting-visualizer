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

  const array = divide(inputArray, 0);
  return animations;
}

export const quickSort = inputArray => {
  const arr = inputArray.slice();
  const animations = [];

  const partition = (arr, p, r, animations) => {
    let x = arr[r];
    let i = p-1;
    for (let j = p; j < r; j++) {
      animations.push({type: 'scan', pair: [r, j]});
      if (arr[j] <= x) {
        i = i+1;
        animations.push({type: 'swap', pair: [i, j]});
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
    }
    animations.push({type: 'swap', pair: [i+1, r]});
    const temp = arr[i+1];
    arr[i+1] = arr[r];
    arr[r] = temp;
    return i+1;
  };

  const quickSortAuxiliary = (arr, p, r, animations) => {
    if (p < r) {
      const q = partition(arr, p, r, animations);
      quickSortAuxiliary(arr, p, q-1, animations);
      quickSortAuxiliary(arr, q+1, r, animations);
    }
  };

  quickSortAuxiliary(arr, 0, arr.length-1, animations);
  return animations;
}
