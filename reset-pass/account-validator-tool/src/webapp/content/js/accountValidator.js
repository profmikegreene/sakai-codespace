// bbailla2, plukasew, bjones86 - SAK-24427

// 'Namespace'
var VALIDATOR = VALIDATOR || {};

// Variables
VALIDATOR.passwordValid = false;
VALIDATOR.passwordWeak = false;
VALIDATOR.passwordModerate = false;
VALIDATOR.passwordStrong = false;
VALIDATOR.passwordsMatch = false;
VALIDATOR.firstNameValid = false;
VALIDATOR.lastNameValid = false;
VALIDATOR.termsChecked = false;
VALIDATOR.isPasswordPolicyEnabled = false;
VALIDATOR.lastSentPasswordLength = 0; // SAK-29099

// Validate the password from the form
VALIDATOR.validatePassword = function() {
    let username = VALIDATOR.get("eid").innerHTML;
    const pw = VALIDATOR.get("password1").value;
    const strongMsg = VALIDATOR.get("strongMsg");
    const moderateMsg = VALIDATOR.get("moderateMsg");
    const weakMsg = VALIDATOR.get("weakMsg");
    const failMsg = VALIDATOR.get("failMsg");
    const strengthInfo = VALIDATOR.get("strengthInfo");
    const strengthBar = VALIDATOR.get("strengthBar");
    const strengthBarMeter = VALIDATOR.get("strengthBarMeter");
    
    // SAK-29099 - password likely hasn't changed, so abort
    if (pw.length === VALIDATOR.lastSentPasswordLength) {
        return;
    }
    
    // If the password policy is enabled and the password field has a value
    if (VALIDATOR.isPasswordPolicyEnabled && pw.length > 0) {
        // Make the AJAX call to the validate password REST endpoint
        jQuery.ajax({
            url: "/direct/user/validatePassword",
            type: "POST",
            data: `password=${pw}&username=${username}`,
            async: false,
            success: function(data) {
                VALIDATOR.passwordValid = true;
                VALIDATOR.passwordWeak = false;
                VALIDATOR.passwordModerate = false;
                VALIDATOR.passwordStrong = false;
                
                switch (data) {
                    case 'WEAK':
                        VALIDATOR.passwordWeak = true;
                        break;
                    case 'MODERATE':
                        VALIDATOR.passwordModerate = true;
                        break;
                    case 'STRONG':
                        VALIDATOR.passwordStrong = true;
                        break;
                    default:
                        VALIDATOR.passwordValid = false;
                }
                // SAK-29099 - track current length of input password
                VALIDATOR.lastSentPasswordLength = pw.length;
            }
        });

        // Display the appropriate messages
        let showStrengthBar = (VALIDATOR.passwordStrong || VALIDATOR.passwordModerate || VALIDATOR.passwordWeak || !VALIDATOR.passwordValid);
        VALIDATOR.display(strongMsg, VALIDATOR.passwordStrong);
        VALIDATOR.display(moderateMsg, VALIDATOR.passwordModerate);
        VALIDATOR.display(weakMsg, VALIDATOR.passwordWeak);
        VALIDATOR.display(failMsg, !VALIDATOR.passwordValid);
        VALIDATOR.display(strengthBar, showStrengthBar);
        VALIDATOR.display(strengthBarMeter, showStrengthBar);
        VALIDATOR.displayStrengthInfo();

        // Update the strength meter accordingly
        if (VALIDATOR.passwordStrong) {
            strengthBarMeter.style.width = "100%";
            strengthBarMeter.style.backgroundColor = "#178c0b";
        } else if (VALIDATOR.passwordModerate) {
            strengthBarMeter.style.width = "66%";
            strengthBarMeter.style.backgroundColor = "#edbc03";
        } else if (VALIDATOR.passwordWeak) {
            strengthBarMeter.style.width = "33%";
            strengthBarMeter.style.backgroundColor = "#900";
        } else {
            strengthBarMeter.style.width = "0%";
            strengthBarMeter.style.backgroundColor = "#900";
        }
    }

    // Otherwise, password policy is disabled or the password field has no value
    else {
        VALIDATOR.display(strongMsg, false);
        VALIDATOR.display(moderateMsg, false);
        VALIDATOR.display(weakMsg, false);
        VALIDATOR.display(failMsg, false);
        VALIDATOR.display(strengthInfo, false);
        VALIDATOR.display(strengthBar, false);
        VALIDATOR.display(strengthBarMeter, false);
        VALIDATOR.passwordValid = pw.length > 0;
    }

    // Verify the passwords match (which in turn validates the form)
    VALIDATOR.verifyPasswordsMatch();
};

VALIDATOR.clearPasswordMatchMsgs = function() {
        VALIDATOR.display( VALIDATOR.get("matchMsg"), false);
        VALIDATOR.display(VALIDATOR.get("noMatchMsg"), false);
};

// Verify the passwords match
VALIDATOR.verifyPasswordsMatch = function() {
    const pw = VALIDATOR.get("password1").value;
    const pw2 = VALIDATOR.get("password2").value;

    const matchMsg = VALIDATOR.get("matchMsg");
    const noMatchMsg = VALIDATOR.get("noMatchMsg");

    // Only continue validation if the the second password element has contents.  
    if (pw2.length === 0) {
        VALIDATOR.display(matchMsg, false);
        VALIDATOR.display(noMatchMsg, false);
        return;
    }

    VALIDATOR.passwordsMatch = pw === pw2;
    if (VALIDATOR.passwordsMatch) {
        VALIDATOR.display(matchMsg, VALIDATOR.passwordsMatch);
        VALIDATOR.display(noMatchMsg, !VALIDATOR.passwordsMatch);
    } else {
        VALIDATOR.display(matchMsg, false);
        VALIDATOR.display(noMatchMsg, true);
    }

    VALIDATOR.validateActivateForm();
};

