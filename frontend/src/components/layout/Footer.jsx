import { useBusinessContext } from '../../context/BusinessContext';
import Logo from '../common/Logo';

const Footer = () => {
  const { businessInfo } = useBusinessContext();

  return (
    <footer className="bg-luxury-charcoal dark:bg-luxury-charcoal text-luxury-pearl">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-2 md:py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
          
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start mb-1 md:mb-2">
              <Logo size="small" />
            </div>
            <p className="text-luxury-pearl/70 text-xs leading-relaxed mb-1 md:mb-2">
              Kohinoor Gemstone – Trusted by tradition, chosen for quality. Serving from Shahabad Deewan Khana, Bareilly (UP) for two generations.
            </p>
            <div className="text-xs text-luxury-pearl/60">
              <p>© {new Date().getFullYear()} {businessInfo?.heritage?.foundedYear ? `• Est. ${businessInfo.heritage.foundedYear}` : ''} • Family Owned • Certified Authentic</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h3 className="font-medium text-luxury-pearl mb-1 text-xs md:text-sm">
              Contact Us
            </h3>
            <div className="space-y-1">
              {/* Contact Info Line */}
              <div className="text-xs md:text-sm text-luxury-pearl/70">
                {businessInfo?.contact?.phone && (
                  <a 
                    href={`tel:${businessInfo.contact.phone}`}
                    className="hover:text-luxury-gold transition-colors duration-200"
                  >
                    {businessInfo.contact.phone}
                  </a>
                )}
                {businessInfo?.contact?.phone && businessInfo?.contact?.email && (
                  <span className="mx-2">•</span>
                )}
                {businessInfo?.contact?.email && (
                  <a 
                    href={`mailto:${businessInfo.contact.email}`}
                    className="hover:text-luxury-gold transition-colors duration-200"
                  >
                    {businessInfo.contact.email}
                  </a>
                )}
              </div>
              
              {/* Business Hours Line */}
              {(businessInfo?.contact?.hours || businessInfo?.businessHours) && (
                <div className="text-xs md:text-sm text-luxury-pearl/70">
                  {businessInfo?.contact?.hours ? (
                    businessInfo.contact.hours
                  ) : businessInfo?.businessHours ? (
                    <>
                      {!businessInfo.businessHours.monday?.closed && businessInfo.businessHours.monday?.open ? (
                        `Mon-Fri: ${businessInfo.businessHours.monday.open} - ${businessInfo.businessHours.monday.close}`
                      ) : (
                        'Mon-Fri: 10:00 AM - 8:00 PM'
                      )}
                      <span className="mx-2">•</span>
                      {!businessInfo.businessHours.saturday?.closed && businessInfo.businessHours.saturday?.open ? (
                        `Sat: ${businessInfo.businessHours.saturday.open} - ${businessInfo.businessHours.saturday.close}`
                      ) : (
                        'Sat: 10:00 AM - 8:00 PM'
                      )}
                      <span className="mx-2">•</span>
                      {businessInfo.businessHours.sunday?.closed ? (
                        'Sun: Closed'
                      ) : businessInfo.businessHours.sunday?.open ? (
                        `Sun: ${businessInfo.businessHours.sunday.open} - ${businessInfo.businessHours.sunday.close}`
                      ) : (
                        'Sun: Closed'
                      )}
                    </>
                  ) : (
                    'Mon-Sat: 10:00 AM - 8:00 PM'
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 