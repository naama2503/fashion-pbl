# Fashion PBL Comprehensive Rebuild TODO

## Phase 1: Supabase Integration
- [ ] Set up Supabase tables: students, student_responses, approval_log
- [ ] Create tRPC procedures for CRUD operations on student responses
- [ ] Create tRPC procedures for teacher approval updates
- [ ] Test Supabase connection and data persistence

## Phase 2: Design Inquiry Tab (Tab 4) Rebuild
- [ ] Part A: Color Exercise - 6 color blocks with feeling input and professional meaning reveal
- [ ] Part B: Font & Shape Exercise - 3 fonts + 3 shapes with "Strong" vs "Kind" identification
- [ ] Part C: Gestalt Principles - 5 principle cards with logo examples and reveal buttons
- [ ] Add Hebrew translations for all sections
- [ ] Add interactive reveal logic for all parts

## Phase 3: Teacher Admin Dashboard
- [ ] Create /admin route with password protection (teacher123)
- [ ] Build table showing all students and their responses
- [ ] Add approval toggle buttons for each stage
- [ ] Display color feelings from Design Inquiry tab
- [ ] Connect to Supabase for real-time updates

## Phase 4: Gating System
- [ ] Implement tab locking based on teacher approvals
- [ ] Add visual indicators for locked/unlocked tabs
- [ ] Prevent form submission if previous tab not approved
- [ ] Show "Awaiting approval" message on locked tabs

## Phase 5: UI Enhancements
- [ ] Add floating "Helper Gem" button with link to Google Gem
- [ ] Add grammar reminders to all text inputs (red reminder text)
- [ ] Ensure Alef font applied throughout
- [ ] Verify matte color palette on all elements
- [ ] Test Bento grid layout on home page

## Phase 6: Testing & Deployment
- [ ] Run all vitest tests
- [ ] Test all tab transitions and gating logic
- [ ] Verify Supabase integration works end-to-end
- [ ] Test teacher approval workflow
- [ ] Save final checkpoint
