import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    const alice = await prisma.user.upsert({
      where: { email: "alice@prisma.io" },
      update: {},
      create: {
        email: "alice@prisma.io",
        name: "Alice",
        posts: {
          create: {
            title: "Check out Prisma with Next.js",
            content: "https://www.prisma.io/nextjs",
            published: true,
          },
        },
      },
    });

    const bob = await prisma.user.upsert({
      where: { email: "bob@prisma.io" },
      update: {},
      create: {
        email: "bob@prisma.io",
        name: "Bob",
        posts: {
          create: [
            {
              title: "Follow Prisma on Twitter",
              content: "https://twitter.com/prisma",
              published: true,
            },
            {
              title: "Follow Nexus on Twitter",
              content: "https://twitter.com/nexusgql",
              published: true,
            },
          ],
        },
      },
    });

    console.log({ alice, bob });

    // Seed fake posts
    const fakePosts = [
      {
        title: "Exploring the Depths of Quantum Computing",
        content:
          "Quantum computing promises to revolutionize various fields by harnessing the power of quantum mechanics. This technology is still in its nascent stages, but the potential is immense...",
        published: true,
        authorId: alice.id, // Assign to Alice
      },
      {
        title: "The Art of Sustainable Living",
        content:
          "Sustainable living is not just a trend; it's a necessity. From reducing waste to conserving energy, there are numerous ways to make a positive impact on the environment...",
        published: true,
        authorId: bob.id, // Assign to Bob
      },
      {
        title: "A Beginner's Guide to Web Development",
        content:
          "Web development can seem daunting at first, but with the right resources and a bit of practice, anyone can learn to build websites. This guide will walk you through the basics...",
        published: false,
        authorId: alice.id, // Assign to Alice
      },
      {
        title: "The Rise of Artificial Intelligence in Everyday Life",
        content:
          "AI is no longer a concept from science fiction; it's becoming an integral part of our daily lives. From virtual assistants to self-driving cars, AI is transforming the way we live and work...",
        published: true,
        authorId: bob.id, // Assign to Bob
      },
      {
        title: "Delicious and Healthy Vegan Recipes",
        content:
          "Vegan cuisine is not only delicious but also incredibly healthy. Discover a collection of easy-to-prepare vegan recipes that will tantalize your taste buds and nourish your body...",
        published: true,
        authorId: alice.id, // Assign to Alice
      },
      {
        title: "Mastering the Fundamentals of Graphic Design",
        content:
          "Graphic design is a skill that blends creativity and technical expertise. Learn the essential principles of graphic design and how to create visually appealing designs...",
        published: false,
        authorId: bob.id, // Assign to Bob
      },
      {
        title: "Travel Destinations for the Adventurous Soul",
        content:
          "For those who crave adventure, the world is full of incredible destinations waiting to be explored. From hiking in the Himalayas to diving in the Great Barrier Reef, embark on unforgettable journeys...",
        published: true,
        authorId: alice.id, // Assign to Alice
      },
      {
        title: "The Importance of Mindfulness in Modern Life",
        content:
          "In today's fast-paced world, mindfulness has become more important than ever. Learn how to cultivate mindfulness and experience the benefits of living in the present moment...",
        published: true,
        authorId: bob.id, // Assign to Bob
      },
      {
        title: "Understanding Blockchain Technology",
        content:
          "Blockchain technology is revolutionizing various industries by providing a secure and transparent way to record and verify transactions. Dive into the world of blockchain and discover its potential...",
        published: true,
        authorId: alice.id, // Assign to Alice
      },
      {
        title: "The Power of Effective Communication",
        content:
          "Effective communication is a crucial skill in both personal and professional life. Learn how to communicate clearly and confidently and build stronger relationships...",
        published: false,
        authorId: bob.id, // Assign to Bob
      },
    ];

    for (const post of fakePosts) {
      await prisma.post.create({
        data: post,
      });
    }

    console.log("Seed data inserted successfully.");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
