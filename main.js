const API_URL = 'http://localhost:8000/?action=';
const fetchOptions = { credentials: 'include' };

(async () => {
    if (await isUserGuest()) {
        handleGuest();
    }
    else {
        handleLoggedInUser();
    }
})();

async function isUserGuest() {
    const response = await fetch(API_URL + 'get_user_info', fetchOptions);
    const userInfo = await response.json();

    return userInfo === null;
}

async function handleGuest() {
    const signInBtn = document.createElement('button');

    const a = document.createElement('a');
    a.href = await getOAuthUrl();
    a.target = '_self';
    a.textContent = 'Sign in';

    signInBtn.appendChild(a);
    document.body.appendChild(signInBtn);
}

async function getOAuthUrl() {
    const response = await fetch(API_URL + 'get_oauth_url', fetchOptions);
    const url = await response.text();

    return url;
}

async function handleLoggedInUser() {
    const response = await fetch(API_URL + 'get_user_info', fetchOptions);
    const userInfo = await response.json();

    const div = document.createElement('div');
    div.style.display = 'flex';

    const p = document.createElement('p');
    p.textContent = userInfo.email;

    const img = document.createElement('img');
    img.src = userInfo.picture;

    div.appendChild(img);
    div.appendChild(p);

    document.body.appendChild(div);
}
