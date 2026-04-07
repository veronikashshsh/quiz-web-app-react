import React from 'react'
import { Star, Quote } from 'lucide-react'
import { TESTIMONIALS } from '../../../data/landingData'



function Testimonials() {
    return (
        <section id="testimonials" className="py-32 px-4 sm:px-6 lg:px-8 bg-white/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-3xl font-bold text-gray-900 mb-6">
            What Our Learners Say
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Join thousands of successful learners who have transformed their education with EFFLearn.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 relative"
            >
              <Quote className="w-8 h-8 text-blue-200 absolute top-4 right-4" />
              
              <div className="flex items-center mb-6">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <p className="text-gray-700 leading-relaxed">
                "{testimonial.text}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
    )
}

export default Testimonials