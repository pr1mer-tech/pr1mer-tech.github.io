initApp = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        const displayName = user.displayName;
        const email = user.email;
        const emailVerified = user.emailVerified;
        const photoURL = user.photoURL;
        const uid = user.uid;
        const phoneNumber = user.phoneNumber;
        const providerData = user.providerData;
        user.getIdToken().then(accessToken => {
            firebase.firestore().collection('users').doc(user.uid).set({
                name: displayName,
                email: email,
                profile: photoURL
            })

            const url = new URL(window.location.href)
            if (!url.searchParams.has("no_redirect")) {
                window.location = "https://connect.pr1mer.tech"
            }
        });
      } else {
        // User is signed out.
        // document.getElementById('sign-in-status').textContent = 'Signed out';
        // document.getElementById('sign-in').textContent = 'Sign in';
        // document.getElementById('account-details').textContent = 'null';
      }
    }, error => {
      console.log(error);
    });
  };

  window.addEventListener('load', () => {
    initApp();
  });