import { 
  users, type User, type InsertUser, 
  projects, type Project, type InsertProject,
  services, type Service, type InsertService,
  testimonials, type Testimonial, type InsertTestimonial,
  blogPosts, type BlogPost, type InsertBlogPost,
  contactSubmissions, type ContactSubmission, type InsertContactSubmission
} from "@shared/schema";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq, desc, and, sql, ilike } from "drizzle-orm";
import pkg from "pg";
const { Pool } = pkg;

// Interface for all storage operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Project operations
  getProject(id: number): Promise<Project | undefined>;
  getProjectBySlug(slug: string): Promise<Project | undefined>;
  getProjects(params?: { featured?: boolean, limit?: number }): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: number): Promise<boolean>;
  
  // Service operations
  getService(id: number): Promise<Service | undefined>;
  getServiceBySlug(slug: string): Promise<Service | undefined>;
  getServices(params?: { featured?: boolean }): Promise<Service[]>;
  createService(service: InsertService): Promise<Service>;
  updateService(id: number, service: Partial<InsertService>): Promise<Service | undefined>;
  deleteService(id: number): Promise<boolean>;
  
  // Testimonial operations
  getTestimonial(id: number): Promise<Testimonial | undefined>;
  getTestimonials(params?: { featured?: boolean }): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  updateTestimonial(id: number, testimonial: Partial<InsertTestimonial>): Promise<Testimonial | undefined>;
  deleteTestimonial(id: number): Promise<boolean>;
  
  // Blog operations
  getBlogPost(id: number): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  getBlogPosts(params?: { published?: boolean, featured?: boolean, limit?: number }): Promise<BlogPost[]>;
  createBlogPost(blogPost: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: number, blogPost: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: number): Promise<boolean>;
  
  // Contact operations
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getContactSubmissions(params?: { status?: string, limit?: number }): Promise<ContactSubmission[]>;
  updateContactSubmissionStatus(id: number, status: string): Promise<ContactSubmission | undefined>;
}

// PostgreSQL Storage Implementation
export class PostgresStorage implements IStorage {
  private db: ReturnType<typeof drizzle>;
  
  constructor() {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
    
    this.db = drizzle(pool);
  }
  
