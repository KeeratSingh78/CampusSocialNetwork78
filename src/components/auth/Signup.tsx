import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../../../backend/firebase/config';
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../../store/slices/authSlice';

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
  
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
  
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createStars(); // Regenerate stars after resizing
    };
  
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
    let stars: { x: number; y: number; speed: number; size: number }[] = [];
  
    const createStars = () => {
      stars = [];
      for (let i = 0; i < 50; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          speed: Math.random() * 2 + 1,
          size: Math.random() * 2 + 1,
        });
      }
    };
  
    createStars();
  
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
        star.y += star.speed;
  
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });
  
      requestAnimationFrame(animate);
    };
  
    animate();
    window.addEventListener("resize", resizeCanvas);
  
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);
  

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    try {
      dispatch(loginStart());
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      await updateProfile(user, { displayName: name });
      
      dispatch(loginSuccess({
        uid: user.uid,
        email: user.email,
        displayName: name,
        photoURL: user.photoURL
      }));
      
      navigate('/');
    } catch (error: any) {
      dispatch(loginFailure(error.message));
      setError(error.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      dispatch(loginStart());
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      dispatch(loginSuccess({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL
      }));
      
      navigate('/');
    } catch (error: any) {
      dispatch(loginFailure(error.message));
      setError(error.message);
    }
  };

  return (
    <div className="auth-container">
      <canvas ref={canvasRef} className="falling-stars"></canvas>
      <div className="auth-card">
        <div className="auth-logo">
          <FontAwesomeIcon icon={faGraduationCap} size="3x" color="#4267B2" />
          <h1>Campus Connect</h1>
        </div>
        {error && <div className="auth-error">{error}</div>}
        <form className="auth-form" onSubmit={handleEmailSignup}>
          <input type="text" className="auth-input" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="email" className="auth-input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" className="auth-input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <input type="password" className="auth-input" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          <button type="submit" className="auth-button">Sign Up</button>
        </form>
        <div className="auth-divider"><span>or</span></div>
        <div className="social-buttons">
          <button className="google-button" onClick={handleGoogleSignup}>
            <FontAwesomeIcon icon={faGoogle} />
            <span>Continue with Google</span>
          </button>
        </div>
        <div className="auth-footer">
          <p>Already have an account? <Link to="/login">Log In</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
