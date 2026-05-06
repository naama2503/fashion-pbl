// Test Canva link validation logic
const testLinks = [
  { link: "https://canva.link/e3n4mev69tr50ns", expected: true, description: "Short canva.link format (user's link)" },
  { link: "https://www.canva.com/design/DABHQGQxkU/QLAPKSjlEQp3DPfuzmsQ/edit", expected: true, description: "Full canva.com edit link" },
  { link: "https://www.canva.com/design/DABHQGQxkU/QLAPKSjlEQp3DPfuzmsQ/view", expected: false, description: "View-only link (no edit)" },
  { link: "https://canva.link/abc123", expected: true, description: "Another short canva.link" },
  { link: "https://example.com/design", expected: false, description: "Non-Canva link" },
];

console.log("Testing Canva Link Validation\n");
console.log("Updated validation logic:");
console.log("const isValidCanvaLink = (canvaLink.includes('canva.com') || canvaLink.includes('canva.link')) && (canvaLink.includes('edit') || canvaLink.startsWith('https://canva.link'));\n");

let passed = 0;
let failed = 0;

testLinks.forEach(({ link, expected, description }) => {
  // Apply the updated validation logic
  const isValidCanvaLink = (link.includes("canva.com") || link.includes("canva.link")) && (link.includes("edit") || link.startsWith("https://canva.link"));
  
  const result = isValidCanvaLink === expected ? "✓ PASS" : "✗ FAIL";
  console.log(`${result} - ${description}`);
  console.log(`  Link: ${link}`);
  console.log(`  Expected: ${expected}, Got: ${isValidCanvaLink}\n`);
  
  if (isValidCanvaLink === expected) {
    passed++;
  } else {
    failed++;
  }
});

console.log(`\nResults: ${passed} passed, ${failed} failed`);
if (failed === 0) {
  console.log("✓ All tests passed! The Canva link validation is working correctly.");
}
