import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const About = () => {
  const navigate = useNavigate();

  const handleBookAppointment = () => {
    navigate('/doctors');
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-cyan-500 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <div>
              <span className="inline-block bg-white bg-opacity-20 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                About PulsePoint
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              Transforming Healthcare Access Through Technology
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              At PulsePoint, we believe that quality healthcare should be accessible to everyone,
              anytime, anywhere. Our mission is to bridge the gap between patients and healthcare
              professionals through innovative technology.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-6">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-2">Our Story</h2>
                <div className="w-16 h-1 bg-blue-600 rounded-full"></div>
              </div>

              <div className="space-y-4 text-gray-700 leading-relaxed">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">The Problem We Saw</h3>
                  <p>
                    For years, people struggled with one of the most basic aspects of healthcare:
                    booking an appointment with a doctor. Long waiting times, complicated processes,
                    limited doctor availability information, and the frustration of not knowing when
                    they could see a specialist became the norm. Whether it was a minor health concern
                    or a specialized need, patients found themselves trapped in a system that prioritized
                    inconvenience over care.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Solution</h3>
                  <p>
                    We founded PulsePoint with a simple yet powerful idea: what if booking a doctor's
                    appointment was as easy as ordering food online? Our team of healthcare professionals
                    and tech enthusiasts came together to build a digital platform that removes all the
                    barriers. Today, PulsePoint empowers patients to find qualified doctors, check real-time
                    availability, and book appointments in just a few clicks. We've transformed what used
                    to take days into what now takes seconds.
                  </p>
                </div>

                <p className="pt-4 text-blue-600 font-semibold italic">
                  "Healthcare should work for people, not the other way around."
                </p>
              </div>
            </div>

            {/* Visual Element */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl p-8 shadow-lg">
                  <div className="text-6xl mb-6 text-center">📱</div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900 mb-2">Patient-Centric Design</p>
                    <p className="text-gray-600">
                      Every feature we build starts with understanding what patients and doctors really need.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Our Mission</h2>
            <div className="w-16 h-1 bg-blue-600 rounded-full mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Make Healthcare Accessible</h3>
              <p className="text-gray-600 leading-relaxed">
                We strive to democratize healthcare access by breaking down geographic, economic,
                and technological barriers. Every person deserves the opportunity to connect with
                quality healthcare providers without unnecessary complications or delays.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition">
              <div className="text-4xl mb-4">⚙️</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Simplify Booking</h3>
              <p className="text-gray-600 leading-relaxed">
                We eliminate the complexity and friction from the appointment booking process.
                Through intuitive design and smart technology, we make it effortless for patients
                to schedule appointments and for doctors to manage their time efficiently.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Vision Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Our Vision</h2>
            <div className="w-16 h-1 bg-blue-600 rounded-full mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 border border-blue-200">
              <div className="text-4xl mb-4">🔗</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Connected Healthcare Ecosystem</h3>
              <p className="text-gray-600 leading-relaxed">
                We envision a future where patients, doctors, and healthcare facilities are seamlessly
                connected through technology. A world where medical history is accessible when needed,
                follow-up care is automated, and healthcare is truly coordinated for better outcomes.
              </p>
            </div>

            <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl p-8 border border-cyan-200">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Seamless Patient-Doctor Interaction</h3>
              <p className="text-gray-600 leading-relaxed">
                Beyond appointments, we're building a platform where patients and doctors can interact
                naturally. Clear communication, transparency, and mutual respect form the foundation of
                every interaction on PulsePoint, creating meaningful healthcare experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Reliability Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Trust & Reliability</h2>
            <div className="w-16 h-1 bg-blue-600 rounded-full mx-auto"></div>
          </div>

          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm">
            <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
              <p>
                At the heart of PulsePoint lies an unwavering commitment to trust and reliability. We
                understand that healthcare is deeply personal, and our users place tremendous faith in us.
                Every day, patients entrust us with their health information, and doctors depend on our
                platform to serve their patients efficiently. This responsibility guides every decision we make.
              </p>

              <p>
                Our platform is built on a foundation of security and data protection. We employ industry-leading
                encryption technologies and comply with the strictest healthcare data regulations to ensure that
                your information is protected with the highest standards of confidentiality. Your privacy is never
                compromised, and your medical information is treated with the utmost care.
              </p>

              <p>
                Reliability is not just a feature—it's a promise. Our infrastructure is designed to ensure 99.9%
                uptime, because we know that a missed appointment due to technical failure is unacceptable in
                healthcare. We invest continuously in our systems to ensure that when you need us, we're there.
                Our dedicated support team works tirelessly to address concerns and ensure seamless experiences.
              </p>

              <p>
                Beyond the technology, we're obsessively focused on user experience. Every interface element,
                every notification, every workflow has been thoughtfully designed with you in mind. We listen to
                feedback from thousands of users and doctors, and we continuously refine our platform to better
                serve you. Because ultimately, a reliable platform is one that understands and respects the needs
                of the people who use it.
              </p>
            </div>

            {/* Trust Stats */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                <div>
                  <p className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">100%</p>
                  <p className="text-gray-600">HIPAA Compliant</p>
                </div>
                <div>
                  <p className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">50K+</p>
                  <p className="text-gray-600">Trusted Patient Records</p>
                </div>
                <div>
                  <p className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">24/7</p>
                  <p className="text-gray-600">Security Monitoring</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Our Core Values</h2>
            <div className="w-16 h-1 bg-blue-600 rounded-full mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '❤️', title: 'Empathy', description: 'We understand healthcare is personal' },
              { icon: '🔍', title: 'Transparency', description: 'We believe in honest communication' },
              { icon: '🚀', title: 'Innovation', description: 'We constantly evolve and improve' },
              { icon: '👥', title: 'Community', description: 'We build for people, with people' },
            ].map((value, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 hover:shadow-md transition">
                <div className="text-5xl mb-3">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-cyan-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Experience Better Healthcare?
              </h2>
              <p className="text-lg text-blue-100">
                Join thousands of patients who have already discovered a better way to book doctor appointments.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={handleBookAppointment}
                className="text-base font-semibold"
              >
                Book an Appointment
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/')}
                className="bg-transparent text-white border-white hover:bg-white hover:bg-opacity-10 text-base"
              >
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
