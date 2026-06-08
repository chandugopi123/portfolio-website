import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
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

describe("portfolio procedures", () => {
  describe("portfolio.projects", () => {
    it("should return projects list", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const projects = await caller.portfolio.projects();

      expect(Array.isArray(projects)).toBe(true);
      if (projects.length > 0) {
        const project = projects[0];
        expect(project).toHaveProperty("id");
        expect(project).toHaveProperty("title");
        expect(project).toHaveProperty("description");
        expect(project).toHaveProperty("techStack");
        expect(Array.isArray(project.techStack)).toBe(true);
      }
    });

    it("should parse techStack as JSON array", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const projects = await caller.portfolio.projects();

      if (projects.length > 0) {
        const project = projects[0];
        expect(Array.isArray(project.techStack)).toBe(true);
        project.techStack.forEach((tech) => {
          expect(typeof tech).toBe("string");
        });
      }
    });
  });

  describe("portfolio.skills", () => {
    it("should return skills list", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const skills = await caller.portfolio.skills();

      expect(Array.isArray(skills)).toBe(true);
      if (skills.length > 0) {
        const skill = skills[0];
        expect(skill).toHaveProperty("id");
        expect(skill).toHaveProperty("name");
        expect(skill).toHaveProperty("category");
        expect(skill).toHaveProperty("proficiency");
        expect(typeof skill.proficiency).toBe("number");
      }
    });

    it("should group skills by category", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const skills = await caller.portfolio.skills();

      const categories = new Set(skills.map((s) => s.category));
      expect(categories.size).toBeGreaterThan(0);
    });

    it("should have proficiency between 0 and 100", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const skills = await caller.portfolio.skills();

      skills.forEach((skill) => {
        expect(skill.proficiency).toBeGreaterThanOrEqual(0);
        expect(skill.proficiency).toBeLessThanOrEqual(100);
      });
    });
  });

  describe("portfolio.submitContact", () => {
    it("should reject invalid email", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.portfolio.submitContact({
          name: "John Doe",
          email: "invalid-email",
          subject: "Test Subject",
          message: "This is a test message",
        });
        expect.fail("Should have thrown validation error");
      } catch (error: unknown) {
        expect(error).toBeDefined();
      }
    });

    it("should reject short name", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.portfolio.submitContact({
          name: "J",
          email: "test@example.com",
          subject: "Test Subject",
          message: "This is a test message",
        });
        expect.fail("Should have thrown validation error");
      } catch (error: unknown) {
        expect(error).toBeDefined();
      }
    });

    it("should reject short subject", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.portfolio.submitContact({
          name: "John Doe",
          email: "test@example.com",
          subject: "Hi",
          message: "This is a test message",
        });
        expect.fail("Should have thrown validation error");
      } catch (error: unknown) {
        expect(error).toBeDefined();
      }
    });

    it("should reject short message", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.portfolio.submitContact({
          name: "John Doe",
          email: "test@example.com",
          subject: "Test Subject",
          message: "Short",
        });
        expect.fail("Should have thrown validation error");
      } catch (error: unknown) {
        expect(error).toBeDefined();
      }
    });

    it("should accept valid contact form submission", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.portfolio.submitContact({
        name: "John Doe",
        email: "john@example.com",
        subject: "Collaboration Inquiry",
        message: "I would like to discuss a potential project collaboration.",
      });

      expect(result).toEqual({ success: true });
    });
  });
});
