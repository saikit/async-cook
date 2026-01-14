# Async Cook - E2E Test Plan

**Target Environment:** http://localhost:5174/  
**Test Framework:** Playwright  
**Date Created:** January 12, 2026

---

## Table of Contents
1. [Test Scope](#test-scope)
2. [Pre-Test Setup](#pre-test-setup)
3. [Critical User Journeys](#critical-user-journeys)
4. [Detailed Test Cases](#detailed-test-cases)
5. [Device & Browser Coverage](#device--browser-coverage)
6. [Performance & Stability](#performance--stability)
7. [Exit Criteria](#exit-criteria)

---

## Test Scope

### In Scope
- Homepage and recipe list display
- Recipe detail page navigation and content rendering
- Ingredient selection and status tracking
- Step-by-step recipe navigation
- Optional ingredient toggling
- Recipe calculator/ingredient scaling
- Navigation between recipes
- State persistence across navigation
- Responsive design (mobile, tablet, desktop)
- Cross-browser compatibility (Chrome, Firefox, Safari)

### Out of Scope
- Backend API testing (assumed working)
- Database testing
- Authentication/user accounts (single user app)
- Analytics tracking
- Performance benchmarking

---

## Pre-Test Setup

### Prerequisites
1. Node.js and npm installed
2. Playwright installed: `npm init playwright@latest`
3. Development server running: `npm run dev`
4. App accessible at http://localhost:5174/

### Test Data
- Sample recipes available in `/recipes` directory
- All recipes fully loaded and accessible

---

## Critical User Journeys

### Journey 1: Discover and View a Recipe
**User Goal:** Find and view a recipe without any modifications

**Steps:**
1. Load homepage
2. View recipe list
3. Click on a recipe card
4. Verify recipe content displays

**Expected Outcome:** Recipe page loads with all content visible and readable

---

### Journey 2: Cook Through a Recipe (Basic)
**User Goal:** Follow a recipe from start to finish without modifications

**Steps:**
1. Load recipe detail page
2. Check off ingredients as used
3. Progress through each instruction step
4. View prep/cleanup steps if applicable
5. Return to homepage

**Expected Outcome:** All steps navigate smoothly, ingredient tracking works, state persists during session

---

### Journey 3: Customize Recipe with Optional Ingredients
**User Goal:** Enable/disable optional ingredients and see updated instructions

**Steps:**
1. Load recipe with optional ingredients
2. Toggle optional ingredient on/off
3. Verify instructions update accordingly
4. Navigate through steps with optional ingredient enabled/disabled
5. Switch to different recipe

**Expected Outcome:** Optional ingredients toggle correctly, instructions update dynamically, switching recipes doesn't mix states

---

### Journey 4: Scale Recipe Ingredients
**User Goal:** Adjust ingredient quantities using calculator

**Steps:**
1. Load recipe with calculator
2. Adjust serving size or ingredient ratio
3. Verify all ingredients scale proportionally
4. Select different equipment if available
5. Navigate through recipe with scaled ingredients

**Expected Outcome:** All ingredients scale proportionally, equipment selection persists, calculator state survives navigation

---

## Detailed Test Cases

### Test Category 1: Homepage & Navigation

#### TC-1.1: Homepage Loads
- **Steps:** Navigate to http://localhost:5174/
- **Expected:** Homepage displays without errors
- **Verify:** Page title contains "Async Cook", recipe list visible
- **Browsers:** Chrome, Firefox, Safari

#### TC-1.2: Recipe List Displays
- **Steps:** On homepage, observe recipe list
- **Expected:** All recipes from `/recipes` directory display
- **Verify:** Each recipe has title, description, clickable card
- **Pass Criteria:** ≥ 6 recipes visible (bean-sweet-potato, dumpling-carrot, etc.)

#### TC-1.3: Navigate to Recipe Detail
- **Steps:** Click first recipe card on homepage
- **Expected:** Navigate to recipe detail page
- **Verify:** URL changes, recipe title displays, content loads
- **Pass Criteria:** No console errors, page loads in < 2 seconds

#### TC-1.4: Home Link Navigation
- **Steps:** From recipe detail, click home link
- **Expected:** Return to homepage
- **Verify:** URL returns to `/`, recipe list visible
- **Pass Criteria:** Navigation smooth, no white flash or lag

#### TC-1.5: Browser Back Button
- **Steps:** From recipe detail, click browser back button
- **Expected:** Return to homepage
- **Verify:** URL and content match expected homepage state
- **Pass Criteria:** Back button works as expected

#### TC-1.6: Navigate Between Multiple Recipes
- **Steps:** View recipe A → Home → View recipe B → Home → View recipe C
- **Expected:** Each navigation loads correct recipe content
- **Verify:** No state mixing (recipe A content visible when viewing recipe B)
- **Pass Criteria:** All recipes load correctly in sequence

---

### Test Category 2: Recipe Detail & Content

#### TC-2.1: Recipe Title & Description Display
- **Steps:** Load recipe detail page
- **Expected:** Title and description visible
- **Verify:** Text is readable, formatted correctly, no truncation
- **Pass Criteria:** Full content visible without scrolling on desktop

#### TC-2.2: Ingredients List Display
- **Steps:** Load recipe, observe ingredients list
- **Expected:** All ingredients display with quantities
- **Verify:** Proper formatting, clear ingredient names, no missing items
- **Pass Criteria:** Ingredient count matches recipe file

#### TC-2.3: Instructions Display
- **Steps:** Load recipe, observe instructions
- **Expected:** All steps display in order
- **Verify:** Step numbers/order visible, clear formatting
- **Pass Criteria:** No duplicate or missing steps

#### TC-2.4: Nutritional Information Display
- **Steps:** Load recipe with nutritional data
- **Expected:** Nutritional info displays (if available in recipe)
- **Verify:** Values are numeric and reasonable
- **Pass Criteria:** All macro/micronutrients visible

#### TC-2.5: Recipe Background Banner
- **Steps:** Load recipe, observe background banner
- **Expected:** Background shows recipe context
- **Verify:** Banner updates as steps change, shows active step
- **Pass Criteria:** Banner is visually distinct and informative

#### TC-2.6: Equipment Tags Display
- **Steps:** Load recipe with equipment tags
- **Expected:** Equipment tags visible
- **Verify:** All equipment listed, properly formatted
- **Pass Criteria:** Equipment information accessible

---

### Test Category 3: Ingredient Interaction & Status

#### TC-3.1: Check Ingredient Off
- **Steps:** On recipe page, click checkbox for ingredient A
- **Expected:** Ingredient marked as checked/used
- **Verify:** Visual indication (strikethrough, color change, icon)
- **Pass Criteria:** Checked state is clear and distinct

#### TC-3.2: Uncheck Ingredient
- **Steps:** Click checkbox again to uncheck
- **Expected:** Ingredient returns to unchecked state
- **Verify:** Visual indication removed
- **Pass Criteria:** Toggle works bidirectionally

#### TC-3.3: Ingredient Status Persists During Navigation
- **Steps:** Check ingredient A → Navigate through steps → Return to ingredient list
- **Expected:** Ingredient A remains checked
- **Verify:** Status visible in ingredient list
- **Pass Criteria:** State survives step navigation

#### TC-3.4: Status Persistence on Recipe Switch
- **Steps:** Load recipe A, check ingredient → Switch to recipe B → Return to recipe A
- **Expected:** Original recipe A ingredient status preserved OR cleared (define behavior)
- **Verify:** State matches expected behavior
- **Pass Criteria:** Consistent, documented behavior

#### TC-3.5: Ingredient Linking in Instructions
- **Steps:** Load recipe, observe ingredient mentions in instructions
- **Expected:** Ingredients mentioned in steps are linked/highlighted
- **Verify:** Linked ingredients are visually distinct
- **Pass Criteria:** Ingredient tagging works as intended

#### TC-3.6: Optional Ingredient Toggle
- **Steps:** Locate recipe with optional ingredient, toggle on/off
- **Expected:** Optional ingredient appears/disappears from list
- **Verify:** Instructions update when toggled
- **Pass Criteria:** Optional ingredients affect recipe dynamically

#### TC-3.7: Optional Ingredient Instructions Update
- **Steps:** Toggle optional ingredient on → View instructions
- **Expected:** Instructions reflect optional ingredient
- **Verify:** Steps mentioning optional ingredient appear/disappear appropriately
- **Pass Criteria:** No orphaned instruction steps

---

### Test Category 4: Step Navigation

#### TC-4.1: View First Step
- **Steps:** Load recipe, observe default step
- **Expected:** First or primary step highlighted
- **Verify:** Step content clearly displayed, background banner shows context
- **Pass Criteria:** Step is identifiable as current/active

#### TC-4.2: Navigate to Next Step
- **Steps:** Click next button/arrow
- **Expected:** Advance to next step
- **Verify:** Step content changes, background banner updates
- **Pass Criteria:** Navigation smooth, no jumping or lag

#### TC-4.3: Navigate to Previous Step
- **Steps:** Click previous button/arrow
- **Expected:** Return to previous step
- **Verify:** Step content changes, can navigate back and forth
- **Pass Criteria:** Bidirectional navigation works

#### TC-4.4: Step Sequence Validation
- **Steps:** Navigate through entire recipe step by step
- **Expected:** Steps follow logical order, no duplicates
- **Verify:** Step count matches instructions count
- **Pass Criteria:** Complete recipe navigation without gaps

#### TC-4.5: Prep Steps Display
- **Steps:** Load recipe, verify prep/prep-work steps
- **Expected:** Prep steps visible before main cooking steps
- **Verify:** Clearly labeled as prep, ordered correctly
- **Pass Criteria:** Prep steps are obvious and appropriately positioned

#### TC-4.6: Cleanup Steps Display
- **Steps:** Navigate to end of recipe, verify cleanup steps
- **Expected:** Cleanup/finishing steps visible at end
- **Verify:** Clearly labeled, complete instructions
- **Pass Criteria:** Cleanup steps present (if applicable to recipe)

#### TC-4.7: Step Highlighting in Instructions
- **Steps:** Navigate to different steps, observe instruction highlighting
- **Expected:** Currently active step highlighted
- **Verify:** Previous steps grayed out/visible in background
- **Pass Criteria:** Visual hierarchy shows step progression

---

### Test Category 5: Recipe Calculator & Scaling

#### TC-5.1: Open Calculator
- **Steps:** On recipe with calculator, click calculator button/icon
- **Expected:** Calculator dialog/drawer opens
- **Verify:** Calculator accessible, clear interface
- **Pass Criteria:** No errors, UI responsive

#### TC-5.2: Adjust Serving Size
- **Steps:** In calculator, adjust serving size up/down
- **Expected:** Serving size value changes
- **Verify:** Visual feedback provided
- **Pass Criteria:** Input field accepts numeric values

#### TC-5.3: Ingredient Scaling on Serving Change
- **Steps:** Change serving size → View ingredients
- **Expected:** All ingredient quantities update proportionally
- **Verify:** Math is correct (e.g., double serving = double quantities)
- **Pass Criteria:** Scaling accurate for at least 3 test cases

#### TC-5.4: Equipment Selection
- **Steps:** In calculator, select different equipment option (if available)
- **Expected:** Equipment selection changes
- **Verify:** Available options are clear
- **Pass Criteria:** Selection updates without errors

#### TC-5.5: Recipe Calculator Persistence
- **Steps:** Adjust ingredients in calculator → Close calculator → Navigate steps → Return to ingredients
- **Expected:** Scaled quantities persist
- **Verify:** Ingredients show scaled amounts throughout recipe
- **Pass Criteria:** State survives navigation

#### TC-5.6: Reset Calculator
- **Steps:** Adjust serving, close calculator, click calculator again
- **Expected:** Option to reset to original amounts or persistence of custom amounts
- **Verify:** Behavior is clear and documented
- **Pass Criteria:** Reset behavior is consistent

---

### Test Category 6: UI/UX & Responsiveness

#### TC-6.1: Desktop Layout (1920x1080)
- **Steps:** View app at desktop resolution
- **Expected:** All content visible without horizontal scroll
- **Verify:** Layout is optimal for desktop, no wasted space
- **Pass Criteria:** Content readable, buttons clickable

#### TC-6.2: Tablet Layout (768x1024)
- **Steps:** View app at tablet resolution
- **Expected:** Content adapts to tablet width
- **Verify:** Layout is optimized for tablet, readable without zoom
- **Pass Criteria:** Navigation easy, buttons appropriately sized

#### TC-6.3: Mobile Layout (375x667)
- **Steps:** View app at mobile resolution
- **Expected:** Single column layout, optimized for touch
- **Verify:** All content accessible, no horizontal scroll
- **Pass Criteria:** Mobile-first principles applied

#### TC-6.4: Touch Interactions on Mobile
- **Steps:** On mobile view, tap buttons, toggle switches, scroll lists
- **Expected:** Touch targets are appropriately sized (≥ 44x44px)
- **Verify:** No accidental double-taps, responsive feedback
- **Pass Criteria:** Touch experience smooth and error-free

#### TC-6.5: Drawer/Sheet on Mobile
- **Steps:** Open drawer components on mobile view
- **Expected:** Drawer slides in smoothly, takes appropriate width
- **Verify:** Close button visible, can dismiss by tapping outside
- **Pass Criteria:** Drawer UX appropriate for mobile

#### TC-6.6: Text Readability Across Devices
- **Steps:** View recipe content on desktop, tablet, mobile
- **Expected:** Text is readable at all sizes without zooming
- **Verify:** Font sizes appropriate, line height sufficient
- **Pass Criteria:** No text truncation or overflow

#### TC-6.7: Image/Banner Responsiveness
- **Steps:** View background banner and images across device sizes
- **Expected:** Images scale and maintain aspect ratio
- **Verify:** No distortion, images load on all devices
- **Pass Criteria:** Visual content displays correctly

---

### Test Category 7: State Management & Persistence

#### TC-7.1: Session Storage of Ingredient Status
- **Steps:** Check ingredients → Reload page → Check ingredient status
- **Expected:** Ingredient status persists after page reload (within same session)
- **Verify:** sessionStorage data is preserved
- **Pass Criteria:** Status recovers after reload

#### TC-7.2: Navigate Away and Return
- **Steps:** Load recipe A with checked ingredients → Visit recipe B → Return to recipe A
- **Expected:** Recipe A ingredient status persists
- **Verify:** Same ingredients remain checked
- **Pass Criteria:** State management handles multi-recipe navigation

#### TC-7.3: Clear State on New Session
- **Steps:** Check ingredients, close browser completely, reopen app
- **Expected:** Ingredient status clears (new session)
- **Verify:** No stale data from previous session
- **Pass Criteria:** Session isolation works correctly

#### TC-7.4: Calculator State Persistence
- **Steps:** Adjust serving size → Navigate to different step → Return to ingredients
- **Expected:** Scaled amounts persist
- **Verify:** Quantities match adjusted values
- **Pass Criteria:** Calculator state survives navigation

---

## Device & Browser Coverage

### Browsers (Desktop)
- [ ] **Chrome/Chromium** - Latest version
  - Primary testing browser
  - Test on Windows

- [ ] **Firefox** - Latest version
  - Secondary browser
  - Verify CSS and interactions

- [ ] **Safari/WebKit** - Latest version
  - Verify webkit-specific behaviors
  - Test form inputs, animations

### Devices (Mobile)
- [ ] **Mobile Chrome** - Pixel 5 (412x915)
  - Android representative
  - Touch interactions, mobile layout

- [ ] **Mobile Safari** - iPhone 12 (390x844)
  - iOS representative
  - iOS-specific behaviors

### Viewport Sizes (Responsive Design)
- [ ] **Mobile:** 375x667 (iPhone SE)
- [ ] **Tablet:** 768x1024 (iPad)
- [ ] **Desktop:** 1920x1080 (Primary)
- [ ] **Wide Desktop:** 2560x1440 (Ultra-wide)

---

## Performance & Stability

### TC-8.1: Page Load Performance
- **Target:** Initial load < 2 seconds
- **Measure:** Monitor network tab, DOM interactive time
- **Verify:** LCP (Largest Contentful Paint), FID (First Input Delay)

### TC-8.2: Recipe Navigation Performance
- **Target:** Recipe switching < 500ms
- **Measure:** Time between click and content visible
- **Verify:** No janky animations, smooth transitions

### TC-8.3: Ingredient Interaction Response
- **Target:** Checkbox toggle instant (< 100ms visual feedback)
- **Measure:** Click to visual state change
- **Verify:** No lag on interaction

### TC-8.4: Memory Leaks
- **Steps:** Navigate between 10+ recipes, monitor memory usage
- **Expected:** No significant memory growth
- **Verify:** Chrome DevTools Memory profiler
- **Pass Criteria:** No memory leaks detected

### TC-8.5: Console Errors
- **Steps:** Perform all test cases, monitor browser console
- **Expected:** No errors or warnings in console
- **Verify:** Use browser DevTools console
- **Pass Criteria:** Console clean throughout all tests

### TC-8.6: Network Errors
- **Steps:** Test with throttled network (slow 3G)
- **Expected:** App gracefully handles slow loading
- **Verify:** Content eventually loads, no crashes
- **Pass Criteria:** App functional on slow networks

---

## Exit Criteria

### Pass Criteria (All Must Be Met)
- ✅ All Critical User Journeys (1-4) complete successfully
- ✅ All Test Category 1-4 tests pass (100%)
- ✅ All Test Category 5-6 tests pass (100%) if features are implemented
- ✅ No critical/blocker console errors
- ✅ App functions on Chrome, Firefox, Safari
- ✅ App is responsive on mobile, tablet, desktop
- ✅ State management works correctly (session persistence)

### Known Issues / Known Limitations
- Document any known issues here
- Note features still in development ("half done" status per README)
- Template and multi-cook features not in scope for initial E2E

### Sign-Off
- **Test Execution Date:** _______________
- **Tester Name:** _______________
- **Result:** [ ] PASS [ ] FAIL [ ] CONDITIONAL PASS
- **Notes:** _______________

---

## Notes for Agent Mode Execution

1. **Parallelization:** Run tests in parallel where possible (Chrome, Firefox, Safari simultaneously)
2. **Reporting:** Generate HTML reports after each test run (`playwright show-report`)
3. **Debugging:** If a test fails, capture screenshots and video recordings
4. **Iteration:** Update test cases as new features are implemented
5. **Maintenance:** Review this plan quarterly or when major features are added
6. **CI/CD Integration:** Consider adding these tests to GitHub Actions or similar CI pipeline
