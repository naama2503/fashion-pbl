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


## Mastery Gate Implementation (NEW - Comprehensive Grammar & Navigation System)

### Phase 1: Enhanced Grammar Validation Framework
- [ ] Enhance validateGrammar function to check:
  - [ ] Every sentence starts with capital letter (including Hebrew)
  - [ ] Every sentence ends with . ! or ?
  - [ ] Lowercase 'i' detection (English only)
- [ ] Create rubric definitions for each tab with:
  - [ ] Rubric item name (English & Hebrew)
  - [ ] Validation rule
  - [ ] Error message (English & Hebrew)
- [ ] Create comprehensive error message system with specific feedback

### Phase 2: Bilingual Translations (Complete All Tabs)
- [ ] Translate all tab instructions to Hebrew
- [ ] Translate all rubric items to Hebrew
- [ ] Translate all error messages to Hebrew
- [ ] Translate all button labels to Hebrew
- [ ] Verify RTL text alignment for Hebrew content

### Phase 3: Rubric Panel Component
- [ ] Create RubricPanel.tsx component with:
  - [ ] Real-time validation feedback (updates as user types)
  - [ ] Visual indicators (✓ Complete / ✗ Needs Correction)
  - [ ] Red highlighting for failed rubric items
  - [ ] Bilingual labels (English/Hebrew)
  - [ ] Dynamic rubric based on tab content
- [ ] Integrate RubricPanel into all tabs with text input

### Phase 4: Grammar Validation for All Text Input Tabs
- [ ] Tab 1 (Group Decision): Apply grammar validation to population & reason fields
- [ ] Tab 2 (Research): Apply grammar validation + 100 word minimum
- [ ] Tab 3 (Design Inquiry): Apply grammar validation to all text input fields
- [ ] Tab 4 (Logo): Apply grammar validation to logo description
- [ ] Tab 5 (Vector Art): Apply grammar validation to vector description
- [ ] Tab 6 (Fashion Item): Apply grammar validation to fashion item description
- [ ] Tab 7 (Presentation): Apply grammar validation to presentation notes

### Phase 5: Sequential Tab Locking (Mastery Gate Navigation)
- [ ] Implement tab access control:
  - [ ] Tab 1 always accessible
  - [ ] Tab 2 locked until Tab 1 complete + grammar valid
  - [ ] Tab 3 locked until Tab 2 complete + grammar valid
  - [ ] Continue pattern for all 7 tabs
- [ ] Add visual lock indicators on disabled tabs
- [ ] Show "Complete previous tab first" message for locked tabs
- [ ] Prevent navigation to locked tabs

### Phase 6: Language Toggle & RTL Support
- [ ] Create language toggle button (English ↔ Hebrew)
- [ ] Implement RTL styling for Hebrew:
  - [ ] Text alignment (right for Hebrew, left for English)
  - [ ] Component layout mirroring
  - [ ] Padding/margin adjustments for RTL
- [ ] Store language preference in localStorage
- [ ] Apply language preference across all components on load
- [ ] Test RTL layout with Hebrew text

### Phase 7: Testing & QA
- [ ] Unit tests for grammar validation function
- [ ] Test grammar validation on all 7 tabs
- [ ] Test tab locking/unlocking flow
- [ ] Test bilingual text display
- [ ] Test RTL alignment for Hebrew
- [ ] Test error messages and rubric feedback
- [ ] Test file uploads (no grammar check applied)
- [ ] Test multiple-choice responses (no grammar check applied)
- [ ] End-to-end flow: Complete all 7 tabs sequentially

### Phase 8: Final Deployment
- [ ] Run all tests and verify passing
- [ ] Create final checkpoint
- [ ] Deploy to production
