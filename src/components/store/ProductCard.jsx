import React from "react";
import { motion } from "framer-motion";
import { BadgeCheck, Star, ExternalLink } from "lucide-react";

export default function ProductCard({ product, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white dark:bg-gray-800 rounded-2xl border border-blue-100 dark:border-gray-700 overflow-hidden hover:shadow-xl hover:shadow-blue-100 dark:hover:shadow-blue-900/20 hover:border-blue-300 dark:hover:border-blue-600 transition-all group flex flex-col"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gray-50 dark:bg-gray-700">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <span className="bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">HSA/FSA ✓</span>
          {product.badge && (
            <span className="bg-blue-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full">{product.badge}</span>
          )}
        </div>
        {product.originalPrice && (
          <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            -{Math.round((1 - product.price / product.originalPrice) * 100)}%
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold mb-1">{product.brand}</p>
        <h3 className="font-semibold text-gray-900 dark:text-white text-sm leading-snug mb-1 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
          {product.name}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2 mb-3 flex-1">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? "text-amber-400 fill-amber-400" : "text-gray-200 dark:text-gray-600"}`} />
          ))}
          <span className="text-xs text-gray-400 ml-1">({product.reviews})</span>
        </div>

        {/* Price row */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-gray-900 dark:text-white">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          <a
            href={product.buyUrl || `https://www.amazon.com/s?k=${encodeURIComponent(product.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-2 rounded-xl transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Buy
          </a>
        </div>

        {/* Eligible tag */}
        <div className="mt-3 pt-3 border-t border-blue-50 dark:border-gray-700 flex items-center gap-1.5">
          <BadgeCheck className="w-3.5 h-3.5 text-green-500" />
          <span className="text-xs text-gray-500 dark:text-gray-400">{product.eligibility}</span>
        </div>
      </div>
    </motion.div>
  );
}