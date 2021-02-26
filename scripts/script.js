const submitButton = document.getElementById('submitButton');

submitButton.addEventListener('click', showInfo);

function showInfo(){
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let github = document.getElementById('github').value;

    alert(`Nome: ${name}\nEmail: ${email}\nGitHub: ${github}\n`);
}

