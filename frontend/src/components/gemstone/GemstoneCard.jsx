import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Heart,
  Eye,
  Star,
  MessageCircle,
  Sparkles,
  Award,
  TrendingUp,
  Gem,
  Share2,
  ShoppingCart,
  Zap,
  Info,
  Plus
} from 'lucide-react';
import { useBusinessContext } from '../../context/BusinessContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { GemstoneImage } from '../common/LazyImage';
import { useGlobalToast } from '../../context/ToastContext';
import { SITE_CONFIG, isAuthorizedDomain } from '../../config/config';

// Domain check on component load
if (typeof window !== 'undefined' && !isAuthorizedDomain?.()) {
  console.error('🚫 GemstoneCard: Unauthorized domain');
}

const GemstoneCard = ({ gemstone, index = 0, variant = 'grid' }) => {
  const { generateWhatsAppURL, shareGemstoneWithImage } = useBusinessContext();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart, isInCart } = useCart();
  const { isAuthenticated } = useAuth();
  const toast = useGlobalToast();
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      return;
    }

    const result = addToCart(gemstone);
    if (result?.success) {
      toast.cartAdd(gemstone);
    } else if (result?.message) {
      toast.error(result.message);
    }
  };

  const handleWhatsAppClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (generateWhatsAppURL && gemstone) {
      const whatsappData = generateWhatsAppURL(gemstone);

      if (whatsappData && whatsappData.open) {
        whatsappData.open();
      } else {
        const url = typeof whatsappData === 'string' ? whatsappData : whatsappData.webUrl;
        window.open(url, '_blank');
      }
    }
  };

  const handleShare = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const shared = await shareGemstoneWithImage(gemstone);

      if (shared !== true) {
        if (navigator.share) {
          await navigator.share({
            title: `${gemstone?.name?.english} - ${gemstone?.name?.urdu}`,
            text: gemstone?.summary || `Check out this beautiful ${gemstone?.category} gemstone from Kohinoor.`,
            url: `${SITE_CONFIG.BASE_URL}/gemstone/${gemstone?.slug || gemstone?._id}`
          });
        } else {
          await navigator.clipboard.writeText(`${SITE_CONFIG.BASE_URL}/gemstone/${gemstone?.slug || gemstone?._id}`);
          toast.success('Link copied to clipboard!');
        }
      }
    } catch (error) {
      // User cancelled share or error
      if (error.name !== 'AbortError') {
        await navigator.clipboard.writeText(`${SITE_CONFIG.BASE_URL}/gemstone/${gemstone?.slug || gemstone?._id}`);
        toast.success('Link copied to clipboard!');
      }
    }
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (navigator.vibrate) {
      navigator.vibrate(100);
    }

    const wasInWishlist = isInWishlist(gemstone?._id);
    toggleWishlist(gemstone);

    if (wasInWishlist) {
      toast.wishlistRemove(gemstone);
    } else {
      toast.wishlistAdd(gemstone);
    }
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        delay: index * 0.1,
        ease: "easeOut"
      }
    },
    hover: {
      y: -12,
      scale: 1.03,
      rotateY: 2,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: 0.1
      }
    }
  };

  const overlayVariants = {
    hidden: {
      opacity: 0,
      backdropFilter: "blur(0px)"
    },
    visible: {
      opacity: 1,
      backdropFilter: "blur(4px)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const actionButtonVariants = {
    hidden: {
      scale: 0,
      rotate: -180,
      opacity: 0
    },
    visible: (i) => ({
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        ease: "backOut"
      }
    })
  };

  const fallbackImage = '/placeholder-gemstone.svg';
  const imageUrl = gemstone?.images?.[0]?.url || fallbackImage;

  if (gemstone && (!gemstone.images || gemstone.images.length === 0)) {
    console.log('Gemstone missing images:', gemstone.name?.english, gemstone.images);
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`
        premium-card overflow-hidden group cursor-pointer transform-gpu
        ${variant === 'featured' ? 'md:col-span-2 md:row-span-2' : ''}
        ${variant === 'list' ? 'flex flex-row' : 'flex flex-col'}
        ${isHovered ? 'shadow-2xl' : 'shadow-md'}
      `}
    >
      <Link to={`/gemstone/${gemstone?.slug || gemstone?._id}`} className="block h-full">

        {/* Image - Smaller on mobile */}
        <div className={`
          relative overflow-hidden group/image
          ${variant === 'list' ? 'w-28 h-28 sm:w-32 sm:h-32 flex-shrink-0' : 'aspect-[4/3] sm:aspect-square w-full'}
          ${variant === 'featured' ? 'md:aspect-[2/1]' : ''}
        `}>

          {/* Discount Badge - Myntra style */}
          {gemstone?.discount?.isActive && gemstone?.discount?.percentage > 0 && (
            <motion.div
              className="absolute top-2 left-2 z-20"
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-lg text-[10px] sm:text-xs font-bold shadow-lg animate-pulse">
                <span>{gemstone.discount.percentage}% OFF</span>
                <span className="block text-[8px] font-normal">{gemstone.discount.message || 'Hurry Up!'}</span>
              </div>
            </motion.div>
          )}

          {/* Trending Badge */}
          {gemstone?.trending && !gemstone?.discount?.isActive && (
            <motion.div
              className="absolute top-2 left-2 z-10"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              <div className="bg-ruby text-white px-2 py-1 rounded-full text-[10px] sm:text-xs font-semibold flex items-center space-x-1 shadow-lg backdrop-blur-sm">
                <TrendingUp className="w-3 h-3" />
                <span>Trending</span>
              </div>
            </motion.div>
          )}

          {/* Featured Badge */}
          {variant === 'featured' && (
            <motion.div
              className="absolute top-2 right-2 z-10"
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.4, type: "spring" }}
            >
              <div className="bg-golden text-sapphire px-2 py-1 rounded-full text-[10px] sm:text-xs font-semibold flex items-center space-x-1 shadow-lg backdrop-blur-sm">
                <Star className="w-3 h-3" />
                <span>Featured</span>
              </div>
            </motion.div>
          )}

          {/* Image */}
          <GemstoneImage
            src={gemstone?.images?.[0]?.url}
            alt={`${gemstone?.name?.english} - ${gemstone?.name?.urdu}`}
            containerClassName="w-full h-full"
            className="group-hover:scale-110 transition-transform duration-500 ease-out"
            quality="85"
          />


          {/* Desktop Hover Overlay */}
          <motion.div
            className="hidden md:block absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
            variants={overlayVariants}
            initial="hidden"
            animate={isHovered ? "visible" : "hidden"}
          >
            {/* Action Buttons */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial="hidden"
              animate={isHovered ? "visible" : "hidden"}
            >
              <div className="flex items-center space-x-3">
                {[
                  { icon: Eye, color: 'bg-sapphire hover:bg-sapphire/90', label: 'Quick View' },
                  { icon: MessageCircle, color: 'bg-green-500 hover:bg-green-600', label: 'WhatsApp', onClick: handleWhatsAppClick },
                  { icon: Share2, color: 'bg-golden hover:bg-golden/90', label: 'Share', onClick: handleShare }
                ].map((action, i) => (
                  <motion.button
                    key={action.label}
                    custom={i}
                    variants={actionButtonVariants}
                    onClick={action.onClick || (() => { })}
                    className={`${action.color} text-white p-3 rounded-full shadow-lg backdrop-blur-sm transition-all duration-200 hover:shadow-xl`}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    title={action.label}
                  >
                    <action.icon className="w-4 h-4" />
                  </motion.button>
                ))}

                {/* Wishlist Button */}
                <motion.button
                  custom={3}
                  variants={actionButtonVariants}
                  onClick={handleWishlist}
                  className={`text-white p-3 rounded-full shadow-lg backdrop-blur-sm transition-all duration-200 hover:shadow-xl ${isInWishlist(gemstone?._id)
                      ? 'bg-red-500 hover:bg-red-600'
                      : 'bg-ruby hover:bg-ruby/90'
                    }`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  title={isInWishlist(gemstone?._id) ? "Remove from Wishlist" : "Add to Wishlist"}
                >
                  <Heart className={`w-4 h-4 ${isInWishlist(gemstone?._id) ? 'fill-current' : ''}`} />
                </motion.button>
              </div>
            </motion.div>

            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent h-20" />
          </motion.div>


          {/* Certified Badge - Same red style as discount badge */}
          {gemstone?.certification?.certified && (
            <motion.div
              className="absolute top-2 right-2 z-20"
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-lg text-[10px] sm:text-xs font-bold shadow-lg">
                <span className="flex items-center justify-center gap-1">
                  <Award className="w-3 h-3" />
                  Certified
                </span>
                <span className="block text-[8px] font-normal text-center">Authentic</span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Content */}
        <div className={`
          p-3 sm:p-4 flex-grow flex flex-col
          ${variant === 'list' ? 'justify-center ml-3 sm:ml-4' : ''}
        `}>
          {/* Name + Action Buttons Row */}
          <div className="flex items-start justify-between gap-2 mb-2">
            {/* Names */}
            <div className="flex-1 min-w-0">
              <h3 className={`
                font-heading font-semibold text-gray-900 dark:text-white mb-0.5
                ${variant === 'featured' ? 'text-lg sm:text-xl md:text-2xl' : 'text-base sm:text-base md:text-lg'}
                line-clamp-1 md:line-clamp-none
              `}>
                {gemstone?.name?.english}
              </h3>
              <p className={`
                text-gray-600 dark:text-gray-400 font-medium
                ${variant === 'featured' ? 'text-sm sm:text-base' : 'text-sm sm:text-sm'}
                line-clamp-1 md:line-clamp-none
              `}>
                {gemstone?.name?.urdu}
              </p>
            </div>

            {/* Action Buttons - Share & Wishlist hidden on desktop (already in hover overlay) */}
            <div className="flex items-center gap-1 flex-shrink-0">
              {/* Share - Mobile only */}
              <button
                onClick={handleShare}
                className="md:hidden p-1.5 rounded-full transition-colors bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-blue-500"
              >
                <Share2 className="w-4 h-4" />
              </button>
              {/* Wishlist - Mobile only */}
              <button
                onClick={handleWishlist}
                className={`md:hidden p-1.5 rounded-full transition-colors ${isInWishlist(gemstone?._id)
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-red-500'
                  }`}
              >
                <Heart className={`w-4 h-4 ${isInWishlist(gemstone?._id) ? 'fill-current' : ''}`} />
              </button>
              {/* Cart - Always visible */}
              <button
                onClick={handleAddToCart}
                className={`p-1.5 rounded-full transition-colors ${isInCart(gemstone?._id)
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-amber-500'
                  }`}
              >
                <ShoppingCart className="w-4 h-4" />
              </button>
              {/* Buy Now - Always visible */}
              <button
                onClick={handleWhatsAppClick}
                className="bg-green-500 hover:bg-green-600 text-white px-2.5 py-1.5 rounded-full flex items-center gap-1 text-xs font-semibold"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Buy</span>
              </button>
            </div>
          </div>

          {/* Details Section */}
          <div className="flex-grow">

            {/* Summary */}
            {variant === 'featured' && gemstone?.summary && (
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2.5 line-clamp-2">
                {gemstone.summary}
              </p>
            )}

            {/* Category/Color - Single line */}
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-emerald/10 text-emerald-700 dark:text-emerald-400 px-2.5 py-1 rounded-full text-xs font-medium truncate max-w-[50%]">
                {gemstone?.category}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {gemstone?.color}
              </span>
            </div>

            {/* Purpose Tags - Single row, no wrap */}
            <div className="flex items-center gap-1.5 mb-2 overflow-hidden">
              {gemstone?.purpose && gemstone.purpose.length > 0 ? (
                <>
                  {gemstone.purpose.slice(0, 2).map((purpose, index) => (
                    <span
                      key={index}
                      className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-2 py-0.5 rounded text-xs font-medium whitespace-nowrap"
                    >
                      {purpose}
                    </span>
                  ))}
                  {gemstone.purpose.length > 2 && (
                    <span className="text-xs text-gray-400">+{gemstone.purpose.length - 2}</span>
                  )}
                </>
              ) : null}
            </div>
          </div>

          {/* Bottom Section - Price */}
          <div className="mt-auto pt-3 border-t border-gray-100 dark:border-gray-700">
            {(gemstone?.price || (gemstone?.priceRange && (gemstone.priceRange.min || gemstone.priceRange.max))) ? (
              <div className="font-bold text-emerald-600 dark:text-emerald-400 text-lg">
                <span>₹</span>
                <span>
                  {gemstone.price ?
                    gemstone.price.toLocaleString('en-IN') :
                    gemstone.priceRange?.min ?
                      gemstone.priceRange.min.toLocaleString('en-IN') :
                      gemstone.priceRange?.max?.toLocaleString('en-IN')
                  }
                </span>
              </div>
            ) : (
              <span className="text-sm text-gray-400">Contact for price</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default GemstoneCard; 