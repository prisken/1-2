import Link from 'next/link'
import Image from 'next/image'

export default function BrandStory() {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Story
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Born from a passion for healthy living and artistic expression, 1/2 Drinks 
              represents the perfect fusion of nutrition and beauty. Our unique two-tone 
              design philosophy reflects the balance we strive for in every aspect of life.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Each drink is handcrafted with premium ingredients, carefully selected for 
              their health benefits and flavor profiles. We believe that healthy choices 
              should be beautiful, delicious, and inspiring.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/about"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors"
              >
                Learn More About Us
              </Link>
              <Link
                href="/custom"
                className="inline-flex items-center px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-full hover:bg-blue-600 hover:text-white transition-colors"
              >
                Create Your Own
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <div className="relative w-full h-full">
                <Image
                  src="/images/brand-story.jpg"
                  alt="Handcrafted drinks being prepared"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            
            {/* Floating Stats */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-lg p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">10K+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
            </div>
            
            <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-lg p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-1">50+</div>
                <div className="text-sm text-gray-600">Unique Flavors</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
