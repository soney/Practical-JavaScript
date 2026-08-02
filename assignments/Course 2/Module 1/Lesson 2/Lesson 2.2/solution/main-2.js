function updateProfile(username, isPremium) {
  // SOLUTION: learner fills in the function body below
  const displayName = document.querySelector('#display-name');
  const profilePic = document.querySelector('#profile-pic');
  const profileCard = document.querySelector('#profile-card');

  displayName.textContent = username;

  if (isPremium) {
    profilePic.setAttribute('src', 'gold-shield.png');
    profileCard.classList.add('vip-border');
  } else {
    profilePic.setAttribute('src', 'standard-user.png');
    profileCard.classList.remove('vip-border');
  }
}