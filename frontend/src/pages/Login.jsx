import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const [isSignup, setIsSignup] = useState(false)
  const navigate = useNavigate()
  const goHome = () => navigate('/home')

  return (
    <section className="auth-page">
      <div className="auth-decoration" aria-hidden="true">
        <span className="auth-orbit auth-orbit-one" />
        <span className="auth-orbit auth-orbit-two" />
        <span className="auth-spark">✦</span>
        <div className="auth-promo">
          <span className="auth-eyebrow">CAMPUSKART COMMUNITY</span>
          <h1>E-commerce.<br />platform for students.</h1>
          <p>Everything you need for student life, all in one place.</p>
          <div className="auth-promo-note"><span>✳</span> Your campus, your marketplace</div>
        </div>
      </div>

      <div className="auth-side">
        <div className="auth-card">
          <Link to="/home" className="auth-brand">Campus<span>Kart</span><i>✦</i></Link>
          <div className="auth-heading">
            <p className="auth-kicker">WELCOME {isSignup ? 'ABOARD' : 'BACK'}</p>
            <h2>{isSignup ? 'Create your account' : 'Sign in to your account'}</h2>
            <p>{isSignup ? 'Join your campus community today.' : 'Your next great find is just around the corner.'}</p>
          </div>

          <div className="auth-tabs" role="tablist" aria-label="Account type">
            <button type="button" role="tab" aria-selected={!isSignup} className={!isSignup ? 'selected' : ''} onClick={() => setIsSignup(false)}>Sign in</button>
            <button type="button" role="tab" aria-selected={isSignup} className={isSignup ? 'selected' : ''} onClick={() => setIsSignup(true)}>Create account</button>
          </div>

          <form className="auth-form" onSubmit={(event) => { event.preventDefault(); goHome() }}>
            {isSignup && <label>Full name<input type="text" placeholder="Your name" onFocus={goHome} onChange={goHome} /></label>}
            <label>Email address<input type="email" placeholder="you@college.edu" onFocus={goHome} onChange={goHome} /></label>
            <label>Password<input type="password" placeholder="Enter your password" onFocus={goHome} onChange={goHome} /></label>
            {!isSignup && <div className="auth-options"><label className="auth-check"><input type="checkbox" onChange={goHome} /> Remember me</label><button type="button" className="auth-text-button" onClick={goHome}>Forgot password?</button></div>}
            <button className="btn btn-primary btn-block auth-submit" type="submit">{isSignup ? 'Create account' : 'Sign in'} <span>→</span></button>
          </form>
          <p className="auth-terms">By continuing, you agree to our <a href="#terms" onClick={(event) => { event.preventDefault(); goHome() }}>Terms</a> and <a href="#privacy" onClick={(event) => { event.preventDefault(); goHome() }}>Privacy Policy</a>.</p>
          <Link to="/home" className="auth-back">← Back to CampusKart</Link>
        </div>
        <p className="auth-footer">Made for campus life <span>✦</span></p>
      </div>
    </section>
  )
}
