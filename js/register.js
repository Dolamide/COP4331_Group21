// Get the modal
var modal = document.getElementById("myModal_Reg");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close_Reg")[0];

const doRegister = async () => {
    const username = document.getElementById('user-name').value;
    const password = document.getElementById('login-password').value;
    const first_name = document.getElementById('name').value;
    const last_name = document.getElementById('lastname').value;
    if(!(username === "" || password === "" || first_name === "" || last_name === "")) {
    const { data, error } = await addAccount(username, password, first_name, last_name);
      if (!(error === "")) {
          document.getElementById('modalError').innerHTML = 'Account exists';
          modal.style.display = "block";
      } else {
          window.location.href = "/loginpage.html";
      }
    } else {
      document.getElementById('modalError').innerHTML = "Incomplete entry";
      modal.style.display = "block";
    }
}



// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}