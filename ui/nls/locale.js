"use strict";
define({
	'root':{
		loading:'Loading ...',
        app:{
          name:'Openbiz Cubi Platform',
          description:"A openbiz based application, provides basically user, account, models and permission contronls."
        },
        common:{
            deleteConfirmationTitle: "Data delete confirmation",
            deleteConfirmationMessage: "<h2><%= record %></h2> <br/> \
                        You are about to delete this record: <br/> \
                        Are you sure?",
            savedNotificationTitle: "Data notification",
            savedNotificationMessage: "<h2>Data has been saved</h2>"
        },
        menu:{
            title:'Account',
            menuApplications    :'Applications',
            menuMembers         :'Members',
            menuInvitations     :'Invitations',
            menuProfile         :'Profile',
        },
        account:{
            invitationsListView:{
                viewTitle: '<span>Invitations</span> Management',
                viewDescription: 'Openbiz Cubi Application Platform 4.0',
                actionInviteUser:'Invite User',
                fieldToken:"Token",
                fieldUser:"User",
                fieldEmail:"Email",
                fieldExpriyDate:"ExpriyDate",
                fieldActions:"Action",
                recordActionDetail:"Detail",
                recordActionDelete:"Delete"
            },
            invitationsDetailView:{
                viewTitle: 'User Inviataion',
                actionDelete:"Delete",
                actionBack:"Back to list",
                labelDetails: "Details",
                labelRoles: "Roles",
                fieldName:"Name",
                fieldEmail:"Email",
                fieldMobile:"Mobile",
                fieldExpiry:"Expiry"
            },
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
                labelCompanyName: 'Company Name',
                labelPhoneNumber: 'Phone Number',
                labelAddress: 'Address',
                labelWebsite: 'Website',
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
                actionSave:'Save',
                validation:{                    
                    companyNotUnique: 'The company has been taken'
                }
            },
	        membersListView:{
		        viewTitle:'Account members',
                fieldName:"Name",
                fieldEmail:"Email",
                fieldRole:"Role",
                fieldAction:"Action",
                recordActionEdit:"Edit",
                recordActionRemove:"Remove",
	        },
            membersEditView:{
                viewTitle:'Update permission for user',
                actionUpdate:'Update',
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
                help: 'Help',
                signout: 'Sign Out',
                profile: 'Profile',
                changePassword: 'Change Password'
            },
            navView:{
                hi: 'Hi'
            },
            menuView:{
                title: "Dashboard"
            }
        },
        me:{
	        userProfileView:{
				viewTitle:'<strong>My</strong> Profile',		        
	        },
            userChangePasswordView:{
                viewTitle:'<strong>Change</strong> Password',
               
                fieldOldPassword:'Old Password',
                placeholderOldPassword:'Old Password',

                fieldNewPassword:'New Password',                
                placeholderNewPassword:'New Password',

                fieldRepeatPassword:'Repeat Password',                
                placeholderRepeatPassword:'Repeat Password',

                passwordChangedTitle:"Your password has successful changed",
                passwordChangedMessage:"Your password has successful changed, <br/>You will need to re-login to make effects",
                validation:{
                    passwordNotMatch:'The password is not matched',
                    incorrectPassword: "The password is incorrect"
                }
            },
            userProfileEditView:{
                viewTitle:'<strong>My</strong> Profile',
                nameFormat: ['firstName','lastName'],
                fieldFirstName:'First Name',
                placeholderFirstName:'First Name',

                fieldLastName:'Last Name',                
                placeholderLastName:'Last Name',

                fieldBirthday:'Birthday',                
                placeholderBirthday:'Birthday',

                fieldCompany:'Company',                
                placeholderCompany:'Company',

                fieldDepartment:'Department',                
                placeholderDepartment:'Department',

                fieldPosition:'Position',                
                placeholderPosition:'Position',

                titleMr:    'Mr.',
                titleMs:    'Ms.'

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
            myAccount:'My Account',
            me:'Me',            
            profile:'Profile',            
            account:'Account',
            members:'Members',
            invitations:"Invitations",
            company:"Company Profile"
        }
	},
	'en-us': true,
	'zh-cn': true
});
