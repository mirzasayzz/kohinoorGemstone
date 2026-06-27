import { motion } from 'framer-motion';
import { 
  Gem, 
  Shield, 
  Award,
  Users,
  Clock,
  Phone,
  Mail,
  MapPin,
  BadgeCheck,
  ExternalLink
} from 'lucide-react';
import { useBusinessContext } from '../context/BusinessContext';
import SEOHead, { seoConfigs } from '../components/common/SEOHead';

const About = () => {
  const { businessInfo } = useBusinessContext();

  const stats = [
    { 
      icon: Clock, 
      label: 'Years in Business', 
      value: businessInfo?.heritage?.foundedYear 
        ? new Date().getFullYear() - businessInfo.heritage.foundedYear 
        : '35+' 
    },
    { icon: Gem, label: 'Gemstone Varieties', value: '500+' },
    { icon: Users, label: 'Happy Customers', value: '10000+' },
    { icon: Shield, label: 'Certified Authentic', value: '100%' }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <SEOHead {...seoConfigs.about} />
      
      {/* Header */}
      <section className="bg-luxury-pearl dark:bg-luxury-charcoal py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-luxury-charcoal dark:text-luxury-pearl mb-3">
            About {businessInfo?.shopName || 'Kohinoor Gemstones'}
          </h1>
          {businessInfo?.tagline && (
            <p className="text-sm md:text-base text-luxury-charcoal/70 dark:text-luxury-pearl/70">
              {businessInfo.tagline}
            </p>
          )}
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 md:py-16">
        <div className="max-w-4xl mx-auto px-4">
          
          {/* Company Overview */}
          <div className="mb-8 md:mb-12">
            <h2 className="text-xl md:text-2xl font-semibold text-luxury-charcoal dark:text-luxury-pearl mb-4">
              Our Company
            </h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                {businessInfo?.description || 'We are a family-owned gemstone business dedicated to providing authentic, certified gemstones with a heritage of trust and excellence.'}
              </p>
              
              {businessInfo?.heritage?.story && (
                <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                  {businessInfo.heritage.story}
                </p>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <Icon className="w-6 h-6 md:w-8 md:h-8 text-luxury-gold mx-auto mb-2" />
                  <div className="text-lg md:text-xl font-bold text-luxury-charcoal dark:text-luxury-pearl">
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Specialties */}
          {businessInfo?.heritage?.specialties && businessInfo.heritage.specialties.length > 0 && (
            <div className="mb-8 md:mb-12">
              <h2 className="text-xl md:text-2xl font-semibold text-luxury-charcoal dark:text-luxury-pearl mb-4">
                Our Specialties
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {businessInfo.heritage.specialties.map((specialty, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <Award className="w-4 h-4 text-luxury-gold flex-shrink-0" />
                    <span className="text-sm md:text-base text-gray-700 dark:text-gray-300">{specialty}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Store Certification */}
          {businessInfo?.storeCertification?.enabled && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 md:mb-12"
            >
              <h2 className="text-xl md:text-2xl font-semibold text-luxury-charcoal dark:text-luxury-pearl mb-4 flex items-center gap-2">
                <BadgeCheck className="w-6 h-6 text-emerald-500" />
                Certified Store
              </h2>
              
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-200 dark:border-emerald-700/50 rounded-xl overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Certification Image */}
                    {businessInfo.storeCertification.certificationImage && (
                      <div className="md:w-1/3">
                        <img 
                          src={businessInfo.storeCertification.certificationImage} 
                          alt={`${businessInfo.storeCertification.labName} Certificate`}
                          className="w-full h-auto rounded-lg shadow-lg border-2 border-white dark:border-gray-700"
                        />
                      </div>
                    )}
                    
                    {/* Certification Details */}
                    <div className={businessInfo.storeCertification.certificationImage ? 'md:w-2/3' : 'w-full'}>
                      <div className="flex items-center gap-2 mb-3">
                        <BadgeCheck className="w-8 h-8 text-emerald-500" />
                        <div>
                          <h3 className="text-lg font-bold text-emerald-700 dark:text-emerald-400">
                            {businessInfo.storeCertification.labName || 'JG Gems Testing Lab'}
                          </h3>
                          {businessInfo.storeCertification.tagline && (
                            <p className="text-xs text-emerald-600/80 dark:text-emerald-500/80">
                              {businessInfo.storeCertification.tagline}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      {businessInfo.storeCertification.description && (
                        <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-4">
                          {businessInfo.storeCertification.description}
                        </p>
                      )}
                      
                      <div className="space-y-2 text-sm">
                        {businessInfo.storeCertification.labAddress && (
                          <div className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-600 dark:text-gray-400">
                              {businessInfo.storeCertification.labAddress}
                            </span>
                          </div>
                        )}
                        
                        {businessInfo.storeCertification.labWebsite && (
                          <a 
                            href={businessInfo.storeCertification.labWebsite}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 hover:underline"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Visit Lab Website
                          </a>
                        )}
                      </div>
                      
                      <div className="mt-4 flex items-center gap-2 bg-emerald-100 dark:bg-emerald-800/30 px-3 py-2 rounded-lg inline-flex">
                        <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                          All our gemstones are certified authentic
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Contact Information */}
          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-luxury-charcoal dark:text-luxury-pearl mb-4">
              Contact Information
            </h2>
            <div className="space-y-3">
              {businessInfo?.contact?.phone && (
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-luxury-gold" />
                  <a 
                    href={`tel:${businessInfo.contact.phone}`}
                    className="text-sm md:text-base text-gray-700 dark:text-gray-300 hover:text-luxury-gold"
                  >
                    {businessInfo.contact.phone}
                  </a>
                </div>
              )}
              
              {businessInfo?.contact?.email && (
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-luxury-gold" />
                  <a 
                    href={`mailto:${businessInfo.contact.email}`}
                    className="text-sm md:text-base text-gray-700 dark:text-gray-300 hover:text-luxury-gold"
                  >
                    {businessInfo.contact.email}
                  </a>
                </div>
              )}

              {businessInfo?.address?.fullAddress && (
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-luxury-gold mt-0.5" />
                  <div className="text-sm md:text-base text-gray-700 dark:text-gray-300">
                    {businessInfo.address.fullAddress}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 