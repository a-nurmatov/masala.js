const begin1 = {
  '1': {
    text: "Argument sifatida ikkita sonni oladigan funksiya yarating va ularning yig‘indisini qaytaring.",
    examples: [
      'addition(3, 2) ➞ 5',
      'addition(-3, -6) ➞ -9',
      'addition(7, 3) ➞ 10'
    ],
    fun_name: 'addition (a, b)',
    solved: false,
    check: ['3, 2', '-3, -6', '7, 3'],
    answers: [5, -9, 10],
  },
  '2': {
    text: "Butun daqiqalarni oladigan va uni soniyalarga aylantiruvchi funksiyani yozing.",
    examples: [
      'convert(5) ➞ 300',
      'convert(3) ➞ 180',
      'convert(2) ➞ 120'
    ],
    fun_name: 'convert (minutes)',
    solved: false,
    check: ['5', '3', '2'],
    answers: [300, 180, 120],
  },
  '3': {
    text: "Argument sifatida butun sonni oladigan funksiya yarating. 1 dan shu songacha bo'lgan sonlar yig'indisini toping. Misol uchun, agar kiruvchi son 4 bo'lsa, sizning funktsiyangiz 10 ni qaytarishi kerak, chunki 1 + 2 + 3 + 4 = 10.",
    examples: [
      'addUp(4) ➞ 10',
      'addUp(13) ➞ 91',
      'addUp(600) ➞ 180300',
    ],
    fun_name: 'addUp (num)',
    solved: false,
    check: ['4', '10', '13', '600'],
    answers: [10, 55, 91, 180300],
  },
  '4': {
    text: "Berilgan sonlar qatorida eng kichik va eng katta sonlarni qaytaruvchi funksiya tuzing",
    examples: [
      'minMax([1, 2, 3, 4, 5]) ➞ [1, 5]',
      'minMax([2334454, 5]) ➞ [5, 2334454]',
      'minMax([1]) ➞ [1, 1]',
    ],
    fun_name: 'minMax (arr)',
    solved: false,
    check: ['[1, 2, 3, 4, 5]', '[2334454, 5]', '[1]'],
    answers: [[1, 5], [5, 2334454], [1, 1]],
  },
}