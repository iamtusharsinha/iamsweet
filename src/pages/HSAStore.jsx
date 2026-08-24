import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, ShoppingCart, Search, Shield, Zap, Heart, Activity,
  CheckCircle2, AlertCircle
} from "lucide-react";
import { base44 } from "@/api/base44Client";
import CartSidebar from "@/components/store/CartSidebar";
import CustomSelect from "@/components/ui/CustomSelect";
import { useLanguage } from "@/lib/LanguageContext";
import ProductCard from "@/components/store/ProductCard";

const PRODUCTS = [
  // Blood Glucose Monitoring
  {
    id: "bgm-001", name: "OneTouch Verio Flex Blood Glucose Meter Kit", brand: "OneTouch",
    category: "Blood Glucose Monitors", price: 19.99, originalPrice: 29.99,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80",
    description: "Color range indicator shows if glucose is in range. Includes meter, lancing device, 10 lancets & 10 test strips.",
    rating: 4.5, reviews: 2341, badge: "Best Seller",
    eligibility: "HSA & FSA Eligible — No prescription needed"
  },
  {
    id: "bgm-002", name: "Contour Next ONE Blood Glucose Meter", brand: "Contour",
    category: "Blood Glucose Monitors", price: 14.97, originalPrice: 24.99,
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80",
    description: "Smartest meter with Bluetooth connectivity. No coding required. Syncs with free Contour Diabetes app.",
    rating: 4.7, reviews: 1872,
    eligibility: "HSA & FSA Eligible — No prescription needed"
  },
  {
    id: "bgm-003", name: "Accu-Chek Guide Me Glucose Monitor Kit", brand: "Accu-Chek",
    category: "Blood Glucose Monitors", price: 17.49, originalPrice: 27.99,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80",
    description: "Spill-resistant test strip vial with easy-fill strips. Includes lancing device and 10 test strips.",
    rating: 4.6, reviews: 984,
    eligibility: "HSA & FSA Eligible — No prescription needed"
  },
  // Test Strips
  {
    id: "ts-001", name: "OneTouch Verio Test Strips (70 Count)", brand: "OneTouch",
    category: "Test Strips", price: 48.99, originalPrice: 79.99,
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&q=80",
    description: "DoubleSure technology reads each sample twice to confirm results. No coding. 5 second results.",
    rating: 4.4, reviews: 5621, badge: "Top Rated",
    eligibility: "HSA & FSA Eligible — No prescription needed"
  },
  {
    id: "ts-002", name: "Contour Next Test Strips (70 Count)", brand: "Contour",
    category: "Test Strips", price: 42.99, originalPrice: 49.99,
    image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&q=80",
    description: "Second-Chance Sampling allows you to apply more blood to the same strip. 99.7% accuracy.",
    rating: 4.8, reviews: 3102,
    eligibility: "HSA & FSA Eligible — No prescription needed"
  },
  {
    id: "ts-003", name: "Accu-Chek Guide Test Strips (50 Count)", brand: "Accu-Chek",
    category: "Test Strips", price: 39.99,
    image: "https://images.unsplash.com/photo-1576671081837-49000212a370?w=600&q=80",
    description: "Widest test strip dosing area. Easy to handle strips with a spill-resistant drum packaging.",
    rating: 4.5, reviews: 2211,
    eligibility: "HSA & FSA Eligible — No prescription needed"
  },
  // Lancets
  {
    id: "lc-001", name: "BD Ultra-Fine Lancets 33G (100 Count)", brand: "BD",
    category: "Lancets & Lancing Devices", price: 8.49, originalPrice: 12.99,
    image: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=600&q=80",
    description: "Ultra-thin 33 gauge lancets for nearly painless blood sampling. Compatible with most lancing devices.",
    rating: 4.6, reviews: 4482,
    eligibility: "HSA & FSA Eligible — No prescription needed"
  },
  {
    id: "lc-002", name: "Accu-Chek FastClix Lancing Device + 102 Lancets", brand: "Accu-Chek",
    category: "Lancets & Lancing Devices", price: 19.99, originalPrice: 28.99,
    image: "https://images.unsplash.com/photo-1631815587646-b85a1bb027e1?w=600&q=80",
    description: "Drum-based lancing device — no individual lancet loading. 11 customizable depth settings. Fast and comfortable.",
    rating: 4.7, reviews: 1883, badge: "Editor's Pick",
    eligibility: "HSA & FSA Eligible — No prescription needed"
  },
  // CGM Supplies
  {
    id: "cgm-001", name: "Dexcom G7 CGM Sensor (1-Pack)", brand: "Dexcom",
    category: "CGM Supplies", price: 129.99,
    image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=600&q=80",
    description: "10-day wear. Real-time glucose readings every 5 minutes with optional alerts. 60% smaller than G6.",
    rating: 4.9, reviews: 3402, badge: "New",
    eligibility: "HSA & FSA Eligible — May require prescription"
  },
  {
    id: "cgm-002", name: "Dexcom G6 CGM Sensor (3-Pack)", brand: "Dexcom",
    category: "CGM Supplies", price: 99.99,
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80",
    description: "10-day wear sensor. No fingerstick calibration. Factory calibrated. Compatible with Apple Watch & Android.",
    rating: 4.8, reviews: 5677,
    eligibility: "HSA & FSA Eligible — May require prescription"
  },
  {
    id: "cgm-003", name: "FreeStyle Libre 3 Sensor (2-Pack)", brand: "Abbott",
    category: "CGM Supplies", price: 89.99, originalPrice: 109.99,
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&q=80",
    description: "World's smallest CGM sensor. 14-day wear. 1-minute warm-up. Real-time readings sent to your phone.",
    rating: 4.7, reviews: 2894,
    eligibility: "HSA & FSA Eligible — May require prescription"
  },
  // Insulin Pump Supplies
  {
    id: "ip-001", name: "Omnipod DASH Intro Kit", brand: "Insulet",
    category: "Insulin Pump Supplies", price: 299.99,
    image: "https://images.unsplash.com/photo-1576671081784-a103a91e4d48?w=600&q=80",
    description: "Tubeless, waterproof insulin pump. Bluetooth-enabled PDM. 72-hour pod wear. No tubing.",
    rating: 4.6, reviews: 1203, badge: "Tubeless",
    eligibility: "HSA & FSA Eligible — Prescription required"
  },
  {
    id: "ip-002", name: "Medtronic Infusion Set (10-Pack)", brand: "Medtronic",
    category: "Insulin Pump Supplies", price: 49.99, originalPrice: 64.99,
    image: "https://images.unsplash.com/photo-1626315869436-d6781ba69d6e?w=600&q=80",
    description: "Sure-T infusion sets with 6mm needle. 3-day wear. Compatible with Medtronic MiniMed pumps.",
    rating: 4.4, reviews: 876,
    eligibility: "HSA & FSA Eligible — Prescription required"
  },
  // Diabetic Socks
  {
    id: "sk-001", name: "Dr. Scholl's Diabetes & Circulatory Crew Socks (6-Pack)", brand: "Dr. Scholl's",
    category: "Diabetic Socks & Footwear", price: 22.99,
    image: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=600&q=80",
    description: "Non-binding top prevents constriction. Smooth toe seam. Moisture-wicking. White, reinforced heel & toe.",
    rating: 4.5, reviews: 7234, badge: "FSA Eligible",
    eligibility: "HSA & FSA Eligible — No prescription needed"
  },
  {
    id: "sk-002", name: "Thorlos Diabetic Crew Socks (3-Pack)", brand: "Thorlos",
    category: "Diabetic Socks & Footwear", price: 34.99, originalPrice: 44.99,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80",
    description: "Extra padding in ball and heel. Padded foot protection for sensitive feet. Moisture management yarn.",
    rating: 4.7, reviews: 2341,
    eligibility: "HSA & FSA Eligible — No prescription needed"
  },
  // Wound Care
  {
    id: "wc-001", name: "3M Tegaderm Transparent Film Dressing (100-Pack)", brand: "3M",
    category: "Wound Care", price: 29.99,
    image: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=600&q=80",
    description: "Waterproof, breathable transparent dressing. Protects wounds and secures CGM sensors. Medical grade.",
    rating: 4.6, reviews: 1456,
    eligibility: "HSA & FSA Eligible — No prescription needed"
  },
  {
    id: "wc-002", name: "SkinTac Adhesive Barrier Wipes (50-Pack)", brand: "SkinTac",
    category: "Wound Care", price: 18.99,
    image: "https://images.unsplash.com/photo-1576671081837-49000212a370?w=600&q=80",
    description: "Skin barrier wipes that protect and extend CGM/pump adhesion. Gentle for sensitive skin.",
    rating: 4.8, reviews: 3892, badge: "CGM Users Love",
    eligibility: "HSA & FSA Eligible — No prescription needed"
  },
  // A1C Kits
  {
    id: "a1c-001", name: "A1CNow Self Check At-Home A1C Test Kit (2 Tests)", brand: "A1CNow",
    category: "A1C & Lab Tests", price: 39.99, originalPrice: 54.99,
    image: "https://images.unsplash.com/photo-1576671081784-a103a91e4d48?w=600&q=80",
    description: "Clinically accurate A1C results in just 5 minutes at home. No lab visit required. Doctor-trusted results.",
    rating: 4.4, reviews: 2104, badge: "At-Home Test",
    eligibility: "HSA & FSA Eligible — No prescription needed"
  },
  // Ketone Testing
  {
    id: "kt-001", name: "Keto-Mojo GK+ Blood Glucose & Ketone Meter", brand: "Keto-Mojo",
    category: "Ketone Testing", price: 54.99,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80",
    description: "Dual meter reads both blood glucose and blood ketone levels. Essential for T1D DKA monitoring.",
    rating: 4.7, reviews: 4231, badge: "Dual Monitor",
    eligibility: "HSA & FSA Eligible — No prescription needed"
  },
  // Insulin Syringes
  {
    id: "is-001", name: "BD Insulin Syringes 31G (100-Pack)", brand: "BD",
    category: "Insulin Syringes & Pens", price: 24.99, originalPrice: 34.99,
    image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&q=80",
    description: "Ultra-fine 31G needle. 0.3ml capacity. Permanently bonded needle for maximum precision.",
    rating: 4.6, reviews: 3211,
    eligibility: "HSA & FSA Eligible — Prescription required in some states"
  },
  // OTC Medications
  {
    id: "med-001", name: "Glucose Tablets Orange Flavor (50 Count)", brand: "TRUEplus",
    category: "Hypoglycemia Treatment", price: 7.49,
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80",
    description: "Fast-acting glucose tablets for low blood sugar emergencies. 4g carbs per tablet. Chewable.",
    rating: 4.5, reviews: 6234, badge: "Emergency Must-Have",
    eligibility: "HSA & FSA Eligible — No prescription needed"
  },
  {
    id: "med-002", name: "Glucerna Hunger Smart Shake Homemade Vanilla (12-Pack)", brand: "Glucerna",
    category: "Diabetic Nutrition", price: 26.99, originalPrice: 31.99,
    image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=600&q=80",
    description: "Designed for people with diabetes. CARBSTEADY formula minimizes blood sugar spikes. 10g protein.",
    rating: 4.4, reviews: 1882,
    eligibility: "HSA & FSA Eligible — No prescription needed"
  },
];

