const string1 = {
  '1': {
    text: "Berilgan manfiy bo'lmagan son faqat 3 yoki 5 ga karrali bo'lsa, rost qiymatini qaytaring.",
    examples: {
      '1': 'Only35(12) → true',
      '2': 'Only35(4) → false'
    },
    fun_name: 'Only35 (val)',
    solved: true,
    check: [12, 4, 5],
    answers: [true, false, true],
  },
  '2': {
    text: 'Satr nomi berilgan, masalan. "Bob", "Salom Bob!" shaklidagi salomni qaytaring.',
    examples: {
      '1': "helloName('Bob') → Hello Bob!",
      '2': "helloName('Alice') → Hello Alice!"
    },
    fun_name: 'helloName (str)',
    solved: false,
  },
  '3': {
    text: "Satr berilgan bo'lsa, asl satrning oxirgi 2 ta belgisidan 3 ta nusxadan iborat yangi qatorni qaytaring. Satr uzunligi kamida 2 bo'ladi.",
    examples: {
      '1': "tripleLast2('Hello') → 'lololo'",
      '2': "tipleLast2('ab') → 'ababab'"
    },
    fun_name: 'tripleLast2 (str)',
    solved: false,
  },
}