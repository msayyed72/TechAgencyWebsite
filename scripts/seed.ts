import { storage } from '../server/storage';
import { 
  InsertProject, 
  InsertService, 
  InsertTestimonial, 
  InsertBlogPost, 
  InsertContactSubmission 
} from '../shared/schema';
import { eq } from 'drizzle-orm';
import { PostgresStorage } from '../server/storage';
import { projects, services, testimonials, users, blogPosts, contactSubmissions } from '../shared/schema';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

async function seedDatabase() {
  console.log('🌱 Seeding database with missing data...');
  
  // Check if we need to update image URLs for projects
  try {
    if (process.env.DATABASE_URL) {
      const client = postgres(process.env.DATABASE_URL);
      const db = drizzle(client);
      
      // Update the image URLs for existing projects
      await db.update(projects)
        .set({ 
          imageUrl: 'https://images.unsplash.com/photo-1661956602944-249bcd04b63f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZSUyMGNvbW1lcmNlfGVufDB8fDB8fHww',
          demoUrl: 'https://ecommerce-example.com',
          category: 'E-commerce'
        })
        .where(eq(projects.slug, 'e-commerce-platform'));
        
      await db.update(projects)
        .set({ 
          imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGZpdG5lc3MlMjBhcHB8ZW58MHx8MHx8fDA%3D',
          demoUrl: 'https://fitness-app-example.com',
          category: 'Mobile'
        })
        .where(eq(projects.slug, 'health-fitness-app'));
        
      await db.update(projects)
        .set({ 
          imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmluYW5jaWFsJTIwZGFzaGJvYXJkfGVufDB8fDB8fHww',
          demoUrl: 'https://finance-dashboard-example.com',
          category: 'Business Intelligence'
        })
        .where(eq(projects.slug, 'financial-dashboard'));
        
      console.log('✅ Updated image URLs for existing projects');
    }
  } catch (error) {
    console.error('❌ Error updating project image URLs:', error);
  }

  // Seed Testimonials - we confirmed these don't exist yet
  const testimonialsData = [
    {
      clientName: 'Sarah Johnson',
      clientTitle: 'CTO',
      companyName: 'InnovateX',
      content: 'Working with this team was a game-changer for our business. They delivered a complex web application on time and within budget. Their technical expertise is unmatched.',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D',
      rating: 5,
      orderIndex: 1,
      featured: true,
    },
    {
      clientName: 'Mark Thompson',
      clientTitle: 'Founder',
      companyName: 'EcoTech',
      content: 'The mobile app developed by this team has transformed our customer engagement. The attention to detail and user experience is impressive.',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D',
      rating: 5,
      orderIndex: 2,
      featured: true,
    },
    {
      clientName: 'Jennifer Lee',
      clientTitle: 'Marketing Director',
      companyName: 'GlobalRetail',
      content: 'Our e-commerce platform revamp exceeded expectations. Sales increased by 45% within the first month of launch. Excellent communication throughout the project.',
      avatarUrl: 'https://images.unsplash.com/photo-1619895862022-09114b41f16f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D',
      rating: 4,
      orderIndex: 3,
      featured: true,
    }
  ] as InsertTestimonial[];

  for (const testimonial of testimonialsData) {
    try {
      await storage.createTestimonial(testimonial);
      console.log(`✅ Created testimonial from: ${testimonial.clientName}`);
    } catch (error) {
      console.error(`❌ Error creating testimonial from ${testimonial.clientName}:`, error);
    }
  }

  // Let's create a test user for blog posts - we confirmed no users exist yet
  let adminUser;
  try {
    adminUser = await storage.createUser({
      username: 'admin',
      password: 'password123',  // This would be hashed in a real application
      email: 'admin@example.com',
      role: 'admin'
    });
    console.log('✅ Created admin user');
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
    // If we can't create a user, we can't continue with blog posts
    throw error;
  }

  // Seed Blog Posts - we confirmed no blog posts exist yet
  const blogPostsData = [
    {
      title: 'The Future of Web Development: Trends to Watch',
      slug: 'future-web-development-trends',
      excerpt: 'Explore the emerging technologies and methodologies shaping the future of web development.',
      content: `
# The Future of Web Development: Trends to Watch

Web development is constantly evolving, with new technologies and approaches emerging regularly. In this post, we'll explore some of the most exciting trends that are shaping the future of the field.

## 1. WebAssembly (Wasm)

WebAssembly is revolutionizing what's possible in web browsers by allowing code written in languages like C, C++, and Rust to run at near-native speeds. This opens up possibilities for bringing desktop-quality applications to the web, including:

- Complex data visualizations
- Games with high-performance requirements
- Computationally intensive applications like photo and video editing

## 2. Serverless Architecture

Serverless continues to gain momentum by changing how we think about backend infrastructure:

- Reduced operational complexity
- Automatic scaling based on demand
- Pay-per-use pricing models
- Focus on writing code rather than managing servers

## 3. JAMstack Architecture

The JAMstack (JavaScript, APIs, and Markup) approach emphasizes pre-rendering and decoupling:

- Better performance through static site generation
- Improved security with fewer server-side processes
- Better developer experience with simpler deployments
- Flexibility in headless CMS options

## 4. AI-Assisted Development

Artificial intelligence is increasingly becoming a part of the development workflow:

- Code completion and generation tools
- Automated testing and bug detection
- Accessibility improvements through AI
- Performance optimization suggestions

## 5. WebXR and Immersive Experiences

The convergence of AR and VR on the web through WebXR will create new possibilities:

- Virtual showrooms and product demonstrations
- Immersive educational experiences
- 3D data visualization
- New forms of social interaction

## Conclusion

The web development landscape continues to evolve rapidly. By staying informed about these trends and investing in continuous learning, developers can position themselves at the forefront of the industry's evolution.
      `,
      coverImageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8d2ViJTIwZGV2ZWxvcG1lbnR8ZW58MHx8MHx8fDA%3D',
      authorId: adminUser.id,
      published: true,
      publishedAt: new Date(),
      featured: true,
      tags: ['WebAssembly', 'Serverless', 'JAMstack', 'AI', 'WebXR'],
      metaTitle: 'The Future of Web Development: Trends to Watch in 2023 and Beyond',
      metaDescription: 'Discover the most important trends shaping the future of web development, from WebAssembly to AI-assisted coding and immersive web experiences.',
    },
    {
      title: 'Optimizing React Applications for Performance',
      slug: 'optimizing-react-applications-performance',
      excerpt: 'Learn practical techniques to improve the performance of your React applications.',
      content: `
# Optimizing React Applications for Performance

React is known for its virtual DOM and efficient rendering approach, but that doesn't mean React applications are automatically optimized for performance. In this guide, we'll explore practical techniques to enhance the performance of your React applications.

## 1. Use React.memo for Component Memoization

React.memo is a higher-order component that memoizes your component, preventing unnecessary re-renders:

\`\`\`jsx
const MyComponent = React.memo(function MyComponent(props) {
  // your component logic
});
\`\`\`

This is particularly useful for components that render often with the same props.

## 2. Virtualize Long Lists

When rendering long lists, consider using virtualization libraries like react-window or react-virtualized to only render items currently in view:

\`\`\`jsx
import { FixedSizeList } from 'react-window';

function VirtualizedList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      {items[index]}
    </div>
  );

  return (
    <FixedSizeList
      height={500}
      width={300}
      itemCount={items.length}
      itemSize={35}
    >
      {Row}
    </FixedSizeList>
  );
}
\`\`\`

## 3. Implement Code Splitting with React.lazy

Break your app into smaller chunks with code splitting:

\`\`\`jsx
const LazyComponent = React.lazy(() => import('./LazyComponent'));

function MyComponent() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </React.Suspense>
  );
}
\`\`\`

## 4. Avoid Inline Function Definitions

Inline functions in render methods create new function instances on each render, which can break referential equality checks:

\`\`\`jsx
// Not optimal
<Button onClick={() => handleClick(id)} />

// Better approach
const handleButtonClick = useCallback(() => {
  handleClick(id);
}, [id]);

<Button onClick={handleButtonClick} />
\`\`\`

## 5. Use the useCallback and useMemo Hooks

These hooks help memoize functions and computed values to prevent unnecessary recalculations:

\`\`\`jsx
// Memoize a function
const memoizedFunction = useCallback(() => {
  performExpensiveOperation(a, b);
}, [a, b]);

// Memoize a value
const memoizedValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);
\`\`\`

## Conclusion

Performance optimization in React requires a thoughtful approach to rendering, state management, and resource loading. By applying these techniques strategically, you can significantly improve your application's performance and user experience.
      `,
      coverImageUrl: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmVhY3QlMjBqc3xlbnwwfHwwfHx8MA%3D%3D',
      authorId: adminUser.id,
      published: true,
      publishedAt: new Date(),
      featured: true,
      tags: ['React', 'JavaScript', 'Performance Optimization', 'Web Development'],
      metaTitle: 'React Performance: Practical Optimization Techniques for React Applications',
      metaDescription: 'Learn how to optimize your React applications with practical performance techniques including memoization, code splitting, and state management strategies.',
    }
  ] as InsertBlogPost[];

  for (const blogPost of blogPostsData) {
    try {
      await storage.createBlogPost(blogPost);
      console.log(`✅ Created blog post: ${blogPost.title}`);
    } catch (error) {
      console.error(`❌ Error creating blog post ${blogPost.title}:`, error);
    }
  }

  // Update Contact Submissions with additional information
  try {
    if (process.env.DATABASE_URL) {
      const client = postgres(process.env.DATABASE_URL);
      const db = drizzle(client);
      
      // Update John Smith's contact submission with phone and additional info
      await db.update(contactSubmissions)
        .set({ 
          phone: '+1 (555) 123-4567',
          additionalInfo: { 
            companySize: 'Small Business', 
            projectTimeline: 'Next Month' 
          }
        })
        .where(eq(contactSubmissions.email, 'john.smith@example.com'));
        
      // Update Emma Davis's contact submission with additional info
      await db.update(contactSubmissions)
        .set({ 
          additionalInfo: { 
            companyType: 'Startup', 
            projectBudget: '$10,000-$20,000'
          }
        })
        .where(eq(contactSubmissions.email, 'emma.davis@example.com'));
        
      console.log('✅ Updated contact submissions with additional information');
    }
  } catch (error) {
    console.error('❌ Error updating contact submissions:', error);
  }

  console.log('✅ Database seeding completed!');
}

seedDatabase()
  .then(() => {
    console.log('✅ Seed script completed successfully');
    process.exit(0);
  })
  .catch(error => {
    console.error('❌ Seed script error:', error);
    process.exit(1);
  });