const CATEGORIES = [
  "All Products",
  "Blood Glucose Monitors",
  "Test Strips",
  "Lancets & Lancing Devices",
  "CGM Supplies",
  "Insulin Pump Supplies",
  "Diabetic Socks & Footwear",
  "Wound Care",
  "A1C & Lab Tests",
  "Ketone Testing",
  "Insulin Syringes & Pens",
  "Hypoglycemia Treatment",
  "Diabetic Nutrition",
];

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

export default function HSAStore() {
  const { t } = useLanguage();
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Products");
  const [sort, setSort] = useState("featured");
  const [checkingOut, setCheckingOut] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);

  const showToast = (msg, type = "success") => {
    setToastMsg({ msg, type });
    setTimeout(() => setToastMsg(null), 3000);
  };

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(i => i.product_id === product.id);
      if (existing) return prev.map(i => i.product_id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { product_id: product.id, product_name: product.name, price: product.price, quantity: 1, image: product.image, category: product.category }];
    });
    showToast(`${product.name} added to cart`);
  };

  const updateQty = (productId, qty) => {
    if (qty <= 0) return removeFromCart(productId);
    setCart(prev => prev.map(i => i.product_id === productId ? { ...i, quantity: qty } : i));
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(i => i.product_id !== productId));
  };

  const handleCheckout = async () => {
    showToast("Checkout is currently unavailable. Please contact support.", "error");
  };

  const filtered = useMemo(() => {
    let items = PRODUCTS.filter(p => {
      const matchCat = category === "All Products" || p.category === category;
      const q = search.toLowerCase();
      const matchSearch = !q || p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
    if (sort === "price_asc") items = [...items].sort((a, b) => a.price - b.price);
    if (sort === "price_desc") items = [...items].sort((a, b) => b.price - a.price);
    if (sort === "rating") items = [...items].sort((a, b) => b.rating - a.rating);
    return items;
  }, [category, search, sort]);

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  // Check URL for success/cancel
  const params = new URLSearchParams(window.location.search);
  const isSuccess = params.get("success") === "true";
  const isCancelled = params.get("cancelled") === "true";

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-gray-950 pb-16 md:pb-0">
      {/* Toast */}
      {toastMsg && (
        <motion.div
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          className={`fixed top-5 right-5 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg text-sm font-medium ${
            toastMsg.type === "error" ? "bg-red-600 text-white" : "bg-green-600 text-white"
          }`}
        >
          {toastMsg.type === "error" ? <AlertCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
          {toastMsg.msg}
        </motion.div>
      )}

      {/* Header */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 pb-4 flex items-center justify-between sticky top-0 z-30 bg-blue-50/90 dark:bg-gray-950/90 backdrop-blur-md border-b border-blue-100 dark:border-gray-800" style={{ paddingTop: "max(1.25rem, env(safe-area-inset-top))" }}>
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-600 transition-colors">
            <ArrowLeft className="w-4 h-4" /> {t("home")}
          </Link>
          <div className="w-px h-5 bg-blue-200 dark:bg-gray-700" />
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-600" />
            <div>
              <span className="font-heading font-bold text-base text-blue-900 dark:text-white">{t("storeTitle")}</span>
              <span className="hidden sm:inline text-xs text-gray-500 dark:text-gray-400 ml-2">· {PRODUCTS.length} {t("eligibleProducts")}</span>
            </div>
          </div>
        </div>
        <button
          onClick={() => setCartOpen(true)}
          className="relative flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-xl transition-colors"
        >
          <ShoppingCart className="w-4 h-4" />
          <span className="hidden sm:inline text-sm">{t("cartLabel")}</span>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">{cartCount}</span>
          )}
        </button>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Success / Cancel banners */}
        {isSuccess && (
          <div className="mb-6 bg-green-50 dark:bg-green-900/20 border border-green-300 dark:border-green-700 rounded-2xl p-4 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
            <div>
              <p className="font-semibold text-green-800 dark:text-green-300">{t("paymentSuccess")}</p>
              <p className="text-sm text-green-600 dark:text-green-400">{t("paymentSuccessDesc")}</p>
            </div>
          </div>
        )}
        {isCancelled && (
          <div className="mb-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-300 dark:border-amber-700 rounded-2xl p-4 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <p className="text-sm text-amber-700 dark:text-amber-400">{t("paymentCancelled")}</p>
          </div>
        )}

        {/* Hero strip */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-500 rounded-2xl p-6 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Shield className="w-5 h-5 text-green-300" />
              <span className="text-green-300 text-sm font-semibold">100% HSA & FSA Eligible</span>
            </div>
            <h2 className="text-xl font-bold text-white">{t("shopTitle")}</h2>
            <p className="text-blue-200 text-sm mt-1">{t("shopSubtitle")}</p>
          </div>
          <div className="flex gap-3 text-center flex-shrink-0">
            <div className="bg-white/10 rounded-xl px-3 py-2.5">
              <p className="text-white font-bold text-base">{PRODUCTS.length}+</p>
              <p className="text-blue-200 text-xs">Products</p>
            </div>
            <div className="bg-white/10 rounded-xl px-3 py-2.5">
              <p className="text-white font-bold text-base">30%</p>
              <p className="text-blue-200 text-xs">Tax Savings</p>
            </div>
            <div className="bg-white/10 rounded-xl px-3 py-2.5">
              <p className="text-white font-bold text-base">Free</p>
              <p className="text-blue-200 text-xs">$50+</p>
            </div>
          </div>
        </div>

        {/* Search + Sort */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={t("searchProducts")}
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-blue-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white placeholder-gray-400"
            />
          </div>
          <CustomSelect
            value={sort}
            onChange={setSort}
            options={SORT_OPTIONS}
            className="sm:w-52"
          />
        </div>

        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-medium border transition-all flex-shrink-0 ${
                category === cat
                  ? "bg-blue-600 border-blue-600 text-white shadow-md"
                  : "bg-white dark:bg-gray-800 border-blue-100 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-blue-400 hover:text-blue-600"
              }`}
            >
              {cat}
              {cat !== "All Products" && (
                <span className={`ml-1.5 text-xs rounded-full px-1.5 font-semibold ${category === cat ? "bg-blue-500 text-white" : "bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400"}`}>
                  {PRODUCTS.filter(p => p.category === cat).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          {t("showing")} <strong className="text-gray-800 dark:text-white">{filtered.length}</strong> {t("hsaProducts")}
          {category !== "All Products" && <span> {t("in")} <strong className="text-blue-600">{category}</strong></span>}
        </p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <Search className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="font-medium">No products found</p>
            <p className="text-sm mt-1">Try a different search or category</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
            {filtered.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
                delay={Math.min(i * 0.04, 0.4)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Cart Sidebar */}
      <CartSidebar
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQty={updateQty}
        onRemove={removeFromCart}
        onCheckout={handleCheckout}
        checkingOut={checkingOut}
      />
    </div>
  );
}