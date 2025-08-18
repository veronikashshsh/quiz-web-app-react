import React from 'react'
import { BookOpen, Twitter, Facebook, Instagram, Mail } from 'lucide-react'

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <BookOpen className="w-8 h-8" />
              <span className="text-2xl font-bold">EFFLearn</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Empowering learners worldwide with effective, structured, and engaging educational experiences.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4 mb-4">
              <Twitter className="w-6 h-6 text-gray-300 hover:text-white cursor-pointer transition-colors" />
              <Facebook className="w-6 h-6 text-gray-300 hover:text-white cursor-pointer transition-colors" />
              <Instagram className="w-6 h-6 text-gray-300 hover:text-white cursor-pointer transition-colors" />
              <Mail className="w-6 h-6 text-gray-300 hover:text-white cursor-pointer transition-colors" />
            </div>
            <p className="text-gray-300 text-sm">
              Subscribe to our newsletter for learning tips and updates.
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-600 pt-8 text-center text-gray-300">
          <p>&copy; 2025 EFFLearn. <br/> All rights reserved. Made with soul and several cups of coffee.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer