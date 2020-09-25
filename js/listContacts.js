(function (global) {
  var listContacts = function (
    user_id,
    first_name,
    last_name,
    email,
    phone_number
  ) {
    return new listContacts.init(
      user_id,
      first_name,
      last_name,
      email,
      phone_number
    );
  };

  listContacts.prototype = {
    //default functions
    data: [
      //add data here
    ],
    searchResults: [],
    addNewContact: function (
      user_id,
      first_name,
      last_name,
      email,
      phone_number
    ) {
      this.data.push({
        user_id: user_id,
        first_name: first_name,
        last_name: last_name,
        email: email,
        phone_number: phone_number,
      });
      return this;
    },
    save: function () {
      //save to local storage. This isn't hugely necessary
    },
    returnAll: function () {
      return this.data;
    },
    displayData: function () {
      this.log(this.data);
      return this;
    },
    log: function (data) {
      console.log(data);
      return this;
    },
    search: function (searchTerm) {
      if (this.data.length) {
        for (var i = 0; i < this.data.length; i++) {
          if (this.data[i].name.toLowerCase() == searchTerm.toLowerCase()) {
            console.error(this.data[i]);
            this.searchResults.push(this.data[i]);
          }
        }

        return this.searchResults;
      } else {
        console.log("No results found");
      }
      return this;
    },
    lastResults: function () {
      return this.searchResults;
    },
  };

  listContacts.init = function (
    user_id,
    first_name,
    last_name,
    email,
    phone_number
  ) {
    var self = this;
    //set up the address book
    if (user_id || first_name || last_name || email || phone_number) {
      self.addNewContact(
        user_id || "",
        first_name || "",
        last_name || "",
        email || "",
        phone_number || ""
      );
    }
  };

  listContacts.init.prototype = listContacts.prototype;

  global.listContacts = $ab = listContacts;
})(window);

if (!window.contactList) {
  //check for a contact list
  window.contactList = $ab();
}

var form = document.getElementById("contact");
form.addEventListener("submit", function () {
  if (!window.contactList) {
    //check for an existing contact list
    window.contactList = $ab(
      form.person.value,
      form.phone.value,
      form.email.value
    );
  } else {
    //this would save new values without deleting old ones
    contactList.addNewContact(
      form.person.value,
      form.phone.value,
      form.email.value
    );
  }

  form.person.value = "";
  form.phone.value = "";
  form.email.value = "";

  event.preventDefault();
});

var searchForm = document.getElementById("search");
searchForm.addEventListener("submit", function () {
  var results;
  if (results !== undefined) {
    results = null;
  }
  if (!window.contactList) {
    window.contactList = $ab();
  } else {
    results = contactList.search(searchForm.search.value);
  }
  document.getElementById("results").innerHTML = "";
  if (results.length > 0) {
    for (var i = 0; i < results.length; i++) {
      document.getElementById("results").innerHTML +=
        '<div class="contact-item"> User ID: ' +
        results[i].user_id +
        "<br>First Name:" +
        results[i].first_name +
        "<br>Email:" +
        results[i].email +
        "<br>Phone Number:" +
        results[i].phone_number +
        "</div><hr>";
    }
  } else {
    document.getElementById("results").innerHTML +=
      '<div class="contact-item">This name does not exist</div><hr>';
  }

  //to do something with the results
  event.preventDefault();
});

document.getElementById("js-show-all").addEventListener("click", function () {
  if (window.contactList) {
    //checking for contact list that already exists
    document.getElementById("show-panel").innerHTML = "";
    var contacts = contactList.returnAll();
    console.log(contacts);
    if (contacts.length > 0) {
      for (var i = 0; i < contacts.length; i++) {
        document.getElementById("show-panel").innerHTML +=
          '<div class="contact-item">Name:' +
          contacts[i].name +
          "<br>Phone:" +
          contacts[i].phone +
          "<br>Email:" +
          contacts[i].email +
          "</div><hr>";
      }
    } else {
      document.getElementById("show-panel").innerHTML +=
        '<div class="contact-item">You have no contacts. Would you like to add a new contact?</div><hr>';
    }
  }
  document.getElementById("show-panel").style.display = "block";

  document.getElementById("search-panel").style.display = "none";
  document.getElementById("contact-panel").style.display = "none";
});

document.getElementById("js-search").addEventListener("click", function () {
  document.getElementById("show-panel").style.display = "none";
  document.getElementById("search-panel").style.display = "block";
  document.getElementById("contact-panel").style.display = "none";
});

document.getElementById("js-add-new").addEventListener("click", function () {
  document.getElementById("show-panel").style.display = "none";
  document.getElementById("search-panel").style.display = "none";
  document.getElementById("contact-panel").style.display = "block";
});
