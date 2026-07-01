function NavBar() {
  return (
    <nav className="site-nav">
      <div className="nav-brand">TalentSpark</div>
      <ul className="nav-links">
        <li><a href="#dashboard">Dashboard</a></li>
        <li><a href="#companies">Companies</a></li>
        <li><a href="#jobs">Jobs</a></li>
      </ul>
    </nav>
  );
}

export default NavBar;