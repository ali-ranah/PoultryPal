import React from 'react';
import { Button, Input, Typography } from "@material-tailwind/react";

const blogPosts = [
  {
    title: "How to Choose the Right Breed of Chicken for Your Farm",
    summary: "An overview of different chicken breeds and their specific advantages.",
    date: "June 1, 2024",
    image: "/images/breed-choice.jpg",
    author: {
      name: "Jane Doe",
      bio: "Poultry Expert",
      photo: "/images/jane.jpg",
    },
    tags: ["chickens", "breeds", "farming"],
  },
  {
    title: "Best Practices for Raising Day-Old Chicks",
    summary: "Tips and tricks for ensuring the health and growth of day-old chicks.",
    date: "May 15, 2024",
    image: "/images/chick-care.jpg",
    author: {
      name: "John Smith",
      bio: "Farm Specialist",
      photo: "/images/john.jpg",
    },
    tags: ["chicks", "care", "farming"],
  },
  // Add more blog posts as needed
];

const recentPosts = [
  "How to Choose the Right Breed of Chicken for Your Farm",
  "Best Practices for Raising Day-Old Chicks",
  // Add more recent posts as needed
];

const popularPosts = [
  "Best Practices for Raising Day-Old Chicks",
  "How to Choose the Right Breed of Chicken for Your Farm",
  // Add more popular posts as needed
];

const tags = ["chickens", "breeds", "farming", "care", "nutrition"];

const Blogs = () => {
  return (
    <section className="px-8 py-8 lg:py-16">
      <div className="container mx-auto text-center">
        <Typography
          variant="h5"
          color="blue-gray"
          className="mb-4 !text-base lg:!text-2xl"
        >
          Our Blog
        </Typography>
        <Typography
          variant="h1"
          color="blue-gray"
          className="mb-4 !text-3xl lg:!text-5xl"
        >
          Latest Insights and Articles
        </Typography>
        <Typography className="mb-10 font-normal !text-lg lg:mb-20 mx-auto max-w-3xl !text-gray-500">
          Stay updated with our latest news, tutorials, and insights on poultry farming and related products.
        </Typography>
        
        {/* Blog Post List */}
        <div className="grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-2 items-start mb-10">
          {blogPosts.map((post, index) => (
            <div key={index} className="text-left p-4 border rounded-lg shadow-lg">
              <img src={post.image} alt={post.title} className="mb-4 w-full h-auto" />
              <Typography variant="h5" className="mb-2">{post.title}</Typography>
              <Typography className="mb-4 !text-gray-500">{post.summary}</Typography>
              <Typography className="mb-4 !text-gray-500 text-sm">{post.date}</Typography>
              <div className="flex items-center mb-4">
                <img src={post.author.photo} alt={post.author.name} className="w-10 h-10 rounded-full mr-2" />
                <div>
                  <Typography variant="small">{post.author.name}</Typography>
                  <Typography className="!text-gray-500 text-xs">{post.author.bio}</Typography>
                </div>
              </div>
              <div className="flex space-x-2">
                {post.tags.map((tag, i) => (
                  <span key={i} className="text-sm bg-gray-200 text-gray-700 px-2 py-1 rounded">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Recent and Popular Posts */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-10">
          <div>
            <Typography variant="h3" color="blue-gray" className="mb-4">
              Recent Posts
            </Typography>
            <ul className="list-disc list-inside text-left">
              {recentPosts.map((post, index) => (
                <li key={index} className="mb-2 text-gray-700">{post}</li>
              ))}
            </ul>
          </div>
          <div>
            <Typography variant="h3" color="blue-gray" className="mb-4">
              Popular Posts
            </Typography>
            <ul className="list-disc list-inside text-left">
              {popularPosts.map((post, index) => (
                <li key={index} className="mb-2 text-gray-700">{post}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-10">
          <Input
            color="gray"
            size="lg"
            placeholder="Search blog posts..."
            className="focus:border-t-gray-900"
            containerProps={{
              className: "!min-w-full",
            }}
            labelProps={{
              className: "hidden",
            }}
          />
        </div>

        {/* Newsletter Subscription */}
        <div className="mb-10">
          <Typography variant="h3" color="blue-gray" className="mb-4">
            Subscribe to Our Newsletter
          </Typography>
          <Input
            color="gray"
            size="lg"
            placeholder="Enter your email address"
            className="focus:border-t-gray-900 mb-4"
            containerProps={{
              className: "!min-w-full",
            }}
            labelProps={{
              className: "hidden",
            }}
          />
          <Button variant="filled" color="gray" className="w-full">
            Subscribe
          </Button>
        </div>

        {/* Tags */}
        <div className="mb-10">
          <Typography variant="h3" color="blue-gray" className="mb-4">
            Tags
          </Typography>
          <div className="flex flex-wrap space-x-2">
            {tags.map((tag, index) => (
              <span key={index} className="text-sm bg-gray-200 text-gray-700 px-2 py-1 rounded mb-2">{tag}</span>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="mb-10">
          <Typography variant="h3" color="blue-gray" className="mb-4">
            Get In Touch
          </Typography>
          <Typography className="!text-gray-500 mb-4">Feel free to reach out if you have any questions or comments about our blog.</Typography>
          <Button variant="filled" color="gray" className="mb-2">
            Contact Us
          </Button>
        </div>

        {/* Related Posts */}
        <div className="mb-10">
          <Typography variant="h3" color="blue-gray" className="mb-4">
            Related Posts
          </Typography>
          <div className="grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-2 items-start">
            {/* Related posts (replace with actual content) */}
            <div className="text-left p-4 border rounded-lg shadow-lg">
              <img src="/images/related-post1.jpg" alt="Related Post 1" className="mb-4 w-full h-auto" />
              <Typography variant="h5" className="mb-2">Related Post One</Typography>
              <Typography className="!text-gray-500">Summary of related post one.</Typography>
            </div>
            <div className="text-left p-4 border rounded-lg shadow-lg">
              <img src="/images/related-post2.jpg" alt="Related Post 2" className="mb-4 w-full h-auto" />
              <Typography variant="h5" className="mb-2">Related Post Two</Typography>
              <Typography className="!text-gray-500">Summary of related post two.</Typography>
            </div>
            {/* Add more related posts as needed */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blogs;
