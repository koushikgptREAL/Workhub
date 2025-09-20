import React from 'react';

function Profile() {
  return (
    <div className="section">
      <h1 className="section-title">User Profile</h1>
      <div className="card">
        <h3>Profile Information</h3>
        <p>Name: John Doe</p>
        <p>Email: john@example.com</p>
        <p>Role: Freelancer</p>
        <p>Skills: Web Development, React</p>
      </div>
    </div>
  );
}

export default Profile;