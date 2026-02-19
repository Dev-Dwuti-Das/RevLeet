export const demoQueueData = [
  {
    _id: "d1",
    queue: "Q1",
    isDone: false,
    queueEnteredAt: "2026-02-04T09:30:00.000Z",
    question: {
      _id: "q1",
      title: "Two Sum",
      difficulty: "Easy",
      link: "https://leetcode.com/problems/two-sum/",
    },
  },
  {
    _id: "d2",
    queue: "Q1",
    isDone: false,
    queueEnteredAt: "2026-02-05T10:15:00.000Z",
    question: {
      _id: "q2",
      title: "Valid Parentheses",
      difficulty: "Easy",
      link: "https://leetcode.com/problems/valid-parentheses/",
    },
  },
  {
    _id: "d3",
    queue: "Q2",
    isDone: false,
    queueEnteredAt: "2026-02-06T11:00:00.000Z",
    question: {
      _id: "q3",
      title: "Container With Most Water",
      difficulty: "Medium",
      link: "https://leetcode.com/problems/container-with-most-water/",
    },
  },
  {
    _id: "d4",
    queue: "Q2",
    isDone: false,
    queueEnteredAt: "2026-02-07T12:00:00.000Z",
    question: {
      _id: "q4",
      title: "3Sum",
      difficulty: "Medium",
      link: "https://leetcode.com/problems/3sum/",
    },
  },
  {
    _id: "d5",
    queue: "Q3",
    isDone: false,
    queueEnteredAt: "2026-02-09T08:45:00.000Z",
    question: {
      _id: "q5",
      title: "Product of Array Except Self",
      difficulty: "Medium",
      link: "https://leetcode.com/problems/product-of-array-except-self/",
    },
  },
  {
    _id: "d6",
    queue: "Q4",
    isDone: false,
    queueEnteredAt: "2026-02-11T14:20:00.000Z",
    question: {
      _id: "q6",
      title: "Merge Intervals",
      difficulty: "Medium",
      link: "https://leetcode.com/problems/merge-intervals/",
    },
  },
  {
    _id: "d7",
    queue: "Q5",
    isDone: true,
    queueEnteredAt: "2026-02-13T17:10:00.000Z",
    question: {
      _id: "q7",
      title: "Binary Search",
      difficulty: "Easy",
      link: "https://leetcode.com/problems/binary-search/",
    },
  },
  {
    _id: "d8",
    queue: "Q5",
    isDone: true,
    queueEnteredAt: "2026-02-15T18:00:00.000Z",
    question: {
      _id: "q8",
      title: "Group Anagrams",
      difficulty: "Medium",
      link: "https://leetcode.com/problems/group-anagrams/",
    },
  },
];

export const demoQuestions = demoQueueData.map((item) => ({
  _id: item.question._id,
  title: item.question.title,
  difficulty: item.question.difficulty,
  link: item.question.link,
  isDone: item.isDone,
}));

export const demoStats = { streak: 6 };
