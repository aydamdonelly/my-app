import React, { useState, useEffect } from 'react';
import { FaInstagram, FaTwitter, FaYoutube, FaLinkedin, FaEnvelope, FaFacebook, FaHeart, FaMedkit, FaGoogle } from 'react-icons/fa';
import { ref, onValue, set, get } from "firebase/database";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { db, auth, googleProvider } from './firebaseConfig';
import './App.css';

function App() {
  const [showCV, setShowCV] = useState(false);
  const [showNX, setShowNX] = useState(false);
  const [supportCount, setSupportCount] = useState(0);
  const [firstAidCount, setFirstAidCount] = useState(0);
  const [user, setUser] = useState(null);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasLikedFirstAid, setHasLikedFirstAid] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [pendingVoteType, setPendingVoteType] = useState(null);
  const [loadingVote, setLoadingVote] = useState(false);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      
      // If we have a user and a pending vote, process it
      if (currentUser && pendingVoteType) {
        if (pendingVoteType === 'gender') {
          processVote('gender');
        } else if (pendingVoteType === 'firstAid') {
          processVote('firstAid');
        }
        setPendingVoteType(null);
      }
    });

    return () => unsubscribe();
  }, [pendingVoteType]);

  // Subscribe to the like counts from Firebase and check user votes
  useEffect(() => {
    // Gender Medicine support count
    const countRef = ref(db, 'supportLikes');
    onValue(countRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        setSupportCount(data);
      }
    });

    // First Aid support count
    const firstAidRef = ref(db, 'firstAidLikes');
    onValue(firstAidRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        setFirstAidCount(data);
      }
    });

    // Check if user has already voted
    checkUserVotes();
  }, [user]);

  // Check if user has already voted on either button
  const checkUserVotes = async () => {
    if (user) {
      // Check gender medicine vote
      const genderVoteRef = ref(db, `userVotes/gender/${user.uid}`);
      const genderSnapshot = await get(genderVoteRef);
      setHasLiked(genderSnapshot.exists());

      // Check first aid vote
      const firstAidVoteRef = ref(db, `userVotes/firstAid/${user.uid}`);
      const firstAidSnapshot = await get(firstAidVoteRef);
      setHasLikedFirstAid(firstAidSnapshot.exists());
    } else {
      setHasLiked(false);
      setHasLikedFirstAid(false);
    }
  };

  // Handle login
  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setShowLoginModal(false);
    } catch (error) {
      console.error("Error signing in with Google", error);
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

  // Process the vote after successful authentication
  const processVote = async (voteType) => {
    if (!user || loadingVote) return;
    
    setLoadingVote(true);
    
    try {
      if (voteType === 'gender' && !hasLiked) {
        // Increment gender medicine counter
        const newCount = supportCount + 1;
        const countRef = ref(db, 'supportLikes');
        await set(countRef, newCount);
        
        // Record user's vote
        const userVoteRef = ref(db, `userVotes/gender/${user.uid}`);
        await set(userVoteRef, {
          email: user.email,
          timestamp: Date.now()
        });
        
        setHasLiked(true);
      } else if (voteType === 'firstAid' && !hasLikedFirstAid) {
        // Increment first aid counter
        const newCount = firstAidCount + 1;
        const countRef = ref(db, 'firstAidLikes');
        await set(countRef, newCount);
        
        // Record user's vote
        const userVoteRef = ref(db, `userVotes/firstAid/${user.uid}`);
        await set(userVoteRef, {
          email: user.email,
          timestamp: Date.now()
        });
        
        setHasLikedFirstAid(true);
      }
    } catch (error) {
      console.error("Error processing vote", error);
    } finally {
      setLoadingVote(false);
    }
  };

  // Handle like button click
  const handleLike = (voteType) => {
    if (!user) {
      // If not logged in, show login modal and set pending vote
      setPendingVoteType(voteType);
      setShowLoginModal(true);
      return;
    }
    
    // If already logged in, process the vote directly
    processVote(voteType);
  };

  const toggleCV = () => {
    setShowCV(!showCV);
  };

  const toggleNX = () => {
    setShowNX(!showNX);
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
        <a href="#" onClick={(e) => { e.preventDefault(); toggleNX(); }} className="nx-button">
          NX
        </a>
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

      {/* NX Modal */}
      {showNX && (
        <div className="nx-modal">
          <div className="nx-modal-content">
            <button className="nx-close-button" onClick={toggleNX}>Close</button>
            <h2>NovaX – The Shape of Futurism.</h2>
            <p>
              NovaX is dedicated to shaping the future. The mission is to redefine the boundaries of technology, medicine, and science while developing groundbreaking solutions.
            </p>
            
            <h3>Vision</h3>
            <p>
              By developing innovative products and concepts, NovaX lays the foundation for a new era of progress. Technological advancements enable a more efficient, healthier, and sustainable future, where the boundaries between humans, technology, and the environment continue to merge.
            </p>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="login-modal">
          <div className="login-modal-content">
            <h2>Authentication Required</h2>
            <p>Please log in with your Google account to verify your support. Your vote will be counted once after authentication.</p>
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

export default App;