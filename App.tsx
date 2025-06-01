import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import InfoSection from './components/InfoSection';
import UserInputForm from './components/UserInputForm';
import RecommendationResults from './components/RecommendationResults';
import { UserProfile, Recommendation } from './types';
import { generateRecommendations } from './utils/recommendationEngine';

function App() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [showForm, setShowForm] = useState(false);
  
  const handleProfileSubmit = (profile: UserProfile) => {
    setUserProfile(profile);
    const generatedRecommendations = generateRecommendations(profile);
    setRecommendations(generatedRecommendations);
  };
  
  const handleReset = () => {
    setUserProfile(null);
    setRecommendations([]);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {!userProfile && !showForm && (
          <>
            <HeroSection />
            <div className="py-12 bg-white">
              <div className="container mx-auto px-4 max-w-6xl text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-8">Start Your Career Journey</h2>
                <button 
                  onClick={() => setShowForm(true)}
                  className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                >
                  Create Your Profile
                </button>
              </div>
            </div>
            <InfoSection />
          </>
        )}
        
        {showForm && !userProfile && (
          <div className="py-12 bg-gray-50">
            <div className="container mx-auto px-4 max-w-6xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Your Career Profile</h2>
              <UserInputForm onSubmit={handleProfileSubmit} />
            </div>
          </div>
        )}
        
        {userProfile && recommendations.length > 0 && (
          <div className="py-12 bg-gray-50">
            <div className="container mx-auto px-4 max-w-6xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Your Personalized Recommendations</h2>
              <RecommendationResults 
                recommendations={recommendations} 
                onReset={handleReset} 
              />
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;