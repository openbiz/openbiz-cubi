"use strict";
define({	   
    loading:'数据加载中 ...',
    app:{
        name:'Openbiz Cubi 应用平台',
        description:"Openbiz 的基础应用平台，提供用户管理，企业账户等通用功能",
        roles:{
            "cubi-admin"            :"Cubi 系统管理员",
            "cubi-user"             :"Cubi 普通用户",
            "cubi-account-manager"  :"Cubi 账户管理员",
            "cubi-account-member"   :"Cubi 账户成员"
        }
    },
    common:{
            deleteConfirmationTitle: "数据删除确认",
            deleteConfirmationMessage: "<h2><%= record %></h2> <br/> \
                        你即将删除这条数据: <br/> \
                        是否确认此操作?",
    },
    menu:{
        title               :'公司账户设置',
        menuApplications    :'应用程序管理',
        menuMembers         :'公司用户管理',
        menuInvitations     :'用户邀请管理',
        menuProfile         :'企业档案管理',
    },
    user:{
        loginView:{
            viewTitle: '<span>欢迎</span>登录',
            email: '电子邮件',
            password: '登录密码',
            signIn: '登录',
            or: '或者',
            remember: '记住我的账户',
            forgetPassword: '忘记密码?',
            createAccount: '创建新账户',
            signing: '登录中...',
            copyright: '&copy; 2014 Openbiz LLC',
            validation:{
                incorrectPassword: "您输入的用户名或密码可能不正确"
            }
        },
        forgetPasswordView:{
            viewTitle: '<span>找回</span>密码',
            pleaseInputEmail: '请在下面的输入框内填写您的电子邮件地址，我们的系统将会自动发给你一封带有密码重置连接的电子邮件，请注意查收。',
            email: '电子邮件',
            or: '或者',
            sendRequest: '发送请求',
            copyright: '&copy; 2014 Openbiz LLC',
            goToLogin: '返回登陆页面'
        },
        registerView:{
            viewTitle: '<span>创建</span>新的账户',
            createAccountButton: '创建账户',
            alreadyHaveAccount: '已经有账户了么? ',
            goToLogin: '返回登录',
            title: '称呼',
            titleMr:    '先生',
            titleMiss:  '小姐',
            titleMrs:   '夫人',
            titleMs:    '女士',
            name: '姓名',
            firstName : '名字',
            lastName : '姓氏',
            nameFormat: ['lastName','firstName'],
            company: '公司',
            phone: '电话',
            mobile: '手机',
            mobileNumber: '手机号码',
            phoneDefaultCountryCode: '+86',
            phoneCountryCode: '国家编码',
            phoneAreaCode: '区号',
            phoneNumber: '电话号码',
            email: '电子邮件',
            password: '密码',
            repeatPassword: '重复密码',
            agreeWith: '我已经阅读并且认同',
            termOfUse: '使用条款',
            signing: '创建中...',
            validation:{
                needAgreement: '您需要同意本协议才可以继续',
                passwordNotMatch:'两次密码输入不一致',
                emailDuplicated: '该邮件地址已经被其他用户注册'
            }
        }
    },
    system:{
        headerView:{
            hi: '欢迎',
            help: '帮助',
            signout: '退出登录',
            profile: '我的资料管理'
        },
        navView:{
            hi: '欢迎'
        },
        menuView:{
            title: "首页仪表板"
        }
    },
    me:{
        userProfileView:{
                viewTitle:'<strong>资料</strong>管理',
                firstName:'名字',
                lastName:'姓氏',
                titleMr:    '先生',
                titleMs:    '女士',
                company: '公司',
                department:'部门',
                birthday:'生日',
                oldPassword:'旧的密码',
                newPassword:'新密码的',
                repetNewPassword:'再次确认',
                passwordNotMatch:'两次输入密码不一致',
                wrongPassword:"密码输入错误"
            },
        setupWizardView:{
            viewName:'设置向导',
            viewTitle: '<strong>账户</strong> 设置向导',
            addUserView:{
                viewTitle: '<span>创建</span>新的账户',
                createAccountButton: '创建账户',
                alreadyHaveAccount: '已经有账户了么? ',
                goToLogin: '返回登录',
                title: '称呼',
                titleMr:    '先生',
                titleMiss:  '小姐',
                titleMrs:   '夫人',
                titleMs:    '女士',
                name: '姓名',
                firstName : '名字',
                lastName : '姓氏',
                nameFormat: ['lastName','firstName'],
                company: '公司',
                phone: '电话',
                mobile: '手机',
                mobileNumber: '手机号码',
                phoneDefaultCountryCode: '+86',
                phoneCountryCode: '国家编码',
                phoneAreaCode: '区号',
                phoneNumber: '电话号码',
                email: '电子邮件',
                password: '密码',
                repeatPassword: '重复密码',
                agreeWith: '我已经阅读并且认同',
                termOfUse: '使用条款',
                signing: '创建中...',
                validation:{
                    needAgreement: '您需要同意本协议才可以继续',
                    passwordNotMatch:'两次密码输入不一致',
                    emailDuplicated: '该邮件地址已经被其他用户注册',
                    emailNotInvitable: '该邮件地址已关联，不能重复邀请'
                }
            }
        }
    },
    breadcrumb:{
        home:'首页',
        me:'我的账户',
        myAccount:'我的账户',
        profile:'资料管理'
    }
});