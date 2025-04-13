import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FaInstagram, FaTwitter, FaYoutube, FaLinkedin, FaEnvelope, FaFacebook, FaHeart, FaMedkit, FaGoogle } from 'react-icons/fa';
import { ref, onValue, set, get, increment } from "firebase/database";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { db, auth, googleProvider } from './firebaseConfig';
import './App.css';
import NovaXPage from './NovaXPage';

function MainPage() {
  const [showCV, setShowCV] = useState(false);
  const [supportCount, setSupportCount] = useState(0);
  const [firstAidCount, setFirstAidCount] = useState(0);
  const [verifiedSupportCount, setVerifiedSupportCount] = useState(0);
  const [verifiedFirstAidCount, setVerifiedFirstAidCount] = useState(0);
  const [user, setUser] = useState(null);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasLikedFirstAid, setHasLikedFirstAid] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showVoteOptionsModal, setShowVoteOptionsModal] = useState(false);
  const [pendingVoteType, setPendingVoteType] = useState(null);
  const [loadingVote, setLoadingVote] = useState(false);
  const [newsletterConsent, setNewsletterConsent] = useState(false);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      
      // If we have a user and a pending vote, process it as verified vote
      if (currentUser && pendingVoteType) {
        processVerifiedVote(pendingVoteType, newsletterConsent);
        setPendingVoteType(null);
      }
    });

    return () => unsubscribe();
  }, [pendingVoteType, newsletterConsent]);

  // Subscribe to the like counts from Firebase and check user votes
  useEffect(() => {
    // Total votes counters
    const supportRef = ref(db, 'totalCounts/supportLikes');
    onValue(supportRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        setSupportCount(data);
      }
    });

    const firstAidRef = ref(db, 'totalCounts/firstAidLikes');
    onValue(firstAidRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        setFirstAidCount(data);
      }
    });

    // Verified votes counters
    const verifiedSupportRef = ref(db, 'verifiedCounts/supportLikes');
    onValue(verifiedSupportRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        setVerifiedSupportCount(data);
      }
    });

    const verifiedFirstAidRef = ref(db, 'verifiedCounts/firstAidLikes');
    onValue(verifiedFirstAidRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        setVerifiedFirstAidCount(data);
      }
    });

    // Check if user has already voted
    checkUserVotes();
  }, [user]);

  // Check if user has already voted on either button
  const checkUserVotes = async () => {
    // Check local storage for anonymous votes
    const anonymousGenderVote = localStorage.getItem("anonymousGenderVote") === "true";
    const anonymousFirstAidVote = localStorage.getItem("anonymousFirstAidVote") === "true";
    
    if (user) {
      // Check verified votes if user is logged in
      const genderVoteRef = ref(db, `userVotes/gender/${user.uid}`);
      const genderSnapshot = await get(genderVoteRef);
      
      const firstAidVoteRef = ref(db, `userVotes/firstAid/${user.uid}`);
      const firstAidSnapshot = await get(firstAidVoteRef);
      
      setHasLiked(genderSnapshot.exists() || anonymousGenderVote);
      setHasLikedFirstAid(firstAidSnapshot.exists() || anonymousFirstAidVote);
    } else {
      // Set based on localStorage for anonymous users
      setHasLiked(anonymousGenderVote);
      setHasLikedFirstAid(anonymousFirstAidVote);
    }
  };

  // Handle login
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setShowLoginModal(false);
      return result.user;
    } catch (error) {
      console.error("Error signing in with Google", error);
      return null;
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  // Process anonymous vote
  const processAnonymousVote = async (voteType) => {
    if (loadingVote) return;
    
    setLoadingVote(true);
    
    try {
      // Update the appropriate counter
      if (voteType === 'gender' && !hasLiked) {
        const countRef = ref(db, 'totalCounts/supportLikes');
        await set(countRef, increment(1));
        localStorage.setItem("anonymousGenderVote", "true");
        setHasLiked(true);
      } else if (voteType === 'firstAid' && !hasLikedFirstAid) {
        const countRef = ref(db, 'totalCounts/firstAidLikes');
        await set(countRef, increment(1));
        localStorage.setItem("anonymousFirstAidVote", "true");
        setHasLikedFirstAid(true);
      }
    } catch (error) {
      console.error("Error processing anonymous vote", error);
    } finally {
      setLoadingVote(false);
      setShowVoteOptionsModal(false);
    }
  };

  // Process verified vote with Google auth
  const processVerifiedVote = async (voteType, subscribeToNewsletter) => {
    if (!user || loadingVote) return;
    
    setLoadingVote(true);
    
    try {
      if (voteType === 'gender' && !hasLiked) {
        // Update total counter
        const totalCountRef = ref(db, 'totalCounts/supportLikes');
        await set(totalCountRef, increment(1));
        
        // Update verified counter
        const verifiedCountRef = ref(db, 'verifiedCounts/supportLikes');
        await set(verifiedCountRef, increment(1));
        
        // Record user's vote
        const userVoteRef = ref(db, `userVotes/gender/${user.uid}`);
        await set(userVoteRef, {
          email: user.email,
          timestamp: Date.now(),
          newsletter: subscribeToNewsletter
        });
        
        // If user wants newsletter, add to newsletter list
        if (subscribeToNewsletter) {
          const newsletterRef = ref(db, `newsletter/${user.uid}`);
          await set(newsletterRef, {
            email: user.email,
            timestamp: Date.now()
          });
        }
        
        setHasLiked(true);
      } else if (voteType === 'firstAid' && !hasLikedFirstAid) {
        // Update total counter
        const totalCountRef = ref(db, 'totalCounts/firstAidLikes');
        await set(totalCountRef, increment(1));
        
        // Update verified counter
        const verifiedCountRef = ref(db, 'verifiedCounts/firstAidLikes');
        await set(verifiedCountRef, increment(1));
        
        // Record user's vote
        const userVoteRef = ref(db, `userVotes/firstAid/${user.uid}`);
        await set(userVoteRef, {
          email: user.email,
          timestamp: Date.now(),
          newsletter: subscribeToNewsletter
        });
        
        // If user wants newsletter, add to newsletter list
        if (subscribeToNewsletter) {
          const newsletterRef = ref(db, `newsletter/${user.uid}`);
          await set(newsletterRef, {
            email: user.email,
            timestamp: Date.now()
          });
        }
        
        setHasLikedFirstAid(true);
      }
    } catch (error) {
      console.error("Error processing verified vote", error);
    } finally {
      setLoadingVote(false);
      setShowVoteOptionsModal(false);
    }
  };

  // Handle like button click
  const handleLike = (voteType) => {
    // Set pending vote type and show options modal
    setPendingVoteType(voteType);
    setShowVoteOptionsModal(true);
  };

  const handleVerifiedVote = async () => {
    setShowVoteOptionsModal(false);
    
    // If user is already logged in, process vote directly
    if (user) {
      processVerifiedVote(pendingVoteType, newsletterConsent);
    } else {
      // Show login modal
      setShowLoginModal(true);
    }
  };

  const toggleCV = () => {
    setShowCV(!showCV);
  };

  return (
    <div className="app">
      {/* Support Buttons */}
      <div className="support-button-wrapper">
        <button 
          className="support-button" 
          onClick={() => handleLike('gender')} 
          disabled={hasLiked || loadingVote}
        >
          <FaHeart />
          I SUPPORT GENDER MEDICINE
          <span>({supportCount})</span>
        </button>
        <button 
          className="first-aid-button" 
          onClick={() => handleLike('firstAid')} 
          disabled={hasLikedFirstAid || loadingVote}
        >
          <FaMedkit />
          I SUPPORT FIRST AID
          <span>({firstAidCount})</span>
        </button>
        
        {user && (
          <div className="user-info">
            <p>Logged in as: {user.email}</p>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Left Social Sidebar */}
      <div className="social-sidebar">
        <a href="https://www.instagram.com/dr.baharnalbant/" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
        <a href="https://x.com/BaNalbant" target="_blank" rel="noopener noreferrer">
          <FaTwitter />
        </a>
        <a href="https://facebook.com/people/Bahar-Nalbant/pfbid02kYgPc93C8bT6MASAjs8yJjPakBDs32TdUxb3q3odViX16zxFGZ6CtDuYGsMk2Ag6l/" target="_blank" rel="noopener noreferrer">
          <FaFacebook />
        </a>
        <a href="https://www.linkedin.com/in/dr-med-bahar-nalbant-ba7a0614b/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin />
        </a>
        <a href="mailto:dr.med.baharnalbant@gmail.com">
          <FaEnvelope />
        </a>
        <Link to="/novax" className="nx-button">
          NX
        </Link>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="logo">BN</div>
        <div className="contact-info">
          <p className="name">Dr. med. Bahar Nalbant</p>
          <p className="email">
            Email: <a href="mailto:dr.med.baharnalbant@gmail.com">dr.med.baharnalbant@gmail.com</a>
          </p>
          <div className="social-links-bottom">
            <a href="https://www.instagram.com/dr.baharnalbant/" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://x.com/BaNalbant" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="https://facebook.com/people/Bahar-Nalbant/pfbid02kYgPc93C8bT6MASAjs8yJjPakBDs32TdUxb3q3odViX16zxFGZ6CtDuYGsMk2Ag6l/" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
            <a href="https://www.linkedin.com/in/dr-med-bahar-nalbant-ba7a0614b/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
            <a href="mailto:dr.med.baharnalbant@gmail.com">
              <FaEnvelope />
            </a>
          </div>
          <button className="cv-button" onClick={toggleCV}>View CV</button>
        </div>
      </div>

      {/* CV Modal */}
      {showCV && (
        <div className="cv-modal">
          <div className="cv-modal-content">
            <button className="cv-close-button" onClick={toggleCV}>Close</button>
            <h2>Curriculum Vitae</h2>
            <p><strong>Dr. med. Bahar Nalbant</strong></p>
            
            <h3>Professional Career</h3>
            <p>
              Physician for Internal Medicine at Hannover Medical School, including rotations in Cardiology, Nephrology, Gastroenterology, Central Emergency Department and Intensive Care Unit
            </p>
            <p>
              Founder of NovaX
            </p>
            <p>
              Founder of the Gender Medicine Initiative
            </p>
            <p>
              Founder of the Initiative Vita – First Aid: Be Ready, Save Lives
            </p>
            <p>
              Licensed in Emergency Medicine
            </p>
            <p>
              ACLS-Instructor / ITLS-Instructor
            </p>
            <p>
              Medical Consulting
            </p>
            <p>
              LÖSEV Germany Healthcare Advisory
            </p>
            
            <h3>Additional Training</h3>
            <p>
              Antibiotic Stewardship Certificate<br />
              Good Clinical Practice (GCP) Training
            </p>
            
            <h3>Academic Training</h3>
            <p>
              Doctorate (Dr. med) from Hannover Medical School<br />
              2014-2020: Study of Human Medicine at Hannover Medical School (Grade: 1)<br />
              2020: General university entrance qualification (Gymnasium Leibnizschool Hannover, Grade: 1.3)
            </p>
            
            <h3>Teaching</h3>
            <p>
              University teaching in Human Medicine at the Center for Internal Medicine, (clinical examination courses, PJ lessons, clinical teaching visits and involved in SOP elaborations, project planning and clinical scholarship supervision
            </p>
            
            <h3>Scientific Activity</h3>
            <p>
              Member of the Working Group Translational Intensive Care Medicine Germany (Hannover) and Switzerland (Zürich) - Medical research, particularly in acute and intensive care medicine with an internal medicine focus
            </p>
            
            <h3>Accolades &amp; Memberships</h3>
            <p>
              2014-2020: Scholarship holder of the German Academic Scholarship Foundation - Studienstiftung des Deutschen Volkes (high IQ society)
            </p>
            <p>
              Alumna of the German Academic Scholarship Foundation (Studienstiftung des Deutschen Volkes)
            </p>
            <p>
              Member of the Selection Committee of the German Academic Scholarship Foundation (Studienstiftung des Deutschen Volkes)
            </p>
          </div>
        </div>
      )}

      {/* Vote Options Modal */}
      {showVoteOptionsModal && (
        <div className="vote-options-modal">
          <div className="vote-options-modal-content">
            <h2>Vote Options</h2>
            <p>How would you like to cast your vote?</p>
            
            <div className="vote-options">
              <div className="vote-option">
                <h3>Verified Vote</h3>
                <p>Your vote will count for project funding initiatives and will be verified with your Google account.</p>
                
                {user ? (
                  <div className="newsletter-option">
                    <label>
                      <input 
                        type="checkbox" 
                        checked={newsletterConsent}
                        onChange={(e) => setNewsletterConsent(e.target.checked)}
                      />
                      I'd like to receive email updates about future initiatives
                    </label>
                  </div>
                ) : null}
                
                <button 
                  className="verified-vote-button" 
                  onClick={handleVerifiedVote}
                >
                  {user ? "Submit Verified Vote" : "Sign in with Google & Vote"}
                </button>
              </div>
              
              <div className="vote-option-divider">
                <span>OR</span>
              </div>
              
              <div className="vote-option">
                <h3>Anonymous Vote</h3>
                <p>Your vote will be counted in the total but will not be verified for project funding purposes.</p>
                <button 
                  className="anonymous-vote-button" 
                  onClick={() => processAnonymousVote(pendingVoteType)}
                >
                  Vote Anonymously
                </button>
              </div>
            </div>
            
            <button 
              className="vote-options-cancel-button" 
              onClick={() => {
                setShowVoteOptionsModal(false);
                setPendingVoteType(null);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="login-modal">
          <div className="login-modal-content">
            <h2>Sign in to Verify Your Vote</h2>
            <p>Please log in with your Google account to verify your support. Your vote will be counted as verified once you're authenticated.</p>
            
            <div className="newsletter-option">
              <label>
                <input 
                  type="checkbox" 
                  checked={newsletterConsent}
                  onChange={(e) => setNewsletterConsent(e.target.checked)}
                />
                I'd like to receive email updates about future initiatives
              </label>
            </div>
            
            <button className="google-login-button" onClick={handleLogin}>
              <FaGoogle /> Sign in with Google
            </button>
            <button className="login-cancel-button" onClick={() => {
              setShowLoginModal(false);
              setPendingVoteType(null);
            }}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/novax" element={<NovaXPage />} />
      </Routes>
    </Router>
  );
}

export default App;