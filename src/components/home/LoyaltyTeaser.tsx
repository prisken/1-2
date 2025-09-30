import Link from 'next/link'
import { 
  GiftIcon, 
  StarIcon, 
  ShareIcon, 
  HeartIcon 
} from '@heroicons/react/24/outline'

const loyaltyFeatures = [
  {
    icon: StarIcon,
    title: 'Earn Points',
    description: 'Get 1 point for every $1 spent on your favorite drinks',
    color: 'text-yellow-500'
  },
  {
    icon: GiftIcon,
    title: 'Redeem Rewards',
    description: 'Use points for discounts, free drinks, and exclusive items',
    color: 'text-green-500'
  },
  {
    icon: ShareIcon,
    title: 'Refer Friends',
    description: 'Earn bonus points when friends join and make their first purchase',
    color: 'text-blue-500'
  },
  {
    icon: HeartIcon,
    title: 'VIP Benefits',
    description: 'Unlock exclusive perks, early access, and special events',
    color: 'text-purple-500'
  }
]

export default function LoyaltyTeaser() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Join Our Loyalty Program
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Earn points with every purchase and unlock amazing rewards. 
            The more you drink, the more you save!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {loyaltyFeatures.map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className={`w-16 h-16 ${feature.color} bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <feature.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-center text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Start Earning?
          </h3>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of happy customers who are already earning rewards 
            with every delicious sip.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/loyalty"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-100 transition-colors"
            >
              Learn More
            </Link>
            <Link
              href="/auth/register"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-blue-600 transition-colors"
            >
              Sign Up Now
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 pt-8 border-t border-white/20">
            <div>
              <div className="text-3xl font-bold mb-1">10K+</div>
              <div className="text-blue-100">Active Members</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">$50K+</div>
              <div className="text-blue-100">Rewards Redeemed</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">4.9★</div>
              <div className="text-blue-100">Member Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


