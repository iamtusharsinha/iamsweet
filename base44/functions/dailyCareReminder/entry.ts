import { createClientFromRequest } from 'npm:@base44/sdk@0.8.38';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    // Authorization: only allow authenticated admin users
    const isAuthed = await base44.auth.isAuthenticated();
    if (!isAuthed) {
      console.warn("dailyCareReminder: unauthenticated request rejected");
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const me = await base44.auth.me();
    if (me?.role !== "admin") {
      console.warn(`dailyCareReminder: non-admin user ${me?.email} rejected`);
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }

    // Fetch all registered users (service role — this is a scheduled/admin task)
    const users = await base44.asServiceRole.entities.User.list();

    if (!users || users.length === 0) {
      console.log("No users found to notify.");
      return Response.json({ sent: 0 });
    }

    let sent = 0;
    let errors = 0;

    for (const user of users) {
      if (!user.email) continue;
      try {
        await base44.asServiceRole.integrations.Core.SendEmail({
          to: user.email,
          from_name: "iamsweet Care Companion",
          subject: "⏰ Daily reminder: log your blood sugar & medications",
          body: `
Hi ${user.full_name?.split(" ")[0] || "there"} 👋

This is your friendly daily reminder from iamsweet!

✅ Things to do today:
  • Log your blood sugar reading
  • Mark your medications as taken
  • Record your mood & energy

Staying consistent with your daily check-ins helps you spot trends and feel more in control of your diabetes management.

👉 Open your Care Companion: https://iamsweet.base44.app/care

You're doing great — keep it up! 💙

— The iamsweet Team

---
To stop receiving these reminders, contact us at hello@iamsweet.app
          `.trim(),
        });
        sent++;
        console.log(`Reminder sent to ${user.email}`);
      } catch (err) {
        errors++;
        console.error(`Failed to send to ${user.email}:`, err.message);
      }
    }

    console.log(`Daily reminder complete: ${sent} sent, ${errors} errors`);
    return Response.json({ sent, errors });
  } catch (error) {
    console.error("dailyCareReminder error:", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});