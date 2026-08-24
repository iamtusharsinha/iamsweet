import Stripe from 'npm:stripe@14.21.0';

// Server-side price catalog — source of truth for all checkout prices
const PRODUCT_CATALOG: Record<string, { name: string; price: number; image?: string; category?: string }> = {
  "bgm-001": { name: "OneTouch Verio Flex Blood Glucose Meter Kit", price: 19.99, category: "Blood Glucose Monitors" },
  "bgm-002": { name: "Contour Next ONE Blood Glucose Meter", price: 14.97, category: "Blood Glucose Monitors" },
  "bgm-003": { name: "Accu-Chek Guide Me Glucose Monitor Kit", price: 17.49, category: "Blood Glucose Monitors" },
  "ts-001":  { name: "OneTouch Verio Test Strips (70 Count)", price: 48.99, category: "Test Strips" },
  "ts-002":  { name: "Contour Next Test Strips (70 Count)", price: 42.99, category: "Test Strips" },
  "ts-003":  { name: "Accu-Chek Guide Test Strips (50 Count)", price: 39.99, category: "Test Strips" },
  "lc-001":  { name: "BD Ultra-Fine Lancets 33G (100 Count)", price: 8.49, category: "Lancets & Lancing Devices" },
  "lc-002":  { name: "Accu-Chek FastClix Lancing Device + 102 Lancets", price: 19.99, category: "Lancets & Lancing Devices" },
  "cgm-001": { name: "Dexcom G7 CGM Sensor (1-Pack)", price: 129.99, category: "CGM Supplies" },
  "cgm-002": { name: "Dexcom G6 CGM Sensor (3-Pack)", price: 99.99, category: "CGM Supplies" },
  "cgm-003": { name: "FreeStyle Libre 3 Sensor (2-Pack)", price: 89.99, category: "CGM Supplies" },
  "ip-001":  { name: "Omnipod DASH Intro Kit", price: 299.99, category: "Insulin Pump Supplies" },
  "ip-002":  { name: "Medtronic Infusion Set (10-Pack)", price: 49.99, category: "Insulin Pump Supplies" },
  "sk-001":  { name: "Dr. Scholl's Diabetes & Circulatory Crew Socks (6-Pack)", price: 22.99, category: "Diabetic Socks & Footwear" },
  "sk-002":  { name: "Thorlos Diabetic Crew Socks (3-Pack)", price: 34.99, category: "Diabetic Socks & Footwear" },
  "wc-001":  { name: "3M Tegaderm Transparent Film Dressing (100-Pack)", price: 29.99, category: "Wound Care" },
  "wc-002":  { name: "SkinTac Adhesive Barrier Wipes (50-Pack)", price: 18.99, category: "Wound Care" },
  "a1c-001": { name: "A1CNow Self Check At-Home A1C Test Kit (2 Tests)", price: 39.99, category: "A1C & Lab Tests" },
  "kt-001":  { name: "Keto-Mojo GK+ Blood Glucose & Ketone Meter", price: 54.99, category: "Ketone Testing" },
  "is-001":  { name: "BD Insulin Syringes 31G (100-Pack)", price: 24.99, category: "Insulin Syringes & Pens" },
  "med-001": { name: "Glucose Tablets Orange Flavor (50 Count)", price: 7.49, category: "Hypoglycemia Treatment" },
  "med-002": { name: "Glucerna Hunger Smart Shake Homemade Vanilla (12-Pack)", price: 26.99, category: "Diabetic Nutrition" },
};

const ALLOWED_ORIGINS = [
  "https://iamsweet.base44.app",
  "http://localhost:5173",
  "http://localhost:3000",
];

Deno.serve(async (req) => {
  // Block requests not originating from the app itself
  const origin = req.headers.get("origin") || req.headers.get("referer") || "";
  const allowed = ALLOWED_ORIGINS.some(o => origin.startsWith(o));
  if (!allowed) {
    console.warn("Blocked request from unauthorized origin:", origin);
    return Response.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY"), { apiVersion: "2023-10-16" });
    const { items, customerEmail, successUrl, cancelUrl } = await req.json();

    if (!items || items.length === 0) {
      return Response.json({ error: 'No items in cart' }, { status: 400 });
    }

    // Build line items using server-side prices only — never trust client-supplied prices
    const lineItems = [];
    for (const item of items) {
      const catalogEntry = PRODUCT_CATALOG[item.product_id];
      if (!catalogEntry) {
        console.error(`Unknown product_id: ${item.product_id}`);
        return Response.json({ error: `Unknown product: ${item.product_id}` }, { status: 400 });
      }
      const qty = Math.max(1, Math.floor(Number(item.quantity) || 1));
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: catalogEntry.name,
            metadata: { product_id: item.product_id, category: catalogEntry.category || '' },
          },
          unit_amount: Math.round(catalogEntry.price * 100),
        },
        quantity: qty,
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: successUrl || 'https://example.com/success',
      cancel_url: cancelUrl || 'https://example.com/cancel',
      customer_email: customerEmail || undefined,
      metadata: {
        base44_app_id: Deno.env.get("BASE44_APP_ID"),
      },
    });

    console.log('Checkout session created:', session.id);
    return Response.json({ url: session.url, session_id: session.id });
  } catch (error) {
    console.error('Stripe checkout error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});