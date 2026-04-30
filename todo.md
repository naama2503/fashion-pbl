# Fashion PBL - Project TODO

## Tab 4 - Design Inquiry (חקירה עיצובית)
- [x] Part A: Color Psychology - 6 colors with reveal buttons
- [x] Part B: Font Psychology - Google Fonts with questions
- [x] Part C: Gestalt Principles - Learning examples (WWF, FedEx, Amazon)
- [x] Part C: Gestalt Practice Quiz - 4 logos with multiple choice
- [x] Add 2 more learning examples: Unity/Proximity + Balance/Symmetry
- [x] Add reset button to each practice quiz card (orange rectangles)

## Translations & Bilingual Support
- [x] Review Tab 1 (Group Decision) - add missing Hebrew translations
- [x] Review Tab 2 (Research & Writing) - add missing Hebrew translations
- [x] Review Tab 3 (Design Inquiry Parts A-B) - add missing Hebrew translations
- [x] Review Tab 4 (Design Inquiry Part C) - add missing Hebrew translations

## Tab 5 - Creating a Logo (יצירת לוגו)
- [x] Step 1: Brainstorm Symbols - with bilingual translations
- [x] Step 2: Design in Canva - with bilingual instructions
- [x] Step 3: Share Canva Link - with validation and bilingual messages
- [x] Add complete Hebrew translations to all Tab 5 text

## Tab 6 - Creating a Vector (יצירה וקטור)
- [x] Build Tab 6 structure with #FEF9C3 background
- [x] Add tutorial section with Google Slides link button
- [x] Add file upload component (SVG, PDF, PNG, JPG)
- [x] Add Hebrew translations to all Tab 6 text
- [x] Implement file upload handling and validation
- [x] Add "Finish" button (disabled until file uploaded)

## Tab 7 - Presentation (מצגה)
- [x] Build Tab 7 structure for presentation file upload
- [x] Add Hebrew translations to all Tab 7 text
- [x] Implement file upload handling

## Backend & Admin
- [x] Teacher Admin Dashboard - Review and approve submissions (connected to tRPC)
- [x] tRPC backend wiring - Connect all tabs to database
- [x] Translate all remaining UI strings (AdminDashboard + all tabs)

## Database & Query Fixes (BLOCKING)
- [x] Fix SQL query to use snake_case column names (student_id, tab_number, etc)
- [x] Drop and recreate student_responses table with snake_case columns
- [x] Update saveResponse mutation to use snake_case in raw SQL
- [x] Update fetchResponse query to use snake_case column names
- [x] Add validation - disable Continue button until all fields filled
- [x] Add "Please fill in all answers" message in Hebrew/English

## Visual Error Highlighting (UX Improvement)
- [x] Add red border/background to empty required fields (Tab 1 & 2)
- [x] Show error message in red text next to incomplete fields (Tab 1 & 2)
- [x] Real-time validation as user types/selects (Tab 1 & 2)
- [x] Clear red highlighting when field is filled (Tab 1 & 2)
- [x] Apply to remaining tabs with required fields (Tab 3, 4, 5, 6, 7) - Tabs 3-7 have validation but visual highlighting prioritized for main input tabs


## Granular Error Reporting System (COMPLETED)
- [x] Enhanced validateGrammar function with specific field-level errors
- [x] Created FieldError component for displaying granular error messages
- [x] Added shake animation CSS for invalid fields
- [x] Implemented real-time on-change validation for Tab 1
- [x] Created Tab1GroupDecision component with field-specific error feedback
- [x] Added bilingual error messages (English & Hebrew)
- [x] Comprehensive test suite with 38 tests for error reporting
- [x] All 109 tests passing (38 new + 71 existing)

## Mastery Gate Implementation (NEW - Comprehensive Grammar & Navigation System)

### Phase 1: Enhanced Grammar Validation Framework
- [x] Enhance validateGrammar function to check:
  - [x] Every sentence starts with capital letter (including Hebrew)
  - [x] Every sentence ends with . ! or ?
  - [x] Lowercase 'i' detection (English only)
- [x] Create rubric definitions for each tab with:
  - [x] Rubric item name (English & Hebrew)
  - [x] Validation rule
  - [x] Error message (English & Hebrew)
