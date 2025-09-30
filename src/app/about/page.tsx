export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About 1/2 Drinks
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're passionate about creating unique, healthy beverages that bring joy to every sip.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-lg text-gray-600 mb-6">
              Founded in 2024, 1/2 Drinks was born from a simple idea: what if we could create 
              beverages that are not only delicious but also visually stunning? Our signature 
              two-tone drinks combine the best of both worlds - health and artistry.
            </p>
            <p className="text-lg text-gray-600">
              Every drink is handcrafted with love, using only the finest organic ingredients. 
              We believe that healthy doesn't have to mean boring, and beautiful doesn't have 
              to mean unhealthy.
            </p>
          </div>
          
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-6">
              To revolutionize the beverage industry by creating drinks that are as beautiful 
              as they are nutritious. We're committed to sustainability, quality, and innovation 
              in every bottle we create.
            </p>
            <p className="text-lg text-gray-600">
              Our custom drink builder allows you to create your perfect combination, 
              ensuring every sip is exactly what you want it to be.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Organic & Natural</h3>
              <p className="text-gray-600">
                We use only the finest organic ingredients, sourced from trusted suppliers.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">♻️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Sustainable</h3>
              <p className="text-gray-600">
                Committed to eco-friendly practices and sustainable packaging solutions.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Innovation</h3>
              <p className="text-gray-600">
                Constantly pushing boundaries to create new and exciting flavor combinations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
