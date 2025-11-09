# Product Overview

This is a GraphQL Apollo Server that acts as a proxy for the PokéAPI (https://pokeapi.co), implementing Relay specifications for cursor-based pagination and global object identification.

## Purpose

Provides a GraphQL interface to Pokemon data with:
- Relay-compliant pagination (forward-only cursor-based)
- Global ID system for fetching any node by ID
- Structured Pokemon and Ability data with relationships
- Caching and batching for optimal performance

## Key Features

- Query individual Pokemon or paginated lists
- Access Pokemon abilities with metadata (slot, hidden status)
- Relay Node interface implementation
- DataLoader for batching ability requests
- In-memory caching with node-cache
- GraphiQL playground for development