// Validate the first name on the form
VALIDATOR.validateFirstName = function() {
    VALIDATOR.firstNameValid = false;
    const firstName = VALIDATOR.get("firstName");
    if (firstName === null || firstName.value.length > 0) {
        VALIDATOR.firstNameValid = true;
    }
    VALIDATOR.validateActivateForm();
};

// Validate the last name on the form
VALIDATOR.validateLastName = function() {
    VALIDATOR.lastNameValid = false;
    const lastName = VALIDATOR.get("surName");
    if (lastName === null || lastName.value.length > 0) {
        VALIDATOR.lastNameValid = true;
    }
    VALIDATOR.validateActivateForm();
};

VALIDATOR.validateTermsChecked = function() {
    const terms = VALIDATOR.get("termsCheck");
    if (terms.checked){
        VALIDATOR.termsChecked = true;
    } else {
        VALIDATOR.termsChecked = false;
    }
    VALIDATOR.validateActivateForm();
};

// Conditionally show/hide the strength info message
VALIDATOR.displayStrengthInfo = function() {
    if (VALIDATOR.isPasswordPolicyEnabled) {
        const strengthInfo = VALIDATOR.get("strengthInfo");
        const passField = VALIDATOR.get("password1");
        let showStrengthInfo = false;
        if (passField.value.length > 0) {            
            if (!VALIDATOR.passwordValid || (!VALIDATOR.passwordStrong && passField === document.activeElement)) {
                showStrengthInfo = true;
            }
        }
        VALIDATOR.display(strengthInfo, showStrengthInfo);
    }
};

// Validate the form (enable/disable the submit button).  
// Password match checking is on the onblur event so enable the button if both pw boxes have contents  
// and all other validation is met.  
VALIDATOR.validateActivateForm = function() {
    const submitButton = VALIDATOR.get("addDetailsSub");
    const firstName = VALIDATOR.get("firstName");
    const lastName = VALIDATOR.get("surName");
    const terms = VALIDATOR.get("termsCheck");

    if (submitButton !== null) {
            //for passwordReset
        if (firstName == null && lastName == null && VALIDATOR.passwordsMatch) {
            submitButton.disabled = false;

        } else if (VALIDATOR.firstNameValid && VALIDATOR.lastNameValid && VALIDATOR.get("password1").value.length > 0 &&
            VALIDATOR.get("password2").value.length > 0 && VALIDATOR.passwordsMatch) {

            if (terms != null && !VALIDATOR.termsChecked) {
                submitButton.disabled = true;

            } else {
                submitButton.disabled = false;
            }

        } else {
            submitButton.disabled = true;
        }
    }
};

// bbailla2 - enables/disables the Transfer memberships button as well as the yes button based on how the required fields are filled
VALIDATOR.checkTransferStatus = function() {
    let enable = false;
    const userId = VALIDATOR.get("userName");
    const transfer = VALIDATOR.get("transferMemberships");

    if (userId && transfer) {
        if (userId.value !== "") {
            var pw = VALIDATOR.get("password");
            if (pw.value !== "") {
                enable = true;
            }
        }
        if (enable) {
            transfer.disabled = false;
        } else {
            transfer.disabled = true;
        }
    }
};

// Get an element by ID
VALIDATOR.get = function(id) {
    return document.getElementById(id);
};

//Determine if the given string is empty/null
VALIDATOR.isEmpty = function(inputString) {
    return inputString === null || inputString.length === 0 || inputString.replace(/^\s*/, "").replace(/\s*$/, "") === "";
};

// Show/hide the given element
VALIDATOR.display = function(element, show) {
    if (show) {
        element.style.display = "block";
    } else {
        element.style.display = "none";
    }
};

// Original document ready function
$(document).ready(function() {
    /* Hide div with yellow background if it is not null and is empty */
    if (($('.yellowBackground').length > 0) && ($('.yellowBackground').html().trim() === '')){
        $('.yellowBackground').hide();
    }
    if ($("form").length === 0) {
        $("table").remove();
        return false;
    }
    var cssInvalidField = {"border":"1px solid red"};
    $("input.inputBox").bind("keyup", function(){
        $(this).removeAttr("style");
    });
    $("input[type=checkbox]").click(function() {
        $(this).parents(".required").removeAttr("style");
    });
    $("input.submit").bind("click", function() {
        var that = $(this),
                form = that.parents("form:eq(0)"),
                errors = 0;
        $("form .required").removeAttr("style");
        $.each(form.find(".required"), function(i, _this) {
            var field = $(_this);
            if (field.attr("type") === "text") {
                if (VALIDATOR.isEmpty(field.val())) {
                    field.css(cssInvalidField);
                    errors ++;
                }
            } else if (field.attr("type") === "password") {
                if (field.attr("class").search("password2") === -1) {
                    if (VALIDATOR.isEmpty(field.val())) {
                        field.css(cssInvalidField);
                        errors ++;
                    }
                }
            // This is for the checkbox as we can't add a border to it.
            } else if (field.is("div")) {
                $("input[type=checkbox]", field).each(function(j, checkbox) {
                    if (!$(checkbox).is(":checked")) {
                        field.css(cssInvalidField);
                        errors ++;
                    }
                });
            }
        });
        if (form.find("input.password2").length > 0) {
            var p1 = form.find("input.password1"),
                    p2 = form.find("input.password2");
            if (!VALIDATOR.isEmpty(p1.val())) {
                if (p1.val() !== p2.val()) {
                    p1.css(cssInvalidField);
                    p2.css(cssInvalidField);
                    errors ++;
                }
            }
        }
        return errors === 0;
    });

});
