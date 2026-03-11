const DEFAULT_USERNAME = 'test';
const DEFAULT_PASSWORD = 'test';
const WEB_MCP_INCREMENT_TOOL = 'increment-counter';

type WebMcpTool = {
  name: string;
  execute: (_input: Record<string, never>, _agent: unknown) => {
    content: { type: string; text: string }[];
  };
};

let webMcpTools: Map<string, WebMcpTool> = new Map();

const getLoginCredentials = () => {
  const username = Cypress.env('TEST_USERNAME');
  const password = Cypress.env('TEST_PASSWORD');

  return {
    username: typeof username === 'string' ? username : DEFAULT_USERNAME,
    password: typeof password === 'string' ? password : DEFAULT_PASSWORD,
  };
};

const submitLogin = (username: string, password: string) => {
  cy.get('input[name="username"]').clear().type(username);
  cy.get('input[name="password"]').clear().type(password);
  cy.get('form').submit();
};

const mockModelContext = (win: Cypress.AUTWindow) => {
  webMcpTools = new Map<string, WebMcpTool>();
  const modelContext = {
    registerTool: (tool: WebMcpTool) => {
      webMcpTools.set(tool.name, tool);
    },
    unregisterTool: (toolName: string) => {
      webMcpTools.delete(toolName);
    },
  };
  const navigatorPrototype = Object.getPrototypeOf(win.navigator) as Navigator;

  Object.defineProperty(navigatorPrototype, 'modelContext', {
    configurable: true,
    get: () => modelContext,
  });
};

describe('WebMCP increment counter', () => {
  afterEach(() => {
    Cypress.off('window:before:load', mockModelContext);
  });

  it('increments the private counter via a registered WebMCP tool', () => {
    cy.clearLocalStorage();
    Cypress.on('window:before:load', mockModelContext);
    cy.visit('/login');

    const { username, password } = getLoginCredentials();
    submitLogin(username, password);
    cy.location('pathname').should('eq', '/product');

    cy.wrap(null).should(() => {
      const tool = webMcpTools.get(WEB_MCP_INCREMENT_TOOL);
      expect(tool).to.not.equal(undefined);
    });

    cy.then(() => {
      const tool = webMcpTools.get(WEB_MCP_INCREMENT_TOOL);
      const result = tool?.execute({}, {});
      expect(result?.content[0]?.text).to.contain('Counter incremented to');
    });

    cy.contains('h1', 'Welcome to the Product Page (1)').should('be.visible');
  });

  it('still supports manual increments when modelContext is unavailable', () => {
    cy.clearLocalStorage();
    cy.visit('/login');

    const { username, password } = getLoginCredentials();
    submitLogin(username, password);
    cy.location('pathname').should('eq', '/product');

    cy.contains('button', 'Increment Counter').click();
    cy.contains('h1', 'Welcome to the Product Page (1)').should('be.visible');
  });
});
