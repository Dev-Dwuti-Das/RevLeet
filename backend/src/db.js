import mongoose from 'mongoose';
const url = process.env.MONGO_KEY;

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_KEY, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
}

// export const sample_user_data = [{
//     "name": "devdas",
//     "email": "devdas@example.com",
//     "profile": {
//       "fullName": "Dev D. Das",
//       "avatarUrl": "https://example.com/avatars/devdas.png",
//       "bio": "Founder of Sprucial, passionate about AI and coding humor reels."
//     },
//     "totalSolved": 120,
//     "streak": 12,
//     "lastActive": "2025-10-21T18:45:00.000Z"
//   }]

export const mockQuestions =[
  {
    "questionNumber": 329,
    "title": "Longest Increasing Path in a Matrix",
    "slug": "longest-increasing-path-in-a-matrix",
    "difficulty": "Hard",
    "topicTags": ["Matrix", "DFS", "Memoization"],
    "link": "https://leetcode.com/problems/longest-increasing-path-in-a-matrix",
    "status": "Unsolved",
    "createdBy": null
  },
  {
    "questionNumber": 174,
    "title": "Dungeon Game",
    "slug": "dungeon-game",
    "difficulty": "Hard",
    "topicTags": ["DP"],
    "link": "https://leetcode.com/problems/dungeon-game",
    "status": "Unsolved",
    "createdBy": null
  },

  {
    "questionNumber": 698,
    "title": "Partition to K Equal Sum Subsets",
    "slug": "partition-to-k-equal-sum-subsets",
    "difficulty": "Medium",
    "topicTags": ["Backtracking", "DP"],
    "link": "https://leetcode.com/problems/partition-to-k-equal-sum-subsets",
    "status": "Unsolved",
    "createdBy": null
  },

  {
    "questionNumber": 1396,
    "title": "Design Underground System",
    "slug": "design-underground-system",
    "difficulty": "Medium",
    "topicTags": ["Design", "Hash Map"],
    "link": "https://leetcode.com/problems/design-underground-system",
    "status": "Unsolved",
    "createdBy": null
  },

  {
    "questionNumber": 460,
    "title": "LFU Cache",
    "slug": "lfu-cache",
    "difficulty": "Hard",
    "topicTags": ["Design", "Hash Map", "Linked List"],
    "link": "https://leetcode.com/problems/lfu-cache",
    "status": "Unsolved",
    "createdBy": null
  },

  {
    "questionNumber": 1706,
    "title": "Where Will the Ball Fall",
    "slug": "where-will-the-ball-fall",
    "difficulty": "Medium",
    "topicTags": ["Matrix", "Simulation"],
    "link": "https://leetcode.com/problems/where-will-the-ball-fall",
    "status": "Unsolved",
    "createdBy": null
  },

  {
    "questionNumber": 1306,
    "title": "Jump Game III",
    "slug": "jump-game-iii",
    "difficulty": "Medium",
    "topicTags": ["BFS", "DFS"],
    "link": "https://leetcode.com/problems/jump-game-iii",
    "status": "Unsolved",
    "createdBy": null
  },

  {
    "questionNumber": 155,
    "title": "Min Stack",
    "slug": "min-stack",
    "difficulty": "Medium",
    "topicTags": ["Stack", "Design"],
    "link": "https://leetcode.com/problems/min-stack",
    "status": "Unsolved",
    "createdBy": null
  },

  {
    "questionNumber": 394,
    "title": "Decode String",
    "slug": "decode-string",
    "difficulty": "Medium",
    "topicTags": ["Stack", "String"],
    "link": "https://leetcode.com/problems/decode-string",
    "status": "Unsolved",
    "createdBy": null
  },

  {
    "questionNumber": 560,
    "title": "Subarray Sum Equals K",
    "slug": "subarray-sum-equals-k",
    "difficulty": "Medium",
    "topicTags": ["Array", "Prefix Sum"],
    "link": "https://leetcode.com/problems/subarray-sum-equals-k",
    "status": "Unsolved",
    "createdBy": null
  },

  {
    "questionNumber": 525,
    "title": "Contiguous Array",
    "slug": "contiguous-array",
    "difficulty": "Medium",
    "topicTags": ["Hash Map", "Array"],
    "link": "https://leetcode.com/problems/contiguous-array",
    "status": "Unsolved",
    "createdBy": null
  },

  {
    "questionNumber": 1209,
    "title": "Remove All Adjacent Duplicates in String II",
    "slug": "remove-all-adjacent-duplicates-in-string-ii",
    "difficulty": "Medium",
    "topicTags": ["Stack", "String"],
    "link": "https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string-ii",
    "status": "Unsolved",
    "createdBy": null
  },

  {
    "questionNumber": 402,
    "title": "Remove K Digits",
    "slug": "remove-k-digits",
    "difficulty": "Medium",
    "topicTags": ["Stack", "Greedy"],
    "link": "https://leetcode.com/problems/remove-k-digits",
    "status": "Unsolved",
    "createdBy": null
  },

  {
    "questionNumber": 316,
    "title": "Remove Duplicate Letters",
    "slug": "remove-duplicate-letters",
    "difficulty": "Medium",
    "topicTags": ["Stack", "Greedy", "String"],
    "link": "https://leetcode.com/problems/remove-duplicate-letters",
    "status": "Unsolved",
    "createdBy": null
  },

  {
    "questionNumber": 201,
    "title": "Bitwise AND of Numbers Range",
    "slug": "bitwise-and-of-numbers-range",
    "difficulty": "Medium",
    "topicTags": ["Bit Manipulation"],
    "link": "https://leetcode.com/problems/bitwise-and-of-numbers-range",
    "status": "Unsolved",
    "createdBy": null
  },

  {
    "questionNumber": 139,
    "title": "Word Break",
    "slug": "word-break",
    "difficulty": "Medium",
    "topicTags": ["DP", "String"],
    "link": "https://leetcode.com/problems/word-break",
    "status": "Unsolved",
    "createdBy": null
  },

  {
    "questionNumber": 647,
    "title": "Palindromic Substrings",
    "slug": "palindromic-substrings",
    "difficulty": "Medium",
    "topicTags": ["DP", "String"],
    "link": "https://leetcode.com/problems/palindromic-substrings",
    "status": "Unsolved",
    "createdBy": null
  },

  {
    "questionNumber": 227,
    "title": "Basic Calculator II",
    "slug": "basic-calculator-ii",
    "difficulty": "Medium",
    "topicTags": ["Stack", "Math"],
    "link": "https://leetcode.com/problems/basic-calculator-ii",
    "status": "Unsolved",
    "createdBy": null
  },

  {
    "questionNumber": 772,
    "title": "Basic Calculator III",
    "slug": "basic-calculator-iii",
    "difficulty": "Hard",
    "topicTags": ["Stack", "Math"],
    "link": "https://leetcode.com/problems/basic-calculator-iii",
    "status": "Unsolved",
    "createdBy": null
  },

  {
    "questionNumber": 726,
    "title": "Number of Atoms",
    "slug": "number-of-atoms",
    "difficulty": "Hard",
    "topicTags": ["Stack", "Hash Map"],
    "link": "https://leetcode.com/problems/number-of-atoms",
    "status": "Unsolved",
    "createdBy": null
  },

  {
    "questionNumber": 301,
    "title": "Remove Invalid Parentheses",
    "slug": "remove-invalid-parentheses",
    "difficulty": "Hard",
    "topicTags": ["Backtracking", "BFS"],
    "link": "https://leetcode.com/problems/remove-invalid-parentheses",
    "status": "Unsolved",
    "createdBy": null
  },

  {
    "questionNumber": 1091,
    "title": "Shortest Path in Binary Matrix",
    "slug": "shortest-path-in-binary-matrix",
    "difficulty": "Medium",
    "topicTags": ["BFS", "Matrix"],
    "link": "https://leetcode.com/problems/shortest-path-in-binary-matrix",
    "status": "Unsolved",
    "createdBy": null
  },

  {
    "questionNumber": 2076,
    "title": "Process Restricted Friend Requests",
    "slug": "process-restricted-friend-requests",
    "difficulty": "Hard",
    "topicTags": ["Union Find", "Graph"],
    "link": "https://leetcode.com/problems/process-restricted-friend-requests",
    "status": "Unsolved",
    "createdBy": null
  },

  {
    "questionNumber": 130,
    "title": "Surrounded Regions",
    "slug": "surrounded-regions",
    "difficulty": "Medium",
    "topicTags": ["DFS", "Matrix"],
    "link": "https://leetcode.com/problems/surrounded-regions",
    "status": "Unsolved",
    "createdBy": null
  },

  {
    "questionNumber": 785,
    "title": "Is Graph Bipartite?",
    "slug": "is-graph-bipartite",
    "difficulty": "Medium",
    "topicTags": ["Graph", "BFS"],
    "link": "https://leetcode.com/problems/is-graph-bipartite",
    "status": "Unsolved",
    "createdBy": null
  },

  {
    "questionNumber": 909,
    "title": "Snakes and Ladders",
    "slug": "snakes-and-ladders",
    "difficulty": "Medium",
    "topicTags": ["Graph", "BFS"],
    "link": "https://leetcode.com/problems/snakes-and-ladders",
    "status": "Unsolved",
    "createdBy": null
  },

  {
    "questionNumber": 133,
    "title": "Clone Graph",
    "slug": "clone-graph",
    "difficulty": "Medium",
    "topicTags": ["Graph", "DFS"],
    "link": "https://leetcode.com/problems/clone-graph",
    "status": "Unsolved",
    "createdBy": null
  },

  {
    "questionNumber": 721,
    "title": "Accounts Merge",
    "slug": "accounts-merge",
    "difficulty": "Medium",
    "topicTags": ["Union Find", "Graph"],
    "link": "https://leetcode.com/problems/accounts-merge",
    "status": "Unsolved",
    "createdBy": null
  },

  {
    "questionNumber": 1192,
    "title": "Critical Connections in a Network",
    "slug": "critical-connections-in-a-network",
    "difficulty": "Hard",
    "topicTags": ["Graph", "Tarjan"],
    "link": "https://leetcode.com/problems/critical-connections-in-a-network",
    "status": "Unsolved",
    "createdBy": null
  }
]










  


