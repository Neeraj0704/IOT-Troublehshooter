import {
  users,
  troubleshootingQueries,
  type User,
  type UpsertUser,
  type TroubleshootingQuery,
  type InsertTroubleshootingQuery,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations
  // (IMPORTANT) these user operations are mandatory for Replit Auth.
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Troubleshooting query operations
  createTroubleshootingQuery(query: InsertTroubleshootingQuery & { userId: string }): Promise<TroubleshootingQuery>;
  getTroubleshootingQuery(id: number): Promise<TroubleshootingQuery | undefined>;
  getUserTroubleshootingQueries(userId: string): Promise<TroubleshootingQuery[]>;
  updateTroubleshootingQuery(id: number, updates: Partial<TroubleshootingQuery>): Promise<TroubleshootingQuery>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  // (IMPORTANT) these user operations are mandatory for Replit Auth.

  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Troubleshooting query operations
  async createTroubleshootingQuery(query: InsertTroubleshootingQuery & { userId: string }): Promise<TroubleshootingQuery> {
    const [newQuery] = await db
      .insert(troubleshootingQueries)
      .values(query)
      .returning();
    return newQuery;
  }

  async getTroubleshootingQuery(id: number): Promise<TroubleshootingQuery | undefined> {
    const [query] = await db
      .select()
      .from(troubleshootingQueries)
      .where(eq(troubleshootingQueries.id, id));
    return query;
  }

  async getUserTroubleshootingQueries(userId: string): Promise<TroubleshootingQuery[]> {
    return await db
      .select()
      .from(troubleshootingQueries)
      .where(eq(troubleshootingQueries.userId, userId))
      .orderBy(desc(troubleshootingQueries.createdAt));
  }

  async updateTroubleshootingQuery(id: number, updates: Partial<TroubleshootingQuery>): Promise<TroubleshootingQuery> {
    const [updated] = await db
      .update(troubleshootingQueries)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(troubleshootingQueries.id, id))
      .returning();
    return updated;
  }
}

export const storage = new DatabaseStorage();
