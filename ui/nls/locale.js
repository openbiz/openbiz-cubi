"use strict";
define({
	'root':{
		loading:'Loading ...',
        app:{
          name:'Openbiz Cubi Platform',
          description:"A openbiz based application, provides basically user, account, models and permission contronls."
        },
        account:{
            invitationsNewView:{
                viewTitle: '<span>Create</span> New Account',
                viewDescription: 'Openbiz Cubi Application Platform 4.0',
                copyright: '&copy; 2014 Openbiz LLC',
                createAccountButton: 'Create Account',
                alreadyHaveAccount: 'Already have an account? ',
                goToLogin: 'Go to Login',
                title: 'Title',
                titleMr:    'Mr.',
                titleMiss:  'Miss',
                titleMrs:   'Mrs',
                titleMs:    'Ms.',
                name: 'Name',
                firstName : 'First Name',
                lastName : 'Last Name',
                nameFormat: ['firstName','lastName'],
                company: 'Company',
                phone: 'Phone',
                mobile: 'Mobile',
                mobileNumber: 'Mobile Number',
                phoneDefaultCountryCode: '+1',
                phoneCountryCode: 'Country Code',
                phoneAreaCode: 'Area Code',
                phoneNumber: 'Phone Number',
                email: 'Email',
                password: 'Password',
                passwordPlaceholder: 'At leaset 6 charactors',
                repeatPassword: 'Repeat',
                repeatPasswordPlaceholder: 'Repeat password',
                agreeWith: 'I have read and agreed with ',
                termOfUse: 'term of use',
                signing: 'Signing up',
                validation:{
                    needAgreement: 'You need to check this agreement before continue',
                    passwordNotMatch:'The password is not matched',
                    emailDuplicated: 'The email address has been registered by other user',
                    emailNotInvitable: 'The email address is already assicated with account'
                }
            },
            profileView:{
                viewTitle: '<span>Company</span> Profile',
                viewDescription: 'Openbiz Cubi Application Platform 4.0',
                phoneDefaultCountryCode: '+1',
                phoneCountryCode: 'Country Code',
                phoneAreaCode: 'Area Code',
                phoneNumber: 'Phone Number',
                addressCountry: 'Country',
                addressDefaultCountry: 'USA',
                addressProvince: 'Province',
                addressCity: 'City',
                addressStreet: 'Street',
                addressZipcode: 'Zipcode',
                validation:{
                    needAgreement: 'You need to check this agreement before continue',
                    passwordNotMatch:'The password is not matched',
                    emailDuplicated: 'The email address has been registered by other user',
                    emailNotInvitable: 'The email address is already assicated with account'
                }
            },
	        membersListView:{
		        viewTitle:'Account members'
	        }
        },
        user:{
            loginView:{
                viewTitle: '<span>Wel</span>come',
                viewDescription: 'Openbiz Cubi Application Platform 4.0',
                email: 'Email',
                password: 'Password',
                signIn: 'Sign In',
                or: 'or',
                remember: 'Remember',
                forgetPassword: 'Forget Password?',
                createAccount: 'Create Account',
                signing: 'Signing in',
                copyright: '&copy; 2014 Openbiz LLC',
                validation:{
                    incorrectPassword: "Email or password is incorrect"
                }
            },
            forgetPasswordView:{
                viewTitle: '<span>Reset</span> Password',
                viewDescription: 'Openbiz Cubi Application Platform 4.0',
                pleaseInputEmail: 'Please fill in yout email address in below field. Our system will send you an email with a link to allow your to reset your password.',
                email: 'Email',
                sendRequest: 'Send Request',
                or: 'or',
                goToLogin: 'Go to Login',
                copyright: '&copy; 2014 Openbiz LLC'
            },
            registerView:{
                viewTitle: '<span>Create</span> New Account',
                viewDescription: 'Openbiz Cubi Application Platform 4.0',
                copyright: '&copy; 2014 Openbiz LLC',
                createAccountButton: 'Create Account',
                alreadyHaveAccount: 'Already have an account? ',
                goToLogin: 'Go to Login',
                title: 'Title',
                titleMr: 	'Mr.',
                titleMiss: 	'Miss',
                titleMrs: 	'Mrs',
                titleMs: 	'Ms.',
                name: 'Name',
                firstName : 'First Name',
                lastName : 'Last Name',
                nameFormat: ['firstName','lastName'],
                company: 'Company',
                phone: 'Phone',
                mobile: 'Mobile',
                mobileNumber: 'Mobile Number',
                phoneDefaultCountryCode: '+1',
                phoneCountryCode: 'Country Code',
                phoneAreaCode: 'Area Code',
                phoneNumber: 'Phone Number',
                email: 'Email',
                password: 'Password',
                passwordPlaceholder: 'At leaset 6 charactors',
                repeatPassword: 'Repeat',
                repeatPasswordPlaceholder: 'Repeat password',
                agreeWith: 'I have read and agreed with ',
                termOfUse: 'term of use',
                signing: 'Signing up',
                validation:{
                    needAgreement: 'You need to check this agreement before continue',
                    passwordNotMatch:'The password is not matched',
                    emailDuplicated: 'The email address has been registered by other user'
                }
            },
            dashboardView:{

            }
        },
        system:{
            headerView:{
                hi: 'Hi',
                help: 'Help'
            },
            navView:{
                hi: 'Hi'
            }
        },
        me:{
	        userProfileView:{
				viewTitle:'<strong>Me</strong> Profile',
		        firstName:'First Name',
		        lastName:'Last Name',
		        titleMr: 	'Mr.',
		        titleMs: 	'Ms.',
		        company: 'Company',
		        department:'Department',
		        birthday:'Birthday',
		        oldPassword:'Old Password',
		        newPassword:'New Password',
		        repetNewPassword:'Confirm New Password',
		        passwordNotMatch:'The password is not matched',
		        wrongPassword:"The password is wrong"
	        },
            setupWizardView:{
                viewName:'Setup Wizard',
                viewTitle: '<strong>Account</strong> Setup Wizard',
                phoneDefaultCountryCode: '+1',
                phoneCountryCode: 'Country Code',
                phoneAreaCode: 'Area Code',
                phoneNumber: 'Phone Number',
                addressCountry: 'Country',
                addressDefaultCountry: 'USA',
                addressProvince: 'Province',
                addressCity: 'City',
                addressStreet: 'Street',
                addressZipcode: 'Zipcode',
                invitationCodePlaceHolder: 'ACCT-XXXX-XXXXXX',
                validation:{
                    tokenInvalid: 'The token code is invalid',
                    companyNotUnique: 'The company has been taken'
                },
                addUserView:{
                    viewTitle: '<span>Create</span> New Account',
                    viewDescription: 'Openbiz Cubi Application Platform 4.0',
                    copyright: '&copy; 2014 Openbiz LLC',
                    createAccountButton: 'Create Account',
                    alreadyHaveAccount: 'Already have an account? ',
                    goToLogin: 'Go to Login',
                    title: 'Title',
                    titleMr: 	'Mr.',
                    titleMiss: 	'Miss',
                    titleMrs: 	'Mrs',
                    titleMs: 	'Ms.',
                    name: 'Name',
                    firstName : 'First Name',
                    lastName : 'Last Name',
                    nameFormat: ['firstName','lastName'],
                    company: 'Company',
                    phone: 'Phone',
                    mobile: 'Mobile',
                    mobileNumber: 'Mobile Number',
                    phoneDefaultCountryCode: '+1',
                    phoneCountryCode: 'Country Code',
                    phoneAreaCode: 'Area Code',
                    phoneNumber: 'Phone Number',
                    email: 'Email',
                    password: 'Password',
                    passwordPlaceholder: 'At leaset 6 charactors',
                    repeatPassword: 'Repeat',
                    repeatPasswordPlaceholder: 'Repeat password',
                    agreeWith: 'I have read and agreed with ',
                    termOfUse: 'term of use',
                    signing: 'Signing up',
                    validation:{
                        needAgreement: 'You need to check this agreement before continue',
                        passwordNotMatch:'The password is not matched',
                        emailDuplicated: 'The email address has been registered by other user',
                        emailNotInvitable: 'The email address is already assicated with account'
                    }
                },
                userPermissionView:{

                }
            }
        },
        breadcrumb:{
            home:'Home',
            myAccount:'My Account'
        }
	},
	'en-us': true,
	'zh-cn': true
});
