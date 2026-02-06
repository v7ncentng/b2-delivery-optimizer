# Four Layers

UI (Next.js)
↓
Application Layer (orchestrates flows)
↓
Domain Layer (pure business logic)
↓
Infrastructure Layer (CSV, OSRM, APIs)

# Pipeline

Upload CSV
   ↓
Deterministic Parse CSV to JSON
   ↓
Convert addresses to their own additional latitude and longitude columns
   ↓
Schema Validation (verifying and converting incoming data to the structures and rules that our system expects BEFORE our code uses it) (Check shopify csvs and other small business csv resources to code this part) (use library like Zod)
   ↓
User Edit Page and Confirmation
   ↓
Pre-Solver Feasibility Engine
   ↓
Build Solver Payload
   ↓
Send POST → OSRM/VROOM

# Base File Structure
src/
│
├ app/  
│   # Next.js routes and UI.
│   # Handles requests and responses ONLY.
│   # No business logic here.
│
├ application/  
│   # Orchestrates the pipeline.
│   # Controls the flow:
│   # parse → validate → normalize → feasibility → payload → solver
│   # Think of this as the system's coordinator.
│
├ domain/  
│   # Core logistics logic.
│   # Defines entities (Delivery, Vehicle),
│   # validation rules, and feasibility checks.
│   # Must NOT depend on Next.js or external APIs.
│
├ infrastructure/  
│   # Connects to external services.
│   # Examples:
│   # - CSV parser
│   # - OSRM/VROOM client
│   # If a third-party service changes,
│   # only this folder should need updates.
│
├ contracts/  
│   # Defines what data can enter/leave the system.
│   # Contains schemas (Zod) and DTOs.
│   # Protects the app from bad input.
│
├ config/  
│   # Central place for environment variables
│   # and system limits (timeouts, max stops, etc).
│   # Prevents hard-coded values.
│
└ lib/  
    # Small shared utilities used across layers.
    # Keep this folder minimal.
    # Example: logger, ID generator.

# Simple Understanding
app → receives  
application → directs  
infrastructure → communicates  
contracts → protects  
config → controls  
lib → assists  


# Detailed File Structure
src/
│
├ app/
│   ├ api/
│   │   └ optimize/
│   │        route.ts
│   #
│   # Next.js entrypoints.
│   # Accept requests → call application → return response.
│
├ application/
│   ├ runOptimization/
│   │     runOptimization.ts
│   │
│   │ # Master orchestrator.
│   │ # Executes the full pipeline in order.
│   #
│   ├ parsing/
│   │     parseCSV.ts
│   │
│   │ # Converts uploaded CSV → structured JSON.
│   #
│   ├ validation/
│   │     schemaValidation.ts│
│   #
│   ├ feasibility/
│   │     runFeasibility.ts
│   │
│   │ # Calls the domain feasibility engine.
│   #
│   └ payload/
│         buildSolverPayload.ts
│
│         # Transforms domain models → solver format.
│
├ domain/
│   ├ entities/
│   │     Delivery.ts
│   │     Vehicle.ts
│   │     Depot.ts
│   │
│   │ # Core business objects.
│   #
│   ├ valueObjects/
│   │     GeoPoint.ts
│   │     TimeWindow.ts
│   │     Capacity.ts
│   │
│   │ # Self-validating primitives.
│   # Prevent invalid states.
│
│   ├ services/
│   │     FeasibilityEngine.ts
│   │
│   │ # Pure logistics rules.
│   #
│   └ errors/
│         ValidationError.ts
│         FeasibilityError.ts
│
│         # Typed errors for predictable failure.
│
├ infrastructure/
│   ├ csv/
│   │     CSVParser.ts
│   │
│   │ # Wraps CSV library.
|   |
│   ├ solver/
│   │     VroomClient.ts
│   │
│   │ # Handles POST requests to OSRM/VROOM.
│
│   └ http/
│         fetchClient.ts   (optional)
│
│         # Shared HTTP logic (timeouts, retries).
│
├ contracts/
│   ├ schemas/
│   │     RawDeliverySchema.ts
│   │     RawVehicleSchema.ts
│   │     OptimizationRequestSchema.ts
│   │
│   │ # Runtime validation.
│
│   └ dtos/
│         OptimizationRequestDTO.ts
│         OptimizationResponseDTO.ts
│         SolverPayloadDTO.ts
│
│         # Defines data crossing system boundaries.
│
├ config/
│   ├ env.ts
│   ├ limits.ts
│   └ solverConfig.ts
│
│   # Central configuration.
│
└ lib/   
    ├ logger.ts  (logs if successful or not)
    ├ generateOptimizationId.ts
    └ result.ts   (optional Result<T, E> pattern)

    # Tiny shared helpers ONLY.


   
Optional Later Additions if Needed:
   Domain Validation
   LLM Call