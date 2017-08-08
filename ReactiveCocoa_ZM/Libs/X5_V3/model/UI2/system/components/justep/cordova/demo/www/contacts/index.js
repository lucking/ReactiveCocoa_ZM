define(function(require) {
	var justep = require("$UI/system/lib/justep");
	require("css!$UI/system/components/bootstrap/lib/css/bootstrap").load();
	require("$UI/system/lib/cordova/cordova");require("css!$UI/system/components/justep/cordova/demo/cordova.css").load();
	require("$UI/system/components/justep/cordova/demo/www/cordova-incl");
	

	var Model = function() {
		this.callParent();
		this.on('onLoad', function() {
			var deviceReady = false;			
			function getContacts() {
			    var obj = new ContactFindOptions();
			    // show all contacts, so don't filter
			    obj.multiple = true;
			    navigator.contacts.find(["displayName", "name", "phoneNumbers", "emails", "urls", "note"],
			        function(contacts) {
			            var s = "";
			            if (contacts.length == 0) {
			                s = "No contacts found";
			            }else {
			                s = "Number of contacts: "+contacts.length+"<br/><table class='table' width='100%'><tr><th>Name</th><td>Phone</td><td>Email</td></tr>";
			                for (var i=0; i<contacts.length; i++) {
			                    var contact = contacts[i];
			                    s = s + "<tr><td>" + contact.name.formatted + "</td><td>";
			                    if (contact.phoneNumbers && contact.phoneNumbers.length > 0) {
			                        s = s + contact.phoneNumbers[0].value;
			                    }
			                    s = s + "</td><td>"
			                    if (contact.emails && contact.emails.length > 0) {
			                        s = s + contact.emails[0].value;
			                    }
			                    s = s + "</td></tr>";
			                }
			                s = s + "</table>";
			            }
			            document.getElementById('contacts_results').innerHTML = s;
			        },
			        function(e) {
			            document.getElementById('contacts_results').innerHTML = "Error: "+e.code;
			        },
			        obj);
			};

			function addContact(){
			    try{
			        var contact = navigator.contacts.create({"displayName": "Dooney Evans"});
			        var contactName = {
			            formatted: "Dooney Evans",
			            familyName: "Evans",
			            givenName: "Dooney",
			            middleName: ""
			        };

			        contact.name = contactName;

			        var phoneNumbers = [1];
			        phoneNumbers[0] = new ContactField('work', '512-555-1234', true);
			        contact.phoneNumbers = phoneNumbers;

			        contact.save(
			            function() { alert("Contact saved.");},
			            function(e) { alert("Contact save failed: " + e.code); }
			        );
			        console.log("you have saved the contact");
			    }catch (e){
			        alert(e);
			    }

			};
			
			function init() {
			    document.addEventListener("deviceready", function() {
			            deviceReady = true;
			            console.log("Device="+device.platform+" "+device.version);
			        }, false);
			    window.setTimeout(function() {
			      if (!deviceReady) {
			        alert("Error: Apache Cordova did not initialize.  Demo will not run correctly.");
			      }
			    },5000);
			};


		  addListenerToClass('getContacts', getContacts);
		  addListenerToClass('addContact', addContact);
		  addListenerToClass('backBtn', backHome);
		  init();

		});
	};
	return Model;
});
