import Link from "next/link";
import { ArrowRight, BookOpen, Users, MessageCircle, Zap, Star, Trophy, Globe } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-3xl"></div>
        <div className="relative container mx-auto px-6 py-20 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            {/* Logo/Brand */}
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-6 shadow-lg">
                <BookOpen className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
                PostIt
              </h1>
            </div>

            {/* Hero Content */}
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Share Your Stories with the 
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> World</span>
            </h2>
            
            <p className="text-xl lg:text-2xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
              Join thousands of writers, creators, and thinkers sharing their ideas, experiences, and knowledge in our vibrant community.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Link 
                href="/posts"
                className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <span>Explore Posts</span>
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              
              <Link 
                href="/posts/create"
                className="group inline-flex items-center px-8 py-4 bg-white text-gray-700 text-lg font-semibold rounded-2xl border-2 border-gray-200 hover:border-blue-300 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <span>Start Writing</span>
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
                <div className="text-gray-600">Posts Published</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">5K+</div>
                <div className="text-gray-600">Active Writers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">50K+</div>
                <div className="text-gray-600">Readers Daily</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-6">Why Choose PostIT?</h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to share your thoughts and connect with like-minded people
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="group text-center p-6 rounded-2xl hover:bg-blue-50 transition-all duration-200">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                <Zap className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Lightning Fast</h4>
              <p className="text-gray-600">Blazing fast performance with instant loading and smooth interactions</p>
            </div>

            {/* Feature 2 */}
            <div className="group text-center p-6 rounded-2xl hover:bg-purple-50 transition-all duration-200">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Vibrant Community</h4>
              <p className="text-gray-600">Connect with passionate writers and readers from around the globe</p>
            </div>

            {/* Feature 3 */}
            <div className="group text-center p-6 rounded-2xl hover:bg-green-50 transition-all duration-200">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                <MessageCircle className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Rich Discussions</h4>
              <p className="text-gray-600">Engage in meaningful conversations through comments and interactions</p>
            </div>

            {/* Feature 4 */}
            <div className="group text-center p-6 rounded-2xl hover:bg-yellow-50 transition-all duration-200">
              <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Quality Content</h4>
              <p className="text-gray-600">Discover high-quality posts curated by our amazing community</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <Trophy className="h-16 w-16 text-white mx-auto mb-6" />
            <h3 className="text-4xl font-bold text-white mb-6">Ready to Share Your Story?</h3>
            <p className="text-xl text-blue-100 mb-10">
              Join thousands of creators who have already made PostIT their home for sharing ideas and building connections.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link 
                href="/posts"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 text-lg font-semibold rounded-2xl hover:bg-gray-50 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                <Globe className="mr-3 h-5 w-5" />
                Discover Posts
              </Link>
              <Link 
                href="/signup"
                className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white text-lg font-semibold rounded-2xl hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-200"
              >
                <Users className="mr-3 h-5 w-5" />
                Join Community
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center mb-6">
            <BookOpen className="h-8 w-8 text-blue-400 mr-3" />
            <span className="text-2xl font-bold text-white">PostIT</span>
          </div>
          <p className="text-gray-400 mb-6">
            Empowering voices, connecting minds, building community.
          </p>
          <div className="flex justify-center space-x-8 mb-6">
            <Link href="/posts" className="text-gray-400 hover:text-white transition-colors">
              Explore
            </Link>
            <Link href="/posts/create" className="text-gray-400 hover:text-white transition-colors">
              Write
            </Link>
            <Link href="/signin" className="text-gray-400 hover:text-white transition-colors">
              Sign In
            </Link>
            <Link href="/signup" className="text-gray-400 hover:text-white transition-colors">
              Join
            </Link>
          </div>
          <div className="border-t border-gray-800 pt-6">
          </div>
        </div>
      </footer>
    </div>
  );
}
