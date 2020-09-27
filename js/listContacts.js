document
  .getElementById("searchbutton")
  .addEventListener("click", async (event) => {
    event.preventDefault();

    const user_id = getActiveUser().user_id;

    const query = document.getElementById("search").value;

    console.log("query: ", query);

    const apiResult = await searchContact(user_id, query);
    const contacts = apiResult.data;
    const error = apiResult.error;

    console.log(apiResult);

    //checking for contact list that already exists
    document.getElementById("show-panel").innerHTML = "";
    console.log(contacts);
    if (!error) {
      document.getElementById("show-panel").innerHTML +=
        '<tr><th class="tl column tableheader tlfname">First Name</th><th class="tl column tableheader tllname">Last Name</th><th class="tl column tableheader phone">Phone Number</th><th class="tl column tableheader email">Email</th></tr>';
      for (var i = 0; i < contacts.length; i++) {
        document.getElementById("show-panel").innerHTML +=
          "<td>" +
          contacts[i].first_name +
          "</td>" +
          "<td>" +
          contacts[i].last_name +
          "</td>" +
          "<td>" +
          contacts[i].phone_number +
          "</td>" +
          "<td>" +
          contacts[i].email +
          "</td>" +
          '<td><a href="editcontact.html?contact_id=' +
          contacts[i].contact_id +
          '" class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a><a class="delete" title="Delete" data-toggle="tooltip" id="myBtn" ><i class="material-icons">&#xE872;</i></a></td>';
      }
    } else {
      document.getElementById("show-panel").innerHTML +=
        '<div class="contact-item">You have no contacts. Would you like to add a new contact?</div><hr>';
    }
  });
