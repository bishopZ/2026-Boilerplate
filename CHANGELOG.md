# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

+ Added proper SEO metadata to the index page.

### Changed

+ Make header and footer into reusable components.

### Deprecated
### Removed
### Fixed

+ Fixed a bug that prevented it from loading without any saved data. Cold start now working as expected.

### Security

## [1.1.0] - 2025-08-14

### Added

+ Cypress for E2E testing
+ Chakra UI design system
+ React Router
+ Added a CHANGELOG
+ Added a .env template
+ Added a css reset
+ Added speculation rules for server-side pages

### Changed

+ Organized the server files for better API construction
+ Updated the versions of dependencies
+ Improved SEO metadata handling

### Removed

+ Historical documentation


## [1.0.1] - 2025-05-25

Frontend

+ Build Tool: Vite
+ Static Typing: TypeScript
+ UI Framework: React
+ State Management: Redux Toolkit
+ React Error Boundary

Backend

+ Server Runtime: Node.js
+ Web Framework: Express
+ Template Engine: EJS
+ Authentication Library: Passport.js

Security and Storage

+ Local Storage
+ Crypto Library: Crypto JS

Linting and Formatting

+ Linter: ESLint


## How to Use This Changelog

### For Developers
When making changes, add them to the "Unreleased" section under the appropriate category:
- **Added** for new features
- **Changed** for changes in existing functionality
- **Deprecated** for soon-to-be removed features
- **Removed** for now removed features
- **Fixed** for any bug fixes
- **Security** for security improvements

### For Releases
When creating a new release:
1. Move items from "Unreleased" to a new version section
2. Add the release date
3. Update the version number in package.json
4. Create a git tag for the release

### Version Format
- **Major.Minor.Patch** (e.g., 1.0.0)
- **Major**: Breaking changes
- **Minor**: New features (backwards compatible)
- **Patch**: Bug fixes (backwards compatible)