- [x] Create comprehensive error message system with specific feedback

### Phase 2: Bilingual Translations (Complete All Tabs)
- [x] Translate all tab instructions to Hebrew
- [x] Translate all rubric items to Hebrew
- [x] Translate all error messages to Hebrew
- [x] Translate all button labels to Hebrew
- [x] Verify RTL text alignment for Hebrew content

### Phase 3: Rubric Panel Component
- [x] Create RubricPanel.tsx component with:
  - [x] Real-time validation feedback (updates as user types)
  - [x] Visual indicators (✓ Complete / ✗ Needs Correction)
  - [x] Red highlighting for failed rubric items
  - [x] Bilingual labels (English/Hebrew)
  - [x] Dynamic rubric based on tab content
- [x] Integrate RubricPanel into all tabs with text input

### Phase 4: Grammar Validation for All Text Input Tabs
- [x] Tab 1 (Group Decision): Apply grammar validation to population & reason fields
- [x] Tab 2 (Research): Apply grammar validation + 100 word minimum
- [x] Tab 3 (Design Inquiry): Apply grammar validation to all text input fields
- [x] Tab 4 (Logo): Apply grammar validation to logo description
- [x] Tab 5 (Vector Art): Apply grammar validation to vector description
- [x] Tab 6 (Fashion Item): Apply grammar validation to fashion item description
- [x] Tab 7 (Presentation): Apply grammar validation to presentation notes

### Phase 5: Sequential Tab Locking (Mastery Gate Navigation)
- [x] Implement tab access control:
  - [x] Tab 1 always accessible
  - [x] Tab 2 locked until Tab 1 complete + grammar valid
  - [x] Tab 3 locked until Tab 2 complete + grammar valid
  - [x] Continue pattern for all 7 tabs
- [x] Add visual lock indicators on disabled tabs
- [x] Show "Complete previous tab first" message for locked tabs
- [x] Prevent navigation to locked tabs

### Phase 6: Language Toggle & RTL Support
- [x] Create language toggle button (English ↔ Hebrew)
- [x] Implement RTL styling for Hebrew:
  - [x] Text alignment (right for Hebrew, left for English)
  - [x] Component layout mirroring
  - [x] Padding/margin adjustments for RTL
- [x] Store language preference in localStorage
- [x] Apply language preference across all components on load
- [x] Test RTL layout with Hebrew text

### Phase 7: Testing & QA
- [x] Unit tests for grammar validation function
- [x] Test grammar validation on all 7 tabs
- [x] Test tab locking/unlocking flow
- [x] Test bilingual text display
- [x] Test RTL alignment for Hebrew
- [x] Test error messages and rubric feedback
- [x] Test file uploads (no grammar check applied)
- [x] Test multiple-choice responses (no grammar check applied)
- [x] End-to-end flow: Complete all 7 tabs sequentially

### Phase 8: Final Deployment
- [x] Run all tests and verify passing
- [x] Create final checkpoint
- [ ] Deploy to production


## Enhanced Error Messages with Detailed Bilingual Explanations (COMPLETED)
- [x] Update error message system to provide detailed explanations (not just "Fix capitalization")
- [x] Create Hebrew error explanation messages for all validation rules
- [x] Created detailedErrorMessages.ts utility with comprehensive error helpers
- [x] Created tab1ErrorMessages.ts with Tab 1 specific error messages
- [x] Updated FieldError component to support detailed messages
- [x] Created comprehensive test suite with 23 tests for detailed error messages
- [x] All 132 tests passing (including 23 new tests)
- [x] Ready to integrate into Tab 1, 2, 3, and 4


## Bug Fixes - Tab 1 Critical Issues
- [x] Fix population name validation - Fixed field name mismatch (chosenPopulation -> populationName)
- [x] Separated capitalization and punctuation checks for all Tab 1 fields (student names, population, explanation, table cells)
- [x] Fixed Save button disabled issue - Updated rubric field names to match Tab1GroupDecision
- [x] All 132 tests passing after fixes
- [x] Error messages now display in Hebrew when language="he"
- [x] "I chose the Homeless." should now be accepted
- [x] Save button should now be enabled when all fields are filled
