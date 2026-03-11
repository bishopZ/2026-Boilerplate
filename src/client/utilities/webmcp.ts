const WEB_MCP_INCREMENT_TOOL = 'increment-counter';

interface ModelContextToolResult {
  content: {
    type: 'text';
    text: string;
  }[];
}

interface ModelContextTool {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, never>;
    required: string[];
  };
  execute: () => ModelContextToolResult;
}

interface BrowserModelContext {
  registerTool: (tool: ModelContextTool) => void;
  unregisterTool: (toolName: string) => void;
}

type NavigatorWithModelContext = Navigator & { modelContext?: BrowserModelContext };

interface RegisterCounterToolOptions {
  onIncrement: () => number;
}

export const registerCounterTool = ({
  onIncrement,
}: RegisterCounterToolOptions) => {
  if (typeof navigator === 'undefined') {
    return undefined;
  }

  // WebMCP API proposal reference: https://github.com/webmachinelearning/webmcp/blob/main/docs/proposal.md
  const { modelContext } = navigator as NavigatorWithModelContext;

  if (modelContext === undefined) {
    return undefined;
  }

  modelContext.registerTool({
    name: WEB_MCP_INCREMENT_TOOL,
    description: 'Increment the product page counter by one.',
    inputSchema: {
      type: 'object',
      properties: {},
      required: [],
    },
    execute: () => {
      const nextScore = onIncrement();

      return {
        content: [
          {
            type: 'text',
            text: `Counter incremented to ${String(nextScore)}.`,
          },
        ],
      };
    },
  });

  return () => {
    modelContext.unregisterTool(WEB_MCP_INCREMENT_TOOL);
  };
};
