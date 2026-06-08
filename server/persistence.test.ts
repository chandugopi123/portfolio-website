import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import { getDb } from "./db";
import { contactMessages } from "../drizzle/schema";
import type { TrpcContext } from "./_core/context";

// Mock context for public procedures
function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("Database Persistence", () => {
  describe("Contact Message Persistence", () => {
    it("should persist contact message to database", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const testMessage = {
        name: "Test User",
        email: "test@example.com",
        subject: "Test Subject for Persistence",
        message: "This is a test message to verify database persistence.",
      };

      // Submit contact form
      const result = await caller.portfolio.submitContact(testMessage);
      expect(result.success).toBe(true);

      // Verify message was stored in database
      const db = await getDb();
      if (db) {
        const storedMessages = await db
          .select()
          .from(contactMessages)
          .where((t) => t.email === testMessage.email);

        expect(storedMessages.length).toBeGreaterThan(0);
        const stored = storedMessages[storedMessages.length - 1];
        expect(stored.name).toBe(testMessage.name);
        expect(stored.email).toBe(testMessage.email);
        expect(stored.subject).toBe(testMessage.subject);
        expect(stored.message).toBe(testMessage.message);
      }
    });

    it("should store multiple contact messages", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const messages = [
        {
          name: "User One",
          email: "user1@example.com",
          subject: "First Message",
          message: "This is the first test message for database.",
        },
        {
          name: "User Two",
          email: "user2@example.com",
          subject: "Second Message",
          message: "This is the second test message for database.",
        },
      ];

      // Submit multiple messages
      for (const msg of messages) {
        const result = await caller.portfolio.submitContact(msg);
        expect(result.success).toBe(true);
      }

      // Verify all messages were stored
      const db = await getDb();
      if (db) {
        const storedMessages = await db.select().from(contactMessages);
        expect(storedMessages.length).toBeGreaterThanOrEqual(messages.length);
      }
    });

    it("should preserve message content exactly", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const testMessage = {
        name: "John Doe",
        email: `john-${Date.now()}@example.com`,
        subject: "Project Collaboration Inquiry",
        message:
          "I am interested in collaborating on an exciting new project. Let's discuss the details and timeline.",
      };

      // Submit contact form
      await caller.portfolio.submitContact(testMessage);

      // Verify exact content preservation
      const db = await getDb();
      if (db) {
        // Get all messages and find the one we just submitted
        const allMessages = await db.select().from(contactMessages);
        const stored = allMessages.find((m) => m.email === testMessage.email);
        expect(stored).toBeDefined();
        if (stored) {
          expect(stored.name).toBe(testMessage.name);
          expect(stored.email).toBe(testMessage.email);
          expect(stored.subject).toBe(testMessage.subject);
          expect(stored.message).toBe(testMessage.message);
        }
      }
    });

    it("should include createdAt timestamp", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const testMessage = {
        name: "Timestamp Test",
        email: "timestamp@example.com",
        subject: "Timestamp Test",
        message: "Testing if createdAt timestamp is properly set.",
      };

      // Submit contact form
      await caller.portfolio.submitContact(testMessage);

      // Verify timestamp was set
      const db = await getDb();
      if (db) {
        const storedMessages = await db
          .select()
          .from(contactMessages)
          .where((t) => t.email === testMessage.email);

        const stored = storedMessages[storedMessages.length - 1];
        expect(stored.createdAt).toBeDefined();
        expect(stored.createdAt instanceof Date).toBe(true);
      }
    });
  });

  describe("Projects Data Retrieval", () => {
    it("should retrieve projects from database", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const projects = await caller.portfolio.projects();

      expect(Array.isArray(projects)).toBe(true);
      expect(projects.length).toBeGreaterThan(0);
    });

    it("should preserve project data integrity", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const projects = await caller.portfolio.projects();

      projects.forEach((project) => {
        expect(project.id).toBeDefined();
        expect(project.title).toBeDefined();
        expect(project.description).toBeDefined();
        expect(Array.isArray(project.techStack)).toBe(true);
        expect(typeof project.title).toBe("string");
        expect(typeof project.description).toBe("string");
      });
    });
  });

  describe("Skills Data Retrieval", () => {
    it("should retrieve skills from database", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const skills = await caller.portfolio.skills();

      expect(Array.isArray(skills)).toBe(true);
      expect(skills.length).toBeGreaterThan(0);
    });

    it("should preserve skill data integrity", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const skills = await caller.portfolio.skills();

      skills.forEach((skill) => {
        expect(skill.id).toBeDefined();
        expect(skill.name).toBeDefined();
        expect(skill.category).toBeDefined();
        expect(skill.proficiency).toBeDefined();
        expect(typeof skill.name).toBe("string");
        expect(typeof skill.category).toBe("string");
        expect(typeof skill.proficiency).toBe("number");
        expect(skill.proficiency).toBeGreaterThanOrEqual(0);
        expect(skill.proficiency).toBeLessThanOrEqual(100);
      });
    });
  });
});
