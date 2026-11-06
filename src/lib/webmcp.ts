/**
 * Client-side WebMCP Tool Registration Utility
 * Strictly compliant with Google WebMCP Standards & Non-Negotiables:
 * - Tool & parameter names <= 30 characters
 * - Tool descriptions <= 500 characters ("What + When")
 * - Parameter descriptions <= 150 characters
 * - Output budget <= 1,500 characters (~400 tokens)
 * - Pure queries annotate strictly `readOnlyHint: true`
 * - Resilient error handling resolving structured diagnostic payloads
 */

export interface WebMcpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: "object";
    properties: Record<string, {
      type: string;
      enum?: string[];
      description: string;
    }>;
    required?: string[];
  };
  annotations?: {
    readOnlyHint?: boolean;
    consequentialHint?: boolean;
    untrustedContentHint?: boolean;
  };
  execute: (
    input: Record<string, unknown>,
    context?: { signal?: AbortSignal }
  ) => Promise<string | Record<string, unknown>>;
}

/**
 * Technical Capabilities definition for in-browser AI agents
 */
export const CAPABILITIES_TOOL: WebMcpToolDefinition = {
  name: "get_capabilities",
  description:
    "Retrieves the developer's core full-stack technical capabilities, production stack, and reliability metrics. Call when evaluating engineering qualifications or technical fit.",
  inputSchema: {
    type: "object",
    properties: {
      category: {
        type: "string",
        enum: ["all", "frontend", "backend", "architecture"],
        description: "Filter capabilities by technical discipline.",
      },
    },
  },
  annotations: {
    readOnlyHint: true,
  },
  async execute(input = {}, context) {
    if (context?.signal?.aborted) {
      return {
        error: "Execution was aborted by client signal.",
        code: "ABORTED",
        retryable: true,
      };
    }

    try {
      const category = (input.category as string) || "all";
      const payload: Record<string, unknown> = {
        status: "success",
        developer: "Senior Full-Stack Software Engineer",
        focus: "High-performance distributed web applications & robust design systems",
      };

      const techStack = {
        frontend: [
          "Next.js 14 App Router (RSC)",
          "React 18 Concurrent Features",
          "TypeScript Strict",
          "Tailwind CSS Tokens",
          "Framer Motion 60fps GPU",
        ],
        backend: [
          "Supabase PostgreSQL",
          "Row-Level Security (RLS)",
          "Server Actions with Zod",
          "Edge API Functions",
          "Distributed Caching",
        ],
        architecture: [
          "99.98% System Uptime SLA",
          "Sub-100ms API Response p95",
          "Lighthouse Score 98+",
          "WCAG AAA 21:1 Contrast",
          "Automated TDD CI/CD Pipeline",
        ],
      };

      if (category === "all") {
        payload.capabilities = techStack;
      } else if (category in techStack) {
        payload.capabilities = {
          [category]: techStack[category as keyof typeof techStack],
        };
      } else {
        return {
          error: `Invalid category '${category}'. Permitted values: 'all', 'frontend', 'backend', 'architecture'.`,
          code: "INVALID_ARGUMENT",
          retryable: true,
        };
      }

      return JSON.stringify(payload);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      return {
        error: `Failed to fetch developer capabilities: ${message}`,
        code: "INTERNAL_ERROR",
        retryable: false,
      };
    }
  },
};

/**
 * System Architecture Overview definition for in-browser AI agents
 */
export const ARCHITECTURE_TOOL: WebMcpToolDefinition = {
  name: "get_architecture_overview",
  description:
    "Returns the system architecture specifications, security model (Supabase RLS), and engineering philosophy of this portfolio application. Call when evaluating architectural patterns, security controls, or system design.",
  inputSchema: {
    type: "object",
    properties: {},
  },
  annotations: {
    readOnlyHint: true,
  },
  async execute(_input = {}, context) {
    if (context?.signal?.aborted) {
      return {
        error: "Execution was aborted by client signal.",
        code: "ABORTED",
        retryable: true,
      };
    }

    try {
      const architectureSpec = {
        status: "success",
        platform: "Portfolio Professional Platform",
        rendering_pipeline:
          "Next.js 14 App Router with hybrid SSR and React Server Components (RSC) boundary isolation",
        security_model:
          "Supabase PostgreSQL Row-Level Security (RLS) enforcement with strict server-side Zod validation",
        performance_benchmarks: {
          uptime_sla: "99.98%",
          latency_p95: "< 100ms",
          lighthouse_audit: 98,
          motion_acceleration: "60fps GPU translate3d hardware layer",
        },
        design_system:
          "Zero-Slop Light Canvas with dark mode synchronization and WCAG AAA 21:1 contrast ratio",
        agentic_interface:
          "Client-side WebMCP tools registered directly onto document.modelContext",
      };

      return JSON.stringify(architectureSpec);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      return {
        error: `Failed to fetch architecture overview: ${message}`,
        code: "INTERNAL_ERROR",
        retryable: false,
      };
    }
  },
};

/**
 * Safe Browser ModelContext Registration
 * Handles SSR safety, feature-detection, and AbortController lifecycle unregistration.
 */
export function registerWebMcpTools(): (() => void) | undefined {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return undefined;
  }

  // Feature detection for document.modelContext
  const docWithModelContext = document as unknown as {
    modelContext?: {
      registerTool?: (
        tool: WebMcpToolDefinition,
        options?: { signal?: AbortSignal }
      ) => Promise<void> | void;
    };
  };

  if (
    !docWithModelContext.modelContext ||
    typeof docWithModelContext.modelContext.registerTool !== "function"
  ) {
    return undefined;
  }

  const controller = new AbortController();

  try {
    const registerTool = docWithModelContext.modelContext.registerTool.bind(
      docWithModelContext.modelContext
    );

    const p1 = registerTool(CAPABILITIES_TOOL, { signal: controller.signal });
    if (p1 && typeof (p1 as Promise<unknown>).catch === "function") {
      (p1 as Promise<unknown>).catch((err: unknown) => {
        console.warn("WebMCP CAPABILITIES_TOOL registration error:", err);
      });
    }

    const p2 = registerTool(ARCHITECTURE_TOOL, { signal: controller.signal });
    if (p2 && typeof (p2 as Promise<unknown>).catch === "function") {
      (p2 as Promise<unknown>).catch((err: unknown) => {
        console.warn("WebMCP ARCHITECTURE_TOOL registration error:", err);
      });
    }
  } catch (err) {
    console.error("Failed to register WebMCP tools:", err);
  }

  return () => {
    controller.abort();
  };
}
