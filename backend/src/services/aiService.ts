// Beginner-friendly AI categorization (simple keyword-based)
export const categorizeEmail = (subject: string, text: string) => {
  const lowerText = text.toLowerCase();
  if (lowerText.includes("interested")) return "Interested";
  if (lowerText.includes("schedule") || lowerText.includes("meeting")) return "Meeting Booked";
  if (lowerText.includes("not interested")) return "Not Interested";
  if (lowerText.includes("spam")) return "Spam";
  if (lowerText.includes("out of office")) return "Out of Office";
  return "Other";
};