  // User Methods
  async getUser(id: number): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }
  
  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }
  
  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await this.db.insert(users).values(insertUser).returning();
    return result[0];
  }
  
  // Project Methods
  async getProject(id: number): Promise<Project | undefined> {
    const result = await this.db.select().from(projects).where(eq(projects.id, id)).limit(1);
    return result[0];
  }
  
  async getProjectBySlug(slug: string): Promise<Project | undefined> {
    const result = await this.db.select().from(projects).where(eq(projects.slug, slug)).limit(1);
    return result[0];
  }
  
  async getProjects(params: { featured?: boolean, limit?: number } = {}): Promise<Project[]> {
    let query = this.db.select().from(projects);
    
    if (params.featured !== undefined) {
      query = query.where(eq(projects.featured, params.featured));
    }
    
    query = query.orderBy(desc(projects.createdAt));
    
    if (params.limit) {
      query = query.limit(params.limit);
    }
    
    return await query;
  }
  
  async createProject(project: InsertProject): Promise<Project> {
    const result = await this.db.insert(projects).values(project).returning();
    return result[0];
  }
  
  async updateProject(id: number, project: Partial<InsertProject>): Promise<Project | undefined> {
    const result = await this.db.update(projects)
      .set({ ...project, updatedAt: new Date() })
      .where(eq(projects.id, id))
      .returning();
    return result[0];
  }
  
  async deleteProject(id: number): Promise<boolean> {
    const result = await this.db.delete(projects).where(eq(projects.id, id)).returning();
    return result.length > 0;
  }
  
  // Service Methods
  async getService(id: number): Promise<Service | undefined> {
    const result = await this.db.select().from(services).where(eq(services.id, id)).limit(1);
    return result[0];
  }
  
  async getServiceBySlug(slug: string): Promise<Service | undefined> {
    const result = await this.db.select().from(services).where(eq(services.slug, slug)).limit(1);
    return result[0];
  }
  
  async getServices(params: { featured?: boolean } = {}): Promise<Service[]> {
    let query = this.db.select().from(services);
    
    if (params.featured !== undefined) {
      query = query.where(eq(services.featured, params.featured));
    }
    
    query = query.orderBy(services.orderIndex);
    
    return await query;
  }
  
  async createService(service: InsertService): Promise<Service> {
    const result = await this.db.insert(services).values(service).returning();
    return result[0];
  }
  
  async updateService(id: number, service: Partial<InsertService>): Promise<Service | undefined> {
    const result = await this.db.update(services)
      .set({ ...service, updatedAt: new Date() })
      .where(eq(services.id, id))
      .returning();
    return result[0];
  }
  
  async deleteService(id: number): Promise<boolean> {
    const result = await this.db.delete(services).where(eq(services.id, id)).returning();
    return result.length > 0;
  }
  
  // Testimonial Methods
  async getTestimonial(id: number): Promise<Testimonial | undefined> {
    const result = await this.db.select().from(testimonials).where(eq(testimonials.id, id)).limit(1);
    return result[0];
  }
  
  async getTestimonials(params: { featured?: boolean } = {}): Promise<Testimonial[]> {
    let query = this.db.select().from(testimonials);
    
    if (params.featured !== undefined) {
      query = query.where(eq(testimonials.featured, params.featured));
    }
    
    query = query.orderBy(testimonials.orderIndex);
    
    return await query;
  }
  
  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const result = await this.db.insert(testimonials).values(testimonial).returning();
    return result[0];
  }
  
  async updateTestimonial(id: number, testimonial: Partial<InsertTestimonial>): Promise<Testimonial | undefined> {
    const result = await this.db.update(testimonials)
      .set({ ...testimonial, updatedAt: new Date() })
      .where(eq(testimonials.id, id))
      .returning();
    return result[0];
  }
  
  async deleteTestimonial(id: number): Promise<boolean> {
    const result = await this.db.delete(testimonials).where(eq(testimonials.id, id)).returning();
    return result.length > 0;
  }
  
  // Blog Methods
  async getBlogPost(id: number): Promise<BlogPost | undefined> {
    const result = await this.db.select().from(blogPosts).where(eq(blogPosts.id, id)).limit(1);
    return result[0];
  }
  
  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const result = await this.db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
    return result[0];
  }
  
  async getBlogPosts(params: { published?: boolean, featured?: boolean, limit?: number } = {}): Promise<BlogPost[]> {
    let query = this.db.select().from(blogPosts);
    
    let conditions = [];
    
    if (params.published !== undefined) {
      conditions.push(eq(blogPosts.published, params.published));
    }
    
    if (params.featured !== undefined) {
      conditions.push(eq(blogPosts.featured, params.featured));
    }
    
    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }
    
    query = query.orderBy(desc(blogPosts.createdAt));
    
    if (params.limit) {
      query = query.limit(params.limit);
    }
    
    return await query;
  }
  
  async createBlogPost(blogPost: InsertBlogPost): Promise<BlogPost> {
    const result = await this.db.insert(blogPosts).values(blogPost).returning();
    return result[0];
  }
  
  async updateBlogPost(id: number, blogPost: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const result = await this.db.update(blogPosts)
      .set({ ...blogPost, updatedAt: new Date() })
      .where(eq(blogPosts.id, id))
      .returning();
    return result[0];
  }
  
  async deleteBlogPost(id: number): Promise<boolean> {
    const result = await this.db.delete(blogPosts).where(eq(blogPosts.id, id)).returning();
    return result.length > 0;
  }
  
  // Contact Methods
  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const result = await this.db.insert(contactSubmissions).values(submission).returning();
    return result[0];
  }
  
  async getContactSubmissions(params: { status?: string, limit?: number } = {}): Promise<ContactSubmission[]> {
    let query = this.db.select().from(contactSubmissions);
    
    if (params.status) {
      query = query.where(eq(contactSubmissions.status, params.status));
    }
    
    query = query.orderBy(desc(contactSubmissions.createdAt));
    
    if (params.limit) {
      query = query.limit(params.limit);
    }
    
    return await query;
  }
  
  async updateContactSubmissionStatus(id: number, status: string): Promise<ContactSubmission | undefined> {
    const result = await this.db.update(contactSubmissions)
      .set({ status, updatedAt: new Date() })
      .where(eq(contactSubmissions.id, id))
      .returning();
    return result[0];
  }
}

