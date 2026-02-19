const now = Date.now();

const demoQuestions = [
  {
    _id: "dq1",
    questionNumber: 1,
    title: "Two Sum",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/two-sum/",
    isDone: true,
  },
  {
    _id: "dq2",
    questionNumber: 49,
    title: "Group Anagrams",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/group-anagrams/",
    isDone: true,
  },
  {
    _id: "dq3",
    questionNumber: 146,
    title: "LRU Cache",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/lru-cache/",
    isDone: false,
  },
  {
    _id: "dq4",
    questionNumber: 3,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
    isDone: true,
  },
  {
    _id: "dq5",
    questionNumber: 121,
    title: "Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
    isDone: true,
  },
  {
    _id: "dq6",
    questionNumber: 560,
    title: "Subarray Sum Equals K",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/subarray-sum-equals-k/",
    isDone: false,
  },
  {
    _id: "dq7",
    questionNumber: 84,
    title: "Largest Rectangle in Histogram",
    difficulty: "Hard",
    link: "https://leetcode.com/problems/largest-rectangle-in-histogram/",
    isDone: true,
  },
  {
    _id: "dq8",
    questionNumber: 238,
    title: "Product of Array Except Self",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/product-of-array-except-self/",
    isDone: false,
  },
];

const byId = Object.fromEntries(demoQuestions.map((q) => [q._id, q]));

export const demoHomeData = {
  user_data: [
    {
      _id: "dp1",
      queue: "Q1",
      isDone: true,
      queueEnteredAt: new Date(now - 2 * 24 * 60 * 60 * 1000),
      question: byId.dq1,
    },
    {
      _id: "dp2",
      queue: "Q2",
      isDone: true,
      queueEnteredAt: new Date(now - 5 * 24 * 60 * 60 * 1000),
      question: byId.dq2,
    },
    {
      _id: "dp3",
      queue: "Q3",
      isDone: true,
      queueEnteredAt: new Date(now - 10 * 24 * 60 * 60 * 1000),
      question: byId.dq4,
    },
    {
      _id: "dp4",
      queue: "Q4",
      isDone: true,
      queueEnteredAt: new Date(now - 14 * 24 * 60 * 60 * 1000),
      question: byId.dq5,
    },
    {
      _id: "dp5",
      queue: "Q5",
      isDone: true,
      queueEnteredAt: new Date(now - 21 * 24 * 60 * 60 * 1000),
      question: byId.dq7,
    },
  ],
  stats: {
    totalSolved: 29,
    streak: 6,
    queueCounts: { Q1: 1, Q2: 1, Q3: 1, Q4: 1, Q5: 1 },
  },
};

export const demoQuestionsData = demoQuestions;
