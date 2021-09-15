import db from "./db.js";
import Book from "./models/Book.js";
import Review from "./models/Review.js";
import User from "./models/User.js";

export const testBooks = [
  {
    title: "Refactoring",
    author: "Martin Fowler",
    image: "https://martinfowler.com/books/refact2.jpg",
    description: `Refactoring is a controlled technique for improving the design of an existing code base. Its essence is applying a series of small behavior-preserving transformations, each of which "too small to be worth doing". However the cumulative effect of each of these transformations is quite significant. By doing them in small steps you reduce the risk of introducing errors. You also avoid having the system broken while you are carrying out the restructuring - which allows you to gradually refactor a system over an extended period of time.`,
  },
  {
    title: "Building Microservices",
    author: "Sam Newman",
    image:
      "https://images-na.ssl-images-amazon.com/images/I/519Q46LvdCL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg",
    description: `Distributed systems have become more fine-grained in the past 10 years, shifting from code-heavy monolithic applications to smaller, self-contained microservices. But developing these systems brings its own set of headaches. With lots of examples and practical advice, this book takes a holistic view of the topics that system architects and administrators must consider when building, managing, and evolving microservice architectures.`,
  },
  {
    title: "Test-Driven Development By Example",
    author: "Kent Beck",
    image:
      "https://images-na.ssl-images-amazon.com/images/I/41pO5GqNtzL._SX396_BO1,204,203,200_.jpg",
    description: `Quite simply, test-driven development is meant to eliminate fear in application development. While some fear is healthy (often viewed as a conscience that tells programmers to "be careful!"), the author believes that byproducts of fear include tentative, grumpy, and uncommunicative programmers who are unable to absorb constructive criticism. When programming teams buy into TDD, they immediately see positive results. They eliminate the fear involved in their jobs, and are better equipped to tackle the difficult challenges that face them. TDD eliminates tentative traits, it teaches programmers to communicate, and it encourages team members to seek out criticism However, even the author admits that grumpiness must be worked out individually! In short, the premise behind TDD is that code should be continually tested and refactored. Kent Beck teaches programmers by example, so they can painlessly and dramatically increase the quality of their work.`,
  },
  {
    title: "Mastering React Test-Driven Development",
    author: "Daniel Irvine",
    image:
      "https://images-na.ssl-images-amazon.com/images/I/51LsOcdhupL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg",
    description: `Many programmers are aware of TDD but struggle to apply it beyond basic examples. This book teaches how to build complex, real-world applications using Test-Driven Development (TDD). It takes a first principles approach to the TDD process using plain Jest and includes test-driving the integration of libraries including React Router, Redux, and Relay (GraphQL).

Readers will practice systematic refactoring while building out their own test framework, gaining a deep understanding of TDD tools and techniques. They will learn how to test-drive features such as client- and server-side form validation, data filtering and searching, navigation and user workflow, undo/redo, animation, LocalStorage access, WebSocket communication, and querying GraphQL endpoints.

The book covers refactoring codebases to use the React Router and Redux libraries. via TDD. Redux is explored in depth, with reducers, middleware, sagas, and connected React components. The book also covers acceptance testing using Cucumber and Puppeteer.`,
  },
];

export const testReviews = [
  {
    name: "Erin Burton",
    content: "This book is fantastic!",
  },
  {
    name: "Juntao Qiu",
    content:
      "Excellent book, very useful. I found the examples to be fun to work through, and this book just keeps inspiring me to better my code.",
  },
];

export async function seed() {
  await db.sync({ force: true });
  console.log("Database synced");

  const refactoring = await Book.create(testBooks[0]);
  const erin = await User.create({
    username: "erinburton",
    email: "erin@buton.com",
    password: "123456",
    photoUrl: "",
  });
  const juntao = await User.create({
    username: "juntao",
    email: "juntao@email.com",
    password: "123456",
    photoUrl: "",
  });

  const reviews = [
    {
      name: "Erin Burton",
      content: "This book is fantastic!",
      userId: erin.id,
      bookId: refactoring.id,
    },
    {
      name: "Juntao Qiu",
      content:
        "Excellent book, very useful. I found the examples to be fun to work through, and this book just keeps inspiring me to better my code.",
      userId: juntao.id,
      bookId: refactoring.id,
    },
  ];

  await Promise.all(
    testBooks
      .slice(1)
      .map(book => Book.create(book))
      .concat(reviews.map(review => Review.create(review)))
  );
}

export async function runSeed() {
  console.log("Seeding...");
  try {
    console.log("Connection has been established");
    await seed();
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  } finally {
    console.log("Closing database connection");
    await db.close();
    console.log("Database connection closed");
  }
}
