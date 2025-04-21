import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { 
  insertUserSchema, 
  insertProjectSchema, 
  insertServiceSchema, 
  insertTestimonialSchema, 
  insertBlogPostSchema, 
  insertContactSubmissionSchema 
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for the tech agency website
  const apiRouter = app.route('/api');
  
  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });
  
  // Projects API
  app.get('/api/projects', async (req, res) => {
    try {
      const featured = req.query.featured === 'true' ? true : 
                       req.query.featured === 'false' ? false : undefined;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      
      const projects = await storage.getProjects({ featured, limit });
      res.json(projects);
    } catch (error) {
      console.error('Error fetching projects:', error);
      res.status(500).json({ error: 'Failed to fetch projects' });
    }
  });
  
  app.get('/api/projects/:slug', async (req, res) => {
    try {
      const project = await storage.getProjectBySlug(req.params.slug);
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }
      res.json(project);
    } catch (error) {
      console.error('Error fetching project:', error);
      res.status(500).json({ error: 'Failed to fetch project' });
    }
  });
  
  app.post('/api/projects', async (req, res) => {
    try {
      const result = insertProjectSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: result.error.message });
      }
      
      const project = await storage.createProject(result.data);
      res.status(201).json(project);
    } catch (error) {
      console.error('Error creating project:', error);
      res.status(500).json({ error: 'Failed to create project' });
    }
  });
  
  app.patch('/api/projects/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID' });
      }
      
      const updateSchema = insertProjectSchema.partial();
      const result = updateSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: result.error.message });
      }
      
      const updatedProject = await storage.updateProject(id, result.data);
      if (!updatedProject) {
        return res.status(404).json({ error: 'Project not found' });
      }
      
      res.json(updatedProject);
    } catch (error) {
      console.error('Error updating project:', error);
      res.status(500).json({ error: 'Failed to update project' });
    }
  });
  
  app.delete('/api/projects/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID' });
      }
      
      const success = await storage.deleteProject(id);
      if (!success) {
        return res.status(404).json({ error: 'Project not found' });
      }
      
      res.status(204).end();
    } catch (error) {
      console.error('Error deleting project:', error);
      res.status(500).json({ error: 'Failed to delete project' });
    }
  });
  
  // Services API
  app.get('/api/services', async (req, res) => {
    try {
      const featured = req.query.featured === 'true' ? true : 
                       req.query.featured === 'false' ? false : undefined;
      
      const services = await storage.getServices({ featured });
      res.json(services);
    } catch (error) {
      console.error('Error fetching services:', error);
      res.status(500).json({ error: 'Failed to fetch services' });
    }
  });
  
  app.get('/api/services/:slug', async (req, res) => {
    try {
      const service = await storage.getServiceBySlug(req.params.slug);
      if (!service) {
        return res.status(404).json({ error: 'Service not found' });
      }
      res.json(service);
    } catch (error) {
      console.error('Error fetching service:', error);
      res.status(500).json({ error: 'Failed to fetch service' });
    }
  });
  
  app.post('/api/services', async (req, res) => {
    try {
      const result = insertServiceSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: result.error.message });
      }
      
      const service = await storage.createService(result.data);
      res.status(201).json(service);
    } catch (error) {
      console.error('Error creating service:', error);
      res.status(500).json({ error: 'Failed to create service' });
    }
  });
  
  app.patch('/api/services/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID' });
      }
      
      const updateSchema = insertServiceSchema.partial();
      const result = updateSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: result.error.message });
      }
      
      const updatedService = await storage.updateService(id, result.data);
      if (!updatedService) {
        return res.status(404).json({ error: 'Service not found' });
      }
      
      res.json(updatedService);
    } catch (error) {
      console.error('Error updating service:', error);
      res.status(500).json({ error: 'Failed to update service' });
    }
  });
  
  app.delete('/api/services/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID' });
      }
      
      const success = await storage.deleteService(id);
      if (!success) {
        return res.status(404).json({ error: 'Service not found' });
      }
      
      res.status(204).end();
    } catch (error) {
      console.error('Error deleting service:', error);
      res.status(500).json({ error: 'Failed to delete service' });
    }
  });
  
  // Testimonials API
  app.get('/api/testimonials', async (req, res) => {
    try {
      const featured = req.query.featured === 'true' ? true : 
                       req.query.featured === 'false' ? false : undefined;
      
      const testimonials = await storage.getTestimonials({ featured });
      res.json(testimonials);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      res.status(500).json({ error: 'Failed to fetch testimonials' });
    }
  });
  
  app.post('/api/testimonials', async (req, res) => {
    try {
      const result = insertTestimonialSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: result.error.message });
      }
      
      const testimonial = await storage.createTestimonial(result.data);
      res.status(201).json(testimonial);
    } catch (error) {
      console.error('Error creating testimonial:', error);
      res.status(500).json({ error: 'Failed to create testimonial' });
    }
  });
  
  // Blog API
  app.get('/api/blog', async (req, res) => {
    try {
      const published = req.query.published === 'true' ? true : 
                        req.query.published === 'false' ? false : undefined;
                        
      const featured = req.query.featured === 'true' ? true : 
                       req.query.featured === 'false' ? false : undefined;
                       
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      
      const blogPosts = await storage.getBlogPosts({ published, featured, limit });
      res.json(blogPosts);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      res.status(500).json({ error: 'Failed to fetch blog posts' });
    }
  });
  
  app.get('/api/blog/:slug', async (req, res) => {
    try {
      const post = await storage.getBlogPostBySlug(req.params.slug);
      if (!post) {
        return res.status(404).json({ error: 'Blog post not found' });
      }
      res.json(post);
    } catch (error) {
      console.error('Error fetching blog post:', error);
      res.status(500).json({ error: 'Failed to fetch blog post' });
    }
  });
  
  app.post('/api/blog', async (req, res) => {
    try {
      const result = insertBlogPostSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: result.error.message });
      }
      
      const blogPost = await storage.createBlogPost(result.data);
      res.status(201).json(blogPost);
    } catch (error) {
      console.error('Error creating blog post:', error);
      res.status(500).json({ error: 'Failed to create blog post' });
    }
  });
  
  // Contact Form API
  app.post('/api/contact', async (req, res) => {
    try {
      const result = insertContactSubmissionSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: result.error.message });
      }
      
      const submission = await storage.createContactSubmission(result.data);
      res.status(201).json({
        success: true,
        message: 'Your message has been submitted successfully!',
        submissionId: submission.id
      });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      res.status(500).json({ error: 'Failed to submit contact form' });
    }
  });

  // Admin-only APIs
  app.get('/api/admin/contacts', async (req, res) => {
    try {
      // In a real app, we'd check for admin authentication here
      const status = req.query.status as string | undefined;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      
      const submissions = await storage.getContactSubmissions({ status, limit });
      res.json(submissions);
    } catch (error) {
      console.error('Error fetching contact submissions:', error);
      res.status(500).json({ error: 'Failed to fetch contact submissions' });
    }
  });
  
  app.patch('/api/admin/contacts/:id/status', async (req, res) => {
    try {
      // In a real app, we'd check for admin authentication here
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID' });
      }
      
      const { status } = req.body;
      if (!status || typeof status !== 'string') {
        return res.status(400).json({ error: 'Status is required' });
      }
      
      const updatedSubmission = await storage.updateContactSubmissionStatus(id, status);
      if (!updatedSubmission) {
        return res.status(404).json({ error: 'Contact submission not found' });
      }
      
      res.json(updatedSubmission);
    } catch (error) {
      console.error('Error updating contact submission status:', error);
      res.status(500).json({ error: 'Failed to update contact submission status' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