// In-memory storage implementation for development
export class MemStorage implements IStorage {
  private users = new Map<number, User>();
  private projects = new Map<number, Project>();
  private services = new Map<number, Service>();
  private testimonials = new Map<number, Testimonial>();
  private blogPosts = new Map<number, BlogPost>();
  private contactSubmissions = new Map<number, ContactSubmission>();
  
  private nextId = {
    users: 1,
    projects: 1,
    services: 1,
    testimonials: 1,
    blogPosts: 1,
    contactSubmissions: 1
  };
  
  // User Methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }
  
  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }
  
  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.nextId.users++;
    const now = new Date();
    const user = { 
      ...insertUser, 
      id, 
      createdAt: now, 
      updatedAt: now 
    } as User;
    this.users.set(id, user);
    return user;
  }
  
  // Project Methods
  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }
  
  async getProjectBySlug(slug: string): Promise<Project | undefined> {
    return Array.from(this.projects.values()).find(project => project.slug === slug);
  }
  
  async getProjects(params: { featured?: boolean, limit?: number } = {}): Promise<Project[]> {
    let projects = Array.from(this.projects.values());
    
    if (params.featured !== undefined) {
      projects = projects.filter(project => project.featured === params.featured);
    }
    
    projects.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    
    if (params.limit) {
      projects = projects.slice(0, params.limit);
    }
    
    return projects;
  }
  
  async createProject(project: InsertProject): Promise<Project> {
    const id = this.nextId.projects++;
    const now = new Date();
    const newProject = { 
      ...project, 
      id,
      createdAt: now, 
      updatedAt: now 
    } as Project;
    this.projects.set(id, newProject);
    return newProject;
  }
  
  async updateProject(id: number, project: Partial<InsertProject>): Promise<Project | undefined> {
    const existingProject = this.projects.get(id);
    if (!existingProject) return undefined;
    
    const updatedProject = { 
      ...existingProject, 
      ...project, 
      updatedAt: new Date() 
    };
    this.projects.set(id, updatedProject);
    return updatedProject;
  }
  
  async deleteProject(id: number): Promise<boolean> {
    return this.projects.delete(id);
  }
  
  // Service Methods
  async getService(id: number): Promise<Service | undefined> {
    return this.services.get(id);
  }
  
  async getServiceBySlug(slug: string): Promise<Service | undefined> {
    return Array.from(this.services.values()).find(service => service.slug === slug);
  }
  
  async getServices(params: { featured?: boolean } = {}): Promise<Service[]> {
    let services = Array.from(this.services.values());
    
    if (params.featured !== undefined) {
      services = services.filter(service => service.featured === params.featured);
    }
    
    services.sort((a, b) => a.orderIndex - b.orderIndex);
    return services;
  }
  
  async createService(service: InsertService): Promise<Service> {
    const id = this.nextId.services++;
    const now = new Date();
    const newService = { 
      ...service, 
      id,
      createdAt: now, 
      updatedAt: now 
    } as Service;
    this.services.set(id, newService);
    return newService;
  }
  
  async updateService(id: number, service: Partial<InsertService>): Promise<Service | undefined> {
    const existingService = this.services.get(id);
    if (!existingService) return undefined;
    
    const updatedService = { 
      ...existingService, 
      ...service, 
      updatedAt: new Date() 
    };
    this.services.set(id, updatedService);
    return updatedService;
  }
  
  async deleteService(id: number): Promise<boolean> {
    return this.services.delete(id);
  }
  
  // Testimonial Methods
  async getTestimonial(id: number): Promise<Testimonial | undefined> {
    return this.testimonials.get(id);
  }
  
  async getTestimonials(params: { featured?: boolean } = {}): Promise<Testimonial[]> {
    let testimonials = Array.from(this.testimonials.values());
    
    if (params.featured !== undefined) {
      testimonials = testimonials.filter(testimonial => testimonial.featured === params.featured);
    }
    
    testimonials.sort((a, b) => a.orderIndex - b.orderIndex);
    return testimonials;
  }
  
  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.nextId.testimonials++;
    const now = new Date();
    const newTestimonial = { 
      ...testimonial, 
      id,
      createdAt: now, 
      updatedAt: now 
    } as Testimonial;
    this.testimonials.set(id, newTestimonial);
    return newTestimonial;
  }
  
  async updateTestimonial(id: number, testimonial: Partial<InsertTestimonial>): Promise<Testimonial | undefined> {
    const existingTestimonial = this.testimonials.get(id);
    if (!existingTestimonial) return undefined;
    
    const updatedTestimonial = { 
      ...existingTestimonial, 
      ...testimonial, 
      updatedAt: new Date() 
    };
    this.testimonials.set(id, updatedTestimonial);
    return updatedTestimonial;
  }
  
  async deleteTestimonial(id: number): Promise<boolean> {
    return this.testimonials.delete(id);
  }
  
  // Blog Methods
  async getBlogPost(id: number): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }
  
  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(post => post.slug === slug);
  }
  
  async getBlogPosts(params: { published?: boolean, featured?: boolean, limit?: number } = {}): Promise<BlogPost[]> {
    let posts = Array.from(this.blogPosts.values());
    
    if (params.published !== undefined) {
      posts = posts.filter(post => post.published === params.published);
    }
    
    if (params.featured !== undefined) {
      posts = posts.filter(post => post.featured === params.featured);
    }
    
    posts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    
    if (params.limit) {
      posts = posts.slice(0, params.limit);
    }
    
    return posts;
  }
  
  async createBlogPost(blogPost: InsertBlogPost): Promise<BlogPost> {
    const id = this.nextId.blogPosts++;
    const now = new Date();
    const newPost = { 
      ...blogPost, 
      id,
      createdAt: now, 
      updatedAt: now 
    } as BlogPost;
    this.blogPosts.set(id, newPost);
    return newPost;
  }
  
  async updateBlogPost(id: number, blogPost: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const existingPost = this.blogPosts.get(id);
    if (!existingPost) return undefined;
    
    const updatedPost = { 
      ...existingPost, 
      ...blogPost, 
      updatedAt: new Date() 
    };
    this.blogPosts.set(id, updatedPost);
    return updatedPost;
  }
  
  async deleteBlogPost(id: number): Promise<boolean> {
    return this.blogPosts.delete(id);
  }
  
  // Contact Methods
  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = this.nextId.contactSubmissions++;
    const now = new Date();
    const newSubmission = { 
      ...submission, 
      id,
      status: "new",
      createdAt: now, 
      updatedAt: now 
    } as ContactSubmission;
    this.contactSubmissions.set(id, newSubmission);
    return newSubmission;
  }
  
  async getContactSubmissions(params: { status?: string, limit?: number } = {}): Promise<ContactSubmission[]> {
    let submissions = Array.from(this.contactSubmissions.values());
    
    if (params.status) {
      submissions = submissions.filter(submission => submission.status === params.status);
    }
    
    submissions.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    
    if (params.limit) {
      submissions = submissions.slice(0, params.limit);
    }
    
    return submissions;
  }
  
  async updateContactSubmissionStatus(id: number, status: string): Promise<ContactSubmission | undefined> {
    const existingSubmission = this.contactSubmissions.get(id);
    if (!existingSubmission) return undefined;
    
    const updatedSubmission = { 
      ...existingSubmission, 
      status,
      updatedAt: new Date() 
    };
    this.contactSubmissions.set(id, updatedSubmission);
    return updatedSubmission;
  }
}

// Use either the MemStorage for development or PostgresStorage for production
export const storage = process.env.NODE_ENV === 'production' 
  ? new PostgresStorage() 
  : process.env.DATABASE_URL 
    ? new PostgresStorage() 
    : new MemStorage();
