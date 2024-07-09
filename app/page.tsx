'use client'

import Image from 'next/image'
import { Input } from '@/components/UI/input'
import { Button } from '@/components/UI/button'
import Navbar from '@/components/UI/navbar'
import HeroImage from '@/app/assets/iphone-mock-up.svg'

interface CardProps {
  title: any;
  description: any;
}

const FeatureCard: React.FC<CardProps> = ({ title, description }) => (
  <div className="mb-10 transition-all duration-300 ease-in-out">
    <span className="font-semibold text-[21px] text-gray-700 leading-6">{title}</span>
    <p className="font-normal text-sm text-gray-500">{description}</p>
  </div>
)

const SolutionCard: React.FC<CardProps> = ({ title, description }) => (
  <div className="rounded-[19.31px] mt-10 transition-all duration-300 ease-in-out hover:scale-105 bg-[#e6e8f4] p-10 max-w-[360px] shadow-sm border-[0.5px] border-[#680b78a0]">
    <span className="text-gray-700 font-bold text-[28px]">{title}</span>
    <p className="text-gray-500 text-lg leading-7 w-[70%]">{description}</p>
  </div>
)

const TrustMetric: React.FC<{ value: string; label: string }> = ({ value, label }) => (
  <div className="flex flex-col items-center p-6 mt-10 rounded-lg shadow-sm transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
    <span className="text-4xl font-bold text-[#050038] mb-2">{value}</span>
    <p className="text-gray-600 text-center">{label}</p>
  </div>
)

export default function Home() {
  return (
    <main className="flex flex-col">
        <Navbar />
        <HeroSection />
        <SolutionsSection />
        <CompanyTrustSection />
        <Footer />
    </main>
  )
}

const HeroSection: React.FC = () => (
  <section className="h-auto w-screen py-10 flex justify-center items-center bg-[#e6e8f4] md:pl-[100px] px-[20px] font-raleway">
    <div className="flex flex-col md:w-1/2">
      <h1 className="text-[48px] font-bold text-[#050038]">Easy Pay<br/>Easy Credit</h1>
      <p className="text-lg mt-6 font-normal text-[#050038] leading-6">
        Send money around the world easily <br/>using just your email address
      </p>
      <div className="mt-6 flex flex-col gap-y-4 w-4/5">
        <Input placeholder="Enter your email address" />
        <Button className="mt-2" type="submit">Sign up</Button>
      </div>
    </div>
    <div className="flex w-1/2 gap-10">
      <div className="flex flex-col justify-around items-start">
        <FeatureCard 
          title="Send Money" 
          description="Send money across to your family using email address" 
        />
        <FeatureCard 
          title="Get Paid" 
          description="Receive money from across people easily" 
        />
      </div>
      <div className="h-5/6">
        <Image 
          alt="heroimage" 
          src={HeroImage} 
          className="transform -ml-5 rotate-[10deg] translate-x-4 max-h-[500px]"
        />
      </div>
      <div className="flex flex-col justify-around">
        <FeatureCard 
          title="PayU" 
          description="Pay for services easily across board" 
        />
        <FeatureCard 
          title="Other Services" 
          description="Perform an array of payment services using our platform" 
        />
      </div>
    </div>
  </section>
)

const SolutionsSection: React.FC = () => (
  <section className="flex flex-col w-full justify-center items-center mt-6">
    <h1 className="text-[48px] font-bold text-[#050038]">One Product, Multiple Solutions</h1>
    <div className="flex  flex-col lg:flex-row gap-3 mt-6">
      <SolutionCard 
        title="Pay Globally" 
        description="Send money globally in different countries around the world" 
      />
      <SolutionCard 
        title="Pay in different currencies" 
        description="Send money to people in different currencies" 
      />
      <SolutionCard 
        title="Via email only" 
        description="Send via email to different parts of the world" 
      />
    </div>
  </section>
)

const CompanyTrustSection: React.FC = () => (
  <section className="w-full bg-[#e6e8f4] py-16 px-4 md:px-20 mt-20">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold text-[#050038] text-center mb-12">Why Companies Trust Micela</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <TrustMetric value="99.9%" label="Uptime Reliability" />
        <TrustMetric value="$10B+" label="Transactions Processed" />
        <TrustMetric value="50+" label="Countries Served" />
        <TrustMetric value="24/7" label="Customer Support" />
        <TrustMetric value="45M " label="Users around the world" />
        <TrustMetric value="Over 100" label="Integrations provided" />
      </div>
      <div className="mt-16 text-center">
        <p className="text-xl text-gray-700 mb-8">
          Trusted by leading companies worldwide for secure, efficient, and innovative payment solutions.
        </p>
      </div>
    </div>
  </section>
)

const Footer: React.FC = () => (
  <footer className="bg-gradient-to-r from-[#050038] to-[#030022] text-white py-12 px-4 md:px-20">
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
      <div className="col-span-1 md:col-span-2">
        <h3 className="text-2xl font-bold mb-4">Micela</h3>
        <p className="text-gray-300 mb-4">Easy Pay, Easy Credit. Simplifying global transactions.</p>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-blue-400 transition-colors duration-300">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
          </a>
        </div>
      </div>
      <div>
        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
        <ul className="space-y-2">
          <li><a href="#" className="hover:text-blue-400 transition-colors duration-300">About Us</a></li>
          <li><a href="#" className="hover:text-blue-400 transition-colors duration-300">Services</a></li>
          <li><a href="#" className="hover:text-blue-400 transition-colors duration-300">Contact</a></li>
        </ul>
      </div>
      <div>
        <h4 className="text-lg font-semibold mb-4">Legal</h4>
        <ul className="space-y-2">
          <li><a href="#" className="hover:text-blue-400 transition-colors duration-300">Privacy Policy</a></li>
          <li><a href="#" className="hover:text-blue-400 transition-colors duration-300">Terms of Service</a></li>
        </ul>
      </div>
    </div>
    <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
      <p>&copy; 2024 Micela. All rights reserved.</p>
    </div>
  </footer>
)