// Rules-based matcher: level × goal × motivation → best course + events

const WHY_TEMPLATES = {
  escape: "You said you're looking for a fresh start — {reason}",
  compete: "You want to stand out from the crowd — {reason}",
  curious: "You're exploring AI because it fascinates you — {reason}",
  belong: "You want to find your people in AI — {reason}"
};

export function generateWhyLine(motivation, courseOrEvent) {
  const template = WHY_TEMPLATES[motivation] || WHY_TEMPLATES.curious;
  const reason = courseOrEvent.why_picked || "this is the perfect next step for you.";
  return template.replace("{reason}", reason.charAt(0).toLowerCase() + reason.slice(1));
}

export function matchCourse(courses, answers) {
  const { level, goal, motivation } = answers;

  // Score each course
  const scored = courses
    .filter(c => c.category === "course")
    .map(course => {
      let score = 0;

      // Level match (strongest signal)
      if (course.level === level) score += 10;
      if (level === "absolute_beginner" && course.level === "beginner") score += 5;
      if (level === "beginner" && course.level === "absolute_beginner") score += 3;

      // Goal match
      if (course.goal === goal) score += 7;

      // Motivation match
      if (course.motivation === motivation) score += 5;

      // Beginner-safe bonus for beginners
      if ((level === "absolute_beginner" || level === "beginner") && course.beginner_safe) score += 3;

      // Free bonus
      if (course.price?.toLowerCase().includes("free")) score += 2;

      return { ...course, score };
    })
    .sort((a, b) => b.score - a.score);

  return scored[0] || null;
}

export function matchEvents(events, answers, count = 3) {
  const { level, motivation, city } = answers;
  const isBeginner = level === "absolute_beginner" || level === "beginner";

  const scored = events.map(event => {
    let score = 0;

    // Beginner-safe is critical for beginners
    if (isBeginner && event.beginner_safe) score += 10;
    if (!isBeginner && !event.beginner_safe) score += 3;

    // Location match
    if (city && event.location?.toLowerCase().includes(city.toLowerCase())) score += 8;
    if (event.is_online) score += 4; // online always somewhat relevant

    // Upcoming events first
    if (event.date) {
      const daysUntil = Math.ceil((new Date(event.date) - new Date()) / (1000 * 60 * 60 * 24));
      if (daysUntil > 0 && daysUntil <= 14) score += 6;
      else if (daysUntil > 14 && daysUntil <= 30) score += 4;
      else if (daysUntil > 30) score += 2;
    }

    // Motivation-type affinity
    if (motivation === "belong" && (event.type === "meetup" || event.type === "networking")) score += 5;
    if (motivation === "compete" && event.type === "hackathon") score += 5;
    if (motivation === "curious" && (event.type === "talk" || event.type === "study_group")) score += 5;
    if (motivation === "escape" && event.type === "hackathon") score += 3;

    // Attendee count (social proof)
    if (event.attendees_count > 200) score += 2;

    return { ...event, score };
  }).sort((a, b) => b.score - a.score);

  // Get a mix of types if possible
  const result = [];
  const usedTypes = new Set();

  for (const event of scored) {
    if (result.length >= count) break;
    if (result.length < count - 1 && usedTypes.has(event.type) && scored.length > count) continue;
    result.push(event);
    usedTypes.add(event.type);
  }

  // Fill remaining if needed
  if (result.length < count) {
    for (const event of scored) {
      if (result.length >= count) break;
      if (!result.find(r => r.id === event.id)) {
        result.push(event);
      }
    }
  }

  return result;
}