// jest.config.js
// Configuration Jest pour tests unitaires et d'intégration
// Couverture de code >80%, support TypeScript et React

const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Chemin vers votre app Next.js pour charger next.config.js et .env
  dir: './',
})

// Configuration Jest personnalisée
const customJestConfig = {
  // Environnement de test
  testEnvironment: 'jest-environment-jsdom',
  
  // Fichier de setup pour les tests
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  
  // Patterns pour trouver les fichiers de tests
  testMatch: [
    '**/__tests__/**/*.(ts|tsx|js|jsx)',
    '**/*.(test|spec).(ts|tsx|js|jsx)'
  ],
  
  // Répertoires à ignorer
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/coverage/',
    '<rootDir>/dist/'
  ],
  
  // Extensions de fichiers à traiter
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  
  // Transformation des fichiers
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: 'tsconfig.json'
    }]
  },
  
  // Alias de chemins (correspond à tsconfig.json)
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/$1',
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/lib/(.*)$': '<rootDir>/lib/$1',
    '^@/types/(.*)$': '<rootDir>/types/$1',
    '^@/app/(.*)$': '<rootDir>/app/$1'
  },
  
  // Mocks pour les fichiers statiques
  moduleNameMapping: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js'
  },
  
  // Configuration de couverture de code
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html', 'json'],
  collectCoverageFrom: [
    'components/**/*.{ts,tsx}',
    'lib/**/*.{ts,tsx}',
    'app/**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/.next/**',
    '!**/coverage/**',
    '!jest.config.js',
    '!jest.setup.js'
  ],
  
  // Seuils de couverture requis (>80%)
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  
  // Variables d'environnement pour les tests
  setupFiles: ['<rootDir>/jest.env.js'],
  
  // Options de test
  verbose: true,
  testTimeout: 10000,
  
  // Support des modules ES6
  transformIgnorePatterns: [
    'node_modules/(?!(framer-motion|@stripe/stripe-js)/)'
  ]
}

// Créer la configuration Jest avec Next.js
module.exports = createJestConfig(customJestConfig)